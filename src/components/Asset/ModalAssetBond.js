import React, {Component} from 'react';

import { Modal } from 'antd';

class ModalAssetBond extends Component{

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }

    setModal2Visible =()=> {
        this.props.isCloseModal();
    }
    render(){
        return(
            <Modal
                title="Vertically centered modal dialog"
                centered
                visible={this.props.isOpen}
                onOk={() => this.setModal2Visible()}
                onCancel={this.setModal2Visible}
                size="lg"
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        )
    }
}

export default ModalAssetBond;