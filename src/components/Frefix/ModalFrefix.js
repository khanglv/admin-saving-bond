import React, {Component} from 'react';
import {creatItemFrefix} from '../../api/api';
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

class ModalFrefix extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeFrefix: '',
            noteFrefix: ''
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

    onHandleOk = ()=>{
        try{
            let dataTmp = {
                "KYTU_PREFIX": this.state.codeFrefix,
                "GHICHU": this.state.noteFrefix
            }
            creatItemFrefix(dataTmp).then(()=>{
                this.setState({codeFrefix: '', noteFrefix: ''});
                this.props.reloadData();
                openNotificationWithIcon('success', 'Thao tác thành công ^^!');
            }).catch(()=>{
                openNotificationWithIcon('error', 'Thao tác thất bại :( ');
            });
        }catch(err){
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
                title="Frefix"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="*Ký tự">
                        <Input name="codeFrefix" placeholder="Ký tự frefix" value={this.state.codeFrefix} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input name="noteFrefix" placeholder="Ghi chú" value={this.state.noteFrefix} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalFrefix;