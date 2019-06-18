import React, {Component} from 'react';
import { Table, Button, Popconfirm, Icon, Tooltip, Form, Tag} from 'antd';
import ModalAssetBond from './ModalAssetBond';
import {updateItemBondsAsset, deleteItemBondsAsset} from '../../api/api';
import {EditableContext, EditableCell} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';

import {connect} from 'react-redux';
import {getListBondsAsset} from '../../stores/actions/bondsAssetAction';
import {getListFrefix} from '../../stores/actions/prefixAction';
import {getListContractVCSC} from '../../stores/actions/contractVCSCAction';
import {getListCompany} from '../../stores/actions/companyAction';
import {getListEnsureAsset} from '../../stores/actions/ensureAssetAction';
import {getListPaymentTerm} from '../../stores/actions/paymentTermAction';
import {getListDayInterestYear} from '../../stores/actions/dayInterestYearAction';
import {getListBondType} from '../../stores/actions/bondTypeAction';

class AssetBondF extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'id',
                editable: true,
                width: 30,
                fixed: 'left',
            },
            {
                title: 'MS T.Phiếu', //1
                dataIndex: 'code_bond',
                editable: true,
                width: 150
            },
            {
                title: 'Số H.Đồng', //2
                dataIndex: 'code_contract',
                width: 250
            },
            {
                title: 'D.Nghiệp', //3
                dataIndex: 'code_enterprise',
                width: 150
            },
            {
                title: 'K.Han Vay', //4
                dataIndex: 'code_term_borrow',
                width: 150
            },
            {
                title: 'K.Han T.Toán', //5
                dataIndex: 'code_term_pay',
                width: 150
            },
            {
                title: 'Loại T.Phiếu', //6
                dataIndex: 'type_bond',
                width: 150
            },
            {
                title: 'Ngày tính lãi năm', //7
                dataIndex: 'total_day_interest',
                width: 150
            },
            {
                title: 'L.Suất H.Hành', //8
                dataIndex: 'current_interest',
                width: 150
            },
            {
                title: 'Mã viết tắt', //9
                dataIndex: 'sort_name',
                width: 150
            },
            {
                title: 'TT Trái phiếu', //10
                dataIndex: 'info_bond',
                width: 350
            },
            {
                title: 'Mệnh giá', //11
                dataIndex: 'denomination',
                width: 150
            },
            {
                title: 'SL P.Hành (max)', //12
                dataIndex: 'max_release',
                width: 150
            },
            {
                title: 'SL đã P.hành', //13
                dataIndex: 'released',
                width: 150
            },
            {
                title: 'SL Lưu hành', //14
                dataIndex: 'totalOfCirculate',
                width: 150
            },
            {
                title: 'SL Thu hồi', //15
                dataIndex: 'totalRecall',
                width: 150
            },
            {
                title: 'Ngày phát hành', //16
                dataIndex: 'day_release',
                width: 150
            },
            {
                title: 'Ngày đáo hạn', //17
                dataIndex: 'day_expire',
                width: 150
            },
            {
                title: 'KT p.Hành', //18
                dataIndex: 'day_break',
                width: 150
            },
            {
                title: 'Tổng hạn mức huy động', //19
                dataIndex: 'level_mobilize',
                width: 200
            },
            {
                title: 'Hạn mức cho', //20
                dataIndex: 'level_loan',
                width: 200
            },
            {
                title: 'Kỳ hạn còn lại', //21
                dataIndex: 'period_remain',
                width: 200
            },
            {
                title: 'T.T N.Yết', //22
                dataIndex: 'status_listed',
                width: 100
            },
            {
                title: 'Tài sản đảm bảo', //23
                dataIndex: 'asset_cover',
                width: 200
            },
            {
                title: 'S.Lượng Lưu ký', //24
                dataIndex: 'total_depository',
                width: 200
            },
            {
                title: 'Ngày tạo', //4
                dataIndex: 'NGAYTAO',
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
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Xóa dòng này?" onConfirm={() => editingKey === '' && this.handleDelete(record.BONDID)}>
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
            lstPrefix: [],
            lstContractVCSC: [],
            lstCompany: [],
            lstEnsureAsset: [],
            lstPaymentTerm: [],
            lstBondType: [],
            lstDayInterestYear: [],
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    async componentDidMount(){
        try {
            const lstPrefix = await this.props.getListPrefix();
            const lstContractVCSC = await this.props.getListContractVCSC();
            const lstCompany = await this.props.getListCompany();
            const lstEnsureAsset = await this.props.getListEnsureAsset();
            const lstPaymentTerm = await this.props.getListPaymentTerm();
            const lstBondType = await this.props.getListBondType();
            const lstDayInterestYear = await this.props.getListDayInterestYear();
            this.setState(
                {
                    lstPrefix: lstPrefix.data,
                    lstContractVCSC: lstContractVCSC.data,
                    lstCompany: lstCompany.data,
                    lstEnsureAsset: lstEnsureAsset.data,
                    lstPaymentTerm: lstPaymentTerm.data,
                    lstBondType: lstBondType.data,
                    lstDayInterestYear: lstDayInterestYear.data,
                }
            );
        } catch (error) {
            common.notify('warning', 'Không thể load danh sách data :( ');
        }
        await this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListBondsAsset();
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAYPH": common.convertDDMMYYYY(item.NGAYPH),
                        "NGAY_DH": common.convertDDMMYYYY(item.NGAY_DH),
                        "NGAY_KTPH": common.convertDDMMYYYY(item.NGAY_KTPH),
                        "lstCompanyData": this.props.lstCompany,
                        "lstBranchVCSCData": this.props.lstBranchVCSC,
                        "key": i + 1
                    }
                })
                this.setState({dataSource: lstTmp, editingKey: '' });
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
            const res = await updateItemBondsAsset(data);
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
                "BONDID": id
            }
            const res = await deleteItemBondsAsset(dataTmp);
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
                    "BONDID": item.BONDID,
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
                    inputType: col.dataIndex === 'NGAYCAP' ? 'date' : (col.dataIndex === ('MS_LOAINDT' || 'MS_NGUOIGIOITHIEU') ? 'select' : 'text') ,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return(
            <div>
                <ModalAssetBond isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} reloadData={this.handleReloadData}
                    lstPrefixData={this.state.lstPrefix}
                    lstContractVCSCData={this.state.lstContractVCSC}
                    lstCompanyData={this.state.lstCompany}
                    lstEnsureAssetData={this.state.lstEnsureAsset}
                    lstPaymentTermData={this.state.lstPaymentTerm}
                    lstBondTypeData={this.state.lstBondType}
                    lstDayInterestYearData={this.state.lstDayInterestYear}
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
                            scroll={{x: '250%' }}
                        />
                    </EditableContext.Provider>
                </div>
            </div>
        )
    }
}

const AssetBond = Form.create()(AssetBondF);

const mapStateToProps = state =>{
    return{
        lstCompany: state.company.data,
        lstBranchVCSC: state.branchVCSC.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListBondsAsset: ()=> dispatch(getListBondsAsset()),
        getListPrefix: ()=> dispatch(getListFrefix()),
        getListContractVCSC: ()=> dispatch(getListContractVCSC()),
        getListCompany: ()=> dispatch(getListCompany()),
        getListEnsureAsset: ()=> dispatch(getListEnsureAsset()),
        getListPaymentTerm: ()=> dispatch(getListPaymentTerm()),
        getListBondType: ()=> dispatch(getListBondType()),
        getListDayInterestYear: ()=> dispatch(getListDayInterestYear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AssetBond);