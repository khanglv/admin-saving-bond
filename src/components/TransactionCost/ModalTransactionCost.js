import React, {Component} from 'react';

import { 
    Modal,
    Form,
    Row,
    Col,
    Select,
    Input,
    Button,
    Icon,
} from 'antd';
const { Option } = Select;

class ModalTransactionCost extends Component{

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open',
        };
    }

    setModal2Visible =()=> {
        this.props.isCloseModal();
    }

    handleCurrencyChange = currency => {
        this.setState({ currency });
    };

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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return(
            <Modal
                title="Phí giao dịch"
                centered
                visible={this.props.isOpen}
                onOk={() => this.setModal2Visible()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="*Mã số phí">
                        <Input placeholder="Nhập mã số phí" />
                    </Form.Item>
                    <Form.Item label="*Tên phí">
                        <Input placeholder="Nhập tên phí" />
                    </Form.Item>
                    <Form.Item label="*Tỉ lệ tính">
                        <Input placeholder="Nhập tỉ lệ tính phí" />
                    </Form.Item>
                    <Form.Item label="Ngày áp dụng">
                        <Input placeholder="Ngày áp dụng" />
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input placeholder="Ghi chú" />
                    </Form.Item>
                    <Form.Item label="Flag">
                        <Select
                            value={this.state.currency}
                            style={{ width: '32%' }}
                            onChange={this.handleCurrencyChange}
                        >
                            <Option value="Open">1</Option>
                            <Option value="Close">0</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalTransactionCost;