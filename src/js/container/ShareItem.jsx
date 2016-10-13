import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/ShareItem'
import { secondShareInit } from './../utils/secondShare'
import { erilizeUrl, erilizeText, changeUrl } from '../utils/util'

import '../../css/ShareItem.scss'
import ShareBanner from '../components/ShareBanner'

// 送卡页面
class ShareItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.goCollect = this.goCollect.bind(this)
    this.compareTimeOut = this.compareTimeOut.bind(this)
    this.secondShare = this.secondShare.bind(this)
    // this.fetchQueryCard = this.fetchQueryCard.bind(this)
    this.params = erilizeUrl(window.location.href)
    this.state = {
      alreadyGet: false,
      timeOut: false
    }
    this.giftId = null
  }
  
  componentDidMount() {
    this.props.fetchShareInfo(this.params.cycleId)
    this.giftId = this.params.giftId
    while (this.giftId.match(/%/i)) {
      this.giftId = decodeURIComponent(this.giftId)
    }
    this.props.fetchQueryCard(this.giftId, this.params.cardId)
      .then((json) => {
        const { share } = this.props.data
        if (!share || !json) {
          return null
        }
        this.compareTimeOut(share.cycleInfo.endTime)
        if (json.data != null && json.data.valid) {
          this.setState({
            alreadyGet: false
          })
        } else {
          this.setState({
            alreadyGet: true
          })
        }
        return null
      })
  }

  handleClick() {
    window.location.href = `http://m.163.com/newsapp/applinks.html?url=${encodeURIComponent(changeUrl('http://t.c.m.163.com/uncharted/index.html?getCard=1&cardId=', 2) + this.params.cardId + '&giftId=' + encodeURIComponent(this.giftId) + '&')}`
  }

  compareTimeOut(endTime) {
    let currentTime = new Date()
    let timeOut
    currentTime = currentTime.getTime()
    if (currentTime > endTime) {
      timeOut = true
    } else {
      timeOut = false
    }
    this.setState({
      timeOut,
    })
  }

  goCollect() {
    window.location.href = 'http://m.163.com/newsapp/applinks.html?url=' + changeUrl('http://t.c.m.163.com/uncharted/index.html', 2)
  }

  secondShare(cardName, cardImg, prizeName) {
    let secondShareOption = {
      title: erilizeText(`${cardName}送给你，集齐可领取${prizeName},不用谢我，我只是个传说。`, 40),
      content: '网易新闻,集卡赢大奖啦',
      img: cardImg
    }
    secondShareInit(secondShareOption)
  }

  render() {
    const { share, queryCard } = this.props.data
    if (!share && !queryCard) {
      return null
    }
    const cards = share.cards
    const giftId = share.prize.id
    let cardText = ''
    let cardImg = ''
    let cardName = ''
    cards.map((card) => {
      if (parseInt(card.id, 10) === parseInt(this.params.cardId, 10)) {
        cardText = card.mark
        cardImg = card.image
        cardName = card.name
      }
      return true
    })
    this.secondShare(cardName, cardImg, share.prize.name)

    const bgImg = {
      background: `url(${cardImg}) no-repeat center`,
      backgroundSize: 'cover'
    }
    return (
      <div className="sharecard">
        <ShareBanner />
        <div className="title">
          <div>
            <div className="user">{erilizeText(`${cardName}送给你,集齐可得${share.prize.name},不用谢我，我只是个传说`, 36)}</div>
          </div>
        </div>
        <div className="info-outer">
          <div className="inner">
            <div className="img">
              <div className="img-bg" style={bgImg}></div>
            </div>
            <div className="text">{erilizeText(cardText, 32)}</div>
            <div className="btn" onClick={this.state.alreadyGet || this.state.timeOut ? this.goCollect : () => { this.handleClick(giftId, this.state.cardId) }}>{this.state.alreadyGet || this.state.timeOut ? '自己去收集' : '领取'}</div>
          </div>
          {this.state.alreadyGet && <div className="get-logo get-alreadylogo"></div>}
          {!this.state.alreadyGet && this.state.timeOut ? <div className="get-logo get-timeOutlogo"></div> : ''}
        </div>
        <div className="warn-update">如果领卡失败，请升级到最新版网易新闻</div>
      </div>
    )
  }
}
export default connect(state => ({ data: state.shareItem }), actions)(ShareItem)
