import React, {Component} from 'react';
import {createListAssets} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    notification,
    DatePicker,
    Row,
    Col,
    Select,
    Tag
} from 'antd';
import moment from 'moment';
import * as fomular from '../Common/Formula';
import * as common from '../Common/Common';
const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class ModalBondHolder extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeBond: '',
            itemBond: [],
            codeInvestor: '',
            interestRateBuy: 0,
            quantityBond: 0,
            dateBuy: moment(new Date(), dateFormat),
            available: 0,
            quantitySold: 0,
            valueSale: 0,
            interestRateSale: 0,
            certificate: 1,
            statusListed: 1,
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
        this.setState({dateRange: value});
    }

    updateSelectValue = name => (event)=>{
        this.setState({[name]: event});
        if(name === 'codeBond'){
            const index = this.props.lstBondsAssetData.findIndex(item => event === item.BONDID);
            this.setState({itemBond: this.props.lstBondsAssetData[index]});
        }
    }
    
    onHandleOk = async()=>{
        try{
            if(!this.state.codeBond || !this.state.codeInvestor || !this.state.quantityBond ){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MS_NDT": this.state.codeInvestor,
                    "BOND_ID": this.state.codeBond,
                    "LAISUATKHIMUA": this.state.interestRateBuy,
                    "SONGAYNAMGIU": fomular.genTotalDateHolding(this.state.itemBond.NGAYPH, this.state.itemBond.NGAYPH, this.state.itemBond.NGAYDH, this.state.itemBond.SONGAYTINHLAI),
                    "NGAYMUA": this.state.dateBuy,
                    "SOLUONG": this.state.quantityBond,
                    "DONGIA": this.state.itemBond.MENHGIA,
                    "TONGGIATRI": this.state.itemBond.MENHGIA * this.state.quantityBond,
                    "SL_KHADUNG": this.state.available,
                    "SL_DABAN": this.state.quantitySold,
                    "GIATRIKHIBAN": this.state.valueSale,
                    "LAISUATKHIBAN": this.state.interestRateSale,
                    "TRANGTHAI": this.state.statusListed,
                    "CAPGIAY_CN": this.state.certificate,
                }
                const res = await createListAssets(dataTmp);
                if(res.error){
                    openNotificationWithIcon('error', 'Thao tác thất bại :( ' + res.error);
                }else{
                    await this.props.reloadData();
                    this.setState({
                        interestRateBuy: 0,
                        quantityBond: 0,
                        dateBuy: moment(new Date(), dateFormat),
                        available: 0,
                        quantitySold: 0,
                        valueSale: 0,
                        interestRateSale: 0,
                        certificate: 1,
                        statusListed: 1,
                        isShowNotice: false
                    });
                    await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
                }
            }
        }catch(err){
            openNotificationWithIcon('error', 'Thao tác thất bại :( ' + err );
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
                title="Danh sách trái chủ"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                width="70%"
            >
                <Row>
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item
                                label="* Nhà đầu tư"
                                validateStatus={(this.state.codeInvestor.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.codeInvestor.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Chọn nhà đầu tư" 
                                    onChange={this.updateSelectValue('codeInvestor')}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        this.props.lstInvestorData.filter(item => item.FLAG === 1).map((item) => {
                                            return (
                                                <Option key={item.MSNDT} value={item.MSNDT}>{item.TENNDT}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="* Trái phiếu"
                                validateStatus={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Chọn trái phiếu" 
                                    onChange={this.updateSelectValue('codeBond')}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        this.props.lstBondsAssetData.filter(item => item.FLAG === 1).map((item) => {
                                            return (
                                                <Option key={item.BONDID} value={item.BONDID}>{item.MSTP}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Lãi suất khi mua"
                            >
                                <Input name="interestRateBuy" type="number" placeholder="Lãi suất khi mua" value={this.state.interestRateBuy} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Số ngày nắm giữ">
                            <Tag color="green" style={{fontSize: 14, padding: 5}}>
                                {this.state.itemBond.SONGAYTINHLAI ? common.convertTextDecimal(fomular.genTotalDateHolding(this.state.dateBuy, this.state.itemBond.NGAYPH, this.state.itemBond.NGAYDH, this.state.itemBond.SONGAYTINHLAI)) : 0}
                            </Tag>ngày
                            </Form.Item>
                            <Form.Item
                                label="Ngày mua"
                            >
                                <DatePicker name="datebuy" value={this.state.dateBuy} format={dateFormat} onChange={this.updateInputDate} />
                            </Form.Item>
                            <Form.Item label="* Số lượng"
                                validateStatus={((this.state.quantityBond === 0 || this.state.quantityBond === '') && this.state.isShowNotice) ? "error" : null}
                                help={((this.state.quantityBond === 0 || this.state.quantityBond === '') && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="quantityBond" type="number" placeholder="Nhập số lượng" value={this.state.quantityBond} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Đơn giá">
                                <Tag color="green" style={{fontSize: 14, padding: 5}}>
                                    {this.state.itemBond.MENHGIA ? common.convertTextDecimal(this.state.itemBond.MENHGIA) : 0}
                                </Tag>VND
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Tổng giá trị">
                                <Tag color="volcano" style={{ fontSize: 14, padding: 5 }}>
                                    {this.state.itemBond.MENHGIA ? common.convertTextDecimal(this.state.itemBond.MENHGIA * this.state.quantityBond) : 0}
                                </Tag>VND
                                </Form.Item>
                            <Form.Item label="Số lượng khả dụng">
                                <Input name="available" type="number" placeholder="Nhập số lượng khả dụng" value={this.state.available} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Số lượng đã bán">
                                <Input name="quantitySold" type="number" placeholder="Nhập số lượng đã bán" value={this.state.quantitySold} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Giá trị khi bán">
                                <Input name="valueSale" type="number" placeholder="Nhập giá trị khi bán" value={this.state.valueSale} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Lãi suất khi bán">
                                <Input name="interestRateSale" type="number" placeholder="Nhập lãi suất khi bán" value={this.state.interestRateSale} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Giấy chứng nhận" >
                                <Select
                                    defaultValue="1"
                                    placeholder="Giấy chứng nhận"
                                    onChange={this.updateSelectValue('certificate')}
                                >
                                    <Option value="1">Có</Option>
                                    <Option value="0">Không</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Trạng thái" hasFeedback validateStatus={this.state.statusListed === 1 ? "success" : "warning"}>
                                <Select
                                    defaultValue={1}
                                    placeholder="Chọn trạng thái niêm yết"
                                    onChange={this.updateSelectValue('statusListed')}
                                >
                                    <Option value={1}>Khả dụng</Option>
                                    <Option value={0}>Không khả dụng</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default ModalBondHolder;