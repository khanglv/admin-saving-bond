import React, {Component} from 'react';
import {createItemContractVCSC} from '../../api/api';
import { 
    Modal,
    Form,
    Input,
    DatePicker,
    Select
} from 'antd';
import moment from 'moment';
import {notify} from '../Common/Common';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
const newDate = new Date();

class ModalContractVCSC extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
            numberContract: '',
            codeCompany: '',
            branchOfVCSC: '',
            signDay: moment(new Date(), dateFormat),
            interestRate: null,
            period: null,
            dateRelease: moment(new Date(), dateFormat),
            dateExpire: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+6)), dateFormat),
            priceBond: null,
            totalRelease: null,
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

    updateInputDate = name => (value)=>{
        this.setState({[name]: value});
    }

    updateSelectValue = name => (event)=>{
        this.setState({[name]: event});
    }

    updateSelectcodeOfPresenter = (event)=>{
        this.setState({codeOfPresenter: event});
    }
    
    onHandleOk = async()=>{
        try{
            if(!this.state.numberContract || !this.state.codeCompany || !this.state.branchOfVCSC || !this.state.interestRate || !this.state.period || !this.state.priceBond){
                this.setState({isShowNotice: true});
            }else{
                let dataTmp = {
                    "SOHD": this.state.numberContract,
                    "MS_DN": this.state.codeCompany,
                    "MS_CNVCSC": this.state.branchOfVCSC,
                    "NGAYKY": this.state.signDay,
                    "LAISUAT": this.state.interestRate,
                    "KYHAN": this.state.period,
                    "NGAY_PH": this.state.dateRelease,
                    "NGAY_DH": this.state.dateExpire,
                    "MENHGIA_TP": this.state.priceBond,
                    "SOLUONG_PH": this.state.totalRelease
                }
                const res = await createItemContractVCSC(dataTmp);
                if(res.error){
                    notify('error', 'Thao tác thất bại :( ' + res.error);
                }else{
                    await this.props.reloadData();
                    this.setState({
                        numberContract: '',
                        codeCompany: '',
                        branchOfVCSC: '',
                        signDay: moment(new Date(), dateFormat),
                        interestRate: null,
                        period: null,
                        dateRelease: moment(new Date(), dateFormat),
                        dateExpire: moment(new Date(new Date(newDate).setMonth(newDate.getMonth()+6)), dateFormat),
                        priceBond: null,
                        totalRelease: null,
                        isShowNotice: false
                    });
                    await notify('success', 'Thao tác thành công ^^!');
                }
            }
        }catch(err){
            notify('error', 'Thao tác thất bại :( ' + err );
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
                title="Hợp đồng phát hành"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item 
                        label="* Số hợp đồng"
                        validateStatus = {(this.state.numberContract.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.numberContract.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="numberContract" placeholder="Số hợp đồng" value={this.state.numberContract} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Doanh nghiệp"
                        validateStatus = {(this.state.codeCompany.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.codeCompany.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Select showSearch placeholder="Chọn doanh nghiệp" onChange={this.updateSelectValue('codeCompany')}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.props.lstCompanyData.map((item)=>{
                                    return(
                                        item.FLAG === 1 ? <Option key={item.MSDN} value={item.MSDN}>{item.TEN_DN}</Option> : null
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="* Chi nhánh VCSC"
                        validateStatus = {(this.state.branchOfVCSC.length === 0 && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.branchOfVCSC.length === 0 && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Select showSearch placeholder="Chọn chi nhánh VCSC" onChange={this.updateSelectValue('branchOfVCSC')}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.props.lstBranchVCSCData.map((item)=>{
                                    return(
                                        item.FLAG === 1 ? <Option key={item.MSCNVCSC} value={item.MSCNVCSC}>{item.TENCHINHANH}</Option> : null
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="* Ngày ký"
                    >
                        <DatePicker name="signDay" value={this.state.signDay} format={dateFormat} onChange={this.updateInputDate('signDay')}/>
                    </Form.Item>
                    <Form.Item label="* Lãi suất (%)"
                        validateStatus = {(this.state.interestRate === null && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.interestRate === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="interestRate" type="number" placeholder="Lãi suất trong hợp đồng" value={this.state.interestRate} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="* Kỳ hạn (tháng)"
                        validateStatus = {(this.state.period === null && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.period === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="period" type="number" placeholder="Kỳ hạn mua trong hợp đồng" value={this.state.period} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item 
                        label="Ngày phát hành"
                    >
                        <DatePicker name="dateRelease" value={this.state.dateRelease} format={dateFormat} onChange={this.updateInputDate('dateRelease')}/>
                    </Form.Item>
                    <Form.Item 
                        label="Ngày đáo hạn"
                    >
                        <DatePicker name="dateExpire" value={this.state.dateExpire} format={dateFormat} onChange={this.updateInputDate('dateExpire')}/>
                    </Form.Item>
                    <Form.Item 
                        label="* Mệnh giá trái phiếu"
                        validateStatus = {(this.state.priceBond === null && this.state.isShowNotice)  ? "error" : null}
                        help = {(this.state.priceBond === null && this.state.isShowNotice) ? "Không được bỏ trống" : null}
                    >
                        <Input name="priceBond" type="number" placeholder="Mệnh giá trái phiếu" value={this.state.priceBond}
                        onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                    <Form.Item label="Số lượng phát hành"
                    >
                        <Input name="totalRelease" type="number" placeholder="Số lượng phát hành" value={this.state.totalRelease} onChange={event => this.updateInputValue(event)}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalContractVCSC;