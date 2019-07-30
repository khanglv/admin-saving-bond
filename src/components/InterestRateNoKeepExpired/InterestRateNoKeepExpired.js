import React, {Component} from 'react';
import { Table, Button, Popconfirm, Icon, Tooltip, Form, Tag} from 'antd';
import ModalInterestRateNoKeepExpired from './ModalInterestRateNoKeepExpired';
import ModalShowHistory from './ModalShowHistory';
import {deleteListInterestRateNoReturn, updateListInterestRateNoReturn} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';
import {connect} from 'react-redux';
import {getListInterestRateNoReturn} from '../../stores/actions/interestRateNoReturnAction';

class InterestRateNoKeepExpiredF extends Component{
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
                title: 'Tháng giới hạn', //2
                dataIndex: 'THANGGIOIHAN',
                width: 200,
                editable: true,
            },
            {
                title: 'Lãi suất áp dụng', //3
                dataIndex: 'LS_TOIDA',
                editable: true,
                width: 200
            },
            {
                title: 'Ngày tạo', //4
                dataIndex: 'NGAYTAO',
                width: 200
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
                                    <Icon type="edit" style={{color: editingKey === '' ? '#096dd9' : '#bfbfbf', fontSize: 16}} onClick={() => editingKey === '' && this.onEdit(record.key, 1)}/>
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Tooltip title="Điều chỉnh lãi suất">
                                    <Icon type="tool" style={{color: editingKey === '' ? '#17ac17' : '#bfbfbf', fontSize: 16}} onClick={() => editingKey === '' && this.onEdit(record.key, 2)}/>
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Tooltip title="Lịch sử điều chỉnh">
                                    <Icon type="history" style={{color: editingKey === '' ? '#f25101' : '#bfbfbf', fontSize: 16}} onClick={()=> this.onActionInterestStatus(record.LICHSUCAPNHAT)}/>
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.LAISUAT_ID)}>
                                    <Tooltip title="Xóa" className="pointer" placement="right">
                                        <Icon type="delete" style={{color: editingKey === '' ? '#f5222d' : '#bfbfbf', fontSize: 16}}/>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                         : null
                    )
                },
                width: 200
            },
        ];
        
        this.state = {
            dataSource: [],
            count: 2,
            isLoading: true,
            openModal: false,
            statusEdit: 1,
            editingKey: '',
            lstDataHistory: [],
            openModalHistory: false
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListInterestRateNoReturn();
            if(res.data){
                const lstTmp = await res.data.filter(item => item.FLAG === 1).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "key": i + 1
                    }
                })
                
                this.setState({
                    dataSource: lstTmp, 
                    editingKey: '', 
                    isLoading: false 
                });
            }else{
                common.notify("error", "Thao tác thất bại :(");
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

    handleOpenModalHistory = ()=>{
        this.setState({openModalHistory: true});
    }

    handleCloseModalHistory = ()=>{
        this.setState({openModalHistory: false});
    }

    onActionInterestStatus = (dataHistory)=>{
        this.setState({openModalHistory: true, lstDataHistory: JSON.parse(dataHistory)});
    }

    handleSaveEdit = async(data)=>{
        try {
            const res = await updateListInterestRateNoReturn(data);
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
                "LAISUAT_ID": id
            }
            const res = await deleteListInterestRateNoReturn(dataTmp);
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
                    "LAISUAT_ID": item.LAISUAT_ID,
                    "KIEUDULIEU": this.state.statusEdit
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

    onEdit(key, status) {
        this.setState({ editingKey: key, statusEdit: status });
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
                    record, //setting type input(date, number ...)
                    inputType: col.dataIndex === 'NGAYAPDUNG' ? 'date' : col.dataIndex === 'TRANGTHAI' ? 'options' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return(
            <div>
                <ModalShowHistory isOpen={this.state.openModalHistory} isCloseModal={this.handleCloseModalHistory} data={this.state.lstDataHistory}/>
                <ModalInterestRateNoKeepExpired isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}/>
                <div className="p-top10" style={{padding: 10}}>
                    <Button className="btn-add-right" onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 10 }}>
                        <span>Thêm mới</span>
                    </Button>
                    <div className="p-top10" style={{ padding: 10 }}>
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
            </div>
        )
    }
}

const InterestRateNoKeepExpired = Form.create()(InterestRateNoKeepExpiredF);

const mapStateToProps = state =>{
    return{
        lstInterestRateNoReturn: state.interestRateNoReturn.data,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListInterestRateNoReturn: ()=> dispatch(getListInterestRateNoReturn())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (InterestRateNoKeepExpired);