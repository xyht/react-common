import './index.scss'
import React from 'react'
import { connect } from 'react-redux'
import { getHelloData } from './../../action/helloAction'

/**
 * @constructor <Hello />
 * @description 测试页面
 */
class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.fetchData()
  }

  fetchData() {
    this.props.dispatch(getHelloData())
  }

  render() {
    return (
      <div className="hello">
        {this.props.items}
      </div>
    )
  }
}

export default connect(
  state => ({
    items: state.helloReducer.items
  })
)(Hello)