import React, {Component} from 'react';
import {createItemBranchVCSC} from '../../api/api';
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

class ModalBranchVCSC extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeBranchVCSC: '',
            nameBranchVCSC: '',
            surrogate: '',
            phoneOfSurrogate: '',
            email: '',
            numberGPTL: '',
            accountBank: '',
            nameBank: '' 
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

    updateSelectValue = (event)=>{
        this.setState({status: event});
    }

    onHandleOk = async()=>{
        try {
            if(!this.state.codeBranchVCSC || !this.state.nameBranchVCSC || !this.state.surrogate || !this.state.phoneOfSurrogate || !this.state.numberGPTL || !this.state.accountBank || !this.state.nameBank){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSCNVCSC": this.state.codeBranchVCSC,
                    "TENCHINHANH": this.state.nameBranchVCSC,
                    "NGUOIDAIDIEN": this.state.surrogate,
                    "DTNGUOIDAIDIEN": this.state.phoneOfSurrogate,
                    "EMAIL": this.state.email,
                    "SOGPTL": this.state.numberGPTL,
                    "TKNH": this.state.accountBank,
                    "TENNH": this.state.nameBank
                }
                const res = await createItemBranchVCSC(dataTmp);
                if (res.error) {
                    openNotificationWithIcon('error', 'Thao tác thất bại :( ');
                } else {
                    await this.props.reloadData();
                    this.setState({
                        codeBranchVCSC: '',
                        nameBranchVCSC: '',
                        surrogate: '',
                        phoneOfSurrogate: '',
                        email: '',
                        numberGPTL: '',
                        accountBank: '',
                        nameBank: '' 
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
                title="Các chi nhánh VCSC"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* MS chi nhánh VCSC"
                        validateStatus = {(this.state.codeBranchVCSC.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeBranchVCSC.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="codeBranchVCSC" placeholder="Mã số chi nhánh VCSC" value={this.state.codeBranchVCSC} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Tên chi nhánh"
                        validateStatus = {(this.state.nameBranchVCSC.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameBranchVCSC.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameBranchVCSC" placeholder="Tên chi nhánh" value={this.state.nameBranchVCSC} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Người đại diện"
                        validateStatus = {(this.state.surrogate.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.surrogate.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="surrogate" placeholder="Tên người đại diện" value={this.state.surrogate} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Sđt người đại diện"
                        validateStatus = {(this.state.phoneOfSurrogate.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.phoneOfSurrogate.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="phoneOfSurrogate" type="number" placeholder="Số điện thoại người đại diện" value={this.state.phoneOfSurrogate} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="Email"
                    >
                        <Input name="email" type="email" placeholder="Email" value={this.state.email} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Số G.Phép thành lập"
                        validateStatus = {(this.state.numberGPTL.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.numberGPTL.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="numberGPTL" placeholder="Số giấy phép thành lập" value={this.state.numberGPTL} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Tài khoản ngân hàng"
                        validateStatus = {(this.state.accountBank.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.accountBank.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="accountBank" type="number" placeholder="Tài khoản ngân hàng" value={this.state.accountBank} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Tên ngân hàng"
                        validateStatus = {(this.state.nameBank.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameBank.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameBank" placeholder="Tên ngân hàng" value={this.state.nameBank} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalBranchVCSC;