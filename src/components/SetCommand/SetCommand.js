import React, {Component} from 'react';
import { Table, Icon, Button, Tooltip, Popconfirm} from 'antd';
import * as common from '../Common/Common';
import ModalShowDateInterest from './ModalShowDateInterest';
import {connect} from 'react-redux';
import {getListSetCommand} from '../../stores/actions/setCommandAction';
import { updateApproveSetCommand } from '../../api/api';

class SetCommand extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 30,
                fixed: 'left'
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                fixed: 'left',
                width: 100,
                render: (text, record) =>{
                    return(
                        this.state.dataSource.length >= 1 ?
                            <div>
                                <Popconfirm title="Duyệt lệnh này?" onConfirm={() => this.handleOk(record)}>
                                    <Tooltip title="Duyệt" className="pointer">
                                        <Icon type="check" style={{color: '#1cd356', fontSize: 16}}/>
                                    </Tooltip>
                                </Popconfirm>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Hủy duyệt lệnh này?" onConfirm={() => this.handleDelete()}>
                                    <Tooltip title="Hủy duyệt" className="pointer">
                                        <Icon type="close" style={{color: '#f5222d', fontSize: 16}}/>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                         : null
                    )
                }
            },
            {
                title: 'Trái Phiếu', //1
                dataIndex: 'MSTP',
                width: 250
            },
            {
                title: 'Nhà đầu tư', //2
                dataIndex: 'TENNDT',
                width: 250
            },
            {
                title: 'MS Người giới thiệu', //3
                dataIndex: 'MS_NGUOI_GT',
                width: 150
            },
            {
                title: 'Số lượng',
                dataIndex: 'SOLUONG',
                width: 100
            },
            {
                title: 'Đơn giá',
                dataIndex: 'DONGIA',
                width: 150
            },
            {
                title: 'Tổng giá trị',
                dataIndex: 'TONGGIATRI',
                width: 200
            },
            {
                title: 'Lãi suất',
                dataIndex: 'LAISUAT_DH',
                width: 100
            },
            {
                title: 'Ngày giao dịch',
                dataIndex: 'NGAY_GD',
                width: 150
            },
            {
                title: 'Ngày trái tức',
                dataIndex: 'NGAY_TRAITUC',
                width: 150,
                render: (NGAY_TRAITUC)=>{
                    return (
                        <Button className="middle-div" icon="exclamation-circle" onClick={()=>this.onDetailDateInterest(NGAY_TRAITUC)}>Xem chi tiết</Button>
                    )
                }
            },
            {
                title: 'Trạng thái',
                dataIndex: 'TRANGTHAI_LENH',
                editable: true,
                width: 70,
                render: TT_NIEMYET =>{
                    let type = "check-circle";
                    let color = "green";
                    if(TT_NIEMYET === 0){
                        type="stop";
                        color="#faad14"
                    }
                    return(
                        <div className="text-center">
                            <Icon type={type} style={{color: color}} theme="filled" />
                        </div>
                    )
                }
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'NGAYTAO',
                width: 150
            },
            {
                title: 'Ngày hủy',
                dataIndex: 'NGAYHUY',
                width: 150
            },
            {
                title: 'Ghi chú',
                dataIndex: 'GHICHU',
                width: 200
            },
        ];

        this.state = {
            dataSource: [],
            openModal: false,
            lstSetCommand: []
        };
    }

    async componentDidMount(){
        await this.loadData();
    }

    handleOk = async (data) => {
        console.log(data);
        try {
            const req = await updateApproveSetCommand({
                MSDL: data.MSDL,
                status: 1,
            });
            console.log(req);
            if(!req.error) {
                this.loadData();
            }
        } catch (err) {
            console.log(err);
        }
    }

    onDetailDateInterest = (data)=>{
        this.setState({openModal: true, lstSetCommand: data});
    }

    handleCloseModal = ()=>{
        this.setState({openModal: false});
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListSetCommand();
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAY_GD": common.convertDDMMYYYY(item.NGAY_GD),
                        "NGAYHUY": common.convertDDMMYYYY(item.NGAYHUY),
                        "DONGIA": common.convertTextDecimal(item.DONGIA),
                        "TONGGIATRI": common.convertTextDecimal(item.TONGGIATRI),
                        "key": i + 1
                    }
                })
                this.setState({dataSource: lstTmp, editingKey: '' });
            }
        } catch (error) {
            console.log("err load data " + error);
        }
    }

    render() {
        return(
            <div>
                <ModalShowDateInterest isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} lstSetCommand={this.state.lstSetCommand}/>
                <div className="p-top10" style={{padding: 10}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        size="small"
                        columns={this.columns}
                        pagination={{ pageSize: 15 }}
                        scroll={{x: '130%'}}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        lstSetCommand: state.setCommand.data,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListSetCommand: ()=> dispatch(getListSetCommand()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SetCommand);