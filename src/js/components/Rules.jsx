import React, { Component } from 'react'
import UniversalTitle from './UniversalTitle'

export default class AboutRule extends Component {
  render() {
    return (
      <div className="homeAboutRule">
        <UniversalTitle text={'详细规则'} />
        <div className="rules-qa">
          <div>Q：怎样才能获取到卡片？</div>
          <div>A：在头条页面多阅读，多刷新就有机会获取到卡片。频繁刷新是没有卡片的哦~</div>
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
          <li>1. 本次活动奖品由vivo智能手机提供，集齐本期卡片可获取一台1600万柔光自拍的vivo X7手机；</li>
          <li>2. 请认真核对姓名、电话和邮寄地址等物流信息。如果填写错误，奖品可能就无法给您寄出了；</li>
          <li>3. 奖品会在每期活动结束后7个工作日内寄出。如有问题，可以发邮件至vivojika2016@163.com；</li>
          <li>4. 港、澳、台、藏区、海外等地区，因快递无法寄送，如领奖请联系客服，需要自付邮费哦；</li>
          <li>5. 本次活动奖品均不可替换成现金，也不提供发票，无退货、换货服务；</li>
          <li>6. 活动主办方、解释权为网易新闻。活动所有奖品均和苹果公司无关。</li>
        </ul>
      </div>
    )
  }
}

