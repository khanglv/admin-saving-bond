import React, {Component} from 'react';
import {creatItemCompany} from '../../api/api';
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

class ModalCompany extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            numberOfCompany: '',
            nameCompany: '',
            address: '',
            phoneNumber: '',
            email: '',
            dateRange: moment(new Date(), dateFormat),
            surrogate: '',
            status: 1
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
        this.setState({status: event});
    }

    onHandleOk = async()=>{
        try{
            let dataTmp = {
                "MSDN": this.state.numberOfCompany,
                "TEN_DN": this.state.nameCompany,
                "DIACHI": this.state.address,
                "DIENTHOAI": this.state.phoneNumber,
                "EMAIL": this.state.email,
                "NGAYCAP_GP": this.state.dateRange,
                "NGUOI_DDPL": this.state.surrogate,
                "TRANGTHAI": this.state.status
            }
            const res = await creatItemCompany(dataTmp);
            if(res.error){
                openNotificationWithIcon('error', 'Thao tác thất bại :( ');
            }else{
                this.setState({
                    numberOfCompany: '',
                    nameCompany: '',
                    address: '',
                    phoneNumber: '',
                    email: '',
                    dateRange: moment(new Date(), dateFormat),
                    surrogate: '',
                    status: 1
                });
                await this.props.reloadData();
                await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
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
                title="Công ty"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="*Mã số Doanh Nghiệp">
                        <Input type="number" name="numberOfCompany" placeholder="Mã số doanh nghiệp" value={this.state.numberOfCompany} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="*Tên Doanh Nghiệp">
                        <Input name="nameCompany" placeholder="Tên doanh nghiệp" value={this.state.nameCompany} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="*Địa chỉ">
                        <Input name="address" placeholder="Địa chỉ" value={this.state.address} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="*Điện thoại">
                        <Input name="phoneNumber" placeholder="Số điện thoại" value={this.state.phoneNumber} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input type="email" name="email" placeholder="Email" value={this.state.email} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="*Ngày cấp giấy phép">
                        <DatePicker name="dateRange" value={this.state.dateRange} format={dateFormat} onChange={this.updateInputDate}/>
                    </Form.Item>
                    <Form.Item label="*Người đ.diện pháp lý">
                        <Input name="surrogate" placeholder="Người đại diện pháp lý" value={this.state.surrogate} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="*Trạng thái" hasFeedback validateStatus={this.state.status === 1 ? "success" : "warning"}>
                        <Select
                            defaultValue="1"
                            placeholder="Chọn trạng thái"
                            onChange={event => this.updateSelectValue(event)}
                            >
                            <Option value="1">Hoạt động</Option>
                            <Option value="0">Ngừng hoạt động</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalCompany;