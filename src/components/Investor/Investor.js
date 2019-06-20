import React, {Component} from 'react';
import { Table, Button, Popconfirm, notification, Icon, Tooltip, Form, Tag} from 'antd';
import ModalInvestor from './ModalInvestor';
import {getListInvestor, updateItemInvestor, deleteItemInvestor} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import {convertDDMMYYYY} from '../Common/Common';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class InvestorF extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 20,
                color: 'red'
            },
            {
                title: 'MS nhà đầu tư', //2
                dataIndex: 'MSNDT',
                width: 100,
            },  
            {
                title: 'Loại nhà đầu tư', //3
                dataIndex: 'LOAINDT',
                editable: true,
                width: 100
            },
            {
                title: 'Tên nhà đầu tư', //4
                dataIndex: 'TENNDT',
                width: 100,
                editable: true,
            },
            {
                title: 'CMND - G.Phép K.Doanh',
                dataIndex: 'CMND_GPKD',
                width: 200,
                editable: true,
            },
            {
                title: 'Ngày cấp',
                dataIndex: 'NGAYCAP',
                width: 100,
                editable: true,
            },
            {
                title: 'Nơi cấp',
                dataIndex: 'NOICAP',
                width: 100,
                editable: true,
            },
            {
                title: 'Số TK C.Khoán',
                dataIndex: 'SO_TKCK',
                width: 100,
                editable: true,
            },
            {
                title: 'MS Người G.Thiệu',
                dataIndex: 'MS_NGUOIGIOITHIEU',
                width: 100,
                editable: true,
            },
            {
                title: 'Ngày tạo', //4
                dataIndex: 'NGAYTAO',
                width: 100
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                width: 100,
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
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSNDT)}>
                                    <Tooltip title="Xóa dòng này" className="pointer">
                                        <Icon type="delete" style={{color: editingKey === '' ? '#f5222d' : '#bfbfbf', fontSize: 16}}/>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                         : null
                    )
                }
            },
        ];
        
        this.state = {
            dataSource: [],
            openModal: false,
            lstInvestorType: [],
            editingKey: ''
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    async componentDidMount(){
        await this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await getListInvestor();
            const lstTmp = await (res.filter(item => item.FLAG === 1)).map((item, i) => {
                return {
                    ...item,
                    "NGAYTAO": convertDDMMYYYY(item.NGAYTAO),
                    "NGAYCAP": convertDDMMYYYY(item.NGAYCAP),
                    "lstInvestorType": this.props.lstInvestorType,
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
            const res = await updateItemInvestor(data);
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

    handleDelete = async(id) => {
        try{
            let dataTmp = {
                "MSNDT": id
            }
            const res = await deleteItemInvestor(dataTmp);
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
                    "MSNDT": item.MSNDT,
                    "LOAINDT": row.LOAINDT
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
                    inputType: col.dataIndex === 'NGAYCAP' ? 'date' : 'text' ,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return(
            <div>
                <ModalInvestor isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}/>
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

const Investor = Form.create()(InvestorF);

export default Investor;