import './NavHeader.scss'
import React from 'react'

/**
 * @constructor <NavHeader title={string}>
 * @description 导航栏
 */
class NavHeader extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="back-icon">
            <i className="iconfont iconback-m"></i>
        </div>
        <h4 className="title">{this.props.title}</h4>

      </div>
    )
  }
}

export default NavHeader