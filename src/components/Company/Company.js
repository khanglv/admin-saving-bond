import React, {Component} from 'react';
import { Table, Button, Popconfirm, notification, Icon, Tooltip, Form, Tag} from 'antd';
import ModalCompany from './ModalCompany';
import {getListCompany, updateItemCompany, deleteItemCompany} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import {convertDDMMYYYY} from '../Common/Common';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class CompanyForm extends Component{
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
                title: 'MS D.Nghiệp', //2
                dataIndex: 'MSDN',
                width: 100,
            },  
            {
                title: 'Doanh Nghiệp', //3
                dataIndex: 'TEN_DN',
                editable: true,
                width: 200
            },
            {
                title: 'Địa chỉ', //4
                dataIndex: 'DIACHI',
                width: 200,
                editable: true,
            },
            {
                title: 'Điện thoại', //4
                dataIndex: 'DIENTHOAI',
                width: 100,
                editable: true,
            },
            {
                title: 'Email', //4
                dataIndex: 'EMAIL',
                width: 100,
                editable: true,
            },
            {
                title: 'Ngày cấp G.Phép', //4
                dataIndex: 'NGAYCAP_GP',
                width: 100,
                editable: true,
            },
            {
                title: 'Người Đ.Diện P.Lý', //4
                dataIndex: 'NGUOI_DDPL',
                width: 100,
                editable: true,
            },
            {
                title: 'Trạng thái', //4
                dataIndex: 'TRANGTHAI',
                width: 70,
                editable: true,
                render: TRANGTHAI =>{
                    let type = "check-circle";
                    let color = "green";
                    if(TRANGTHAI === 0){
                        type="stop";
                        color="#faad14"
                    }
                    return(
                        <div type="flex" align="middle">
                            <Icon type={type} style={{color: color}} theme="filled" />
                        </div>
                    )
                }
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
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSDN)}>
                                    <Tooltip title="Xóa" className="pointer" placement="right">
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
            count: 2,
            openModal: false,
            isLoading: true,
            editingKey: ''
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await getListCompany();
            const lstTmp = await (res.filter(item => item.FLAG === 1)).map((item, i) => {
                return {
                    ...item,
                    "NGAYTAO": convertDDMMYYYY(item.NGAYTAO),
                    "NGAYCAP_GP": convertDDMMYYYY(item.NGAYCAP_GP),
                    "key": i + 1
                }
            })
            await this.setState({dataSource: lstTmp, editingKey: '', isLoading: false});
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
            const res = await updateItemCompany(data);
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

    handleDelete = async(msDN) => {
        try{
            let dataTmp = {
                "MSDN": msDN
            }
            const res = await deleteItemCompany(dataTmp);
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
                    "MSDN": item.MSDN,
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
                <ModalCompany isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}/>
                <div className="p-top10" style={{padding: 10}}>
                    <Button onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 16 }}>
                        <span>Thêm mới</span>
                    </Button>
                    <EditableContext.Provider value={this.props.form}>
                        <Table
                            components={components}
                            bordered
                            loading={this.state.isLoading}
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

const Company = Form.create()(CompanyForm);

export default Company;