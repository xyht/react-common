import React from 'react'
import { connect } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom' //Switc
import Loadable from 'react-loadable'

import App from './App'
import Loading from './loading'
// import Hello from './hello/index'

// 懒加载组件
const Hello = Loadable({
  loader: () => import(/* webpackChunkName: "hello" */'./hello/index'),
  loading: Loading,
})

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <HashRouter>
        <App>
          <Route path='/' component={Hello}></Route>
        </App>

      </HashRouter>
    )
  }
}
export default connect(
  // state => ({
  // })
)(Main)