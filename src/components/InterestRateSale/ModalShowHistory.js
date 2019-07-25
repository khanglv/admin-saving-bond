import React, {Component} from 'react';
import { 
    Modal,
    Table,
    Icon
} from 'antd';
import * as common from '../Common/Common';

class ModalShowHistory extends Component{

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Ngày áp dụng', //1
                dataIndex: 'NGAYBATDAU',
                width: 200,
                render: NGAYBATDAU=>{
                    return(
                        <div className="midle-icon-ant">
                            <Icon style={{color: 'orange'}} type="clock-circle" />&nbsp; {NGAYBATDAU}
                        </div>
                    )
                }
            },
            {
                title: 'Ngày kết thúc', //1
                dataIndex: 'NGAYKETTHUC',
                width: 200,
                render: NGAYKETTHUC=>{
                    return(
                        <div className="midle-icon-ant">
                            <Icon style={{color: 'orange'}} type="clock-circle" />&nbsp; {NGAYKETTHUC}
                        </div>
                    )
                }
            },
            {
                title: 'Lãi suất (%)', //1
                dataIndex: 'LS_TOIDA',
                width: 100
            }
        ]

        const value = props.value || {};
        this.state = {
            currency: value.currency || 'Open'
        };
    }

    setModal2Visible =()=> {
        this.props.isCloseModal();
        this.setState({ editingKey: '' });
    }

    render(){
        const dataTmp = this.props.data ? this.props.data.map((item, i)=>{
            return {
                ...item,
                "NGAYBATDAU": common.convertDDMMYYYY(item.NGAYBATDAU),
                "NGAYKETTHUC": common.convertDDMMYYYY(item.NGAYKETTHUC),
                "key": i + 1
            }
        }) : null;
        return(
            <Modal
                title="Lịch sử cập nhật lãi suất"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                footer={null}
                width='50%'
            >
                <div className="p-top10" style={{ padding: 10 }}>
                    <Table
                        bordered
                        dataSource={dataTmp}
                        size="small"
                        columns={this.columns}
                        pagination={false}
                    />
                </div>
            </Modal>
        )
    }
}

export default ModalShowHistory;