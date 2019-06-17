import React, {Component} from 'react';
import {createItemInvestor} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    notification,
    DatePicker,
    Select
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

class ModalInvestor extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeInvestor: '',
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
    }

    handleCurrencyChange = currency => {
        this.setState({ currency });
    };

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
                const res = await createItemInvestor(dataTmp);
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
                title="Nhà đầu tư"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* Mã số nhà đầu tư"
                        validateStatus = {(this.state.codeInvestor.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeInvestor.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="codeInvestor" placeholder="Mã số nhà đầu tư" value={this.state.codeInvestor} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Loại nhà đầu tư"
                        validateStatus = {(this.state.codeInvestorType.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeInvestorType.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Select showSearch placeholder="chọn Loại nhà đầu tư" onChange={event => this.updateSelectValue(event)}>
                            {
                                this.props.investorTypeData.map((item)=>{
                                    return(
                                        <Option key={item.MSLOAINDT} value={item.MSLOAINDT}>{item.TENLOAI_NDT}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="* Tên nhà đầu tư"
                        validateStatus = {(this.state.nameOfInvestor.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameOfInvestor.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameOfInvestor" placeholder="Địa chỉ" value={this.state.nameOfInvestor} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* CMND, G.P K.Doanh"
                        validateStatus = {(this.state.papers.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.papers.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="papers" placeholder="CMND, Giấy phép kinh doanh" value={this.state.papers} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Ngày cấp"
                    >
                        <DatePicker name="dateRange" value={this.state.dateRange} format={dateFormat} onChange={this.updateInputDate}/>
                    </Form.Item>
                    <Form.Item label="Nơi cấp">
                        <Input name="issuedBy" placeholder="Nơi cấp" value={this.state.issuedBy} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Số Tk chứng khoán"
                        validateStatus = {(this.state.numberSecurities.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.numberSecurities.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="numberSecurities" placeholder="Số tài khoản chứng khoán" value={this.state.numberSecurities} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* MS người giới thiệu">
                        <Select showSearch placeholder="Mã số người giới thiệu" onChange={event => this.updateSelectcodeOfPresenter(event)}>
                            {
                                this.props.investorTypeData.map((item)=>{
                                    return(
                                        <Option key={item.MSLOAINDT} value={item.MSLOAINDT}>{item.MSLOAINDT}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalInvestor;