import React, {Component} from 'react';
import { Table, Button, Popconfirm, notification, Icon, Tooltip, Form, Tag} from 'antd';
import ModalBondHolder from './ModalBondHolder';
import {updateItemInvestor, deleteItemInvestor} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';
import {connect} from 'react-redux';
import {getListAssets} from '../../stores/actions/listAssetsAction';
import {getListBondsAsset} from '../../stores/actions/bondsAssetAction';
import {getListInvestor} from '../../stores/actions/investorAction';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class BondHolderF extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 20,
                fixed: 'left',
                color: 'red'
            },
            {
                title: 'Nhà đầu tư', //2
                dataIndex: 'TENNDT',
                width: 200,
            },  
            {
                title: 'Trái phiếu', //3
                dataIndex: 'MSTP',
                editable: true,
                width: 200
            },
            {
                title: 'Số hợp đồng', //3
                dataIndex: 'SO_HD',
                editable: true,
                width: 200
            },
            {
                title: 'Số lượng',
                dataIndex: 'SOLUONG',
                width: 100,
                editable: true,
            },
            {
                title: 'Mệnh giá',
                dataIndex: 'DONGIA',
                width: 200,
                editable: true,
            },
            {
                title: 'Tổng giá trị',
                dataIndex: 'TONGGIATRI',
                width: 250,
                editable: true,
            },
            {
                title: 'Lãi suất (%)',
                dataIndex: 'LAISUAT_HH',
                width: 150,
                editable: true,
            },
            {
                title: 'Số ngày nắm giữ',
                dataIndex: 'SONGAYNAMGIU',
                width: 150,
                editable: true,
            },
            {
                title: 'Ngày mua',
                dataIndex: 'NGAYMUA',
                width: 150,
                editable: true,
            },
            {
                title: 'Ngày phát hành',
                dataIndex: 'NGAYPH',
                width: 150,
                editable: true,
            },
            {
                title: 'Ngày đáo hạn',
                dataIndex: 'NGAYDH',
                width: 150,
                editable: true,
            },
            {
                title: 'S.Lượng khả dụng',
                dataIndex: 'SL_KHADUNG',
                width: 150,
                editable: true,
            },
            {
                title: 'S.Lượng đã bán',
                dataIndex: 'SL_DABAN',
                width: 150
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                fixed: 'right',
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
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSNDT)}>
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
            openModal: false,
            editingKey: ''
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    async componentDidMount(){
        try {
            await this.props.getListBondsAsset();
            await this.props.getListInvestor();
        } catch (error) {
            
        }
        await this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListAssets();
            const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                return {
                    ...item,
                    "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                    "NGAYMUA": common.convertDDMMYYYY(item.NGAYMUA),
                    "NGAYPH": common.convertDDMMYYYY(item.NGAYPH),
                    "NGAYDH": common.convertDDMMYYYY(item.NGAYDH),
                    "SONGAYNAMGIU": common.convertTextDecimal(item.SONGAYNAMGIU),
                    "DONGIA": common.convertTextDecimal(item.DONGIA),
                    "TONGGIATRI": common.convertTextDecimal(item.TONGGIATRI),
                    "lstInvestorType": this.props.lstInvestorType,
                    "key": i + 1
                }
            })
            await this.setState({dataSource: lstTmp, editingKey: '' });
        } catch (error) {
            common.notify("error", "Thao tác thất bại, thử lại :(");
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
                <ModalBondHolder isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}
                    lstBondsAssetData={this.props.lstBondsAsset}
                    lstInvestorData={this.props.lstInvestor}
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
                            scroll={{x: '125%'}}
                        />
                    </EditableContext.Provider>
                </div>
            </div>
        )
    }
}

const BondHolder = Form.create()(BondHolderF);

const mapStateToProps = state =>{
    return{
        lstBondsAsset: state.bondsAsset.data,
        lstInvestor: state.investor.data,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListAssets: ()=> dispatch(getListAssets()),
        getListBondsAsset: ()=> dispatch(getListBondsAsset()),
        getListInvestor: ()=> dispatch(getListInvestor()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BondHolder);