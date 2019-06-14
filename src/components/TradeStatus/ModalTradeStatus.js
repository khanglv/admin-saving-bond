import React, {Component} from 'react';
import {createItemTradeStatus} from '../../api/api';
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

class ModalTradeStatus extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            nameTradeStatus: '',
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
            if(!this.state.nameTradeStatus){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSTRANGTHAI": this.state.codeTradeStatus,
                    "TENTRANGTHAI": this.state.nameTradeStatus,
                    "GHICHU": this.state.note
                }
                const res = await createItemTradeStatus(dataTmp);
                if (res.error) {
                    openNotificationWithIcon('error', 'Thao tác thất bại :( ');
                } else {
                    await this.props.reloadData();
                    this.setState({
                        codeTradeStatus: '',
                        nameTradeStatus: '',
                        note: '',
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
                title="Trạng thái giao dịch"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* Tên trạng thái"
                        validateStatus = {(this.state.nameTradeStatus.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameTradeStatus.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameTradeStatus" placeholder="Tên trạng thái giao dịch" value={this.state.nameTradeStatus} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalTradeStatus;