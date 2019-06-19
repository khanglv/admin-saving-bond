import React from 'react';
import {Form, Input, InputNumber, DatePicker, Select } from 'antd';
import * as common from '../Common/Common';

const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;

export const EditableContext = React.createContext();

export class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        if (this.props.inputType === 'date') {
            return <DatePicker format={dateFormat}/>;
        }
        if (this.props.inputType === 'options') {
            return <Select style={{width: '100%'}}>
                <Option value="1">Hoạt động</Option>
                <Option value="0">Ngừng hoạt động</Option>
            </Select>
        }
        if (this.props.inputType === 'select') {
            switch(this.props.dataIndex){
                case 'TENLOAI_NDT':
                    return <Select showSearch style={{ width: '100%' }}>
                        {
                            this.props.record.lstInvestorType.map((item) => {
                                return (
                                    item.FLAG === 1 ? <Option key={item.MSLOAINDT} value={item.MSLOAINDT}>{item.TENLOAI_NDT}</Option> : null
                                )
                            })
                        }
                    </Select>
                case 'MS_DN':
                        return <Select showSearch style={{ width: '100%' }} >
                        {
                            this.props.record.lstCompanyData.map((item)=>{
                                return(
                                    item.FLAG === 1 ? <Option key={item.MSDN} value={item.MSDN}>{item.TEN_DN}</Option> : null
                                )
                            })
                        }
                    </Select>
                case 'MS_CNVCSC':
                        return <Select showSearch style={{ width: '100%' }}>
                        {
                            this.props.record.lstBranchVCSCData.map((item)=>{
                                return(
                                    item.FLAG === 1 ? <Option key={item.MSCNVCSC} value={item.MSCNVCSC}>{item.TENCHINHANH}</Option> : null
                                )
                            })
                        }
                    </Select>
                case 'TEN_DN':
                    return <Select showSearch style={{ width: '100%' }}>
                    {
                        this.props.record.lstCompanyData.map((item)=>{
                            return(
                                item.FLAG === 1 ? <Option key={item.MSDN} value={item.MSDN}>{item.TEN_DN}</Option> : null
                            )
                        })
                    }
                </Select>    
                case 'TENTAISANDAMBAO':
                    return <Select showSearch style={{ width: '100%' }}>
                    {
                        this.props.record.lstEnsureAssetData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.MSTSDB} value={item.MSTSDB}>{item.TENTAISANDAMBAO}</Option> : null
                            )
                        })
                    }
                </Select>
                case 'MS_KYHANTT':
                    return <Select showSearch style={{ width: '100%' }}>
                    {
                        this.props.record.lstPaymentTermData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.MSKYHANTT} value={item.MSKYHANTT}>{item.MSKYHANTT}</Option> : null
                            )
                        })
                    }
                </Select>
                case 'TENLOAI_TP':
                    return <Select showSearch style={{ width: '100%' }}>
                    {
                        this.props.record.lstBondTypeData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.MSLTP} value={item.MSLTP}>{item.TENLOAI_TP}</Option> : null
                            )
                        })
                    }
                </Select>
                case 'SONGAYTINHLAI':
                    return <Select showSearch style={{ width: '100%' }}>
                    {
                        this.props.record.lstDayInterestYearData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.MSNTLTN} value={item.MSNTLTN}>{item.SONGAYTINHLAI}</Option> : null
                            )
                        })
                    }
                </Select>
                case 'SO_HD':
                    return <Select showSearch style={{ width: '100%' }}>
                    {
                         this.props.record.lstContractVCSCData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.SOHD} value={item.SOHD}>{item.SOHD}</Option> : null
                            )
                        })
                    }
                </Select>
                default:
                    return;
            }
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            tmpData,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: inputType === 'date' ? common.convertDatePicker(common.convertToFormat(record[dataIndex])): inputType === 'select' ? record[tmpData] : record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}