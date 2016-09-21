import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/shareItem'
import { secondShareInit } from './../utils/secondShare'
import { erilizeUrl, erilizeText } from './../utils/util'

import '../../css/shareItem.scss'
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
      userName: '',
      cardName: '',
      alreadyGet: false,
      cardId: this.params.cardId || 'Can not find the cardId!',
      timeOut: false
    }
  }
  
  componentDidMount() {
    this.props.fetchShareInfo(this.params.cycleId)
    this.props.fetchQueryCard(this.params.giftId, this.params.cardId)
      .then(() => {
        const { share, queryCard } = this.props.data
        if (!share || !queryCard) {
          return null
        }
        this.compareTimeOut(share.cycleInfo.endTime)
        this.setState({
          alreadyGet: !queryCard.data.valid
        })
        return null
      })
  }

  // getData(uName, cName) {
  //   this.setState({
  //     userName: uName,
  //     cardName: cName
  //   })
  // }

  handleClick() {
    // this.props.receiveCardId(this.params.giftId, this.params.cardId).then(
    //   () => {
    //     this.setState({
    //       alreadyGet: true
    //     })
    //     window.location.href = `http://m.163.com/newsapp/applinks.html?url=${encodeURIComponent('http://t.c.m.163.com/uncharted/index.html?getCard=1&cardId=' + this.params.cardId + '&')}`
    //   }
    // )
    window.location.href = `http://m.163.com/newsapp/applinks.html?url=${encodeURIComponent('http://t.c.m.163.com/uncharted/index.html?getCard=1&cardId=' + this.params.cardId + '&giftId=' + this.params.giftId + '&')}`
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
    window.location.href = 'http://m.163.com/newsapp/applinks.html?url=http://t.c.m.163.com/uncharted/index.html'
  }

  secondShare(cardLen, cardName, cardImg, prizeName) {
    let secondShareOption = {
      title: erilizeText(`我送你一张${cardName}，集齐${cardLen}张可获得${prizeName}`, 40),
      content: '网易新闻,集卡赢大奖',
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
      if (parseInt(card.id, 10) === parseInt(this.state.cardId, 10)) {
        cardText = card.mark
        cardImg = card.image
        cardName = card.name
      }
      return true
    })
    this.secondShare(this.params.cardLen, cardName, cardImg, share.prize.name)

    const bgImg = {
      background: `url(${cardImg}) no-repeat center`,
      backgroundSize: 'cover'
    }
    return (
      <div className="sharecard">
        <ShareBanner />
        <div className="title">
          <div className="user">{`送你的${cardName}卡片,请速领取`}</div>
        </div>
        <div className="info-outer">
          <div className="inner">
            <div className="img">
              <div className="img-bg" style={bgImg}></div>
            </div>
            <div className="text">{cardText}</div>
            <div className="btn" onClick={this.state.alreadyGet || this.state.timeOut ? this.goCollect : () => { this.handleClick(giftId, this.state.cardId) }}>{this.state.alreadyGet || this.state.timeOut ? '自己去收集' : '领取'}</div>
          </div>
          {this.state.alreadyGet ? <div className="get-logo get-alreadylogo"></div> : this.state.timeOut ? <div className="get-logo get-timeOutlogo"></div> : ''}
        </div>
      </div>
    )
  }
}
export default connect(state => ({ data: state.shareItem }), actions)(ShareItem)
