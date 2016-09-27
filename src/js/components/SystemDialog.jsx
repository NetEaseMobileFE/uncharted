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
    const { onCloseSD, desc } = this.props.data
    return (
      <div className="system-dialog-container" ref={(e) => { this.systemDialog = e }}>
        <div className="system-dialog">
          <div className="sd-top">{desc}</div>
          <div className="sd-bottom" onClick={onCloseSD}>确定</div>
        </div>
      </div>
    )
  }
}
