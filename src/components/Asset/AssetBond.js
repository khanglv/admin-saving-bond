import React, {Component} from 'react';
import { Table, Input, Button, Popconfirm, Form, Alert } from 'antd';
import ModalAssetBond from './ModalAssetBond';
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}


class AssetBond extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'id',
                editable: true,
                width: 30
            },
            {
                title: 'MS T.Phiếu', //1
                dataIndex: 'code_bond',
                editable: true,
                width: 100
            },
            {
                title: 'Số H.Đồng', //2
                dataIndex: 'code_contract',
                width: 100
            },
            {
                title: 'MS D.Nghiệp', //3
                dataIndex: 'code_enterprise',
                width: 100
            },
            {
                title: 'K.Han Vay', //4
                dataIndex: 'code_term_borrow',
                width: 100
            },
            {
                title: 'K.Han T.Toán', //5
                dataIndex: 'code_term_pay',
                width: 100
            },
            {
                title: 'Loại T.Phiếu', //6
                dataIndex: 'type_bond',
                width: 100
            },
            {
                title: 'SN tính lãi năm', //7
                dataIndex: 'total_day_interest',
                width: 100
            },
            {
                title: 'L.Suất H.Hành', //8
                dataIndex: 'current_interest',
                width: 50
            },
            {
                title: 'Mã viết tắt', //9
                dataIndex: 'sort_name',
                width: 100
            },
            {
                title: 'TT Trái phiếu', //10
                dataIndex: 'info_bond',
                width: 300
            },
            {
                title: 'Mệnh giá', //11
                dataIndex: 'denomination',
                width: 100
            },
            {
                title: 'SL P.Hành (max)', //12
                dataIndex: 'max_release',
                width: 100
            },
            {
                title: 'SL đã P.hành', //13
                dataIndex: 'released',
                width: 100
            },
            {
                title: 'SL Lưu hành', //14
                dataIndex: 'totalOfCirculate',
                width: 100
            },
            {
                title: 'SL Thu hồi', //15
                dataIndex: 'totalRecall',
                width: 100
            },
            {
                title: 'Ngày phát hành', //16
                dataIndex: 'day_release',
                width: 100
            },
            {
                title: 'Ngày đáo hạn', //17
                dataIndex: 'day_expire',
                width: 100
            },
            {
                title: 'Ngày KT phát hành', //18
                dataIndex: 'day_break',
                width: 100
            },
            {
                title: 'Tổng hạn mức huy động', //19
                dataIndex: 'level_mobilize',
                width: 150
            },
            {
                title: 'Hạn mức cho', //20
                dataIndex: 'level_loan',
                width: 150
            },
            {
                title: 'Kỳ hạn còn lại', //21
                dataIndex: 'period_remain',
                width: 150
            },
            {
                title: 'T.Thái niêm yết', //22
                dataIndex: 'status_listed',
                width: 50
            },
            {
                title: 'Tài sản đảm bảo', //23
                dataIndex: 'asset_cover',
                width: 150
            },
            {
                title: 'S.Lượng Lưu ký', //24
                dataIndex: 'total_depository',
                width: 150
            },
            {
                title: 'Flag', //25
                dataIndex: 'flag',
                width: 50
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="/">Delete</a>
                        </Popconfirm>
                    ) : null,
                width: 100
            },
        ];

        this.state = {
            dataSource: [
                {
                    key: '0',
                    name: 'Edward King 0',
                    age: '32',
                    address: 'London, Park Lane no. 0',
                    key1: '0',
                    name1: 'Edward King 0',
                    age1: '32',
                    address1: 'London, Park Lane no. 0',
                    key2: '0',
                    name2: 'Edward King 0',
                    age2: '32',
                    address2: 'London, Park Lane no. 0',
                    key3: '0',
                    name3: 'Edward King 0',
                    age3: '32',
                    address3: 'London, Park Lane no. 0',
                },
                {
                    key: '1',
                    name: 'Edward King 1',
                    age: '32',
                    address: 'London, Park Lane no. 1',
                },
            ],
            count: 2,
            openModalAssetBond: false
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        this.setState({openModalAssetBond: true});
    };

    handleCloseModal = ()=>{
        this.setState({openModalAssetBond: false});
    }

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };
    
    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
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
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return(
            <div>
                <ModalAssetBond isOpen={this.state.openModalAssetBond} isCloseModal={this.handleCloseModal}/>
                <Alert style={{fontSize: 18, display: 'flex', alignContent: 'center', justifyContent: 'center'}} message="Trái phiếu" type="success" />
                <div className="p-top10" style={{padding: 10}}>
                    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                        Add a row
                    </Button>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        scroll={{x: '200%' }}
                    />
                </div>
            </div>
        )
    }
}

export default AssetBond;