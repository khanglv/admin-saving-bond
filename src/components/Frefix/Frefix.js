import React, {Component} from 'react';
import { Table, Button, Popconfirm, Alert, Icon } from 'antd';
import ModalFrefix from './ModalFrefix';
import {getListFrefix} from '../../api/api';

class Frefix extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                editable: true,
                width: 30
            },
            {
                title: 'Frefix_ID', //1
                dataIndex: 'PREFIX_ID',
                editable: true,
                width: 100
            },
            {
                title: 'Ký tự Frefix', //2
                dataIndex: 'KYTU_PREFIX',
                width: 100
            },
            {
                title: 'Ghi chú', //3
                dataIndex: 'GHICHU',
                width: 200
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="/">Delete</a>
                        </Popconfirm>
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
        getListFrefix().then((res)=>{
            const lstTmp = res.map((item, i)=>{
                return {
                    ...item,
                    "key": i + 1
                }
            })
            this.setState({dataSource: lstTmp});
        }).catch(()=>{

        });
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleOpenModal = () => {
        this.setState({openModalFrefix: true});
    };

    handleCloseModal = ()=>{
        this.setState({openModalFrefix: false});
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
        const columns = this.columns;
        return(
            <div>
                <ModalFrefix isOpen={this.state.openModalFrefix} isCloseModal={this.handleCloseModal}/>
                <Alert style={{fontSize: 18, display: 'flex', alignContent: 'center', justifyContent: 'center'}} message="Frefix" type="success" />
                <div className="p-top10" style={{padding: 10}}>
                    <Button onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 16 }}>
                        <Icon type="plus" /> <span className="middle-text">Thêm mới</span>
                    </Button>
                    <Table
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