import React, { Component } from "react"
import { StartPage } from "./StartPage"
import { TableComponent } from "./TableComponent"
import { NewUserForm } from "./NewUserForm"
import { Layout } from "antd"

export class SelectionPage extends Component {
  state = {
    visibleComponent: "start"
  }

  showTable = () => {
    this.setState({ visibleComponent: "table" })
  }
  showForm = () => {
    this.setState({ visibleComponent: "form" })
  }
  moveBack = () => {
    this.setState({ visibleComponent: "start" })
  }

  render() {
    return (
      <Layout>
        {this.state.visibleComponent === "start" && (
          <StartPage showTable={this.showTable} showForm={this.showForm} />
        )}
        {this.state.visibleComponent === "table" && (
          <TableComponent moveBack={this.moveBack} />
        )}
        {this.state.visibleComponent === "form" && (
          <NewUserForm moveBack={this.moveBack} />
        )}
      </Layout>
    )
  }
}
