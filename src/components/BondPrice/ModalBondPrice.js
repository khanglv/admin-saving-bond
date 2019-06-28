import React, {Component} from 'react';
import {createItemBondPrice} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
} from 'antd';
import * as common from '../Common/Common';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class ModalBondPrice extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            codeBond: '',
            currentPrice: null,
            dateApply:  moment(new Date(), dateFormat),
            dateRelease:  moment(new Date(), dateFormat),
            note: '',
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
            if(!this.state.codeBond || !this.state.currentPrice || !this.state.dateApply || !this.state.dateRelease || !this.state.note || !this.state.status){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "BOND_ID": this.state.codeBond,
                    "GIATRI_HIENTAI": this.state.currentPrice,
                    "NGAY_AP": this.state.dateApply,
                    "NGAY_HH": this.state.dateRelease,
                    "GHICHU": this.state.note,
                    "TRANGTHAI": this.state.status
                }
                const res = await createItemBondPrice(dataTmp);
                if(res.error){
                    common.notify('error', 'Thao tác thất bại :( ');
                }else{
                    await this.props.reloadData();
                    this.setState({
                        currentPrice: null,
                        dateApply:  moment(new Date(), dateFormat),
                        dateRelease:  moment(new Date(), dateFormat),
                        note: '',
                        status: 1,
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
            >
                <Form {...formItemLayout}>
                    <Form.Item
                        label="* Trái phiếu"
                        validateStatus={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "error" : null}
                        help={(this.state.codeBond.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Select showSearch placeholder="Chọn trái phiếu" onChange={this.updateSelectValue('codeBond')}
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
                        label="* Giá trị hiện tại"
                        validateStatus={(this.state.currentPrice === null && this.state.isShowNotice) ? "error" : null}
                        help={(this.state.currentPrice === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="currentPrice" type="number" placeholder="Giá trị hiện tại" value={this.state.currentPrice} onChange={event => this.updateInputValue(event)} />
                    </Form.Item>
                    <Form.Item
                        label="* Ngày áp dụng"
                    >
                        <DatePicker name="dateApply" value={this.state.dateApply} format={dateFormat} onChange={this.updateSelectValue('dateApply')}/>
                    </Form.Item>
                    <Form.Item
                        label="* Ngày hiện hành"
                    >
                        <DatePicker name="dateRelease" value={this.state.dateRelease} format={dateFormat} onChange={this.updateSelectValue('dateRelease')}/>
                    </Form.Item>
                    <Form.Item
                        label="* Ghi chú"
                        validateStatus={(this.state.note.length === 0 && this.state.isShowNotice) ? "error" : null}
                        help={(this.state.note.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="note" placeholder="Ghi chú" value={this.state.note} onChange={event => this.updateInputValue(event)} />
                    </Form.Item>
                    <Form.Item label="* Trạng thái">
                        <Select
                            defaultValue="1"
                            placeholder="Chọn trạng thái"
                            onChange={this.updateSelectValue('status')}
                        >
                            <Option value="1">Phát hành</Option>
                            <Option value="2">Huy động</Option>
                            <Option value="0">Hết huy động</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalBondPrice;