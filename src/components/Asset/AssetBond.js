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
                dataIndex: 'key',
                width: 30,
                fixed: 'left',
            },
            {
                title: 'MS T.Phiếu', //1
                dataIndex: 'MSTP',
                width: 150
            },
            {
                title: 'Số H.Đồng', //2
                dataIndex: 'SO_HD',
                tmpData: 'SO_HD',
                editable: true,
                width: 250
            },
            {
                title: 'D.Nghiệp', //3
                dataIndex: 'TEN_DN',
                tmpData: 'MS_DN',
                editable: true,
                width: 250
            },
            {
                title: 'TS đảm bảo', //4
                dataIndex: 'TENTAISANDAMBAO',
                tmpData: 'MS_TSDB',
                editable: true,
                width: 150
            },
            {
                title: 'K.Hạn T.Toán', //5
                dataIndex: 'MS_KYHANTT',
                tmpData: 'MS_KYHANTT',
                editable: true,
                width: 150
            },
            {
                title: 'Loại T.Phiếu', //6
                dataIndex: 'TENLOAI_TP',
                tmpData: 'MS_LTP',
                editable: true,
                width: 150
            },
            {
                title: 'Ngày tính lãi năm', //7
                dataIndex: 'SONGAYTINHLAI',
                tmpData: 'MS_NTLTN',
                editable: true,
                width: 150
            },
            {
                title: 'L.Suất H.Hành', //8
                dataIndex: 'LAISUAT_HH',
                editable: true,
                width: 150
            },
            {
                title: 'Mã viết tắt', //9
                dataIndex: 'MAVIETTAT',
                editable: true,
                width: 150
            },
            {
                title: 'TT Trái phiếu', //10
                dataIndex: 'TT_TRAIPHIEU',
                editable: true,
                width: 350
            },
            {
                title: 'Mệnh giá', //11
                dataIndex: 'MENHGIA',
                editable: true,
                width: 150
            },
            {
                title: 'SL P.Hành (max)', //12
                dataIndex: 'SL_PHTD',
                editable: true,
                width: 150
            },
            {
                title: 'SL đã P.hành', //13
                dataIndex: 'SL_DPH',
                editable: true,
                width: 150
            },
            {
                title: 'SL Lưu hành', //14
                dataIndex: 'SL_LH',
                editable: true,
                width: 150
            },
            {
                title: 'SL Thu hồi', //15
                dataIndex: 'SL_TH',
                editable: true,
                width: 150
            },
            {
                title: 'Ngày phát hành', //16
                dataIndex: 'NGAYPH',
                editable: true,
                width: 150
            },
            {
                title: 'Ngày đáo hạn', //17
                dataIndex: 'NGAYDH',
                editable: true,
                width: 150
            },
            {
                title: 'KT P.Hành', //18
                dataIndex: 'NGAY_KTPH',
                editable: true,
                width: 150
            },
            {
                title: 'Tổng hạn mức huy động', //19
                dataIndex: 'TONGHANMUC_HUYDONG',
                editable: true,
                width: 200
            },
            {
                title: 'Hạn mức cho', //20
                dataIndex: 'HANMUC_CHO',
                editable: true,
                width: 200
            },
            {
                title: 'Kỳ hạn còn lại', //21
                dataIndex: 'KYHAN_CONLAI',
                editable: true,
                width: 200
            },
            {
                title: 'T.T N.Yết', //22
                dataIndex: 'TT_NIEMYET',
                editable: true,
                width: 100,
                render: TT_NIEMYET =>{
                    let type = "check-circle";
                    let color = "green";
                    if(TT_NIEMYET === 0){
                        type="stop";
                        color="#faad14"
                    }
                    return(
                        <div className="text-center">
                            <Icon type={type} style={{color: color}} theme="filled" />
                        </div>
                    )
                }
            },
            {
                title: 'Tài sản đảm bảo', //23
                dataIndex: 'TS_DAMBAO',
                editable: true,
                width: 200
            },
            {
                title: 'S.Lượng Lưu ký', //24
                dataIndex: 'SL_LUUKY',
                editable: true,
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
                        "NGAYDH": common.convertDDMMYYYY(item.NGAYDH),
                        "NGAY_KTPH": common.convertDDMMYYYY(item.NGAY_KTPH),
                        "lstContractVCSCData": this.props.lstContractVCSC,
                        "lstCompanyData": this.props.lstCompany,
                        "lstEnsureAssetData": this.props.lstEnsureAsset,
                        "lstPaymentTermData": this.props.lstPaymentTerm,
                        "lstBondTypeData": this.props.lstBondType,
                        "lstDayInterestYearData": this.props.lstDayInterestYear,
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
                    "MSTP": item.MSTP,
                    "SO_HD": row.SO_HD,
                    "MS_DN": row.TEN_DN,
                    "MS_TSDB": row.TENTAISANDAMBAO,
                    "MS_KYHANTT": row.MS_KYHANTT,
                    "MS_LTP": row.TENLOAI_TP,
                    "MS_NTLTN": row.SONGAYTINHLAI
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
                    inputType: ['NGAYPH', 'NGAYDH', 'NGAY_KTPH'].indexOf(col.dataIndex) > -1 ? 'date' : ['TEN_DN', 'TENTAISANDAMBAO', 'MS_KYHANTT', 'TENLOAI_TP', 'SONGAYTINHLAI', 'SO_HD'].indexOf(col.dataIndex) > -1 ? 'select' : (col.dataIndex === 'TT_NIEMYET' ? 'options' : 'text') ,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    tmpData: col.tmpData,
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
        lstContractVCSC: state.contractVCSC.data,
        lstCompany: state.company.data,
        lstEnsureAsset: state.ensureAsset.data,
        lstPaymentTerm: state.paymentTerm.data,
        lstBondType: state.bondType.data,
        lstDayInterestYear: state.dayInterestYear.data,
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