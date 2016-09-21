import React, { Component } from 'react'
import UniversalTitle from './UniversalTitle'
import './../../css/noCardToGet.scss'
export default class AboutRule extends Component {
  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
  }
  
  componentDidMount() {
    
  }
  close() {
    this.props.noCardToGet()
  }
  
  render() {
    return (
      <div className="no-card-container">
        <div className="n-c-inner">
          <div className="top">
            <div className="logo"></div>
            <div className="close" onClick={this.close}></div>
          </div>
          <div className="bottom">
            <div className="warn">领取失败</div>
            <div className="desc">卡片已经被别人领取</div>
          </div>
        </div>
      </div>
    )
  }
}





