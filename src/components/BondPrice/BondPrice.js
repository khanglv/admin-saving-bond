import React, {Component} from 'react';
import { Table, Button, Popconfirm, Icon, Tooltip, Form, Tag} from 'antd';
import ModalBondPrice from './ModalBondPrice';
import {updateItemBondPrice, deleteItemBondPrice} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';

import {connect} from 'react-redux';
import {getListBondPrice} from '../../stores/actions/bondPriceAction';
import {getListBondsAsset} from '../../stores/actions/bondsAssetAction';

class BondPriceF extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 30,
            },
            {
                title: 'Trái phiếu',
                dataIndex: 'MSTP',
                tmpData: 'BOND_ID',
                editable: true,
                width: 150
            },
            {
                title: 'Giá trị hiên tại',
                dataIndex: 'GIATRI_HIENTAI',
                editable: true,
                width: 150
            },
            {
                title: 'Ngày áp dụng',
                dataIndex: 'NGAY_AP',
                editable: true,
                width: 150
            },
            {
                title: 'Ngày hiện hành',
                dataIndex: 'NGAY_HH',
                editable: true,
                width: 150
            },
            {
                title: 'Ghi chú', //13
                dataIndex: 'GHICHU',
                editable: true,
                width: 200
            },
            {
                title: 'Trạng thái',
                dataIndex: 'TRANGTHAI',
                width: 70,
                editable: true,
                render: TRANGTHAI =>{
                    let type = "check-circle";
                    let color = "green";
                    if(TRANGTHAI === 0){
                        type="close-circle";
                        color="#faad14"
                    }
                    if(TRANGTHAI === 2){
                        type="stop";
                        color="#1890ff"
                    }
                    return(
                        <div className="text-center">
                            <Icon type={type} style={{color: color}} theme="filled" />
                        </div>
                    )
                }
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                width: 150,
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
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSGIATRI)}>
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
            editingKey: '',
            lstBondsAsset: [],
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    async componentDidMount(){
        try {
            const lstBondsAsset = await this.props.getListBondsAsset();
            this.setState(
                {
                    lstBondsAsset: lstBondsAsset.data,
                }
            );
        } catch (error) {
            common.notify('warning', 'Không thể load danh sách data :( ');
        }
        await this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListBondPrice();
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAY_AP": common.convertDDMMYYYY(item.NGAY_AP),
                        "NGAY_HH": common.convertDDMMYYYY(item.NGAY_HH),
                        "GIATRI_HIENTAI": common.convertTextDecimal(item.GIATRI_HIENTAI),
                        "lstBondsAssetData": this.props.lstBondsAsset,
                        "key": i + 1
                    }
                })
                this.setState({dataSource: lstTmp, editingKey: '' });
            }
        } catch (error) {
            console.log("err load data " + error);
            common.notify('error', 'Thao tác thất bại :( ');
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
            const res = await updateItemBondPrice(data);
            if(res.error){
                this.loadData();
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                await this.loadData();
                await common.notify('success', 'Thao tác thành công ^^!');
            }
        } catch (error) {
            common.notify('error', 'Thao tác thất bại :( ');
        }
    }

    handleDelete = async(id) => {
        try{
            let dataTmp = {
                "MSGIATRI": id
            }
            const res = await deleteItemBondPrice(dataTmp);
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                await this.loadData();
                await common.notify('success', 'Thao tác thành công ^^!');
            }
        }catch(err){
            common.notify('error', 'Thao tác thất bại :( ');
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
                    "MSGIATRI": item.MSGIATRI,
                    "BOND_ID": row.MSTP
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
                    inputType: ['NGAY_AP', 'NGAY_HH'].indexOf(col.dataIndex) > -1 ? 'date' : col.dataIndex === 'TRANGTHAI' ? 'option_2' : col.dataIndex === 'MSTP' ? 'select' : 'text' ,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    tmpData: col.tmpData,
                    editing: this.isEditing(record),
                }),
            };
        });

        return(
            <div>
                <ModalBondPrice isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}
                    lstBondsAssetData={this.state.lstBondsAsset}
                />
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

const BondPrice = Form.create()(BondPriceF);

const mapStateToProps = state =>{
    return{
        lstBondsAsset: state.bondsAsset.data,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListBondsAsset: ()=> dispatch(getListBondsAsset()),
        getListBondPrice: ()=> dispatch(getListBondPrice()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BondPrice);