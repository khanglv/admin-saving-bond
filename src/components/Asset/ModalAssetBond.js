import React, {Component} from 'react';
import {createItemBondsAsset} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    notification,
    DatePicker,
    Select,
    Row,
    Col,
    Checkbox
} from 'antd';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class ModalAssetBond extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            isTypePrefix: true,
            codeBond: '',
            codeInvestorType: '',
            nameOfInvestor: '',
            papers: '',
            dateRange: moment(new Date(), dateFormat),
            issuedBy: '',
            numberSecurities: '',
            codeOfPresenter: '',
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

    updateInputDate = (value)=>{
        this.setState({dateRange: value});
    }

    updateSelectValue = (event)=>{
        this.setState({codeInvestorType: event});
    }

    updateSelectcodeOfPresenter = (event)=>{
        this.setState({codeOfPresenter: event});
    }
    
    onHandleOk = async()=>{
        try{
            if(!this.state.codeInvestor || !this.state.codeInvestorType || !this.state.nameOfInvestor || !this.state.papers || !this.state.numberSecurities || !this.state.codeOfPresenter){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSNDT": this.state.codeInvestor,
                    "MS_LOAINDT": this.state.codeInvestorType,
                    "TENNDT": this.state.nameOfInvestor,
                    "CMND_GPKD": this.state.papers,
                    "NGAYCAP": this.state.dateRange,
                    "NOICAP": this.state.issuedBy,
                    "SO_TKCK": this.state.numberSecurities,
                    "MS_NGUOIGIOITHIEU": this.state.codeOfPresenter
                }
                const res = await createItemBondsAsset(dataTmp);
                if(res.error){
                    openNotificationWithIcon('error', 'Thao tác thất bại :( ' + res.error);
                }else{
                    await this.props.reloadData();
                    this.setState({
                        codeInvestor: '',
                        codeInvestorType: '',
                        nameOfInvestor: '',
                        papers: '',
                        dateRange: moment(new Date(), dateFormat),
                        issuedBy: '',
                        numberSecurities: '',
                        isShowNotice: false
                    });
                    await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
                }
            }
        }catch(err){
            openNotificationWithIcon('error', 'Thao tác thất bại :( ' );
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
                                label="* Mã số trái phiếu"
                                // validateStatus={(this.state.codeInvestor.length === 0 && this.state.isShowNotice) ? "error" : null}
                                // help={(this.state.codeInvestor.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Típ đầu ngữ mã số trái phiếu" onChange={event => this.updateSelectValue(event)}>
                                    {
                                        this.props.lstPrefixData.map((item) => {
                                            return (
                                                <Option key={item.PREFIX_ID} value={item.PREFIX_ID}>{item.KYTU_PREFIX}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Prefix"
                                validateStatus="warning"
                            >
                                <Input name="codeInvestor" disabled={this.state.isTypePrefix} placeholder="Mã Prefix nhập khi muốn tạo mới" value={this.state.codeInvestor} onChange={event => this.updateInputValue(event)} />
                                <Checkbox onChange={this.onChangeCheckbox}>Tạo mới prefix</Checkbox>
                            </Form.Item>
                            <Form.Item
                                label="* Số Hợp đồng"
                                // validateStatus={(this.state.codeInvestorType.length === 0 && this.state.isShowNotice) ? "error" : null}
                                // help={(this.state.codeInvestorType.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Số hợp đồng" onChange={event => this.updateSelectValue(event)}>
                                    {
                                        this.props.lstContractVCSCData.map((item) => {
                                            return (
                                                <Option key={item.SOHD} value={item.SOHD}>{item.SOHD}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Doanh Nghiệp"
                                // validateStatus={(this.state.nameOfInvestor.length === 0 && this.state.isShowNotice) ? "error" : null}
                                // help={(this.state.nameOfInvestor.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Số hợp đồng" onChange={event => this.updateSelectValue(event)}>
                                    {
                                        this.props.lstCompanyData.map((item) => {
                                            return (
                                                <Option key={item.MSDN} value={item.MSDN}>{item.TEN_DN}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Tài sản đảm bảo"
                            >
                                <Select showSearch placeholder="Tài sản đảm bảo" onChange={event => this.updateSelectValue(event)}>
                                    {
                                        this.props.lstEnsureAssetData.map((item) => {
                                            return (
                                                <Option key={item.MSTSDB} value={item.MSTSDB}>{item.TENTAISANDAMBAO}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Kì hạn thanh toán"
                                // validateStatus={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "error" : null}
                                // help={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Kỳ hạn thanh toán" onChange={event => this.updateSelectValue(event)}>
                                    {
                                        this.props.lstPaymentTermData.map((item) => {
                                            return (
                                                <Option key={item.MSKYHANTT} value={item.MSKYHANTT}>{item.LOAI_TT}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="* Loại trái phiếu">
                                <Select showSearch placeholder="Loại trái phiếu" onChange={event => this.updateSelectcodeOfPresenter(event)}>
                                    {
                                        this.props.lstBondTypeData.map((item) => {
                                            return (
                                                <Option key={item.MSLTP} value={item.MSLTP}>{item.TENLOAI_TP}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Ngày tính lãi/năm"
                                // validateStatus={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "error" : null}
                                // help={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Ngày tính lãi trong năm" onChange={event => this.updateSelectcodeOfPresenter(event)}>
                                    {
                                        this.props.lstDayInterestYearData.map((item) => {
                                            return (
                                                <Option key={item.MSNTLTN} value={item.MSNTLTN}>{item.SONGAYTINHLAI}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Lãi suất hợp đồng"
                                validateStatus={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="numberSecurities" placeholder="Lãi suất theo hợp đồng" value={this.state.numberSecurities} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="Mã viết tắt"
                                validateStatus={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="numberSecurities" placeholder="Mã viết tắt" value={this.state.numberSecurities} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="Thông tin trái phiếu"
                            >
                                <Input name="numberSecurities" placeholder="Thông tin trái phiếu" value={this.state.numberSecurities} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Mệnh giá"
                                validateStatus={(this.state.codeInvestorType.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.codeInvestorType.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="numberSecurities" type="number" placeholder="Mệnh giá trái phiếu" value={this.state.numberSecurities} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                        </Form>
                    </Col>
                    
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item
                                label="* S.Lượng P.Hành tối đa"
                                validateStatus={(this.state.nameOfInvestor.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.nameOfInvestor.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="nameOfInvestor" placeholder="Số lượng phát hành tối đa" value={this.state.nameOfInvestor} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="* Số lượng phát hành tối đa"
                                validateStatus={(this.state.papers.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.papers.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="papers" placeholder="Số lượng trái phiếu phát hành tối đa" value={this.state.papers} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Số lượng đã phát hành">
                                <Input name="issuedBy" placeholder="Số lượng trái phiếu đã phát hành" value={this.state.issuedBy} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Số lượng lưu hành"
                                validateStatus={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="numberSecurities" type="number" placeholder="Số lượng trái phiếu lưu hành" value={this.state.numberSecurities} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Số lượng thu hồi"
                                validateStatus={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="numberSecurities" type="number" placeholder="Số lượng trái phiếu thu hồi" value={this.state.numberSecurities} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Ngày phát hành"
                            >
                                <DatePicker name="dateRange" value={this.state.dateRange} format={dateFormat} onChange={this.updateInputDate} />
                            </Form.Item>
                            <Form.Item
                                label="* Ngày đáo hạn"
                            >
                                <DatePicker name="dateRange" value={this.state.dateRange} format={dateFormat} onChange={this.updateInputDate} />
                            </Form.Item>
                            <Form.Item
                                label="* Ngày KT phát hành"
                            >
                                <DatePicker name="dateRange" value={this.state.dateRange} format={dateFormat} onChange={this.updateInputDate} />
                            </Form.Item>
                            <Form.Item label="* Hạn mức huy động"
                                validateStatus={(this.state.papers.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.papers.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="papers" placeholder="Tổng hạn mức huy động" value={this.state.papers} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Hạn mức cho"
                                validateStatus={(this.state.papers.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.papers.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="papers" placeholder="Số lượng trái phiếu phát hành tối đa" value={this.state.papers} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Hạn mức còn lại"
                                validateStatus={(this.state.papers.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.papers.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="papers" placeholder="Số lượng trái phiếu phát hành tối đa" value={this.state.papers} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="* Trạng thái niêm yết" hasFeedback validateStatus={this.state.status === 1 ? "success" : "warning"}>
                                <Select
                                    defaultValue="1"
                                    placeholder="Chọn trạng thái niêm yết"
                                    onChange={event => this.updateSelectValue(event)}
                                    >
                                    <Option value="1">Active</Option>
                                    <Option value="0">Disable</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Tài sản đảm bảo"
                                validateStatus={(this.state.papers.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.papers.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="papers" placeholder="Tài sản đảm bảo" value={this.state.papers} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Số lượng lưu ký"
                                validateStatus={(this.state.papers.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.papers.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="papers" placeholder="Số lượng lưu ký" value={this.state.papers} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default ModalAssetBond;