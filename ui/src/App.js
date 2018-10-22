import React, { Component } from "react"
import { SelectionPage } from "./Components"
import "./App.css"
import { Layout } from "antd"

const { Content } = Layout

class App extends Component {
  render() {
    return (
      <Layout>
        <Content>
          <SelectionPage />
        </Content>
      </Layout>
    )
  }
}

export default App
