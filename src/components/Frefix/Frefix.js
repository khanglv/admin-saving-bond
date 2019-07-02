import React, {Component} from 'react';
import { Table, Button, Popconfirm, notification, Icon, Tooltip, Form, Tag} from 'antd';
import ModalFrefix from './ModalFrefix';
import {getListFrefix, deleteItemFrefix, updateItemFrefix} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import {convertDDMMYYYY} from '../Common/Common';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class FrefixModal extends Component{
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
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.PREFIX_ID)}>
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
            const res = await getListFrefix();
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
            let dataTmp = {
                "PREFIX_ID": data.PREFIX_ID,
                "KYTU_PREFIX": data.KYTU_PREFIX,
                "GHICHU": data.GHICHU
            }
            const res = await updateItemFrefix(dataTmp);
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

    handleDelete = async(idFrefix) => {
        try{
            let dataTmp = {
                "PREFIX_ID": idFrefix
            }
            const res = await deleteItemFrefix(dataTmp);
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
                    "PREFIX_ID": item.PREFIX_ID
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
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return(
            <div>
                <ModalFrefix isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}/>
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

const Frefix = Form.create()(FrefixModal);

export default Frefix;