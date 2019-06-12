import React, {Component} from 'react';
import {creatItemFeeTrade} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    notification,
    DatePicker
} from 'antd';

import moment from 'moment';
const dateFormat = 'DD/MM/YYYY';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class ModalFeeTrade extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            nameFeeTrade: '',
            ratio: '',
            dateOfApplication: moment(new Date(), dateFormat),
            note: ''
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
        this.setState({dateOfApplication: value});
    }

    onHandleOk = async()=>{
        try {
            let dataTmp = {
                "TENPHI": this.state.nameFeeTrade,
                "TYLETINH": this.state.ratio,
                "NGAYAPDUNG": this.state.dateOfApplication,
                "GHICHU": this.state.note
            }
            const res = await creatItemFeeTrade(dataTmp);
            if (res.error) {
                openNotificationWithIcon('error', 'Thao tác thất bại :( ');
            } else {
                this.setState({
                    nameFeeTrade: '',
                    ratio: '',
                    dateOfApplication: moment(new Date(), dateFormat),
                    note: ''
                });
                await this.props.reloadData();
                await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
            }
        } catch (err) {
            openNotificationWithIcon('error', 'Thao tác thất bại :( ');
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
                title="Phí giao dịch"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="* Tên phí">
                        <Input name="nameFeeTrade" placeholder="Tên phí giao dịch" value={this.state.nameFeeTrade} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* Tỉ lệ tính">
                        <Input name="ratio" placeholder="Tỉ lệ tính" value={this.state.ratio} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* Ngày áp dụng">
                        <DatePicker name="dateOfApplication" placeholder="Chọn ngày" value={this.state.dateOfApplication} format={dateFormat} onChange={this.updateInputDate}/>
                    </Form.Item>
                    <Form.Item label="* Ghi chú">
                        <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalFeeTrade;