import React, {Component} from 'react';
import {createItemFrefix} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
} from 'antd';
import * as common from '../Common/Common';

class ModalFrefix extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeFrefix: '',
            noteFrefix: '',
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
        try{
            if(this.state.codeFrefix.length === 0){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "KYTU_PREFIX": this.state.codeFrefix,
                    "GHICHU": this.state.noteFrefix
                }
                const res = await createItemFrefix(dataTmp);
                if (res.error) {
                    common.notify('error', 'Thao tác thất bại :( ' + res.error);
                } else {
                    await this.props.reloadData();
                    this.setState({codeFrefix: '', noteFrefix: '', isShowNotice: false});
                    await common.notify('success', 'Thao tác thành công ^^!');
                }
            }
        }catch(err){
            common.notify('error', 'Thao tác thất bại :( ' + err);
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
                    <Form.Item label="* Ký tự" 
                        validateStatus = {(this.state.codeFrefix.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeFrefix.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
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