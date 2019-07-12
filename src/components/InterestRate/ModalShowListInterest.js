import React, {Component} from 'react';
import { 
    Modal,
    Table,
    Badge,
    Icon,
    Popconfirm,
    Tooltip
} from 'antd';
import { updateItemInterestRate } from '../../api/api';
import * as common from '../Common/Common';

class ModalShowListInterest extends Component{

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Ngày tạo',
                dataIndex: 'NGAYTAO',
                width: 100,
            },
            {
                title: 'Ngày áp dụng', //1
                dataIndex: 'NGAYBATDAU',
                width: 200
            },
            {
                title: 'Ngày kết thúc', //1
                dataIndex: 'NGAYKETTHUC',
                width: 200
            },
            {
                title: 'Lãi suất (%)', //1
                dataIndex: 'LS_TOIDA',
                width: 100
            },
            {
                title: 'Trạng thái', //13
                dataIndex: 'TRANGTHAI',
                editable: true,
                width: 120,
                render: TRANG_THAI => {
                    let color = 'green';
                    let text = 'Hoạt động';
                    if(TRANG_THAI === 0){
                        color = '#bfbfbf';
                        text = 'Đã thay đổi'
                    }
                    if(TRANG_THAI === 2){
                        color = 'orange';
                        text = 'Đang chờ'
                    }
                    return(
                        <span style={{color: color}}><Badge color={color}/>{text}</span>
                    )
                }
            },
            {
                title: 'Action', //1
                dataIndex: 'Action',
                width: 80,
                render: (text, record)=>{
                    return (
                        record.TRANGTHAI === 2 ? <Popconfirm title="Duyệt lãi suất này?" onConfirm={() => this.handleOk(record)}>
                            <Tooltip title="Duyệt" className="pointer" placement="left">
                                <Icon type="check" style={{ color: '#1cd356', fontSize: 16 }} />
                            </Tooltip>
                        </Popconfirm> : null
                    )
                }
            }
        ]
        const value = props.value || {};

        this.state = {
            currency: value.currency || 'Open',
        };
    }

    setModal2Visible =()=> {
        this.props.isCloseModal();
    }

    handleOk = async(record)=> {
        try {
            const req = await updateItemInterestRate({
                TRANGTHAI: 1,
                MSLS: record.MSLS,
                BOND_ID: record.BONDID
            });
            if(!req.error) {
                this.props.reloadData();
                common.notify("success", "Thao tác thành công !!!");
            }else{
                common.notify("error", "Thao tác thất bại :(");
            }
        } catch (err) {
            common.notify("error", "Thao tác thất bại :(");
        }
    }

    handleCurrencyChange = currency => {
        this.setState({ currency });
    };

    render(){
        const dataTmp = this.props.lstInterestStatusData.map((item, i)=>{
            return {
                ...item,
                "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                "NGAYBATDAU": common.convertDDMMYYYY(item.NGAYBATDAU),
                "NGAYKETTHUC": common.convertDDMMYYYY(item.NGAYKETTHUC),
                "key": i + 1
            }
        });
        return(
            <Modal
                title="Danh sách lãi suất mua"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                footer={null}
                width='70%'
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

export default ModalShowListInterest;