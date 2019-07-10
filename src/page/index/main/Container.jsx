import React from 'react'

import Index from './index'
import { hot } from 'react-hot-loader'

class Container extends React.Component{
  render ( ) {
    return (<Index></Index>)
  }
}

export default hot(module)(Container)