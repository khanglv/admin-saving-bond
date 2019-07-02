import React, {Component} from 'react';
import {createItemCommandType} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    notification,
    Select
} from 'antd';

const { Option } = Select;

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class ModalCommandType extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeCommand: '',
            nameCommand: '',
            status: 1,
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

    updateSelectValue = (event)=>{
        this.setState({status: event});
    }

    onHandleOk = async()=>{
        try {
            if(!this.state.codeCommand|| !this.state.nameCommand){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSLENH": this.state.codeCommand,
                    "TENLENH": this.state.nameCommand,
                    "TRANGTHAI": this.state.status
                }
                const res = await createItemCommandType(dataTmp);
                if (res.error) {
                    openNotificationWithIcon('error', 'Thao tác thất bại :( ' + res.error);
                } else {
                    await this.props.reloadData();
                    this.setState({
                        codeCommand: '',
                        nameCommand: '',
                        status: 1,
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
                title="Loại lệnh"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* Mã số lệnh"
                        validateStatus = {(this.state.codeCommand.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeCommand.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="codeCommand" type="number" placeholder="Mã số lệnh" value={this.state.codeCommand} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Tên lệnh"
                        validateStatus = {(this.state.nameCommand.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameCommand.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameCommand" placeholder="Tên lệnh" value={this.state.nameCommand} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* Trạng thái" hasFeedback validateStatus={this.state.status === 1 ? "success" : "warning"}>
                        <Select
                            defaultValue={1}
                            placeholder="Chọn trạng thái"
                            onChange={event => this.updateSelectValue(event)}
                            >
                            <Option value={1}>Hoạt động</Option>
                            <Option value={0}>Ngừng hoạt động</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalCommandType;