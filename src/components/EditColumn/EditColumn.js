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
            return <Select >
                <Option value="1">Hoạt động</Option>
                <Option value="0">Ngừng hoạt động</Option>
            </Select>
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
                            initialValue: inputType === 'date' ? common.convertDatePicker(common.convertToFormat(record[dataIndex])): record[dataIndex],
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