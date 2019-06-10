import React, {Component} from 'react';
import { Table, Button, Popconfirm, notification} from 'antd';
import ModalFrefix from './ModalFrefix';
import {getListFrefix, deleteItemFrefix, updateItemFrefix} from '../../api/api';
import {EditableFormRow, EditableCell} from '../EditColumn/EditColumn';
import {convertDDMMYYYY} from '../Common/Common';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class Frefix extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 30,
                color: 'red'
            },
            {
                title: 'Ký tự Frefix', //2
                dataIndex: 'KYTU_PREFIX',
                width: 100,
                editable: true,
            },  
            {
                title: 'Ghi chú', //3
                dataIndex: 'GHICHU',
                editable: true,
                width: 200
            },
            {
                title: 'Ngày tạo', //4
                dataIndex: 'NGAYTAO',
                width: 100
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <div>
                            <Popconfirm title="Xóa dòng này?" onConfirm={() => this.handleDelete(record.PREFIX_ID)}>
                                <Button type="danger">Xóa</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Popconfirm>
                            <Button type="primary" onClick={()=> this.handleSaveEdit(record)}>Lưu thay đổi</Button>
                        </div>
                    ) : null,
                width: 100
            },
        ];

        this.state = {
            dataSource: [],
            count: 2,
            openModalFrefix: false
        };
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await getListFrefix();
            const lstTmp = await (res.filter(item => parseInt(item.FLAG) === 1)).map((item, i) => {
                return {
                    ...item,
                    "NGAYTAO": convertDDMMYYYY(item.NGAYTAO),
                    "key": i + 1
                }
            })
            await this.setState({dataSource: lstTmp});
        } catch (error) {
            console.log("err load data " + error);
        }
    }

    handleSaveEdit = async(data)=>{
        try {
            let dataTmp = {
                "PREFIX_ID": data.PREFIX_ID,
                "KYTU_PREFIX": data.KYTU_PREFIX,
                "GHICHU": data.GHICHU
            }
            const res = await updateItemFrefix(dataTmp);
            if(res.error){
                this.loadData();
                openNotificationWithIcon('error', 'Thao tác thất bại :( ');
            }else{
                await this.loadData();
                await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
            }
        } catch (error) {
            openNotificationWithIcon('error', 'Thao tác thất bại :( ');
        }
    }

    handleDelete = async(idFrefix) => {
        try{
            let dataTmp = {
                "PREFIX_ID": idFrefix
            }
            const res = await deleteItemFrefix(dataTmp);
            if(res.error){
                openNotificationWithIcon('error', 'Thao tác thất bại :( ');
            }else{
                await this.loadData();
                await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
            }
        }catch(err){
            openNotificationWithIcon('error', 'Thao tác thất bại :( ');
        }
    };

    handleOpenModal = () => {
        this.setState({openModalFrefix: true});
    };

    handleCloseModal = ()=>{
        this.setState({openModalFrefix: false});
    }

    handleReloadData = ()=>{
        this.setState({openModalFrefix: false});
        this.loadData();
    }

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };
    
    render() {
        const { dataSource } = this.state;
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        return(
            <div>
                <ModalFrefix isOpen={this.state.openModalFrefix} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}/>
                <div className="p-top10" style={{padding: 10}}>
                    <Button onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 16 }}>
                        <span>Thêm mới</span>
                    </Button>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        )
    }
}

export default Frefix;