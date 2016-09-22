import React, { Component } from 'react'
import NEWSAPPAPI from 'newsapp'
import fetch from 'isomorphic-fetch'
import { changeUrl, erilizeText } from './../utils/util'
export default class CardDialog extends Component {
  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
    this.present = this.present.bind(this)
    this.shareCard = this.shareCard.bind(this)
    // this.sendParamToEnd = this.sendParamToEnd.bind(this)
    // this.fetchCardInfo = this.fetchCardInfo.bind(this)
    this.giftId = null
  }


  close() {
    this.props.changeCardStatus(false)
    document.body.removeEventListener('touchmove', (event) => {
      event.preventDefault()
    }, false)
  }

  // 赠送卡片
  present() {
    this.props.changeCardStatus(false)
    // let cardNumInfo = {
    //   cardId: this.props.cardId,
    //   amount: this.props.cardAmount - 1
    // }
    // this.props.changeCardsNum(cardNumInfo)
    // this.sendParamToEnd(this.props.cardId)
    let shareData = {}
    fetch(changeUrl(`http://t.c.m.163.com/uc/activity/card/gift/send?cardId=${this.props.cardId}`, 1), { credentials: 'same-origin' })
      .then(res => res.json())
      .then((json) => {
        this.giftId = json.data.giftId
        shareData = {
          wbText: '网易新闻，集卡赢大奖' + changeUrl('http://t.c.m.163.com/uncharted/index.html#/shareCard?cycleId=' + this.props.cycleId + '&cardId=' + this.props.cardId + '&cardLen=' + this.props.cardLen + '&prizeId=' + this.props.prizeId + '&giftId=' + encodeURIComponent(this.giftId) + '&', 2),
          wbPhoto: this.props.cardImg,
          wxText: '网易新闻，集卡赢大奖',
          wxTitle: `我送你一张${this.props.cardName}，集齐${this.props.cardLen}张可获得${this.props.prizeName}`,
          wxUrl: changeUrl(`http://t.c.m.163.com/uncharted/index.html#/shareCard?cycleId=${this.props.cycleId}&cardId=${this.props.cardId}&cardLen=${this.props.cardLen}&prizeId=${this.props.prizeId}&giftId=${this.giftId}&uName=111&`, 2),
          wxPhoto: this.props.cardImg
        }
        NEWSAPPAPI.share.invoke(shareData, () => {
        })
      })
  }

  // 晒卡片
  shareCard() {
    let wxTitle = `我得到了${this.props.cardName}，再集${this.props.cardLen - this.props.cardType}张可获得${this.props.prizeName}你也来参加吧`
    if (this.props.cardLen <= this.props.cardType) {
      wxTitle = `我得到了${this.props.cardName}，已经获得了${this.props.prizeName},你也来参加吧!`
    }
    const shareData = {
      wbText: '网易新闻，集卡赢大奖' + changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=300&cycleId=${this.props.cycleId}&cardId=${this.props.cardId}&nowAmount=${this.props.cardType}&cardLen=${this.props.cardLen}`, 2),
      wbPhoto: this.props.cardImg,
      wxText: '网易新闻，集卡赢大奖',
      wxTitle,
      wxUrl: changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=300&cycleId=${this.props.cycleId}&cardId=${this.props.cardId}&nowAmount=${this.props.cardType}&cardLen=${this.props.cardLen}`, 2),
      wxPhoto: this.props.cardImg
    }
    NEWSAPPAPI.share.invoke(shareData, () => {
    })
  }
  render() {
    const bgImg = {
      background: `url(${this.props.cardImg}) no-repeat center`,
      backgroundSize: '100% 100%'
    }
    return (
      <div className="h-card-dialog">
        <div className="dialog-inner">
          <div className="cover">
            <div className="cover-card-bg" style={bgImg}>
              {
                !!this.props.cardAmount && <div className="share" onClick={this.shareCard}>晒卡</div>
              }
            </div>
          </div>
          <footer className="footer">
            <div className="info">{erilizeText(this.props.cardMark, 28)}</div>
            <div className={parseInt(this.props.cardAmount, 10) > 1 ? 'btn justify-content1' : 'btn justify-content2'}>
              <div className="close" onClick={this.close}>关闭</div>
              {
                parseInt(this.props.cardAmount, 10) > 1 && <div className="present" onClick={this.present}>送给朋友</div>
              }
            </div>
          </footer>
        </div>
      </div>
    )
  }

}
