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
            if(!this.state.codeInterest || !this.state.codeBond || !this.state.maxInterest || !this.state.interestRecall || !this.state.interestAmplitude || !this.state.interestAverage){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "MSLS": this.state.codeInterest,
                    "BOND_ID": this.state.codeBond,
                    "LS_TOIDA": this.state.maxInterest,
                    "LS_TH": this.state.interestRecall,
                    "LS_BIENDO": this.state.interestAmplitude,
                    "LS_BINHQUAN": this.state.interestAverage,
                    "MA_NH01": this.state.codeBank_1,
                    "MA_NH02": this.state.codeBank_2,
                    "MA_NH03": this.state.codeBank_3,
                    "MA_NH04": this.state.codeBank_4,
                    "MA_NH05": this.state.codeBank_5,
                    "GHICHU_TT": this.state.note
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
                                <Input name="codeBank_1" placeholder="Mã ngân hàng 1" value={this.state.codeBank_1} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Mã ngân hàng 2">
                                <Input name="codeBank_2" placeholder="Mã ngân hàng 2" value={this.state.codeBank_2} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Mã ngân hàng 3">
                                <Input name="codeBank_3" placeholder="Mã ngân hàng 3" value={this.state.codeBank_3} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Mã ngân hàng 4">
                                <Input name="codeBank_4" placeholder="Mã ngân hàng 4" value={this.state.codeBank_4} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Mã ngân hàng 5">
                                <Input name="codeBank_5" placeholder="Mã ngân hàng 5" value={this.state.codeBank_5} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                            <Form.Item label="Ghi chú">
                                <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)} />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default ModalInterestRate;