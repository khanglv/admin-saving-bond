import React, {Component} from 'react';
import { Table, Button, Popconfirm, Icon, Tooltip, Form, Tag, Badge} from 'antd';
import ModalAssetBond from './ModalAssetBond';
import {updateItemBondsAsset, deleteItemBondsAsset} from '../../api/api';
import {EditableContext, EditableCell, ResizeableTitle} from '../EditColumn/EditColumn';
import * as common from '../Common/Common';

import {connect} from 'react-redux';
import {getListBondsAsset} from '../../stores/actions/bondsAssetAction';
import {getListContractVCSC} from '../../stores/actions/contractVCSCAction';
import {getListCompany} from '../../stores/actions/companyAction';
import {getListPaymentTerm} from '../../stores/actions/paymentTermAction';
import {getListDayInterestYear} from '../../stores/actions/dayInterestYearAction';
import {getListBondType} from '../../stores/actions/bondTypeAction';
import {getListInterestRateSale} from '../../stores/actions/interestRateSaleAction';

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
                width: 300
            },
            {
                title: 'K.Hạn T.Toán', //5
                dataIndex: 'LOAI_TT',
                tmpData: 'MS_KYHANTT',
                editable: true,
                width: 150
            },
            {
                title: 'Loại T.Phiếu', //6
                dataIndex: 'TENLOAI_TP',
                tmpData: 'MS_LTP',
                editable: true,
                width:250
            },
            {
                title: 'Ngày tính lãi năm', //7
                dataIndex: 'SONGAYTINHLAI',
                tmpData: 'MS_NTLTN',
                editable: true,
                width: 150
            },
            {
                title: 'L.Suất mua', //8
                dataIndex: 'LAISUAT_MUA',
                editable: true,
                width: 150
            },
            {
                title: 'L.Suất bán', //8
                dataIndex: 'LAISUAT_BAN',
                tmpData: 'MS_LSB',
                editable: true,
                width: 150
            },
            {
                title: 'Mã viết tắt', //9
                dataIndex: 'MAVIETTAT',
                editable: true,
                width: 200
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
                title: 'Kỳ hạn (năm)', //21
                dataIndex: 'KYHAN',
                editable: true,
                width: 150
            },
            {
                title: 'T.T N.Yết', //22
                dataIndex: 'TT_NIEMYET',
                editable: true,
                width: 100,
                render: TT_NIEMYET =>{
                    let text = "Có";
                    let color = "green";
                    if(TT_NIEMYET === 0){
                        text = "Không";
                        color="#faad14"
                    }
                    return(
                        <Badge color={color} text={text} />
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
            isLoading: true,
            columns: this.columns,
            openModal: false,
            editingKey: '',
            lstPrefix: [],
            lstContractVCSC: [],
            lstCompany: [],
            lstEnsureAsset: [],
            lstPaymentTerm: [],
            lstBondType: [],
            lstDayInterestYear: [],
            lstInterestRateSale: []
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    async componentDidMount(){
        try {
            const lstContractVCSC = await this.props.getListContractVCSC();
            const lstCompany = await this.props.getListCompany();
            const lstPaymentTerm = await this.props.getListPaymentTerm();
            const lstBondType = await this.props.getListBondType();
            const lstDayInterestYear = await this.props.getListDayInterestYear();
            const lstInterestRateSale = await this.props.getListInterestRateSale();
            this.setState(
                {
                    lstContractVCSC: lstContractVCSC.data,
                    lstCompany: lstCompany.data,
                    lstPaymentTerm: lstPaymentTerm.data,
                    lstBondType: lstBondType.data,
                    lstDayInterestYear: lstDayInterestYear.data,
                    lstInterestRateSale: lstInterestRateSale.data
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
                common.notify('error', 'Thao tác thất bại :( ' + res.error);
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAYPH": common.convertDDMMYYYY(item.NGAYPH),
                        "NGAYDH": common.convertDDMMYYYY(item.NGAYDH),
                        "NGAY_KTPH": common.convertDDMMYYYY(item.NGAY_KTPH),
                        "MENHGIA": common.convertTextDecimal(item.MENHGIA),
                        "SL_PHTD": common.convertTextDecimal(item.SL_PHTD),
                        "SL_DPH": common.convertTextDecimal(item.SL_DPH),
                        "SL_LH": common.convertTextDecimal(item.SL_LH),
                        "SL_TH": common.convertTextDecimal(item.SL_TH),
                        "HANMUC_CHO": common.convertTextDecimal(item.HANMUC_CHO),
                        "TONGHANMUC_HUYDONG": common.convertTextDecimal(item.TONGHANMUC_HUYDONG),
                        "lstContractVCSCData": this.props.lstContractVCSC,
                        "lstCompanyData": this.props.lstCompany,
                        "lstPaymentTermData": this.props.lstPaymentTerm,
                        "lstBondTypeData": this.props.lstBondType,
                        "lstDayInterestYearData": this.props.lstDayInterestYear,
                        "lstInterestRateSaleData": this.props.lstInterestRateSale,
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
            const res = await updateItemBondsAsset(data);
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
                    "BONDID": item.BONDID,
                    "MSTP": item.MSTP,
                    "SO_HD": row.SO_HD,
                    "MS_DN": row.TEN_DN,
                    "MS_LTP": row.TENLOAI_TP,
                    "MS_NTLTN": row.SONGAYTINHLAI,
                    "MS_KYHANTT": row.LOAI_TT,
                    "MS_LSB": row.LAISUAT_BAN,
                    "NGAYPH": common.convertToFormat(item.NGAYPH),
                    "MENHGIA": common.convertDecimalToNumber(row.MENHGIA),
                    "SL_PHTD": common.convertDecimalToNumber(row.SL_PHTD),
                    "SL_DPH": common.convertDecimalToNumber(row.SL_DPH),
                    "SL_LH": common.convertDecimalToNumber(row.SL_LH),
                    "SL_TH": common.convertDecimalToNumber(row.SL_TH),
                    "HANMUC_CHO": common.convertDecimalToNumber(row.HANMUC_CHO),
                    "TONGHANMUC_HUYDONG": common.convertDecimalToNumber(row.TONGHANMUC_HUYDONG),
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

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });
    };

    render() {
        const components = {
            header: {
                cell: ResizeableTitle,
            },
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.state.columns.map((col, index) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index),
                }),
                onCell: record => ({
                    record,  //setting type input (date, number ...)
                    inputType: ['NGAYDH', 'NGAY_KTPH'].indexOf(col.dataIndex) > -1 ? 'date' : ['TEN_DN', 'TENTAISANDAMBAO', 'LOAI_TT', 'TENLOAI_TP', 'SONGAYTINHLAI', 'SO_HD', 'LAISUAT_BAN'].indexOf(col.dataIndex) > -1 ? 'select' : (col.dataIndex === 'TT_NIEMYET' ? 'options' : 'text') ,
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
                    lstContractVCSCData={this.state.lstContractVCSC}
                    lstCompanyData={this.state.lstCompany}
                    lstEnsureAssetData={this.state.lstEnsureAsset}
                    lstPaymentTermData={this.state.lstPaymentTerm}
                    lstBondTypeData={this.state.lstBondType}
                    lstDayInterestYearData={this.state.lstDayInterestYear}
                    lstInterestRateSaleData={this.state.lstInterestRateSale}
                />
                <div className="p-top10" style={{padding: 10}}>
                    <Button className="btn-add-right" onClick={this.handleOpenModal} type="primary" style={{ marginBottom: 10 }}>
                        <span>Thêm mới</span>
                    </Button>
                    <EditableContext.Provider value={this.props.form}>
                        <Table
                            components={components}
                            bordered
                            dataSource={this.state.dataSource}
                            columns={columns}
                            size="small"
                            loading={this.state.isLoading}
                            pagination={{ pageSize: 15 }}
                            rowClassName="editable-row"
                            scroll={{x: '260%' }}
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
        lstInterestRateSale: state.interestRateSale.data,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListBondsAsset: ()=> dispatch(getListBondsAsset()),
        getListContractVCSC: ()=> dispatch(getListContractVCSC()),
        getListCompany: ()=> dispatch(getListCompany()),
        getListPaymentTerm: ()=> dispatch(getListPaymentTerm()),
        getListBondType: ()=> dispatch(getListBondType()),
        getListDayInterestYear: ()=> dispatch(getListDayInterestYear()),
        getListInterestRateSale: ()=> dispatch(getListInterestRateSale()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AssetBond);