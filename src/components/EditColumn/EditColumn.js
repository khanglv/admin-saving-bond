import React from 'react';
import {Form, Input, InputNumber, DatePicker, Select } from 'antd';
import * as common from '../Common/Common';
import { Resizable } from 'react-resizable';

const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;

//Resize header column
export const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props;
    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};

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
        if (this.props.inputType === 'option_2') {
            return <Select style={{ width: '100%' }}>
                <Option value="1">Phát hành</Option>
                <Option value="2">Huy động</Option>
                <Option value="0">Hết huy động</Option>
            </Select>
        }
        if (this.props.inputType === 'select') {
            switch(this.props.dataIndex){
                case 'TENCHINHANH':
                        return <Select showSearch style={{ width: '100%' }}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {
                            this.props.record.lstBranchVCSCData.map((item)=>{
                                return(
                                    item.FLAG === 1 ? <Option key={item.MSCNVCSC} value={item.MSCNVCSC}>{item.TENCHINHANH}</Option> : null
                                )
                            })
                        }
                    </Select>
                case 'MS_DN':
                case 'TEN_DN':
                    return <Select showSearch style={{ width: '100%' }}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {
                        this.props.record.lstCompanyData.map((item)=>{
                            return(
                                item.FLAG === 1 ? <Option key={item.MSDN} value={item.MSDN}>{item.TEN_DN}</Option> : null
                            )
                        })
                    }
                </Select>    
                case 'TENTAISANDAMBAO':
                    return <Select showSearch style={{ width: '100%' }}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {
                        this.props.record.lstEnsureAssetData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.MSTSDB} value={item.MSTSDB}>{item.TENTAISANDAMBAO}</Option> : null
                            )
                        })
                    }
                </Select>
                case 'LOAI_TT':
                    return <Select showSearch style={{ width: '100%' }}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {
                        this.props.record.lstPaymentTermData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.MSKYHANTT} value={item.MSKYHANTT}>{item.LOAI_TT}</Option> : null
                            )
                        })
                    }
                </Select>
                case 'TENLOAI_TP':
                    return <Select showSearch style={{ width: '100%' }}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {
                        this.props.record.lstBondTypeData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.MSLTP} value={item.MSLTP}>{item.TENLOAI_TP}</Option> : null
                            )
                        })
                    }
                </Select>
                case 'SONGAYTINHLAI':
                    return <Select showSearch style={{ width: '100%' }}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {
                        this.props.record.lstDayInterestYearData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.MSNTLTN} value={item.MSNTLTN}>{`${item.SONGAYTINHLAI}`}</Option> : null
                            )
                        })
                    }
                </Select>
                case 'SO_HD':
                    return <Select showSearch style={{ width: '100%' }}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {
                         this.props.record.lstContractVCSCData.map((item) => {
                            return (
                                item.FLAG === 1 ? <Option key={item.SOHD} value={item.SOHD}>{item.SOHD}</Option> : null
                            )
                        })
                    }
                </Select>
                case 'MSTP':
                    return <Select showSearch style={{ width: '100%' }}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            this.props.record.lstBondsAssetData.filter(item => item.FLAG === 1).map((item) => {
                                return (
                                    <Option key={item.BONDID} value={item.BONDID}>{item.MSTP}</Option>
                                )
                            })
                        }
                    </Select>
                case 'TENNDT':
                    return <Select showSearch style={{ width: '100%' }}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            this.props.record.lstInvestorData.filter(item=>item.FLAG === 1).map((item) => {
                                return (
                                    <Option key={item.MSNDT} value={item.MSNDT}>{item.TENNDT}</Option>
                                )
                            })
                        }
                    </Select>
                case 'MA_NH01':
                case 'MA_NH02':
                case 'MA_NH03':
                case 'MA_NH04':
                case 'MA_NH05':
                    return <Select showSearch style={{ width: '100%' }}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            this.props.record.lstBankInterestData.map((item) => {
                                return (
                                    item.FLAG === 1 ? <Option key={item.LAISUAT_ID} value={item.MA_NH}>{item.MA_NH}</Option> : null
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
                            // rules: [
                            //     {
                            //         required: true,
                            //         message: `Please Input ${title}!`,
                            //     },
                            // ],
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

