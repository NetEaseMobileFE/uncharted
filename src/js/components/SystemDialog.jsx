import React, { Component } from 'react'
import '../../css/SystemDialog.scss'
import { ePreventDefault } from '../utils/util'

export default class SystemDialog extends Component {

  componentDidMount() {
    this.systemDialog.addEventListener('touchmove', (e) => {
      ePreventDefault(e)
    }, false)
  }

  componentWillUnmount() {
    this.systemDialog.removeEventListener('touchmove', (e) => {
      ePreventDefault(e)
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
