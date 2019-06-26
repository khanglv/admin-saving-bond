import React, {Component} from 'react';
import { Table, Icon} from 'antd';
import * as common from '../Common/Common';

import {connect} from 'react-redux';
import {getListRoomVCSC} from '../../stores/actions/roomVCSCAction';

class RoomVCSC extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 30,
            },
            {
                title: 'MS T.Phiếu', //1
                dataIndex: 'MSTP',
                width: 200
            },
            {
                title: 'Lái suất năm', //2
                dataIndex: 'LAISUATNAM',
                width: 150
            },
            {
                title: 'Hạn mức', //3
                dataIndex: 'HANMUC',
                width: 150
            },
            {
                title: 'Đang chờ',
                dataIndex: 'DANGCHO',
                width: 150
            },
            {
                title: 'Tháng còn lại',
                dataIndex: 'THANGCONLAI',
                width: 150
            },
            {
                title: 'Trạng thái',
                dataIndex: 'TT_NIEMYET',
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
        ];

        this.state = {
            dataSource: [],
            openModal: false,
            editingKey: '',
        };
    }

    async componentDidMount(){
        await this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListRoomVCSC();
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "HANMUC": common.convertTextDecimal(item.HANMUC),
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "key": i + 1
                    }
                })
                this.setState({dataSource: lstTmp, editingKey: '' });
            }
        } catch (error) {
            console.log("err load data " + error);
        }
    }

    handleOpenModal = ()=>{
        this.setState({openModal: true});
    }

    handleCloseModal = ()=>{
        this.setState({openModal: false});
    }

    handleReloadData = ()=>{
        this.setState({openModal: false});
        this.loadData();
    }

    render() {
        return(
            <div>
                <div className="p-top10" style={{padding: 10}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        size="small"
                        columns={this.columns}
                        pagination={{ pageSize: 15 }}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        lstRoomVCSC: state.roomVCSC.data,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListRoomVCSC: ()=> dispatch(getListRoomVCSC()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (RoomVCSC);