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
        <div className="rules-qa">
          <div>Q：怎样才能获取到卡片？</div>
          <div>A：在头条页面多阅读，多刷新就有机会获取到卡片</div>
        </div>
        <div className="rules-qa">
          <div>Q：如何领取奖品？</div>
          <div>A：集齐卡片后，点击“分享后领奖”，分享之后要点击“返回应用”，返回网易新闻后则可以填写领奖信息，领取奖品。</div>
        </div>
        <div className="rules-qa">
          <div>Q：如何赠送卡片给好友？</div>
          <div>A：当某卡片的数量大于等于2张时，点击卡片上的“送给朋友”，则可以赠送给微信、微博好友等，好友通过您的赠送页面，返回网易新闻时就可以领取到您送出的卡片。当一个好友领取到您的卡片后，您的该卡片数量会减1，好友的该卡片数量会加1。每赠送一次，只有一个好友能领取到您赠送的卡片。</div>
        </div>
        <ul className="rules-step">
          <h3 className="rules-step-title">活动详情</h3>
          <li>1. 活动主办方为“网易公司”，本活动解释权归网易所有；</li>
          <li>2. 请认真填写姓名、电话和邮寄地址。如果因获奖者提供信息不全或有误导致奖品无法寄送，视为放弃获奖资格，活动方不承担任何责任；</li>
          <li>3. 活动期间如有疑似刷卡作弊或者其他任何不正当的手段，将取消领取奖品资格；</li>
          <li>4. 本活动的活动范围为中国大陆地区（不包括港、澳、台地区），活动奖品不支持邮寄至大陆以外地区；</li>
          <li>5. 所有奖品不可替换成现金，本次活动奖品均不提供发票，不设退货、换货服务。</li>
          <li>6. 本活动所有奖品均和苹果公司无关。</li>
        </ul>
      </div>
    )
  }
}





