import React, {Component} from 'react';
import {createItemInterestRate} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    Select,
    Row,
    Col,
} from 'antd';
import * as common from '../Common/Common';

const { Option } = Select;

class ModalInterestRate extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeInterest: '',
            codeBond: '',
            maxInterest: null,
            interestRecall: null,
            interestAmplitude: null,
            interestAverage: null,
            codeBank_1: '',
            codeBank_2: '',
            codeBank_3: '',
            codeBank_4: '',
            codeBank_5: '',
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

    onChangeCheckbox = ()=>{
        this.setState((prew) => ({
            isTypePrefix: !prew.isTypePrefix
        }))
    }

    updateInputValue = (event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    updateSelectValue = name => (event)=>{
        this.setState({[name]: event});
    }
    
    onHandleOk = async()=>{
        try{
            const {
                codeInterest, 
                codeBond, 
                maxInterest, 
                interestRecall, 
                interestAmplitude, 
                interestAverage, 
                codeBank_1, 
                codeBank_2, 
                codeBank_3, 
                codeBank_4, 
                codeBank_5, 
                note
            } = this.state;
            
            const arrBank = [codeBank_1, codeBank_2, codeBank_3, codeBank_4, codeBank_5].filter(function (v) {
                return v != '';
            });

            const findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) != index)
            if(findDuplicates(arrBank).length === 0) {
                if(!codeInterest || !codeBond || !maxInterest || !interestRecall || !interestAmplitude || !interestAverage || !note){
                    this.setState({isShowNotice: true});
                } else {
                    let dataTmp = {
                        "MSLS": codeInterest,
                        "BOND_ID": codeBond,
                        "LS_TOIDA": maxInterest,
                        "LS_TH": interestRecall,
                        "LS_BIENDO": interestAmplitude,
                        "LS_BINHQUAN": interestAverage,
                        "MA_NH01": codeBank_1,
                        "MA_NH02": codeBank_2,
                        "MA_NH03": codeBank_3,
                        "MA_NH04": codeBank_4,
                        "MA_NH05": codeBank_5,
                        "DIEUKHOAN_LS": note
                    }
                    const res = await createItemInterestRate(dataTmp);
                    if(res.error){
                        common.notify('error', 'Thao tác thất bại :( ');
                    }else{
                        await this.props.reloadData();
                        this.setState({
                            codeInterest: '',
                            maxInterest: null,
                            interestRecall: null,
                            interestAmplitude: null,
                            interestAverage: null,
                            codeBank_1: '',
                            codeBank_2: '',
                            codeBank_3: '',
                            codeBank_4: '',
                            codeBank_5: '',
                            note: '',
                            isShowNotice: false
                        });
                        await common.notify('success', 'Thao tác thành công ^^!');
                    }
                }
            } else {
                common.notify('error', 'Mã ngân hàng bị trùng' );
            }
        }catch(err){
            common.notify('error', 'Thao tác thất bại :( ' );
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
                title="Lãi suất"
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
                                label="* Mã số lãi suất"
                                validateStatus={(this.state.codeInterest.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.codeInterest.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="codeInterest" placeholder="Mã số lãi suất" value={this.state.codeInterest} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Trái phiếu"
                                validateStatus={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Select showSearch placeholder="Chọn trái phiếu" onChange={this.updateSelectValue('codeBond')}>
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
                                label="* Lãi suất tối đa"
                                validateStatus={(this.state.maxInterest === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.maxInterest === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="maxInterest" type="number" placeholder="Lãi suất tối đa" value={this.state.maxInterest} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Lãi suất thu hồi"
                                validateStatus={(this.state.interestRecall === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.interestRecall === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="interestRecall" type="number" placeholder="Lãi suất thu hồi" value={this.state.interestRecall} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Lãi suất biên độ"
                                validateStatus={(this.state.interestAmplitude === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.interestAmplitude === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="interestAmplitude" type="number" placeholder="Lãi suất biên độ" value={this.state.interestAmplitude} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item
                                label="* Lãi suất bình quân"
                                validateStatus={(this.state.interestAverage === null && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.interestAverage === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="interestAverage" type="number" placeholder="Lãi suất biên độ" value={this.state.interestAverage} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Mã ngân hàng 1">
                                <Select showSearch placeholder="Mã ngân hàng 1" onChange={this.updateSelectValue('codeBank_1')}>
                                    {
                                        this.props.lstBankInterestData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.LAISUAT_ID} value={item.MA_NH}>{item.MA_NH}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mã ngân hàng 2">
                                <Select showSearch placeholder="Mã ngân hàng 2" onChange={this.updateSelectValue('codeBank_2')}>
                                    {
                                        this.props.lstBankInterestData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.LAISUAT_ID} value={item.MA_NH}>{item.MA_NH}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mã ngân hàng 3">
                                <Select showSearch placeholder="Mã ngân hàng 3" onChange={this.updateSelectValue('codeBank_3')}>
                                    {
                                        this.props.lstBankInterestData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.LAISUAT_ID} value={item.MA_NH}>{item.MA_NH}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mã ngân hàng 4">
                                <Select showSearch placeholder="Mã ngân hàng 4" onChange={this.updateSelectValue('codeBank_4')}>
                                    {
                                        this.props.lstBankInterestData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.LAISUAT_ID} value={item.MA_NH}>{item.MA_NH}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mã ngân hàng 5">
                                <Select showSearch placeholder="Mã ngân hàng 5" onChange={this.updateSelectValue('codeBank_5')}>
                                    {
                                        this.props.lstBankInterestData.map((item) => {
                                            return (
                                                item.FLAG === 1 ? <Option key={item.LAISUAT_ID} value={item.MA_NH}>{item.MA_NH}</Option> : null
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                label="Điều khoản lãi suất"
                                validateStatus={(this.state.note.length === 0 && this.state.isShowNotice) ? "error" : null}
                                help={(this.state.note.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                            >
                                <Input name="note" placeholder="Điều khoản lãi suất" value={this.state.note} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default ModalInterestRate;