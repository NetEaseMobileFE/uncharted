import React, { Component } from 'react'
import UniversalTitle from './UniversalTitle'
import fetch from 'isomorphic-fetch'
import NEWSAPPAPI from 'newsapp'
import { sendLotteryId } from './../utils/util'

export default class MyWinning extends Component {
  constructor(props) {
    super(props)
    this.handleShare = this.handleShare.bind(this)
    this.getPrize = this.getPrize.bind(this)
  }

  getPrize(prizeId, lotteryId, cycleId) {
    let { push } = this.props
    push(`/expiry?prizeId=${prizeId}&cycleId=${cycleId}&lotteryId=${lotteryId}`)
  }

  // 校验
  handleShare(prizeId, lotteryId, cycleId) {
    let { push, changeLotteryStatus, data } = this.props
    let imgUrl
    let prizeName
    let allCardsNum
    let lotteryStatusObj = {
      lotteryId: () => lotteryId,
      status: 1
    }
    data.lotteryPrizes.map((item) => {
      if (item.cycleInfo.id === cycleId) {
        imgUrl = item.prize.image
        prizeName = item.prize.name
        allCardsNum = item.prize.cardIds.length
      }
      return true
    })
    const shareData = {
      wbText: '网易新闻,集卡赢大奖',
      wbPhoto: `${imgUrl}`,
      wxText: '网易新闻,集卡赢大奖',
      wxTitle: `我中奖啦，获得了${prizeName}你也来参加吧！`,
      wxUrl: `http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=200&cycleId=${this.props.cycleId}&cardAmount=${allCardsNum}&prizeName=${prizeName}`,
      wxPhoto: `${imgUrl}`
    }
    NEWSAPPAPI.share.invoke(shareData, () => {
      push(`/expiry?prizeId=${prizeId}&cycleId=${cycleId}&lotteryId=${lotteryId}`)
      sendLotteryId(lotteryId)
      changeLotteryStatus(lotteryStatusObj)
    })
  }

  sendLotteryId(id) {
    fetch(`http://t.c.m.163.com/uc/activity/card/prize/share?lotteryId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'same-origin'
    }).then((res) => {
      console.log(res)
    }, () => {
      alert('Error submitting form!')
    })
  }


  render() {
    const { data } = this.props
    const time = new Date()
    console.log(data)
    return (
      <div className="winn-record">
        <UniversalTitle text="我的获奖记录" />
        <ul className="winn-recordls">
          {
            data.lotteryPrizes.map((record, index) => {
              const countDown = (record.cycleInfo.endTime + 7 * 24 * 60 * 60 * 1000 - time.getTime()) / (24 * 60 * 60 * 1000);
              let finalClass = ''
              let finalBtnText = ''
              let finalWarnText = ''
              let cardBg = {
                background: `url(${record.prize.image}) no-repeat center`,
                backgroundSize: '1.08rem 1.05rem'
              }
              switch (record.lotteryInfo.status) {
                case 0:
                  finalClass = 'winn-li-r btn-style-0'
                  finalBtnText = '分享后领取'
                  if (countDown > 1) {
                    finalWarnText = `请在${Math.floor(countDown)}天内领取，过期作废`
                  } else if (countDown >= 0) {
                    finalWarnText = `请在${Math.floor(countDown * 24)}小时内领取，过期作废`
                  } else {
                    finalWarnText = '已过期'
                  }
                  break

                case 1:
                  finalClass = 'winn-li-r btn-style-1'
                  finalBtnText = '点击领取'
                  if (countDown > 1) {
                    finalWarnText = `请在${Math.floor(countDown)}天内领取，过期作废`
                  } else if (countDown >= 0) {
                    finalWarnText = `请在${Math.floor(countDown * 24)}小时内领取，过期作废`
                  } else {
                    finalWarnText = '已过期'
                  }
                  break

                case 2:
                  finalClass = 'winn-li-r btn-style-2'
                  finalWarnText = '已领取'
                  finalBtnText = '已领取'
                  break

                case -1:
                  finalClass = 'winn-li-r btn-style-3'
                  finalWarnText = '已过期'
                  finalBtnText = '已过期'
                  break

                default:
                  break
              }
              return (
                <li className="winn-li" key={index}>
                  <div className="winn-li-l"><div className="prize-img" style={cardBg} /></div>
                  <div className="winn-li-cen">
                    <div className="prize-name">{record.prize.name}</div>
                    <div className="prize-date">{'主题: ' + record.cycleInfo.theme}</div>
                    <div className="prize-limit">
                      <span className="limit-time">
                      {finalWarnText}
                      </span>
                    </div> 
                  </div>
                  <div 
                    className={finalClass} 
                    onClick={
                      record.lotteryInfo.status === 0 ? 
                      () => { this.handleShare(record.prize.id, record.lotteryInfo.id, record.cycleInfo.id) } :
                      record.lotteryInfo.status === 1 ? 
                      () => { this.getPrize(record.prize.id, record.lotteryInfo.id, record.cycleInfo.id) } :
                      ''
                    }
                  >
                    {finalBtnText}
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}


// 校验
// WinningRecordli.propTypes = {
//   prizeName:React.PropTypes.string.isRequired,
//   prizeTime:React.PropTypes.string.isRequired,
//   prizeInfo:React.PropTypes.string.isRequired
// }
