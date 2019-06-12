import React, {Component} from 'react';
import {creatItemBankInterest} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    notification
} from 'antd';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class ModalBankInterest extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            nameBank: '',
            interest: ''
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

    onHandleOk = async()=>{
        try {
            let dataTmp = {
                "TEN_NH": this.state.nameBank,
                "LAISUAT_HH": this.state.interest
            }
            const res = await creatItemBankInterest(dataTmp);
            if (res.error) {
                openNotificationWithIcon('error', 'Thao tác thất bại :( ');
            } else {
                this.setState({
                    nameBank: '',
                    interest: ''
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
                title="Lãi suất ngân hàng"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="* Tên ngân hàng">
                        <Input name="nameBank" placeholder="Tên ngân hàng" value={this.state.nameBank} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* Lãi suất (%)">
                        <Input name="interest" placeholder="Lãi suất" value={this.state.interest} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalBankInterest;