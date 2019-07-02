import React, {Component} from 'react';
import {createItemBondType} from '../../api/api';
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

class ModalBondType extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeBondType: '',
            nameBondType: '',
            note: '',
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
            if(!this.state.codeBondType|| !this.state.nameBondType){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSLTP": this.state.codeBondType,
                    "TENLOAI_TP": this.state.nameBondType,
                    "GHICHU": this.state.note
                }
                const res = await createItemBondType(dataTmp);
                if (res.error) {
                    openNotificationWithIcon('error', 'Thao tác thất bại ');
                } else {
                    await this.props.reloadData();
                    this.setState({
                        codeBondType: '',
                        nameBondType: '',
                        note: '',
                        isShowNotice: false
                    });
                    await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
                }
            }
        } catch (err) {
            openNotificationWithIcon('error', 'Thao tác thất bại :( ' + err);
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
                title="Loại trái phiếu"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* MS loại trái phiếu"
                        validateStatus = {(this.state.codeBondType.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeBondType.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="codeBondType" placeholder="Mã số loại trái phiếu" value={this.state.codeBondType} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Tên loại trái phiếu"
                        validateStatus = {(this.state.nameBondType.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameBondType.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameBondType" placeholder="Tên loại trái phiếu" value={this.state.nameBondType} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalBondType;