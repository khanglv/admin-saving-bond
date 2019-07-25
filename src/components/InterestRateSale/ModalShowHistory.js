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
                title: 'Ngày cập nhật', //1
                dataIndex: 'NT',
                width: 200,
                render: (i, record)=>{
                    return(
                        <div className="midle-icon-ant">
                            <Icon style={{color: 'orange'}} type="history" />&nbsp;{record.NT}&nbsp;<i>lúc</i>&nbsp;{record.HNT}
                        </div>
                    )
                }
            },
            {
                title: 'Ngày áp dụng', //1
                dataIndex: 'NBD',
                width: 150
            },
            {
                title: 'Ngày kết thúc', //1
                dataIndex: 'NKT',
                width: 150
            },
            {
                title: 'Lãi suất (%)', //1
                dataIndex: 'LS',
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
                "NT": common.convertDDMMYYYY(item.NT),
                "HNT": common.convertTime(item.NT),
                "NBD": common.convertDDMMYYYY(item.NBD),
                "NKT": common.convertDDMMYYYY(item.NKT),
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
                <i style={{color: '#4b79a1', paddingLeft: 10}}>Danh sách các lãi suất đã bị cập nhật</i>
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