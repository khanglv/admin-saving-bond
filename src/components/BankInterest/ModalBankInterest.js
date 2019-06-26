import React, {Component} from 'react';
import {createItemBankInterest} from '../../api/api';
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
            nameBank: '',
            codeBank: '',
            interest: '',
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

    onHandleOk = async()=>{
        try {
            if(!this.state.nameBank|| !this.state.interest || !this.state.codeBank){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "TEN_NH": this.state.nameBank,
                    "MA_NH": this.state.codeBank,
                    "LAISUAT_HH": this.state.interest
                }
                const res = await createItemBankInterest(dataTmp);
                if (res.error) {
                    openNotificationWithIcon('error', 'Thao tác thất bại :( ');
                } else {
                    await this.props.reloadData();
                    this.setState({
                        nameBank: '',
                        codeBank: '',
                        interest: '',
                        isShowNotice: false
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
                title="Lãi suất ngân hàng"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* Tên ngân hàng"
                        validateStatus = {(this.state.nameBank.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameBank.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameBank" placeholder="Tên ngân hàng" value={this.state.nameBank} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Mã số ngân hàng"
                        validateStatus = {(this.state.codeBank.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeBank.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="codeBank" placeholder="Mã số ngân hàng" value={this.state.codeBank} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Lãi suất (%)"
                        validateStatus = {(this.state.interest.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.interest.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="interest" placeholder="Lãi suất" value={this.state.interest} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalBankInterest;