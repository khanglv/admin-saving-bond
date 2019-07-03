import React, {Component} from 'react';
import { Table, Icon, Tooltip, Popconfirm, Tabs} from 'antd';
import * as common from '../Common/Common';
import ModalShowDateInterest from './ModalShowDateInterest';
import {connect} from 'react-redux';
import {getListSetCommand} from '../../stores/actions/setCommandAction';
import { updateApproveSetCommand } from '../../api/api';

const TabPane = Tabs.TabPane;

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
                render: (text, record) => {
                    return (
                        <div>{record.TRANGTHAI_LENH === 0 ?
                            <div>
                                <Popconfirm title="Duyệt lệnh này?" onConfirm={() => this.handleOk(record)}>
                                    <Tooltip title="Duyệt" className="pointer" placement="left">
                                        <Icon type="check" style={{ color: '#1cd356', fontSize: 16 }} />
                                    </Tooltip>
                                </Popconfirm>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Popconfirm title="Hủy lệnh này?" onConfirm={() => this.handleReject(record)}>
                                    <Tooltip title="Hủy duyệt" className="pointer" placement="right">
                                        <Icon type="close" style={{ color: '#f5222d', fontSize: 16 }} />
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                            : record.TRANGTHAI_LENH === 1 ? <div style={{ color: '#1cd356' }}>Đã duyệt</div> : <div style={{ color: 'red' }}>Đã hủy bỏ</div>}
                        </div>
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
                width: 120
            },
            {
                title: 'Tổng giá trị',
                dataIndex: 'TONGGIATRI',
                width: 180
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
                width: 120,
                render: (NGAY_TRAITUC)=>{
                    return (
                        <div className="text-center">
                            <Tooltip title="Xem chi tiết" className="pointer">
                                <Icon type="schedule" style={{fontSize: 18, color: '#4b79a1'}} onClick={()=>this.onDetailDateInterest(NGAY_TRAITUC)}/>
                            </Tooltip>
                        </div>
                        // <Button className="middle-div" icon="exclamation-circle" onClick={()=>this.onDetailDateInterest(NGAY_TRAITUC)}>Xem chi tiết</Button>
                    )
                }
            },
            {
                title: 'Trạng thái',
                dataIndex: 'TRANGTHAI_LENH',
                editable: true,
                width: 100,
                render: TRANGTHAI_LENH =>{
                    let type = "check-circle";
                    let color = "green";
                    if(TRANGTHAI_LENH === 0){
                        type="stop";
                        color="#faad14"
                    }
                    if(TRANGTHAI_LENH === 2){
                        type="close-circle";
                        color="red"
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
            dataSource_2: [],
            dataSource_3: [],
            openModal: false,
            lstSetCommand: []
        };
    }

    async componentDidMount(){
        await this.loadData();
    }

    handleOk = async (data) => {
        try {
            const req = await updateApproveSetCommand({
                MSDL: data.MSDL,
                status: 1,
            });
            console.log(req);
            if(!req.error) {
                this.loadData();
                common.notify("success", "Thao tác thành công !!!");
            }else{
                common.notify("error", "Thao tác thất bại :(");
            }
        } catch (err) {
            common.notify("error", "Thao tác thất bại :(");
            console.log(err);
        }
    }

    handleReject = async(data)=>{
        try {
            const req = await updateApproveSetCommand({
                MSDL: data.MSDL,
                status: 2,
            });
            console.log(req);
            if(!req.error) {
                this.loadData();
                common.notify("success", "Thao tác thành công !!!");
            }else{
                common.notify("error", "Thao tác thất bại :(");
            }
        } catch (err) {
            common.notify("error", "Thao tác thất bại :(");
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
            //Danh sách chờ
            const res = await this.props.getListSetCommand(0);
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAY_GD": common.convertDDMMYYYY(item.NGAY_GD),
                        "DONGIA": common.convertTextDecimal(item.DONGIA),
                        "TONGGIATRI": common.convertTextDecimal(item.TONGGIATRI),
                        "key": i + 1
                    }
                })
                this.setState({dataSource: lstTmp});
            }

            //Danh sách đã duyệt
            const res_2 = await this.props.getListSetCommand(1);
            if(res_2.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                const lstTmp_2 = await (res_2.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAY_GD": common.convertDDMMYYYY(item.NGAY_GD),
                        "DONGIA": common.convertTextDecimal(item.DONGIA),
                        "TONGGIATRI": common.convertTextDecimal(item.TONGGIATRI),
                        "key": i + 1
                    }
                })
                this.setState({dataSource_2: lstTmp_2});
            }

            //Danh sách hủy
            const res_3 = await this.props.getListSetCommand(2);
            if(res_3.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                const lstTmp_3 = await (res_3.data.filter(item => item.FLAG === 1)).map((item, i) => {
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
                this.setState({dataSource_3: lstTmp_3});
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
                    <Tabs>
                        <TabPane tab="Danh sách chờ" key="1">
                            <Table
                                bordered
                                dataSource={this.state.dataSource}
                                size="small"
                                columns={this.columns}
                                pagination={{ pageSize: 15 }}
                                scroll={{x: '130%'}}
                            />
                        </TabPane>
                        <TabPane tab="Danh sách đã duyệt" key="2">
                            <div className="p-top10" style={{padding: 10}}>
                                <Table
                                    bordered
                                    dataSource={this.state.dataSource_2}
                                    size="small"
                                    columns={this.columns}
                                    pagination={{ pageSize: 15 }}
                                    scroll={{x: '130%'}}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab="Danh sách hủy" key="3">
                            <div className="p-top10" style={{padding: 10}}>
                                <Table
                                    bordered
                                    dataSource={this.state.dataSource_3}
                                    size="small"
                                    columns={this.columns}
                                    pagination={{ pageSize: 15 }}
                                    scroll={{x: '130%'}}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
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
        getListSetCommand: (status)=> dispatch(getListSetCommand(status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SetCommand);