import React, { Component } from "react"
import {
  Form,
  Input,
  DatePicker,
  AutoComplete,
  Button,
  Select,
  Icon
} from "antd"
const Option = Select.Option
const FormItem = Form.Item
const AutoCompleteOption = AutoComplete.Option

const localStorage = window.localStorage

class UserForm extends Component {
  state = {
    fullName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    phone: "",
    email: ""
  }

  componentDidMount() {
    this.getDataFromLocalStorage()
  }

  putDataInLocalStorage = () => {
    const keys = Object.keys(this.state)
    keys.forEach(stateKey => {
      if (this.state[stateKey]) {
        localStorage.setItem(stateKey, this.state[stateKey])
      }
    })
  }

  getDataFromLocalStorage = () => {
    const keys = Object.keys(this.state)
    keys.forEach(stateKey => {
      if (localStorage.getItem(stateKey)) {
        this.putDataInState(stateKey, localStorage.getItem(stateKey))
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = {
          ...values,
          "date-picker": values["date-picker"].format("DD-MM-YYYY"),
          phone: values["phone"]
            ? `${values["prefix"]}${values["phone"]}`
            : undefined
        }
        console.log("Received values of form: ", fieldValues)
      }
    })
  }

  handleInput = e => {
    if (!e) return
    if (e._isAMomentObject) {
      console.log("mom", e)
    } else if (typeof e === "string") {
      this.putDataInState("city", e)
    } else {
      this.putDataInState(e.target.id, e.target.value)
    }
  }

  putDataInState = (fieldName, fieldValue) => {
    this.setState({
      [fieldName]: fieldValue
    })
  }

  render() {
    this.putDataInLocalStorage()
    const { getFieldDecorator } = this.props.form
    const { moveBack } = this.props
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "8"
    })(
      <Select style={{ width: 70 }}>
        <Option value="8">8</Option>
        <Option value="+7">+7</Option>
      </Select>
    )
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Full Name">
            {getFieldDecorator("fullName", {
              initialValue: this.state.fullName,
              rules: [
                {
                  max: 110,
                  min: 5,
                  message:
                    "Please, type not less then 5 and not more than 110 characters"
                },
                {
                  required: true,
                  message: "Please input your full name!"
                }
              ]
            })(
              <Input
                placeholder="Ivanov Ivan Ivanovich/John Doe"
                onChange={this.handleInput}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="DatePicker">
            {getFieldDecorator("date-picker", config)(
              <DatePicker
                placeholder="2018-12-01"
                onChange={this.handleInput}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator("email", {
              initialValue: this.state.email,

              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                placeholder="example@yourmail.com"
                onChange={this.handleInput}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Phone Number">
            {getFieldDecorator("phone", {
              initialValue: this.state.phone,
              rules: [
                { required: false, message: "Please input your phone number!" }
              ]
            })(
              <Input
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
                placeholder="(999)123-45-67"
                onChange={this.handleInput}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="City">
            {getFieldDecorator("city", {
              initialValue: this.state.city,
              rules: [{ required: false, message: "Please input your city!" }]
            })(
              <AutoComplete
                dataSource={cityOptions}
                placeholder="Moscow"
                onChange={this.handleInput}
              >
                <Input />
              </AutoComplete>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Address">
            {getFieldDecorator("address", {
              initialValue: this.state.address,
              rules: [
                { required: false, message: "Please input your address!" }
              ]
            })(
              <Input
                style={{ width: "100%" }}
                placeholder="1234567, Columbia D.C. White House, 1"
                onChange={this.handleInput}
              />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add new user
            </Button>
          </FormItem>
        </Form>
        <Button type="dashed" onClick={moveBack}>
          <Icon type="left" />
          Backward
        </Button>
      </React.Fragment>
    )
  }
}

export const NewUserForm = Form.create()(UserForm)

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}
const config = {
  rules: [{ type: "object", required: true, message: "Please select time!" }]
}
const cities = ["Moscow", "Tver", "Voronezh", "New-York", "Chicago"]

const cityOptions = cities.map(city => (
  <AutoCompleteOption key={city}>{city}</AutoCompleteOption>
))
