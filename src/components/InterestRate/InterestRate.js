import React, {Component} from 'react';
import { Table, Icon, Tooltip, Form, Tag, Button, Badge} from 'antd';
import ModalInterestRate from './ModalInterestRate_2';
import ModalShowListInterest from './ModalShowListInterest';
import {updateItemInterestRate, deleteItemInterestRate} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';

import {connect} from 'react-redux';
import {getListInterestRate, getListInterestBuyStatus} from '../../stores/actions/interestRateAction';
import {getListBondsAsset} from '../../stores/actions/bondsAssetAction';

class InterestRateF extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 30
            },
            {
                title: 'Trái phiếu', //2
                dataIndex: 'MSTP',
                width: 180,
                render: (index, record) =>{
                    return(
                        <div style={{cursor: 'pointer'}} className="codeBond" onClick={()=>this.onActionInterestStatus(record)}>{record.MSTP}</div>
                    )
                }
            },
            {
                title: 'L.Suất mua', //4
                dataIndex: 'LS_TOIDA',
                editable: true,
                width: 120
            },
            {
                title: 'L.Suất biên độ', //6
                dataIndex: 'LS_BIENDO',
                editable: true,
                width: 120
            },
            {
                title: 'Đ.Khoản L.Suất', //13
                dataIndex: 'DIEUKHOAN_LS',
                editable: true,
                width: 200
            },
            {
                title: 'Ngày áp dụng', //4
                dataIndex: 'NGAYBATDAU',
                editable: true,
                width: 120
            },
            {
                title: 'Ngày kết thúc', //4
                dataIndex: 'NGAYKETTHUC',
                editable: true,
                width: 120
            },
            {
                title: 'Trạng thái', //13
                dataIndex: 'TRANGTHAI',
                editable: true,
                width: 120,
                render: TRANG_THAI => {
                    let color = 'green';
                    let text = 'Hoạt động';
                    if(TRANG_THAI === 0){
                        color = 'red';
                        text = 'Đã thay đổi'
                    }
                    if(TRANG_THAI === 2){
                        color = 'orange';
                        text = 'Đang chờ'
                    }
                    return(
                        <span style={{color: color}}><Badge color={color}/>{text}</span>
                    )
                }
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'NGAYTAO',
                width: 120
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
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSLS)}>
                                    <Tooltip title="Xóa" className="pointer" placement="right">
                                        <Icon type="delete" style={{color: editingKey === '' ? '#f5222d' : '#bfbfbf', fontSize: 16}}/>
                                    </Tooltip>
                                </Popconfirm> */}
                            </div>
                         : null
                    )
                }
            },
        ];
        
        this.state = {
            dataSource: [],
            openModal: false,
            openModalListInterest: false,
            isLoading: true,
            editingKey: '',
            lstBondsAsset: [],
            lstInterestStatus: []
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    async componentDidMount(){
        try {
            const lstBondsAsset = await this.props.getListBondsAsset();
            this.setState(
                {
                    lstBondsAsset: lstBondsAsset.data
                }
            );
        } catch (error) {
            common.notify('warning', 'Không thể load danh sách data :( ');
        }
        await this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListInterestRate();
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAYBATDAU": common.convertDDMMYYYY(item.NGAYBATDAU),
                        "NGAYKETTHUC": common.convertDDMMYYYY(item.NGAYKETTHUC),
                        "lstBondsAssetData": this.props.lstBondsAsset,
                        "key": i + 1
                    }
                })
                this.setState({dataSource: lstTmp, editingKey: '', isLoading: false });
            }
        } catch (error) {
            console.log("err load data " + error);
            common.notify('error', 'Thao tác thất bại :( ' + error);
        }
    }

    onActionInterestStatus = async(record)=>{
        try {
            const res = await this.props.getListInterestBuyStatus(record.BOND_ID);
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                this.setState({openModalListInterest: true, lstInterestStatus: res.data});
            }
        } catch (error) {
            common.notify('error', 'Thao tác thất bại :( ' + error);
        }
    }

    handleOpenModal = ()=>{
        this.setState({openModal: true});
    }

    handleCloseModal = ()=>{
        this.setState({openModal: false});
    }

    handleOpenModalListInterest = ()=>{
        this.setState({openModalListInterest: true});
    }

    handleCloseModalListInterest = ()=>{
        this.setState({openModalListInterest: false});
    }

    handleReloadData = ()=>{
        this.setState({openModal: false, openModalListInterest: false});
        this.loadData();
    }

    handleSaveEdit = async(data)=>{
        try {
            const res = await updateItemInterestRate(data);
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
                "MSLS": id
            }
            const res = await deleteItemInterestRate(dataTmp);
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error + res.error);
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
                    "MSLS": item.MSLS,
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
                    inputType: ['NGAYBATDAU', 'NGAYKETTHUC'].indexOf(col.dataIndex) > -1 ? 'date' : 'text' ,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    tmpData: col.tmpData,
                    editing: this.isEditing(record),
                }),
            };
        });
        return(
            <div>
                <ModalShowListInterest isOpen={this.state.openModalListInterest} isCloseModal={this.handleCloseModalListInterest} lstInterestStatusData={this.state.lstInterestStatus} reloadData={this.handleReloadData}/>
                <ModalInterestRate isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}
                    lstBondsAssetData={this.state.lstBondsAsset}
                />
                <div className="p-top10" style={{padding: 10}}>
                    <Button className="btn-add-right" onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 10 }}>
                        <span>Tạo mới lãi suất</span>
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

const InterestRate = Form.create()(InterestRateF);

const mapStateToProps = state =>{
    return{
        lstBondsAsset: state.bondsAsset.data,
        lstInterestBuyStatus: state.interestRate.lstInterestStatus
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListBondsAsset: ()=> dispatch(getListBondsAsset()),
        getListInterestBuyStatus: (idbond)=> dispatch(getListInterestBuyStatus(idbond)),
        getListInterestRate: ()=> dispatch(getListInterestRate()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (InterestRate);
