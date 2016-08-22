import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/shareItem'
import NEWSAPPAPI from 'newsapp'
import init from './../utils/secondShare'
import { erilizeUrl } from './../utils/util'

import '../../css/shareItem.scss'
import ShareBanner from '../components/ShareBanner'

// 送卡页面
class ShareItem extends Component {
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.goCollect = this.goCollect.bind(this)
    this.compareTimeOut = this.compareTimeOut.bind(this)
    this.secondShare = this.secondShare.bind(this)
    this.params = erilizeUrl(window.location.href)
    this.state = {
      userName: '',
      cardName: '',
      alreadyGet: false,
      cardId: '',
      timeOut: this.compareTimeOut(this.params.endTime)
    }
  }
  
  componentDidMount() {
    this.props.fetchShareItemInfo()
    this.setState({
      cardId: erilizeUrl(window.location.href).cardId || 'Can not find the cardId!'
    })
  }
  getData(uName, cName, cText, cImg) {
    this.setState({
      userName: uName,
      cardName: cName
    })
  }

  handleClick() {
    this.setState({
      alreadyGet: true
    })
  }

  compareTimeOut(endTime) {
    let CurrentTime = new Date()
    console.log(endTime)
    CurrentTime = CurrentTime.getTime()
    if (CurrentTime > endTime) {
      return false
    } else {
      return true
    }
  }

  goCollect() {
    window.location.href = `http://m.163.com/newsapp/applinks.html?url=${encodeURIComponent('newsapp://startup')}`
  }

  secondShare(cardLen, cardName, cardImg, prizeName) {
    let secondShareOption = {
      title: `我送你一张${cardName}，集齐${cardLen}张可获得${prizeName}`,
      content: '网易新闻,集卡赢大奖',
      img: cardImg
    }
    init(secondShareOption.title, secondShareOption.content, secondShareOption.img)
  }

  render() {
    const { data } = this.props
    if (!data.notlogin) {
      return null
    }
    console.log(data.notlogin)
    const cards = data.notlogin.cards
    let cardText = ''
    let cardImg = ''
    cards.map((card) => {
      if (parseInt(card.id, 10) === parseInt(this.state.cardId, 10)) {
        cardText = card.mark
        cardImg = card.image
      }
      return true
    })

    this.secondShare(this.params.cardLen, this.params.cardName, cardImg, this.params.prizeName)

    const bgImg = {
      background: `url(${cardImg}) no-repeat center`,
      backgroundSize: 'cover'
    }

    return (
      <div className="sharecard">
        <ShareBanner />
        <div className="title">
          <div className="user">{`${this.state.userName}送你的${this.state.cardName}卡片,`}</div>
          <div className="remind">请速领取</div>
        </div>
        <div className="info-outer">
          <div className="inner">
            <div className="img">
              <div className="img-bg" style={bgImg}></div>
            </div>
            <div className="text">{cardText}</div>
            <div className="btn" onClick={this.state.alreadyGet || this.state.timeOut ? this.goCollect : this.handleClick}>{this.state.alreadyGet || this.state.timeOut ? '自己去收集' : '领取'}</div>
          </div>
          {this.state.alreadyGet ? <div className="get-logo get-alreadylogo"></div> : this.state.timeOut ? <div className="get-logo get-timeOutlogo"></div> : ''}
        </div>
      </div>
    )
  }
}
export default connect(state => ({ data: state.shareItem }), actions)(ShareItem)
