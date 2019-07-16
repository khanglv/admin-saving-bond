import React, {Component} from 'react';
import {createItemBondsAsset} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Row,
    Col, 
    Tag
} from 'antd';
import * as common from '../Common/Common';
import * as formula from '../Common/Formula';
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
            codeBond: '',
            contractVCSC: '',
            company: '',
            paymentTerm: null,
            typeBond: '',
            dayInterestYear: null,
            buyInterest: null,
            interestRateSale: null,
            sortName: '',
            infoBond: '',
            price: null,
            maxRelease: null,
            released: null,
            totalOfCirculate: null,
            totalRecall: 0,
            dateRelease: moment(new Date(), dateFormat),
            dateExpire: moment(new Date(new Date(newDate).setFullYear(newDate.getFullYear()+1)), dateFormat),
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
            if(!this.state.codeBond || !this.state.contractVCSC || !this.state.company || !this.state.paymentTerm || !this.state.typeBond || !this.state.interestRateSale
                || !this.state.dayInterestYear || !this.state.buyInterest || !this.state.price || !this.state.released || !this.state.totalLevelMobilize || !this.state.levelLoan){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSTP": this.state.codeBond,
                    "SO_HD": this.state.contractVCSC,
                    "MS_DN": this.state.company,
                    "MS_KYHANTT": this.state.paymentTerm,
                    "MS_LTP": this.state.typeBond,
                    "MS_NTLTN": this.state.dayInterestYear,
                    "LAISUAT_MUA": this.state.buyInterest,
                    "MS_LSB": this.state.interestRateSale,
                    "MAVIETTAT": this.state.sortName,
                    "TT_TRAIPHIEU": this.state.infoBond,
                    "MENHGIA": this.state.price,
                    "SL_PHTD": this.state.maxRelease,
                    "SL_DPH": this.state.released,
                    "SL_LH": this.state.released - this.state.totalRecall,
                    "SL_TH": this.state.totalRecall,
                    "NGAYPH": this.state.dateRelease,
                    "NGAYDH": this.state.dateExpire,
                    "NGAY_KTPH": this.state.dateBreak,
                    "TONGHANMUC_HUYDONG": this.state.totalLevelMobilize,
                    "HANMUC_CHO": this.state.levelLoan,
                    "KYHAN": formula.diffYear(this.state.dateRelease, this.state.dateExpire),
                    "TT_NIEMYET": this.state.statusListed,
                    "TS_DAMBAO": this.state.ensureAsset,
                    "SL_LUUKY": this.state.totalDepository,
                }
                const res = await createItemBondsAsset(dataTmp);
                if(res.error){
                    common.notify('error', 'Thao tác thất bại :( ' + res.error);
                }else{
                    await this.props.reloadData();
                    this.setState({
                        codeBond: '',
                        buyInterest: null,
                        sortName: '',
                        infoBond: '',
                        price: null,
                        maxRelease: null,
                        released: null,
                        totalRecall: 0,
                        dateRelease: moment(new Date(), dateFormat),
                        dateExpire: moment(new Date(new Date(newDate).setFullYear(newDate.getFullYear()+1)), dateFormat),
                        dateBreak: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+12)), dateFormat),
                        totalLevelMobilize: null,
                        levelLoan: null,
                        statusListed: 1,
                        ensureAsset: '',
                        totalDepository: null,
                        isShowNotice: false
                    });
                    await common.notify('success', 'Thao tác thành công ^^!');
                }
            }
        }catch(err){
            common.notify('error', 'Thao tác thất bại :( ' + err );
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
                            <Form.Item
                                label="* Mã trái phiếu"
                                validateStatus={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="codeBond" placeholder="Nhập mã trái phiếu" value={this.state.codeBond} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Số Hợp đồng"
                                validateStatus={(this.state.contractVCSC.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.contractVCSC.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Số hợp đồng" onChange={this.updateSelectValue('contractVCSC')}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
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
                                <Select showSearch placeholder="Doanh nghiệp" onChange={this.updateSelectValue('company')}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
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
                                label="* Kì hạn tính lãi"
                                validateStatus={(this.state.paymentTerm === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.paymentTerm === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Kỳ hạn tính lãi" onChange={this.updateSelectValue('paymentTerm')}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        this.props.lstPaymentTermData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.MSKYHANTT} value={item.MSKYHANTT}>{`${item.LOAI_TT}`}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="* Loại trái phiếu"
                                validateStatus={(this.state.typeBond.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.typeBond.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Loại trái phiếu" onChange={this.updateSelectValue('typeBond')}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
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
                                <Select showSearch placeholder="Ngày tính lãi trong năm" onChange={this.updateSelectValue('dayInterestYear')}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        this.props.lstDayInterestYearData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.MSNTLTN} value={item.MSNTLTN}>{`${item.SONGAYTINHLAI}`}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Lãi suất mua (%)"
                                validateStatus={(this.state.buyInterest === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.buyInterest === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="buyInterest" type="number" placeholder="Lãi suất mua theo hợp đồng" value={this.state.buyInterest} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Lãi suất bán (%)"
                                validateStatus={(this.state.interestRateSale === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.interestRateSale === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="lãi suất bán" onChange={this.updateSelectValue('interestRateSale')}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        this.props.lstInterestRateSaleData.filter(item => item.FLAG === 1).map((item) => {
                                            return (
                                                <Option key={item.MSLS} value={item.MSLS}>{`${item.LS_TOIDA}`}</Option>
                                            )
                                        })
                                    }
                                </Select>
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
                            <Form.Item label="* Trạng thái niêm yết" hasFeedback validateStatus={this.state.statusListed === 1 ? "success" : "warning"}>
                                <Select
                                    defaultValue={0}
                                    placeholder="Chọn trạng thái niêm yết"
                                    onChange={this.updateSelectValue('statusListed')}
                                >
                                    <Option value={1}>Có</Option>
                                    <Option value={0}>Không</Option>
                                </Select>
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
                            <Form.Item label="Kỳ hạn"
                            >
                                <Tag color="green" style={{fontSize: 15}}>{formula.diffYear(this.state.dateRelease, this.state.dateExpire)}</Tag>năm
                            </Form.Item>
                            <Form.Item
                                label="S.Lượng P.Hành tối đa"
                            >
                                <Input name="maxRelease" type="number" placeholder="Số lượng phát hành tối đa" value={this.state.maxRelease} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="* Số lượng đã phát hành"
                                validateStatus={(this.state.released === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.released === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="released" type="number" placeholder="Số lượng trái phiếu đã phát hành" value={this.state.released} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Số lượng lưu hành">
                                <Tag color="green" style={{fontSize: 15}}>{this.state.released - this.state.totalRecall}</Tag>
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
                            <Form.Item label="* Hạn mức chờ"
                                validateStatus={(this.state.levelLoan === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.levelLoan === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="levelLoan" type="number" placeholder="Nhập hạn mức chờ" value={this.state.levelLoan} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Tài sản đảm bảo">
                                <Input name="ensureAsset" placeholder="Tài sản đảm bảo" value={this.state.ensureAsset} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Số lượng lưu ký">
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