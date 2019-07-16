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

  sayHello() {
    import(/* webpackPrefetch: true */ './sayHello.js').then(({default: func}) => {
      func();
    })
  }

  renderItem = () => {
    return (
      <div onClick={() => this.sayHello()} className="divs">
        {this.props.items}
      </div>
    )
  }

  render() {
    return (
      <div className="hello" >
        {this.renderItem()}
      </div>
    )
  }
}

export default connect(
  state => ({
    items: state.helloReducer.items
  })
)(Hello)