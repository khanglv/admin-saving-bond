import React, {Component} from 'react';
import {createItemInvestorType} from '../../api/api';
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

class ModalInvestorType extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeInvestorType: '',
            nameInvestorType: '',
            note: '',
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
            if(!this.state.codeInvestorType|| !this.state.nameInvestorType){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSLOAINDT": this.state.codeInvestorType,
                    "TENLOAI_NDT": this.state.nameInvestorType,
                    "GHICHU": this.state.note,
                    "TRANGTHAI": this.state.status
                }
                const res = await createItemInvestorType(dataTmp);
                if (res.error) {
                    openNotificationWithIcon('error', 'Thao tác thất bại :( ');
                } else {
                    await this.props.reloadData();
                    this.setState({
                        codeInvestorType: '',
                        nameInvestorType: '',
                        note: '',
                        status: 1,
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
                title="Loại nhà đầu tư"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* MS loại nhà đầu tư"
                        validateStatus = {(this.state.codeInvestorType.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeInvestorType.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="codeInvestorType" placeholder="Mã số loại nhà đầu tư" value={this.state.codeInvestorType} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Tên loại nhà đầu tư"
                        validateStatus = {(this.state.nameInvestorType.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameInvestorType.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameInvestorType" placeholder="Tên loại nhà đầu tư" value={this.state.nameInvestorType} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="Ghi chú"
                    >
                        <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* Trạng thái" hasFeedback validateStatus={this.state.status === 1 ? "success" : "warning"}>
                        <Select
                            defaultValue="1"
                            placeholder="Chọn trạng thái"
                            onChange={event => this.updateSelectValue(event)}
                            >
                            <Option value="1">Hoạt động</Option>
                            <Option value="0">Ngừng hoạt động</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalInvestorType;