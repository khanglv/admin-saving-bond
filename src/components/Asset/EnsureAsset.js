import React, {Component} from 'react';
import { Table, Button, Popconfirm, Icon, Tooltip, Form, Tag} from 'antd';
import ModalEnsureAsset from './ModalEnsureAsset';
import {updateItemEnsureAsset, deleteItemEnsureAsset} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';
import {connect} from 'react-redux';
import {getListEnsureAsset} from '../../stores/actions/ensureAssetAction';

class EnsureAssetF extends Component{
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
                title: 'Tên tài sản đảm bảo', //3
                dataIndex: 'TENTAISANDAMBAO',
                editable: true,
                width: 100
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
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSTSDB)}>
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
            const res = await this.props.getLstEnsureAsset();
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
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

    handleSaveEdit = async(data)=>{
        try {
            const res = await updateItemEnsureAsset(data);
            if(res.error){
                this.loadData();
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                await this.loadData();
                await common.notify('success', 'Thao tác thành công ^^!');
            }
        } catch (error) {
            common.notify('error', 'Thao tác thất bại :( ' + error);
        }
    }

    handleDelete = async(id) => {
        try{
            let dataTmp = {
                "MSTSDB": id
            }
            const res = await deleteItemEnsureAsset(dataTmp);
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                await this.loadData();
                await common.notify('success', 'Thao tác thành công ^^!');
            }
        }catch(err){
            common.notify('error', 'Thao tác thất bại :( ' + err);
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
                    "MSTSDB": item.MSTSDB
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
                <ModalEnsureAsset isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}/>
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

const EnsureAsset = Form.create()(EnsureAssetF);

const mapDispatchToProps = dispatch =>{
    return{
        getLstEnsureAsset: ()=> dispatch(getListEnsureAsset()),
    }
}

export default connect(null, mapDispatchToProps) (EnsureAsset);