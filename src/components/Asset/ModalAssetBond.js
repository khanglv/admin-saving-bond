import React, {Component} from 'react';

import { 
    Modal,
    Form,
    Select,
    Input,
} from 'antd';
const { Option } = Select;

class ModalAssetBond extends Component{

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

        return(
            <Modal
                title="Trái phiếu"
                centered
                visible={this.props.isOpen}
                onOk={() => this.setModal2Visible()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="M.số T.Phiếu">
                        <Input placeholder="Mã số trái phiếu" />
                    </Form.Item>
                    <Form.Item label="Số H.Đồng">
                        <Input placeholder="Số hợp đồng" />
                    </Form.Item>
                    <Form.Item label="Flag">
                        <Select
                            value={this.state.currency}
                            style={{ width: '32%' }}
                            onChange={this.handleCurrencyChange}
                        >
                            <Option value="Open">Open</Option>
                            <Option value="Close">Close</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="MS D.Nghiệp">
                            <Select 
                                showSearch 
                                placeholder="Nhập mã số doanh nghiệp tại đây!!!"
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                <Option value="red">VCSC</Option>
                                <Option value="green">Techcombank</Option>
                                <Option value="blue">Vietcombank</Option>
                            </Select>
                        </Form.Item>
                    </Form>
            </Modal>
        )
    }
}

export default ModalAssetBond;