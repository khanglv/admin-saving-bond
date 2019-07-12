import React, {Component} from 'react';
import {createItemInterestRateSale} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    DatePicker
} from 'antd';
import * as common from '../Common/Common';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';
const newDate = new Date();

class ModalInterestRateSale extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeInterestRateSale: '',
            interestRateSale: null,
            dateStart: moment(new Date(), dateFormat),
            dateEnd: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+3)), dateFormat),
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

    updateSelectValue = name => async(event)=>{
        this.setState({[name]: event});
    }

    onHandleOk = async()=>{
        try{
            const {
                codeInterestRateSale,
                interestRateSale,
                dateStart,
                dateEnd,
                note
            } = this.state;

            if(!codeInterestRateSale || !interestRateSale){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSLS": codeInterestRateSale,
                    "LS_TOIDA": interestRateSale,
                    "NGAYBATDAU": dateStart,
                    "NGAYKETTHUC": dateEnd,
                    "DIEUKHOAN_LS": note
                }
                const res = await createItemInterestRateSale(dataTmp);
                if (res.error) {
                    common.notify('error', 'Thao tác thất bại :( ' + res.error);
                } else {
                    await this.props.reloadData();
                    this.setState(
                        {
                            codeFrefix: '', 
                            noteFrefix: '', 
                            isShowNotice: false
                        }
                    );
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
                title="Lãi suất bán"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="* Mã số lãi suất" 
                        validateStatus = {(this.state.codeInterestRateSale.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeInterestRateSale.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="codeInterestRateSale" placeholder="Nhập mã số lãi suất" value={this.state.codeInterestRateSale} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* Lãi suất bán (%)"
                        validateStatus = {((this.state.interestRateSale === null || this.state.interestRateSale === 0) && this.state.isShowNotice)  ? "error" : null}
                        help = {((this.state.interestRateSale === null || this.state.interestRateSale === 0) && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="interestRateSale" type="number" placeholder="Lãi suất bán" value={this.state.interestRateSale} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item
                        label="* Ngày áp dụng"
                    >
                        <DatePicker name="dateStart" value={this.state.dateStart} format={dateFormat} onChange={this.updateSelectValue('dateStart')} />
                    </Form.Item>
                    <Form.Item
                        label="* Ngày kết thúc"
                    >
                        <DatePicker name="dateEnd" value={this.state.dateEnd} format={dateFormat} onChange={this.updateSelectValue('dateEnd')} />
                    </Form.Item>
                    <Form.Item label="Điều khoản lãi suất" >
                        <Input name="note" placeholder="Điều khoản lãi suất" value={this.state.note} onChange={event => this.updateInputValue(event)} />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalInterestRateSale;