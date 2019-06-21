import React, {Component} from 'react';
import {createItemBondsAsset, createItemFrefix} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Row,
    Col,
    Checkbox,
    Tag
} from 'antd';
import * as common from '../Common/Common';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
const newDate = new Date();

class ModalAssetBond extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            isTypePrefix: true,
            codeBond: '',
            codeBondNewPrefix: '',
            contractVCSC: '',
            company: '',
            paymentTerm: null,
            typeBond: '',
            dayInterestYear: null,
            currentInterest: null,
            sortName: '',
            infoBond: '',
            price: null,
            maxRelease: null,
            released: null,
            totalOfCirculate: null,
            totalRecall: null,
            dateRelease: moment(new Date(), dateFormat),
            dateExpire: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+6)), dateFormat),
            dateBreak: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+12)), dateFormat),
            totalLevelMobilize: null,
            levelLoan: null,
            periodRemain: null,
            statusListed: 1,
            ensureAsset: '',
            totalDepository: null,
            isShowNotice: false
        };
    }

    setModal2Visible =()=> {
        this.props.isCloseModal();
        this.setState({isShowNotice: false});
    }

    handleCurrencyChange = currency => {
        this.setState({ currency });
    };

    onChangeCheckbox = ()=>{
        this.setState((prew) => ({
            isTypePrefix: !prew.isTypePrefix
        }))
    }

    updateInputValue = (event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    updateInputDate = name => (value)=>{
        this.setState({[name]: value});
    }

    updateSelectValue = name => (event)=>{
        this.setState({[name]: event});
    }

    updateSelectcodeOfPresenter = (event)=>{
        this.setState({codeOfPresenter: event});
    }
    
    onHandleOk = async()=>{
        try{
            if(!this.state.codeBond || !this.state.contractVCSC || !this.state.company || !this.state.paymentTerm || !this.state.typeBond || !this.state.totalDepository
                || !this.state.dayInterestYear || !this.state.currentInterest || !this.state.price || !this.state.totalOfCirculate || !this.state.levelLoan || !this.state.totalLevelMobilize){
                this.setState({isShowNotice: true});
            }else{
                let codeBondTemp = this.state.codeBond + common.convertStringDate(this.state.dateRelease);
                if(!this.state.isTypePrefix){
                    codeBondTemp = this.state.codeBondNewPrefix + common.convertStringDate(this.state.dateRelease);
                    let dataTmp = {
                        "KYTU_PREFIX": this.state.codeBondNewPrefix,
                    }
                    const res = await createItemFrefix(dataTmp);
                    if (res.error) {
                        common.notify('error', 'Thao tác thất bại :( ');
                    } else {
                        await common.notify('success', 'Thao tác thành công, đã tạo ra 1 cột mới ở bảng Prefix ^^!');
                    }
                }
                let dataTmp = {
                    "MSTP": codeBondTemp,
                    "SO_HD": this.state.contractVCSC,
                    "MS_DN": this.state.company,
                    "MS_KYHANTT": this.state.paymentTerm,
                    "MS_LTP": this.state.typeBond,
                    "MS_NTLTN": this.state.dayInterestYear,
                    "LAISUAT_HH": this.state.currentInterest,
                    "MAVIETTAT": this.state.sortName,
                    "TT_TRAIPHIEU": this.state.infoBond,
                    "MENHGIA": this.state.price,
                    "SL_PHTD": this.state.maxRelease,
                    "SL_DPH": this.state.released,
                    "SL_LH": this.state.totalOfCirculate,
                    "SL_TH": this.state.totalRecall,
                    "NGAYPH": this.state.dateRelease,
                    "NGAYDH": this.state.dateExpire,
                    "NGAY_KTPH": this.state.dateBreak,
                    "TONGHANMUC_HUYDONG": this.state.totalLevelMobilize,
                    "HANMUC_CHO": this.state.levelLoan,
                    "KYHAN": this.state.periodRemain,
                    "TT_NIEMYET": this.state.statusListed,
                    "TS_DAMBAO": this.state.ensureAsset,
                    "SL_LUUKY": this.state.totalDepository
                }
                const res = await createItemBondsAsset(dataTmp);
                if(res.error){
                    common.notify('error', 'Thao tác thất bại :( ');
                }else{
                    await this.props.reloadData();
                    this.setState({
                        isTypePrefix: true,
                        codeBondNewPrefix: '',
                        currentInterest: null,
                        sortName: '',
                        infoBond: '',
                        price: null,
                        maxRelease: null,
                        released: null,
                        totalOfCirculate: null,
                        totalRecall: null,
                        dateRelease: moment(new Date(), dateFormat),
                        dateExpire: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+6)), dateFormat),
                        dateBreak: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+12)), dateFormat),
                        totalLevelMobilize: null,
                        levelLoan: null,
                        periodRemain: null,
                        statusListed: 1,
                        ensureAsset: '',
                        totalDepository: null,
                        isShowNotice: false
                    });
                    await common.notify('success', 'Thao tác thành công ^^!');
                }
            }
        }catch(err){
            common.notify('error', 'Thao tác thất bại :( ' );
        }
    }

    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return(
            <Modal
                title="Trái phiếu"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                width="70%"
            >
                <Row>
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="MÃ SỐ TRÁI PHIẾU">
                                <Tag color="green" style={{fontSize: 16, padding: 5}}>{this.state.isTypePrefix === true ? this.state.codeBond + common.convertStringDate(this.state.dateRelease) : this.state.codeBondNewPrefix + common.convertStringDate(this.state.dateRelease)}</Tag>
                            </Form.Item>
                            <Form.Item
                                label="* Prefix"
                                validateStatus={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select disabled={!this.state.isTypePrefix} showSearch placeholder="Típ đầu ngữ mã số trái phiếu" onChange={this.updateSelectValue('codeBond')}>
                                    {
                                        this.props.lstPrefixData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.KYTU_PREFIX} value={item.KYTU_PREFIX}>{item.KYTU_PREFIX}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Tạo mới Prefix"
                                validateStatus="warning"
                            >
                                <Input name="codeBondNewPrefix" disabled={this.state.isTypePrefix} placeholder="Mã Prefix nhập khi muốn tạo mới" value={this.state.codeBondNewPrefix} onChange={event => this.updateInputValue(event)} />
                                <Checkbox onChange={this.onChangeCheckbox}>Tạo mới prefix</Checkbox>
                            </Form.Item>
                            <Form.Item
                                label="* Số Hợp đồng"
                                validateStatus={(this.state.contractVCSC.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.contractVCSC.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Số hợp đồng" onChange={this.updateSelectValue('contractVCSC')}>
                                    {
                                        this.props.lstContractVCSCData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.SOHD} value={item.SOHD}>{item.SOHD}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Doanh Nghiệp"
                                validateStatus={(this.state.company.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.company.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Doanh nghiệp" onChange={this.updateSelectValue('company')}>
                                    {
                                        this.props.lstCompanyData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.MSDN} value={item.MSDN}>{item.TEN_DN}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            {/* <Form.Item
                                label="* Tài sản đảm bảo"
                                validateStatus={(this.state.codeEnsureAsset === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.codeEnsureAsset === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Tài sản đảm bảo" onChange={this.updateSelectValue('codeEnsureAsset')}>
                                    {
                                        this.props.lstEnsureAssetData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.MSTSDB} value={item.MSTSDB}>{item.TENTAISANDAMBAO}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item> */}
                            <Form.Item
                                label="* Kì hạn thanh toán"
                                validateStatus={(this.state.paymentTerm === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.paymentTerm === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Kỳ hạn thanh toán" onChange={this.updateSelectValue('paymentTerm')}>
                                    {
                                        this.props.lstPaymentTermData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.MSKYHANTT} value={item.MSKYHANTT}>{item.LOAI_TT}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="* Loại trái phiếu"
                                validateStatus={(this.state.typeBond.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.typeBond.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Loại trái phiếu" onChange={this.updateSelectValue('typeBond')}>
                                    {
                                        this.props.lstBondTypeData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.MSLTP} value={item.MSLTP}>{item.TENLOAI_TP}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Ngày tính lãi/năm"
                                validateStatus={(this.state.dayInterestYear === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.dayInterestYear === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Ngày tính lãi trong năm" onChange={this.updateSelectValue('dayInterestYear')}>
                                    {
                                        this.props.lstDayInterestYearData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.MSNTLTN} value={item.MSNTLTN}>{item.SONGAYTINHLAI}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Lãi suất hợp đồng"
                                validateStatus={(this.state.currentInterest === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.currentInterest === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="currentInterest" type="number" placeholder="Lãi suất theo hợp đồng" value={this.state.currentInterest} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="Mã viết tắt"
                            >
                                <Input name="sortName" placeholder="Mã viết tắt" value={this.state.sortName} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="Thông tin trái phiếu"
                            >
                                <Input name="infoBond" placeholder="Thông tin trái phiếu" value={this.state.infoBond} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Mệnh giá"
                                validateStatus={(this.state.price === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.price === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="price" type="number" placeholder="Mệnh giá trái phiếu" value={this.state.price} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                        </Form>
                    </Col>
                    
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item
                                label="* Ngày phát hành"
                            >
                                <DatePicker name="dateRelease" value={this.state.dateRelease} format={dateFormat} onChange={this.updateInputDate('dateRelease')} />
                            </Form.Item>
                            <Form.Item
                                label="* Ngày đáo hạn"
                            >
                                <DatePicker name="dateExpire" value={this.state.dateExpire} format={dateFormat} onChange={this.updateInputDate('dateExpire')} />
                            </Form.Item>
                            <Form.Item
                                label="* Ngày KT phát hành"
                            >
                                <DatePicker name="dateBreak" value={this.state.dateBreak} format={dateFormat} onChange={this.updateInputDate('dateBreak')} />
                            </Form.Item>
                            <Form.Item
                                label="S.Lượng P.Hành tối đa"
                            >
                                <Input name="maxRelease" type="number" placeholder="Số lượng phát hành tối đa" value={this.state.maxRelease} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Số lượng đã phát hành">
                                <Input name="released" type="number" placeholder="Số lượng trái phiếu đã phát hành" value={this.state.released} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Số lượng lưu hành"
                                validateStatus={(this.state.totalOfCirculate === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.totalOfCirculate === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="totalOfCirculate" type="number" placeholder="Số lượng trái phiếu lưu hành" value={this.state.totalOfCirculate} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="Số lượng thu hồi"
                            >
                                <Input name="totalRecall" type="number" placeholder="Số lượng trái phiếu thu hồi" value={this.state.totalRecall} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="* Hạn mức huy động"
                                validateStatus={(this.state.totalLevelMobilize === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.totalLevelMobilize === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="totalLevelMobilize" type="number" placeholder="Tổng hạn mức huy động" value={this.state.totalLevelMobilize} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="* Hạn mức cho"
                                validateStatus={(this.state.levelLoan === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.levelLoan === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="levelLoan" type="number" placeholder="Số lượng trái phiếu phát hành tối đa" value={this.state.levelLoan} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Kỳ hạn"
                            >
                                <Input name="periodRemain" type="number" placeholder="Kỳ hạn" value={this.state.periodRemain} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="* Trạng thái niêm yết" hasFeedback validateStatus={this.state.statusListed === 1 ? "success" : "warning"}>
                                <Select
                                    defaultValue="1"
                                    placeholder="Chọn trạng thái niêm yết"
                                    onChange={event => this.updateSelectValue('statusListed')}
                                >
                                    <Option value="1">Có</Option>
                                    <Option value="0">Không</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Tài sản đảm bảo">
                                <Input name="ensureAsset" placeholder="Tài sản đảm bảo" value={this.state.ensureAsset} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="* Số lượng lưu ký"
                                validateStatus={(this.state.totalDepository === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.totalDepository === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="totalDepository" placeholder="Số lượng lưu ký" type="number" value={this.state.totalDepository} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default ModalAssetBond;