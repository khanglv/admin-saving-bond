import React, {Component} from 'react';
import {createListInterestReturn} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    DatePicker,
    Select
} from 'antd';
import * as common from '../Common/Common';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
const newDate = new Date();

class ModalInterestReturn extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            bondId: null,
            interestRateSale: null,
            dateStart: moment(new Date(), dateFormat),
            dateEnd: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+3)), dateFormat),
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

    updateSelectValue = name => async(event)=>{
        this.setState({[name]: event});
    }

    disabledDate = (current)=> {
        return current && current < this.state.dateStart.endOf('day');
    }

    onHandleOk = async()=>{
        try{
            const {
                interestRateSale,
                dateStart,
                dateEnd,
                status,
                bondID
            } = this.state;

            if(!interestRateSale || !this.state.bondId){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "BOND_ID": bondID,
                    "LS_TOIDA": interestRateSale,
                    "NGAYBATDAU": dateStart,
                    "NGAYKETTHUC": dateEnd,
                    "TRANGTHAI": status
                }
                const res = await createListInterestReturn(dataTmp);
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
                title="Lãi tái đầu tư"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item
                        label="* Trái phiếu"
                        validateStatus={((this.state.bondID === 0 || this.state.bondID === null) && this.state.isShowNotice) ? "error" : null}
                        help={((this.state.bondID === 0 || this.state.bondID === null) && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Select showSearch placeholder="Chọn trái phiếu" onChange={this.updateSelectValue('bondID')}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.props.lstBondsAssetData.map((item) => {
                                    return (
                                        item.FLAG === 1 ? <Option key={item.BONDID} value={item.BONDID}>{item.MSTP}</Option> : null
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="* Lãi tái đầu tư (%)"
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
                        <DatePicker name="dateEnd" disabledDate={this.disabledDate} value={this.state.dateEnd} format={dateFormat} onChange={this.updateSelectValue('dateEnd')} />
                    </Form.Item>
                    <Form.Item label="* Trạng thái" hasFeedback validateStatus={this.state.status === 1 ? "success" : "warning"}>
                        <Select
                            defaultValue={1}
                            placeholder="Chọn trạng thái niêm yết"
                            onChange={this.updateSelectValue('status')}
                        >
                            <Option value={1}>Active</Option>
                            <Option value={0}>Disabled</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalInterestReturn;