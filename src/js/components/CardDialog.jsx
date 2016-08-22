import React, { Component } from 'react'
import NEWSAPPAPI from 'newsapp'
import fetch from 'isomorphic-fetch'

export default class CardDialog extends Component {
  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
    this.present = this.present.bind(this)
    this.shareCard = this.shareCard.bind(this)
    this.sendParamToEnd = this.sendParamToEnd.bind(this)
  }

  sendParamToEnd(id) {
    fetch(`http://t.c.m.163.com/uc/activity/card/gift/send?cardId=${id}`, {
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

  close() {
    this.props.changeCardStatus(false, '', false)
    document.body.removeEventListener('touchmove', (event) => {
      event.preventDefault()
    }, false)
  }

  // 赠送卡片
  present() {
    this.props.changeCardStatus(false, '', false)
    let cardNumInfo = {
      cardId: this.props.cardId,
      amount: this.props.cardAmount - 1
    }
    this.props.changeCardsNum(cardNumInfo)
    this.sendParamToEnd(this.props.cardId)
    const shareData = {
      wbText: '网易新闻，集卡赢大奖',
      wbPhoto: this.props.cardImg,
      wxText: '网易新闻，集卡赢大奖',
      wxTitle: `我送你一张${this.props.cardName}，集齐${this.props.cardLen}张可获得${this.props.prizeName}`,
      wxUrl: `http://t.c.m.163.com/uncharted/index.html#/shareCard?cycleId=${this.props.cycleId}&cardId=${this.props.cardId}&endTime=${this.props.endTime}&cardName=${this.props.cardName}&cardLen=${this.props.cardLen}&prizeName=${this.props.prizeName}&cardImg=${this.props.cardImg}`,
      wxPhoto: this.props.cardImg
    }
    NEWSAPPAPI.share.invoke(shareData, () => {
    })
  }

  // 晒卡片
  shareCard() {
    const shareData = {
      wbText: '网易新闻，集卡赢大奖',
      wbPhoto: this.props.cardImg,
      wxText: '网易新闻，集卡赢大奖',
      wxTitle: `我得到了${this.props.cardName}，再集${this.props.cardLen - this.props.cardAmount}张可获得${this.props.prizeName}你也来参加吧`,
      wxUrl: `http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=300&cycleId=${this.props.cycleId}&cardId=${this.props.cardId}&nowAmount=${this.props.cardAmount}cardName=${this.props.cardName}&cardLen=${this.props.cardLen}&prizeName=${this.props.prizeName}&cardImg=${this.props.cardImg}`,
      wxPhoto: this.props.cardImg
    }
    NEWSAPPAPI.share.invoke(shareData, () => {
    })
  }

  render() {
    const bgImg = {
      background: `url(${this.props.cardImage}) no-repeat center`,
      backgroundSize: '4.26rem 5.89rem'
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
            <div className="info">{this.props.cardMark}</div>
            <div className={parseInt(this.props.cardAmount, 10) >= 1 ? 'btn justify-content1' : 'btn justify-content2'}>
              <div className="close" onClick={this.close}>关闭</div>
              {
                parseInt(this.props.cardAmount, 10) >= 1 && <div className="present" onClick={this.present}>送给朋友</div>
              }
            </div>
          </footer>
        </div>
      </div>
    )
  }

}
