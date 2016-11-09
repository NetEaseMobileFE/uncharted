import React from 'react'
import Cards from './Cards'
import Prize from './Prize'
import Subject from './Subject'
import '../../../css/Home.scss'
import '../../../css/CurrentActivity.scss'

export default function CurrentActivity(props) {
  const { isNotHomePage } = props
  if (isNotHomePage) {
    // 不是主页(即回流页)
    const { data } = props
    const share = data.share

    const prizeParams = {
      data: share.prize,
      isNotDisplay: isNotHomePage,
      sumAmount: share.cards.length
    }

    const cardsParams = {
      isNotHomePage, // 是否是主页
      allCards: share.cards, // 卡片信息
      prizeName: share.prize.name, // 奖品名称
      endTime: share.cycleInfo.endTime // 当期结束时间
    }

    return (
      <div className="marquee-outer">
        <div className="cur-prize-container">
          <div className="inner">
            <Prize data={prizeParams} />
            <Cards data={cardsParams} />
          </div>
        </div>
      </div>
    )
  } else {
    // 是主页
    const { data, push, loginStatus } = props.data
    const basic = data.basic
    const notlogin = data.notlogin
    const { fetchBasicInfo, collCardStatus, curPrizeStatus, changeLotteryStatus, lotteryId, sendCard, sendLotteryId, onOpenSD } = props.data

    const prizeParams = {
      fetchBasicInfo, // 获取登陆信息func
      push, // 路由控制func
      collCardStatus, // 版本与集卡功能是否开启状态
      loginStatus, // 登陆参数
      curPrizeStatus, // 奖品状态信息
      lotteryId, // 中奖id
      sendLotteryId, // 兑奖func
      data: notlogin.prize, // 未登录接口奖品信息
      IsNotDisplay: isNotHomePage, // 是否主页
      nowAmount: basic.myCards.length, // 拥有卡片数量
      sumAmount: notlogin.cards.length, // 需要集齐的卡片数量
      cycleId: notlogin.cycleInfo.id, // 期信息
      prizeId: notlogin.prize.id, // 奖品id
      shareYet: changeLotteryStatus // 中奖后是否分享过
    }
    
    const cardsParams = {
      isNotHomePage, // 是否是主页
      loginStatus, // 登陆状态
      sendCard, // 发送卡片func
      onOpenSD, // 打开系统弹窗
      allCards: notlogin.cards, // 未登录接口卡片信息
      now: notlogin.now, // 目前时间
      prizeName: notlogin.prize.name, // 奖品名称
      myCards: loginStatus ? basic.myCards : '', // 拥有卡片信息
      endTime: notlogin.cycleInfo.endTime, // 当期结束时间
      cycleId: notlogin.cycleInfo.id, // 期id
      prizeId: notlogin.prize.id // 奖品id
    }
    return (
      <div className="marquee-outer">
        <Subject subject={notlogin.cycleInfo} now={notlogin.now} />
        <div className="cur-prize-container">
          <div className="inner">
            <Prize data={prizeParams} />
            <Cards data={cardsParams} />
          </div>
        </div>
      </div>
    )
  }
}
