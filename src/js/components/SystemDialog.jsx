import React, { Component } from 'react'
import '../../css/SystemDialog.scss'

export default class SystemDialog extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.systemDialog.addEventListener('touchmove', (e) => {
      e.preventDefault()
    }, false)
  }
  componentWillUnmount() {
    this.systemDialog.removeEventListener('touchmove', () => {
    }, false)
  }
  
  render() {
    const { closeSD } = this.props
    return (
      <div className="system-dialog-container" ref={(e) => { this.systemDialog = e }}>
        <div className="system-dialog">
          <div className="sd-top">请升级到最新版网易新闻参与活动!</div>
          <div className="sd-bottom" onClick={() => closeSD(false)}>确定</div>
        </div>
      </div>
    )
  }
}
