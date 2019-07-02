import React, {Component} from 'react';
import {createItemDayInterestYear} from '../../api/api';
import { 
    Modal,
    Form,
    Input
} from 'antd';
import {notify} from '../Common/Common';

class ModalDayInterestYear extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            totalDayInterest: null,
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
            if(!this.state.totalDayInterest){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "SONGAYTINHLAI": this.state.totalDayInterest,
                    "GHICHU": this.state.note
                }
                const res = await createItemDayInterestYear(dataTmp);
                if (res.error) {
                    notify('error', 'Thao tác thất bại :( ' + res.error);
                } else {
                    this.setState({
                        totalDayInterest: null,
                        note: '',
                        isShowNotice: false
                    });
                    await this.props.reloadData();
                    await notify('success', 'Thao tác thành công ^^!');
                }
            }
        } catch (err) {
            notify('error', 'Thao tác thất bại :( ' + err);
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
                title="Phí giao dịch"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* Số ngày tính lãi"
                        validateStatus = {(this.state.totalDayInterest === null && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.totalDayInterest === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="totalDayInterest" type="number" placeholder="Số ngày tính lãi" value={this.state.totalDayInterest} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalDayInterestYear;