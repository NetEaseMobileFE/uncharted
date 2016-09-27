import React, { Component } from 'react'
import Cards from './Cards'
import Prize from './Prize'
import Subject from './Subject'
import '../../../css/Home.scss'
import '../../../css/CurrentActivity.scss'

export default class CurrentActivity extends Component {

  render() {
    const { isNotHomePage } = this.props
    if (isNotHomePage) {
      // 不是主页(即回流页)
      const { data } = this.props
      const share = data.share
      const prizeParams = {
        data: share.prize,
        IsNotDisplay: isNotHomePage,
        sumAmount: share.cards.length
      }
      const cardsParams = {
        isNotHomePage,
        allCards: share.cards,
        prizeName: share.prize.name,
        endTime: share.cycleInfo.endTime
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
      const { data, push, loginStatus } = this.props.data
      const basic = data.basic
      const notlogin = data.notlogin
      const { fetchBasicInfo, collCardStatus, curPrizeStatus, changeLotteryStatus, lotteryId, sendCard, sendCardInfo, sendLotteryId, sendLotteryIdErrCode, onOpenSD } = this.props.data
      const prizeParams = {
        fetchBasicInfo,
        push,
        collCardStatus,
        loginStatus,
        curPrizeStatus,
        lotteryId,
        sendLotteryId,
        sendLotteryIdErrCode,
        data: notlogin.prize,
        IsNotDisplay: isNotHomePage,
        nowAmount: loginStatus ? basic.myCards.length : '',
        sumAmount: notlogin.cards.length,
        cycleId: notlogin.cycleInfo.id,
        prizeId: notlogin.prize.id,
        shareYet: changeLotteryStatus
      }
      const cardsParams = {
        allCards: notlogin.cards,
        isNotHomePage,
        loginStatus,
        prizeName: notlogin.prize.name,
        myCards: loginStatus ? basic.myCards : '',
        endTime: notlogin.cycleInfo.endTime,
        changeCardsNum: this.props.changeCardsNum,
        cycleId: notlogin.cycleInfo.id,
        prizeId: notlogin.prize.id,
        sendCard,
        sendCardInfo,
        onOpenSD
      }

      return (
        <div className="marquee-outer">
          <Subject subject={notlogin.cycleInfo} now={notlogin.now} />
          <div className="cur-prize-container">
            <div className="inner">
              <Prize data={prizeParams} />
              <Cards data={cardsParams}/>
            </div>
          </div>
        </div>
      )
    }
  }
}

