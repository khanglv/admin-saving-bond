import React, {Component} from 'react';
import {createItemPaymentTerm} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    notification,
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
            codeExpiredPayment: '',
            typePayment: '',
            note: '',
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

    onHandleOk = async()=>{
        try {
            if(!this.state.codeExpiredPayment|| !this.state.typePayment){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSKYHANTT": this.state.codeExpiredPayment,
                    "LOAI_TT": this.state.typePayment,
                    "GHICHU": this.state.note
                }
                const res = await createItemPaymentTerm(dataTmp);
                if (res.error) {
                    openNotificationWithIcon('error', 'Thao tác thất bại :( ');
                } else {
                    await this.props.reloadData();
                    this.setState({
                        codeExpiredPayment: '',
                        typePayment: '',
                        note: ''
                    });
                    await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
                }
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
                title="Kỳ hạn thanh toán"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* MS K.Hạn T.Toán"
                        validateStatus = {(this.state.codeExpiredPayment.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeExpiredPayment.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="codeExpiredPayment" placeholder="Mã số kỳ hạn thanh toán" value={this.state.codeExpiredPayment} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Loại thanh toán (tháng)"
                        validateStatus = {(this.state.typePayment.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.typePayment.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="typePayment" type="number" placeholder="Loại thanh toán" value={this.state.typePayment} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalBankInterest;