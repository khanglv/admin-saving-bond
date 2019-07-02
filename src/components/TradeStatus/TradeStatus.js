import React, {Component} from 'react';
import { Table, Button, Popconfirm, notification, Icon, Tooltip, Form, Tag} from 'antd';
import ModalTradeStatus from './ModalTradeStatus';
import {getListTradeStatus, updateItemTradeStatus, deleteItemTradeStatus} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import {convertDDMMYYYY} from '../Common/Common';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class TradeStatusF extends Component{
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
                title: 'Tên trạng thái', //3
                dataIndex: 'TENTRANGTHAI',
                editable: true,
                width: 200
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
                render: (text, record) =>{
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <div>
                            <EditableContext.Consumer>
                                {form => (
                                    <Tag color="green" className="customTag" onClick={() => this.save(form, record)}>Lưu</Tag>                                
                                )}
                            </EditableContext.Consumer>
                            <Tag color="volcano" className="customTag" onClick={() => this.cancel(record.key)}>Hủy bỏ</Tag>
                        </div>
                    ): (
                        this.state.dataSource.length >= 1 ?
                            <div>
                                <Tooltip title="Chỉnh sửa">
                                    <Icon type="edit" style={{color: editingKey === '' ? '#096dd9' : '#bfbfbf', fontSize: 16}} onClick={() => editingKey === '' && this.onEdit(record.key)}/>
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSTRANGTHAI)}>
                                    <Tooltip title="Xóa" className="pointer" placement="right">
                                        <Icon type="delete" style={{color: editingKey === '' ? '#f5222d' : '#bfbfbf', fontSize: 16}}/>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                         : null
                    )
                },
                width: 100
            },
        ];
        
        this.state = {
            dataSource: [],
            count: 2,
            openModal: false,
            editingKey: ''
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await getListTradeStatus();
            const lstTmp = await (res.filter(item => item.FLAG === 1)).map((item, i) => {
                return {
                    ...item,
                    "NGAYTAO": convertDDMMYYYY(item.NGAYTAO),
                    "key": i + 1
                }
            })
            await this.setState({dataSource: lstTmp, editingKey: '' });
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

    handleSaveEdit = async(data)=>{
        try {
            const res = await updateItemTradeStatus(data);
            if(res.error){
                this.loadData();
                openNotificationWithIcon('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                await this.loadData();
                await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
            }
        } catch (error) {
            openNotificationWithIcon('error', 'Thao tác thất bại :( ' + error);
        }
    }

    handleDelete = async(id) => {
        try{
            let dataTmp = {
                "MSTRANGTHAI": id
            }
            const res = await deleteItemTradeStatus(dataTmp);
            if(res.error){
                openNotificationWithIcon('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                await this.loadData();
                await openNotificationWithIcon('success', 'Thao tác thành công ^^!');
            }
        }catch(err){
            openNotificationWithIcon('error', 'Thao tác thất bại :( ' + err);
        }
    };

    save = (form, record)=> {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.dataSource];
            const index = newData.findIndex(item => record.key === item.key);
            if (index > -1) {
                const item = newData[index];
                row = {
                    ...row,
                    "MSTRANGTHAI": item.MSTRANGTHAI
                }
                this.handleSaveEdit(row);
            } else {
                newData.push(row);
                this.setState({ dataSource: newData, editingKey: '' });
            }
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    onEdit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,  //setting type input (date, number ...)
                    inputType: col.dataIndex === 'NGAYCAP_GP' ? 'date' : (col.dataIndex === 'TRANGTHAI' ? 'options' : 'text') ,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return(
            <div>
                <ModalTradeStatus isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}/>
                <div className="p-top10" style={{padding: 10}}>
                    <Button onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 16 }}>
                        <span>Thêm mới</span>
                    </Button>
                    <EditableContext.Provider value={this.props.form}>
                        <Table
                            components={components}
                            bordered
                            dataSource={this.state.dataSource}
                            columns={columns}
                            size="small"
                            pagination={{ pageSize: 15 }}
                            rowClassName="editable-row"
                        />
                    </EditableContext.Provider>
                </div>
            </div>
        )
    }
}

const TradeStatus = Form.create()(TradeStatusF);

export default TradeStatus;