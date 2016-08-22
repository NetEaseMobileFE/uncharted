import React, { Component } from 'react'
import UniversalTitle from './UniversalTitle'

export default class AboutRule extends Component {
  constructor(props) {
    super(props)
  }
  
  static defaultProps = {
    dataText: '详细规则',
    datatInfo: '',
  }
  render() {
    return (
      <div className="homeAboutRule">
        <UniversalTitle text={this.props.dataText} />
        <ul>
          <li>1.打开网易新闻，首页左上角点击扫一扫功能。</li>
          <li>2.扫描屏幕二维码，登录即可免费获得可乐一听。</li>
          <li>3.网易新闻新用户0金币即可兑换，老用户仅需163金币。</li>
          <li>4.遇到兑换未出货现象，请及时联系客服电话4001528528。</li>
          <li>5.网易新闻新用户0金币即可兑换，老用户仅需163金币。</li>
          <li>6.遇到兑换未出货现象，请及时联系客服电话4001528528。</li>
        </ul>
      </div>
    )
  }
}
