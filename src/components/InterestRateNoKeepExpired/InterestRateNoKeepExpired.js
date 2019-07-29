import React, {Component} from 'react';
import { Table, Button, Popconfirm, Icon, Tooltip, Form, Tag, Badge} from 'antd';
import ModalInterestRateNoKeepExpired from './ModalInterestRateNoKeepExpired';
import {deleteItemFeeTrade, updateItemFeeTrade} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';
import {connect} from 'react-redux';
import {getListFeeTrade} from '../../stores/actions/feeTradeAction';

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
                width: 100,
                editable: true,
            },
            {
                title: 'Lãi suất áp dụng', //3
                dataIndex: 'LS_TOIDA',
                editable: true,
                width: 100
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
                                    <Icon type="edit" style={{color: editingKey === '' ? '#096dd9' : '#bfbfbf', fontSize: 16}} onClick={() => editingKey === '' && this.onEdit(record.MSPHI)}/>
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.MSPHI)}>
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
            dataSource_2: [],
            dataSource_3: [],
            count: 2,
            isLoading: true,
            openModal: false,
            editingKey: ''
        };
    }

    isEditing = record => record.MSPHI === this.state.editingKey;

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListFeeTrade();
            if(res.data){
                const lstTmp = await (res.data.filter(item => item.FLAG === 1 && item.LOAIGIAODICH === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "PHIMIN": common.convertTextDecimal(item.PHIMIN),
                        "PHIMAX": common.convertTextDecimal(item.PHIMAX),
                        "NGAYAPDUNG": common.convertDDMMYYYY(item.NGAYAPDUNG),
                        "key": i + 1
                    }
                })
                const lstTmp_2 = await (res.data.filter(item => item.FLAG === 1 && item.LOAIGIAODICH === 2)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "PHIMIN": common.convertTextDecimal(item.PHIMIN),
                        "PHIMAX": common.convertTextDecimal(item.PHIMAX),
                        "NGAYAPDUNG": common.convertDDMMYYYY(item.NGAYAPDUNG),
                        "key": i + 1
                    }
                })
                const lstTmp_3 = await (res.data.filter(item => item.FLAG === 1 && item.LOAIGIAODICH === 3)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "PHIMIN": common.convertTextDecimal(item.PHIMIN),
                        "PHIMAX": common.convertTextDecimal(item.PHIMAX),
                        "NGAYAPDUNG": common.convertDDMMYYYY(item.NGAYAPDUNG),
                        "key": i + 1
                    }
                })
                await this.setState({
                    dataSource: lstTmp, 
                    editingKey: '', 
                    dataSource_2: lstTmp_2,
                    dataSource_3: lstTmp_3,
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

    handleSaveEdit = async(data)=>{
        try {
            const res = await updateItemFeeTrade(data);
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
                "MSPHI": id
            }
            const res = await deleteItemFeeTrade(dataTmp);
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
            const newData = [...this.props.lstFeeTrade];
            const index = newData.findIndex(item => record.MSPHI === item.MSPHI);
            if (index > -1) {
                const item = newData[index];
                row = {
                    ...row,
                    "MSPHI": item.MSPHI,
                    "LOAIGIAODICH": item.LOAIGIAODICH,
                    "PHIMIN": common.convertDecimalToNumber(row.PHIMIN),
                    "PHIMAX": common.convertDecimalToNumber(row.PHIMAX),
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

    onEdit(MSPHI) {
        this.setState({ editingKey: MSPHI });
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
        lstFeeTrade: state.feeTrade.data,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListFeeTrade: ()=> dispatch(getListFeeTrade())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (InterestRateNoKeepExpired);