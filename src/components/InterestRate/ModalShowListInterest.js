import React, {Component} from 'react';
import { 
    Modal,
    Table,
    Badge,
    Icon,
    Popconfirm,
    Tooltip,
    Tag,
    Form
} from 'antd';
import { updateItemInterestRate, updateListInterestBuyStatus } from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';
import * as formula from '../Common/Formula';

import {connect} from 'react-redux';
import {getListInterestBuyStatus} from '../../stores/actions/interestRateAction';

class ModalShowListInterestF extends Component{

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Ngày tạo',
                dataIndex: 'NGAYTAO',
                width: 100,
            },
            {
                title: 'Ngày áp dụng', //1
                dataIndex: 'NGAYBATDAU',
                editable: true,
                width: 200
            },
            {
                title: 'Ngày kết thúc', //1
                dataIndex: 'NGAYKETTHUC',
                editable: true,
                width: 200
            },
            {
                title: 'Lãi suất (%)', //1
                dataIndex: 'LS_TOIDA',
                editable: true,
                width: 100
            },
            {
                title: 'Trạng thái', //13
                dataIndex: 'TRANGTHAI',
                width: 120,
                render: TRANG_THAI => {
                    let color = 'green';
                    let text = 'Hoạt động';
                    if(TRANG_THAI === 0){
                        color = '#bfbfbf';
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
                title: 'Action', //1
                dataIndex: 'Action',
                width: 100,
                render: (text, record)=>{
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
                        record.TRANGTHAI === 2 ? 
                        <div>
                            <Popconfirm title="Duyệt lãi suất này?" onConfirm={() => this.handleOk(record)}>
                                <Tooltip title="Duyệt" className="pointer" placement="left">
                                    <Icon type="check" style={{ color: '#1cd356', fontSize: 16 }} />
                                </Tooltip>
                            </Popconfirm>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Tooltip title="Chỉnh sửa">
                                <Icon type="edit" style={{color: editingKey === '' ? '#096dd9' : '#bfbfbf', fontSize: 16}} onClick={() => editingKey === '' && this.onEdit(record.key)}/>
                            </Tooltip>
                        </div> : null
                    )
                }
            }
        ]
        const value = props.value || {};

        this.state = {
            currency: value.currency || 'Open',
            editingKey: '',
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    setModal2Visible =()=> {
        this.props.isCloseModal();
        this.setState({ editingKey: '' });
    }

    handleOk = async(record)=> {
        if(formula.dateToTime(common.convertDDMMYYYY(new Date())) < formula.dateToTime(record.NGAYBATDAU)){
            common.notify("warning", "Chưa tới thời gian, không thể hoạt động lãi suất này");
        }else if(formula.dateToTime(common.convertDDMMYYYY(new Date())) > formula.dateToTime(record.NGAYKETTHUC)){
            common.notify("warning", "Đã quá hạn bạn không thể hoạt động lãi suất này");
        }else{
            try {
                const req = await updateItemInterestRate({
                    TRANGTHAI: 1,
                    MSLS: record.MSLS,
                    BOND_ID: record.BOND_ID
                });
                if(!req.error) {
                    this.props.reloadData();
                    common.notify("success", "Thao tác thành công !!!");
                }else{
                    common.notify("error", "Thao tác thất bại :(");
                }
            } catch (err) {
                common.notify("error", "Thao tác thất bại :(");
            }
        }
    }

    handleSaveEdit = async(data)=>{
        try {
            const res = await updateListInterestBuyStatus(data);
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                this.setState({ editingKey: '' });
                await this.props.getListInterestBuyStatus(data.BONDID);
                await common.notify('success', 'Thao tác thành công ^^!');
            }
        } catch (error) {
            common.notify('error', 'Thao tác thất bại :( ' + error);
        }
    }

    save = (form, record)=> {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const dataTmp = this.props.lstInterestStatusData.map((item, i)=>{
                return {
                    ...item,
                    "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                    "NGAYBATDAU": common.convertDDMMYYYY(item.NGAYBATDAU),
                    "NGAYKETTHUC": common.convertDDMMYYYY(item.NGAYKETTHUC),
                    "key": i + 1
                }
            });
            const newData = [...dataTmp];
            const index = newData.findIndex(item => record.key === item.key);
            if (index > -1) {
                const item = newData[index];
                row = {
                    ...row,
                    "MSLS": item.MSLS,
                    "BONDID": item.BOND_ID,
                    "LAISUAT_MUA": row.LS_TOIDA
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

    handleCurrencyChange = currency => {
        this.setState({ currency });
    };

    render(){
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
                    editing: this.isEditing(record),
                }),
            };
        });
        const dataTmp = this.props.lstInterestStatusData.map((item, i)=>{
            return {
                ...item,
                "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                "NGAYBATDAU": common.convertDDMMYYYY(item.NGAYBATDAU),
                "NGAYKETTHUC": common.convertDDMMYYYY(item.NGAYKETTHUC),
                "key": i + 1
            }
        });
        return(
            <Modal
                title="Danh sách lãi suất mua"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                footer={null}
                width='70%'
            >
                <div className="p-top10" style={{ padding: 10 }}>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        dataSource={dataTmp}
                        size="small"
                        columns={columns}
                        pagination={false}
                    />
                </EditableContext.Provider>
                </div>
            </Modal>
        )
    }
}

const ModalShowListInterest = Form.create()(ModalShowListInterestF);

const mapStateToProps = state =>{
    return{
        lstInterestStatusData: state.interestRate.lstInterestStatus
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListInterestBuyStatus: (idbond)=> dispatch(getListInterestBuyStatus(idbond))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ModalShowListInterest);