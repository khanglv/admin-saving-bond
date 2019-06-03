import React, {Component} from 'react';
import { Table, Input, Button, Popconfirm, Form, Alert } from 'antd';
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
                width: 50
            },
            {
                title: 'MS T.Phiếu',
                dataIndex: 'code_bond',
                editable: true,
                width: 100
            },
            {
                title: 'Số H.Đồng',
                dataIndex: 'code_contract',
                width: 100
            },
            {
                title: 'MS D.Nghiệp',
                dataIndex: 'code_enterprise',
                width: 100
            },
            {
                title: 'MS K.Han Vay',
                dataIndex: 'code_limit',
                width: 300
            },
            {
                title: 'Lãi suất',
                dataIndex: 'interest_rate',
                width: 100
            },
            {
                title: 'Mã viết tắt',
                dataIndex: 'sort_name',
                width: 100
            },
            {
                title: 'TT Trái phiếu',
                dataIndex: 'info_bond',
                width: 200
            },
            {
                title: 'TT Trái phiếu',
                dataIndex: 'info_bond1',
                width: 100
            },
            {
                title: 'TT Trái phiếu',
                dataIndex: 'info_bond2',
                width: 300
            },
            {
                title: 'TT Trái phiếu',
                dataIndex: 'info_bond3',
                width: 300
            },
            {
                title: 'TT Trái phiếu',
                dataIndex: 'info_bond4',
                width: 300
            },
            {
                title: 'TT Trái phiếu',
                dataIndex: 'info_bond5',
                width: 300
            },
            {
                title: 'TT Trái phiếu',
                dataIndex: 'info_bond6',
                width: 300
            },
            {
                title: 'TT Trái phiếu',
                dataIndex: 'info_bond7',
                width: 300
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
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

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
                        scroll={{x: 500 }}
                    />
                </div>
            </div>
        )
    }
}

export default AssetBond;