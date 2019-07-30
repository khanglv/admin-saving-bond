import React, {Component} from 'react';
import {createListInterestRateNoReturn} from '../../api/api';
import { 
    Modal,
    Form,
    Input
} from 'antd';
import * as common from '../Common/Common';

class ModalInterestRateNoKeepExpired extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            monthLimit: null,
            interestRateNoReturn: null,
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

    updateInputDate = (value)=>{
        this.setState({dateOfApplication: value});
    }

    updateSelectValue = name => (event)=>{
        this.setState({[name]: event});
    }

    onHandleOk = async()=>{
        try {
            if(!this.state.monthLimit || !this.state.interestRateNoReturn){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "THANGGIOIHAN": this.state.monthLimit,
                    "LS_TOIDA": this.state.interestRateNoReturn
                }
                const res = await createListInterestRateNoReturn(dataTmp);
                if (res.error) {
                    common.notify('error', 'Thao tác thất bại :( ' + res.error);
                } else {
                    this.setState({
                        monthLimit: null,
                        interestRateNoReturn: null,
                        isShowNotice: false
                    });
                    await this.props.reloadData();
                    await common.notify('success', 'Thao tác thành công ^^!');
                }
            }
        } catch (err) {
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
                title="Lãi suất không giữ tới đáo hạn"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item
                        label="* Tháng giới hạn"
                        validateStatus = {((this.state.monthLimit === 0 || this.state.monthLimit === null) && this.state.isShowNotice)  ? "error" : null}
                        help = {((this.state.monthLimit === 0 || this.state.monthLimit === null) && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="monthLimit" type="number" placeholder="Số tháng áp dụng lãi suất" value={this.state.monthLimit} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* Lãi suất (%)"
                        validateStatus = {((this.state.interestRateNoReturn === 0 || this.state.interestRateNoReturn === null) && this.state.isShowNotice)  ? "error" : null}
                        help = {((this.state.interestRateNoReturn === 0 || this.state.interestRateNoReturn === null) && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="interestRateNoReturn" type="number" placeholder="Nhập lãi suất áp dụng" value={this.state.interestRateNoReturn} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalInterestRateNoKeepExpired;