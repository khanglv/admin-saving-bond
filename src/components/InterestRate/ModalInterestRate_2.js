import React, {Component} from 'react';
import {createItemInterestRate} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    Select,
    Row,
    Col,
    DatePicker
} from 'antd';
import * as common from '../Common/Common';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
const newDate = new Date();

class ModalInterestRate extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            bondID: null,
            interestAmplitude: 0,
            interestRateBuy: 0,
            note: '',
            statusListed: 1,
            dateStart: moment(new Date(), dateFormat),
            dateEnd: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+6)), dateFormat),
            isShowNotice: false,
        };
    }

    setModal2Visible =()=> {
        this.props.isCloseModal();
        this.setState({isShowNotice: false});
    }

    handleCurrencyChange = currency => {
        this.setState({ currency });
    };

    onChangeCheckbox = ()=>{
        this.setState((prew) => ({
            isTypePrefix: !prew.isTypePrefix
        }))
    }

    updateInputValue = (event)=>{
        let valueTmp = event.target.value;
        if(event.target.name === 'interestAmplitude'){
            valueTmp = parseFloat(valueTmp);
        }
        this.setState({[event.target.name]: valueTmp});
    }

    updateSelectValue = name => async(event)=>{
        this.setState({[name]: event});
        if(name === 'bondID'){
            const index = await this.props.lstBondsAssetData.findIndex(item => event === item.BONDID);
            let dateTmp = this.props.lstBondsAssetData[index].NGAYPH;
            this.setState(
                {
                    interestRateBuy: this.props.lstBondsAssetData[index].LAISUAT_MUA,
                    dateStart: moment(this.props.lstBondsAssetData[index].NGAYPH),
                    dateEnd: moment(new Date(dateTmp).setMonth((new Date(dateTmp)).getMonth()+this.props.lstBondsAssetData[index].LOAI_TT))
                });
        }
    }

    disabledDate = (current)=> {
        return current && current < this.state.dateStart.endOf('day');
    }
    
    onHandleOk = async()=>{
        try{
            const {
                bondID,
                interestAmplitude, 
                interestRateBuy,
                note,
                statusListed,
                dateStart,
                dateEnd
            } = this.state;

            if (!bondID || !interestRateBuy) {
                this.setState({ isShowNotice: true });
            } else {
                let dataTmp = {
                    "BOND_ID": bondID,
                    "LS_BIENDO": interestAmplitude,
                    "LAISUAT_MUA": interestRateBuy,
                    "DIEUKHOAN_LS": note,
                    "NGAYBATDAU": dateStart,
                    "NGAYKETTHUC": dateEnd,
                    "TRANGTHAI": statusListed
                }
                const res = await createItemInterestRate(dataTmp);
                if (res.error) {
                    common.notify('error', 'Thao tác thất bại :( ' + res.error);
                } else {
                    await this.props.reloadData();
                    this.setState({
                        interestAmplitude: 0,
                        note: '',
                        statusListed: 1,
                        dateStart: moment(new Date(), dateFormat),
                        dateEnd: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+6)), dateFormat),
                        isShowNotice: false
                    });
                    await common.notify('success', 'Thao tác thành công ^^!');
                }
            }
        }catch(err){
            common.notify('error', 'Thao tác thất bại :( ' + err );
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
                title="Lãi suất mua"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
            >
                <Row>
                    <Col>
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
                           
                            <Form.Item
                                label="Lãi suất biên độ"
                            >
                                <Input name="interestAmplitude" type="number" placeholder="Lãi suất biên độ" value={this.state.interestAmplitude} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Lãi suất (%)"
                                validateStatus={(this.state.interestRateBuy === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.interestRateBuy === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="interestRateBuy" type="number" placeholder="Lãi suất biên độ" value={this.state.interestRateBuy} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Điều khoản lãi suất" >
                                <Input name="note" placeholder="Điều khoản lãi suất" value={this.state.note} onChange={event => this.updateInputValue(event)} />
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
                            <Form.Item label="* Trạng thái" hasFeedback validateStatus={this.state.statusListed === 1 ? "success" : "warning"}>
                                <Select
                                    defaultValue={1}
                                    placeholder="Chọn trạng thái"
                                    onChange={this.updateSelectValue('statusListed')}
                                >
                                    <Option value={1}>Hoạt động</Option>
                                    <Option value={2}>Chờ duyệt</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default ModalInterestRate;