import React, {Component} from 'react';
import { Table, Button, Popconfirm, Icon, Tooltip, Form, Tag} from 'antd';
import ModalContractVCSC from './ModalContractVCSC';
import {updateItemContractVCSC, deleteItemContractVCSC} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';
import {connect} from 'react-redux';
import {getListContractVCSC} from '../../stores/actions/contractVCSCAction';
import {getListCompany} from '../../stores/actions/companyAction';
import {getListBranchVCSC} from '../../stores/actions/branchVCSCAction';

class ContractVCSCF extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 30,
                color: 'red',
                fixed: 'left',
            },
            {
                title: 'Số hợp đồng', //3
                dataIndex: 'SOHD',
                editable: true,
                width: 200
            },
            {
                title: 'Doanh nghiệp', //3
                dataIndex: 'TEN_DN',
                tmpData: 'MS_DN',
                editable: true,
                width: 280
            },
            {
                title: 'Chi nhánh VCSC', //3
                dataIndex: 'TENCHINHANH',
                tmpData: 'MS_CNVCSC',
                editable: true,
                width: 250
            },
            {
                title: 'Ngày ký', //3
                dataIndex: 'NGAYKY',
                editable: true,
                width: 150
            },
            {
                title: 'Lãi suất', //3
                dataIndex: 'LAISUAT',
                editable: true,
                width: 100
            },
            {
                title: 'Kỳ hạn (tháng)', //3
                dataIndex: 'KYHAN',
                editable: true,
                width: 150
            },
            {
                title: 'Ngày phát hành', //3
                dataIndex: 'NGAY_PH',
                editable: true,
                width: 150
            },
            {
                title: 'Ngày đáo hạn', //3
                dataIndex: 'NGAY_DH',
                editable: true,
                width: 150
            },
            {
                title: 'M.Giá T.Phiếu', //3
                dataIndex: 'MENHGIA_TP',
                editable: true,
                width: 150
            },
            {
                title: 'S.Lượng P.Hành', //3
                dataIndex: 'SOLUONG_PH',
                editable: true,
                width: 150
            },
            {
                title: 'Ngày tạo', //4
                dataIndex: 'NGAYTAO',
                width: 100
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                fixed: 'right',
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
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.SOHD)}>
                                    <Tooltip title="Xóa" className="pointer" placement="right">
                                        <Icon type="delete" style={{color: editingKey === '' ? '#f5222d' : '#bfbfbf', fontSize: 16}}/>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                         : null
                    )
                },
                width: 150
            },
        ];
        
        this.state = {
            dataSource: [],
            openModal: false,
            isLoading: true,
            editingKey: '',
            lstCompany: [],
            lstBranchVCSC: []
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    async componentDidMount(){
        try {
            const lstCompany = await this.props.getListCompany();
            const lstBranchVCSC = await this.props.getListBranchVCSC();
            this.setState({lstCompany: lstCompany.data, lstBranchVCSC: lstBranchVCSC.data});
        } catch (error) {
            common.notify('warning', 'Không thể load danh sách doanh nghiệp hoặc chi nhánh VCSC :( ');
        }
        await this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListContractVCSC();
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAYKY": common.convertDDMMYYYY(item.NGAYKY),
                        "NGAY_PH": common.convertDDMMYYYY(item.NGAY_PH),
                        "NGAY_DH": common.convertDDMMYYYY(item.NGAY_DH),
                        "lstCompanyData": this.props.lstCompany,
                        "lstBranchVCSCData": this.props.lstBranchVCSC,
                        "MENHGIA_TP": common.convertTextDecimal(item.MENHGIA_TP),
                        "SOLUONG_PH": common.convertTextDecimal(item.SOLUONG_PH),
                        "key": i + 1
                    }
                })
                this.setState({dataSource: lstTmp, editingKey: '', isLoading: false });
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
            const res = await updateItemContractVCSC(data);
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
                "SOHD": id
            }
            const res = await deleteItemContractVCSC(dataTmp);
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
                    "SOHD": item.SOHD,
                    "MS_DN": row.TEN_DN,
                    "MS_CNVCSC": row.TENCHINHANH,
                    "MENHGIA_TP": common.convertDecimalToNumber(row.MENHGIA_TP),
                    "SOLUONG_PH": common.convertDecimalToNumber(row.SOLUONG_PH),
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
                    inputType: ['NGAYKY', 'NGAY_PH', 'NGAY_DH'].indexOf(col.dataIndex) > -1 ? 'date' : ['TEN_DN', 'TENCHINHANH'].indexOf(col.dataIndex) > -1 ? 'select' : 'text' ,
                    dataIndex: col.dataIndex,
                    tmpData: col.tmpData,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return(
            <div>
                <ModalContractVCSC 
                    isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}
                    lstCompanyData={this.state.lstCompany} lstBranchVCSCData={this.state.lstBranchVCSC}
                />
                <div className="p-top10" style={{padding: 10}}>
                    <Button className="btn-add-right" onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 10 }}>
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
                            scroll={{x: '120%'}}
                        />
                    </EditableContext.Provider>
                </div>
            </div>
        )
    }
}

const ContractVCSC = Form.create()(ContractVCSCF);

const mapStateToProps = state =>{
    return{
        lstCompany: state.company.data,
        lstBranchVCSC: state.branchVCSC.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListContractVCSC: ()=> dispatch(getListContractVCSC()),
        getListCompany: ()=> dispatch(getListCompany()),
        getListBranchVCSC: ()=> dispatch(getListBranchVCSC()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ContractVCSC);