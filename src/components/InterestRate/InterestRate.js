import React, {Component} from 'react';
import { Table, Button, Popconfirm, Icon, Tooltip, Form, Tag} from 'antd';
import ModalInterestRate from './ModalInterestRate';
import {updateItemInterestRate, deleteItemInterestRate} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';

import {connect} from 'react-redux';
import {getListInterestRate} from '../../stores/actions/interestRateAction';
import {getListBondsAsset} from '../../stores/actions/bondsAssetAction';

class InterestRateF extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 30,
                fixed: 'left',
            },
            {
                title: 'MS Lãi suất', //1
                dataIndex: 'MSLS',
                width: 150
            },
            {
                title: 'Trái phiếu', //2
                dataIndex: 'MSTP',
                tmpData: 'BOND_ID',
                editable: true,
                width: 150
            },
            {
                title: 'Lãi suất tối đa', //4
                dataIndex: 'LS_TOIDA',
                editable: true,
                width: 150
            },
            {
                title: 'LS VCSC thu hồi', //5
                dataIndex: 'LS_TH',
                editable: true,
                width: 150
            },
            {
                title: 'Lãi suất biên độ', //6
                dataIndex: 'LS_BIENDO',
                editable: true,
                width: 150
            },
            {
                title: 'LS bình quân', //7
                dataIndex: 'LS_BINHQUAN',
                editable: true,
                width: 150
            },
            {
                title: 'Mã N.Hàng 1', //8
                dataIndex: 'MA_NH01',
                editable: true,
                width: 150
            },
            {
                title: 'Mã N.Hàng 2', //9
                dataIndex: 'MA_NH02',
                editable: true,
                width: 150
            },
            {
                title: 'Mã N.Hàng 3', //10
                dataIndex: 'MA_NH03',
                editable: true,
                width: 350
            },
            {
                title: 'Mã N.Hàng 4', //11
                dataIndex: 'MA_NH04',
                editable: true,
                width: 150
            },
            {
                title: 'Mã N.Hàng 5', //12
                dataIndex: 'MA_NH05',
                editable: true,
                width: 150
            },
            {
                title: 'Ghi chú', //13
                dataIndex: 'GHICHU_TT',
                editable: true,
                width: 200
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
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSLS)}>
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
            const res = await this.props.getListInterestRate();
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
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
            const res = await updateItemInterestRate(data);
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
                "MSLS": id
            }
            const res = await deleteItemInterestRate(dataTmp);
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
                    inputType: col.dataIndex === 'MSTP' ? 'select' : 'text' ,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    tmpData: col.tmpData,
                    editing: this.isEditing(record),
                }),
            };
        });

        return(
            <div>
                <ModalInterestRate isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}
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
                            scroll={{x: '130%' }}
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
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListBondsAsset: ()=> dispatch(getListBondsAsset()),
        getListInterestRate: ()=> dispatch(getListInterestRate()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (InterestRate);