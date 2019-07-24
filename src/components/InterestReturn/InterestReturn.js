import React, {Component} from 'react';
import { Table, Button, Popconfirm, Icon, Tooltip, Form, Tag, Badge} from 'antd';
import ModalInterestReturn from './ModalInterestReturn';
import {deleteListInterestReturn, updateListInterestReturn} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';

import {connect} from 'react-redux';
import {getListInterestReturn} from '../../stores/actions/interestReturnAction';
import {getListBondsAsset} from '../../stores/actions/bondsAssetAction';

class InterestReturnF extends Component{
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
                title: 'Lãi tái đầu tư (%)', //3
                dataIndex: 'LS_TOIDA',
                editable: true,
                width: 100
            },
            {
                title: 'Ngày áp dụng', //4
                dataIndex: 'NGAYAPDUNG',
                editable: true,
                width: 100
            },
            {
                title: 'Ngày kết thúc', //4
                dataIndex: 'NGAYKETTHUC',
                width: 100,
                editable: true,
            },
            {
                title: 'Trang thái', //22
                dataIndex: 'TRANGTHAI',
                editable: true,
                width: 100,
                render: TRANGTHAI =>{
                    let text = "Hoạt động";
                    let color = "green";
                    if(TRANGTHAI === 0){
                        text = "Không hoạt động";
                        color="#faad14"
                    }
                    return(
                        <Badge color={color} text={text} />
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
                                <Tooltip title="Điều chỉnh lãi suất">
                                    <Icon type="line-chart" style={{color: editingKey === '' ? 'green' : '#bfbfbf', fontSize: 16}} onClick={() => editingKey === '' && this.onEdit(record.key)}/>
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSLSTDT)}>
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
            isLoading: true,
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
            const res = await this.props.getListInterestReturn();
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAYAPDUNG": common.convertDDMMYYYY(item.NGAYAPDUNG),
                        "NGAYKETTHUC": common.convertDDMMYYYY(item.NGAYKETTHUC),
                        "key": i + 1
                    }
                })
                this.setState({dataSource: lstTmp, editingKey: '', isLoading: false });
            }
            await this.props.getListBondsAsset();
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
            const res = await updateListInterestReturn(data);
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

    handleDelete = async(code) => {
        try{
            let dataTmp = {
                "MSLSTDT": code
            }
            const res = await deleteListInterestReturn(dataTmp);
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
                    "MSLSTDT": item.MSLSTDT
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
                    inputType: ['NGAYAPDUNG', 'NGAYKETTHUC'].indexOf(col.dataIndex) > -1 ? 'date' : col.dataIndex === 'TRANGTHAI' ? 'options' : 'text' ,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return(
            <div>
                <ModalInterestReturn isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData} lstBondsAssetData={this.props.lstBondsAsset}/>
                <div className="p-top10" style={{padding: 10}}>
                    <Button className="right" onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 10, zIndex: 1000 }}>
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

const InterestReturn = Form.create()(InterestReturnF);

const mapStateToProps = state =>{
    return{
        lstInterestReturn: state.interestReturn.data,
        lstBondsAsset: state.bondsAsset.data,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListInterestReturn: ()=> dispatch(getListInterestReturn()),
        getListBondsAsset: ()=> dispatch(getListBondsAsset()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (InterestReturn);