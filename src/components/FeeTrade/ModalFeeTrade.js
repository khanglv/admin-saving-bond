import React, {Component} from 'react';
import {createItemFeeTrade} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    notification,
    Select,
    InputNumber
} from 'antd';

const { Option } = Select;

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class ModalFeeTrade extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            nameFeeTrade: '',
            ratio: '',
            note: '',
            feeMin: null,
            feeMax: null,
            typeOfFeeTrace: 1,
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
            if(!this.state.nameFeeTrade || !this.state.ratio || !this.state.feeMin || !this.state.feeMax){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "TENPHI": this.state.nameFeeTrade,
                    "TYLETINH": this.state.ratio,
                    "PHIMIN": this.state.feeMin,
                    "PHIMAX": this.state.feeMax,
                    "GHICHU": this.state.note,
                    "LOAIGIAODICH": this.state.typeOfFeeTrace
                }
                const res = await createItemFeeTrade(dataTmp);
                if (res.error) {
                    openNotificationWithIcon('error', 'Thao tác thất bại :( ' + res.error);
                } else {
                    this.setState({
                        nameFeeTrade: '',
                        ratio: '',
                        note: '',
                        feeMin: null,
                        feeMax: null,
                        typeOfFeeTrace: 1,
                        isShowNotice: false
                    });
                    await this.props.reloadData();
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
                title="Phí giao dịch"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* Tên phí"
                        validateStatus = {(this.state.nameFeeTrade.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.nameFeeTrade.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="nameFeeTrade" placeholder="Tên phí giao dịch" value={this.state.nameFeeTrade} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item
                        label="* Tỉ lệ tính"
                        validateStatus = {(this.state.ratio.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.ratio.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="ratio" placeholder="Tỉ lệ tính" value={this.state.ratio} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item
                        label="* Mức tiền min"
                        validateStatus = {((this.state.feeMin === 0 || this.state.feeMin === null) && this.state.isShowNotice)  ? "error" : null}
                        help = {((this.state.feeMin === 0 || this.state.feeMin === null) && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <InputNumber
                            name="feeMin"
                            style={{width: '100%'}}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={this.updateSelectValue("feeMin")}
                        />
                    </Form.Item>
                    <Form.Item
                        label="* Mức tiền max"
                        validateStatus = {((this.state.feeMax === 0 || this.state.feeMax === null) && this.state.isShowNotice)  ? "error" : null}
                        help = {((this.state.feeMax === 0 || this.state.feeMax === null) && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <InputNumber
                            name="feeMax"
                            style={{width: '100%'}}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={this.updateSelectValue("feeMax")}
                        />
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* Loại chi phí">
                        <Select
                            defaultValue={1}
                            placeholder="Chọn loại phí giao dịch"
                            onChange={this.updateSelectValue('typeOfFeeTrace')}
                        >
                            <Option value={1}>Phí giao dịch</Option>
                            <Option value={2}>Thuế</Option>
                            <Option value={3}>Thuế lãi</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalFeeTrade;