import React, {Component} from 'react';

import { 
    Modal,
    Form,
    Input,
} from 'antd';

class ModalFrefix extends Component{

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
                title="Frefix"
                centered
                visible={this.props.isOpen}
                onOk={() => this.setModal2Visible()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="*Frefix ID">
                        <Input placeholder="Nhập frefix ID" />
                    </Form.Item>
                    <Form.Item label="*Ký tự">
                        <Input placeholder="Ký tự frefix" />
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input placeholder="Ghi chú" />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalFrefix;