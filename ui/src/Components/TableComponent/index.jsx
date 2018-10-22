import React, { Component } from "react"
import { Table, Spin, Icon, Button, Form, Input, Popconfirm } from "antd"
const FormItem = Form.Item
const EditableContext = React.createContext()

export class TableComponent extends Component {
  state = {
    isLoading: false,
    dataSource: []
  }

  componentDidMount() {
    //fetch Data
  }

  fetchDataFromAPI = () => {}

  setNewData = () => {}

  handleDelete = key => {
    const dataSource = [...this.state.dataSource]
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
  }

  handleSave = row => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    this.setState({ dataSource: newData })
  }

  render() {
    const { moveBack } = this.props
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }
    const columnsList = [
      {
        title: "Name",
        dataIndex: "fullName",
        editable: true,
        key: "fullName"
      },
      {
        title: "Age",
        dataIndex: "dateOfBirth",
        editable: true,
        key: "dateOfBirth"
      },
      {
        title: "City",
        dataIndex: "city",
        editable: true,
        key: "city"
      },
      {
        title: "Address",
        dataIndex: "address",
        editable: true,
        key: "address"
      },
      {
        title: "Phone",
        dataIndex: "phone",
        editable: true,
        key: "phone"
      },
      {
        title: "Email",
        dataIndex: "email",
        editable: true,
        key: "email"
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          return this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null
        }
      }
    ]
    const columns = columnsList.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      }
    })
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Spin size="large" />
        ) : (
          <React.Fragment>
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={this.state.dataSource}
              columns={columns}
            />
            <Button type="dashed" onClick={moveBack}>
              <Icon type="left" />
              Backward
            </Button>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const initial = [
  {
    fullName: "1",
    dateOfBirth: "2",
    address: "3",
    city: "3",
    phone: "4",
    email: "5"
  },
  {
    fullName: "11",
    dateOfBirth: "22",
    address: "33",
    city: "44",
    phone: "55",
    email: "66"
  }
]

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  state = {
    editing: false
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener("click", this.handleClickOutside, true)
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener("click", this.handleClickOutside, true)
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  handleClickOutside = e => {
    const { editing } = this.state
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save()
    }
  }

  save = () => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  render() {
    const { editing } = this.state
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              )
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    )
  }
}
