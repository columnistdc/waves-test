import React from "react"
import PropTypes from "prop-types"
import { Button } from "antd"

export const StartPage = props => {
  const { showTable, showForm } = props
  return (
    <React.Fragment>
      <Button onClick={showTable}>Show list of users </Button>
      <Button onClick={showForm}>Add new user</Button>
    </React.Fragment>
  )
}

StartPage.propTypes = {
  showTable: PropTypes.func,
  showForm: PropTypes.func
}
