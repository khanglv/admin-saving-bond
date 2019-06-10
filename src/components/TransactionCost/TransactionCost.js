import React, {Component} from 'react';
import { Table, Button, Popconfirm } from 'antd';
import {getListFrefix} from '../../api/api';
import ModalTransactionCost from './ModalTransactionCost';

class TransactionCost extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'id',
                editable: true,
                width: 20
            },
            {
                title: 'Mã số phí', //1
                dataIndex: 'code_transactionCost',
                editable: true,
                width: 100
            },
            {
                title: 'Tên phí', //2
                dataIndex: 'Name_transactionCost',
                width: 100
            },
            {
                title: 'Tỉ lệ tính', //3
                dataIndex: 'ratio',
                width: 100
            },
            {
                title: 'Ngày áp dụng', //3
                dataIndex: 'date_apply',
                width: 100
            },
            {
                title: 'Ghi chú', //3
                dataIndex: 'note',
                width: 200
            },
            {
                title: 'Flag', //4
                dataIndex: 'code_term_borrow',
                width: 100
            },
            {
                title: 'operation',
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
            dataSource: [
                {
                    key: '0',
                    name: 'Edward King 0',
                    age: '32',
                    address: 'London, Park Lane no. 0',
                    key1: '0',
                    name1: 'Edward King 0',
                    age1: '32',
                    address1: 'London, Park Lane no. 0',
                    key2: '0',
                    name2: 'Edward King 0',
                    age2: '32',
                    address2: 'London, Park Lane no. 0',
                    key3: '0',
                    name3: 'Edward King 0',
                    age3: '32',
                    address3: 'London, Park Lane no. 0',
                },
                {
                    key: '1',
                    name: 'Edward King 1',
                    age: '32',
                    address: 'London, Park Lane no. 1',
                },
            ],
            count: 2,
            openModal: false
        };
    }

    componentDidMount(){
        // getListFrefix().then((res)=>{
        //     console.log(res);
        // });
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleOpenModal = () => {
        this.setState({openModal: true});
    };

    handleCloseModal = ()=>{
        this.setState({openModal: false});
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
                <ModalTransactionCost isOpen={this.state.openModal} isCloseModal={this.handleCloseModal}/>
                <div className="p-top10" style={{padding: 10}}>
                    <Button onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 16 }}>
                        <span>Thêm mới</span>
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

export default TransactionCost;