import React, {Component} from 'react';
import {createItemEnsureAsset} from '../../api/api';
import {notify} from '../Common/Common';
import { 
    Modal,
    Form,
    Input,
} from 'antd';

class ModalEnsureAsset extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            nameEnsureAsset: '',
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
            if(!this.state.nameEnsureAsset){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "TENTAISANDAMBAO": this.state.nameEnsureAsset,
                    "GHICHU": this.state.note
                }
                const res = await createItemEnsureAsset(dataTmp);
                if (res.error) {
                    notify('error', 'Thao tác thất bại - ' + res.error);
                } else {
                    await this.props.reloadData();
                    this.setState({
                        nameEnsureAsset: '',
                        note: '',
                        isShowNotice: false
                    });
                    await notify('success', 'Thao tác thành công ^^!');
                }
            }
        } catch (err) {
            notify('error', 'Thao tác thất bại :( ');
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
                        label="* Tên tài sản đảm bảo"
                        validateStatus = {(this.state.nameEnsureAsset.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameEnsureAsset.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameEnsureAsset" placeholder="Tên tài sản đảm bảo" value={this.state.nameEnsureAsset} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalEnsureAsset;