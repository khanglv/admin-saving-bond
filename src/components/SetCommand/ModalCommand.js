import React, {Component} from 'react';
import { 
    Modal,
    Col, 
    Row,
    Badge,
    List,
    Tag
} from 'antd';

class ModalCommand extends Component{

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
        const data = this.props.lstDataCommand;
        return(
            <Modal
                title="Thông tin đặt lệnh"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                footer={null}
                width="50%"
            >
                <Row>
                    <List
                        itemLayout="horizontal"
                    >
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5" /><span>Mã số trái phiếu</span>
                            </Col>
                            <Col span={14}>
                                <Tag color="orange">{data.MSTP}</Tag>
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5"/><span>Loại đầu tư</span>
                            </Col>
                            <Col span={14}>
                                {data.TRANGTHAI_MUA === 3 ? <span style={{color: '#643dc3'}}>Không giữ tới đáo hạn</span> : data.TRANGTHAI_MUA === 2 ? <span style={{color: "#a80f0f"}}>Tái đầu tư</span> : <span style={{color: '#17a2b8'}}>Chưa tái đầu tư</span>}
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5"/><span>Nhà đầu tư</span>
                            </Col>
                            <Col span={14}>
                                {data.TENNDT}
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5"/><span>Mã số NGT</span>
                            </Col>
                            <Col span={14}>
                                {data.MS_NGUOI_GT}
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5"/><span>Số lượng mua</span>
                            </Col>
                            <Col span={14}>
                                {data.SOLUONG}
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5" /><span>Đơn giá mua</span>
                            </Col>
                            <Col span={14}>
                                {data.DONGIA}
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5" /><span>Tổng tiền chưa phí</span>
                            </Col>
                            <Col span={14}>
                                {data.TONGGIATRITRUOCPHI}
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5" /><span>Tổng tiền thanh toán</span>
                            </Col>
                            <Col span={14}>
                                {data.TONGGIATRI}
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5"/><span>Lãi suất hiện tại</span>
                            </Col>
                            <Col span={14}>
                                {data.LAISUAT_DH}&nbsp;(%)
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5"/><span>Ngày giao dịch</span>
                            </Col>
                            <Col span={14}>
                                {data.NGAY_GD}
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5"/><span>Trạng thái</span>
                            </Col>
                            <Col span={14}>
                                {data.TRANGTHAI_LENH === 1 ? <Badge color="green" text="Đã duyệt"/> : data.TRANGTHAI_LENH === 2 ? <Badge color="red" text="Đã bị hủy"/> : <Badge color="#faad14" text="Chờ duyệt"/>}
                            </Col>
                        </List.Item>
                        <List.Item>
                            <Col span={10}>
                                <Badge color="#2db7f5"/><i>Ghi chú</i>
                            </Col>
                            <Col span={14}>
                                {data.GHICHU}
                            </Col>
                        </List.Item>
                    </List>
                    <div className="p-top10" style={styles.borderBottomRadiusDasher}></div>
                    <div style={{ fontSize: 13, paddingTop: 10 }}>
                        <i>Thuật ngữ: &nbsp;</i><span className="index-color">NGT</span> - Người giới thiệu,&nbsp;<span className="index-color">TGT</span> - Tổng giá trị
                    </div>
                </Row>
            </Modal>
        )
    }
}

export default ModalCommand;

const styles = {
    borderBottomRadiusDasher:{
        borderBottom: '1px dashed #f0f3f5'
    }
}