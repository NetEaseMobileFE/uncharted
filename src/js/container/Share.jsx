import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchShareInfo } from '../actions/shareItem'
import '../../css/share.scss'
import { secondShareInit } from './../utils/secondShare'
import { erilizeUrl } from './../utils/util'

import CurrentActivity from '../components/CurrentActivity'
import ShareBanner from '../components/ShareBanner'

// 获奖分享页面, 未获取分享页面 ,晒卡页面
class Share extends Component {

  static defaultProps = {
    isNotDisplay: true,
    MarqClass: 'r-prize-another',
    prizeTitle: '头条集卡得大奖！',
    address: '11111',
    cardName: '',
    prizeName: '',
    cardImg: ''
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.secondShare = this.secondShare.bind(this)
    const params = erilizeUrl(window.location.href)
    this.state = {
      winnStatus: params.winnStatus,
      cardId: params.cardId || 'not find the cardId!',
      cardAmount: params.cardAmount,
      cycleId: params.cycleId,
      cardLen: params.cardLen
    }
    this.cardImg = ''
    this.cardName = ''
    console.log(this.props)
    this.props.fetchShareInfo(params.cycleId)
  }

  handleClick() {
    window.location.href = 'http://m.163.com/newsapp/applinks.html?url=http://t.c.m.163.com/uncharted/index.html'
  }

  secondShare(cardAmount, lackCards, cardName, cardImg, prizeName, prizeImg) {
    let secondShareOption = {
      title: '',
      content: '',
      img: ''
    }
    switch (parseInt(this.state.winnStatus, 10)) {
      case 100:// 没有获奖

        secondShareOption.title = `我集到了${cardAmount}张卡，再集${lackCards}张可获得${prizeName}，你也来参加吧！`
        secondShareOption.content = '网易新闻,集卡赢大奖'
        secondShareOption.img = prizeImg
        if (lackCards === 0) {
          secondShareOption.title = `我中奖啦，获得了${prizeName}你也来参加吧！`
        }
        break
      case 200:// 已经获奖
        secondShareOption.title = `我中奖啦，获得了${prizeName}你也来参加吧！`
        secondShareOption.content = '网易新闻,集卡赢大奖'
        secondShareOption.img = prizeImg

        break
      case 300:// 晒卡
        secondShareOption.title = `我得到了${cardName}，再集${lackCards}张可获得${prizeName}你也来参加吧`
        secondShareOption.content = '网易新闻,集卡赢大奖'
        secondShareOption.img = cardImg
        if (lackCards <= 0) {
          secondShareOption.title = `我得到了${cardName}，获得了${prizeName}你也来参加吧`
        }
        break
      default:
        return
    }
    secondShareInit(secondShareOption)
  }

  render() {
    const { data } = this.props
    const { share } = data
    // const prizeImg = data.prize.image
    // const cardImg = ''
    console.log(data)
    if (!share) {
      return null
    }
    const params = erilizeUrl(window.location.href)
    const prizeArray = share.prize
    let lackCards = (parseInt(params.cardLen, 10) - parseInt(params.nowAmount, 10))
    lackCards = lackCards <= 0 ? 0 : lackCards
    console.log(params)
    const cycleTheme = share.cycleInfo.theme
    share.cards.map((card) => {
      if (parseInt(card.id, 10) === parseInt(this.state.cardId, 10)) {
        this.cardImg = card.image
        this.cardName = card.name
      }
      return true
    })
    this.secondShare(params.cardLen, lackCards, this.cardName, this.cardImg, prizeArray.name, prizeArray.image)

    const bgImg = {
      background: `url(${this.cardImg}) no-repeat center`,
      backgroundSize: 'cover'
    }
    const prizeImg = {
      background: `url(${prizeArray.image}) no-repeat center`,
      backgroundSize: 'cover'
    }
    return (
      <div>
        <ShareBanner />
        {
          this.state.winnStatus === '100' ?
            <div className="share oneBg">
              <header className="header mb1">
                <div>
                  <div className="title">{this.props.prizeTitle}</div>
                  <div className="text">{cycleTheme}</div>
                </div>
              </header>
              <CurrentActivity data={data} isNotHomePage={this.props.isNotDisplay} MarqClass={this.props.MarqClass} />
              <footer className="footer">
                {
                  lackCards !== 0 ?
                    <div className="info1">
                      <div className="card-No">
                        “我已集齐{params.nowAmount}张，再集{lackCards}张
                      </div>
                      <div className="prize">
                        可获得{prizeArray.name}，你也来参加吧”
                      </div>
                    </div>
                    :
                    <div className="info1">
                      <div className="card-No">
                        我中奖啦,
                      </div>
                      <div className="prize">
                        获得了{prizeArray.name}，你也来参加吧!
                      </div>
                    </div>
                }
                <div className="share-btn btn-margin12" onClick={this.handleClick}>我要参与</div>
              </footer>
            </div> : 
            this.state.winnStatus === '200' ? 
              <div className="share oneBg">
                <header className="header mb2">
                  <div className="info">
                    <div className="userinfo">{`"我获得了${prizeArray.name}`}</div>
                    <div className="introduce">你也来参加吧"</div>
                  </div>
                  <div className="winnlogo"></div>
                </header>
                <CurrentActivity data={data} isNotHomePage={this.props.isNotDisplay} MarqClass={this.props.MarqClass} />
                <footer className="footer">
                  <div className="info2">
                    <div className="prize-title">
                      {this.props.prizeTitle}
                    </div>
                    <div className="address">
                      {cycleTheme}
                    </div>
                  </div>
                  <div className="share-btn btn-margin12" onClick={this.handleClick}>我要参与</div>
                </footer>
              </div> : 
              <div className="share anotherBg">
                <header className="header mb3">
                  <div className="header-inner">
                    <div className="title">{this.props.prizeTitle}</div>
                    <div className="text">{cycleTheme}</div>
                  </div>
                </header>
                <div className="shareCard-img">
                  <div className="sharecard-bg" style={bgImg}></div>
                </div>
                <footer className="footer">
                  <div className="info3">
                    <div className="info3-img">
                      <div className="info3prize-bg" style={prizeImg}></div>
                    </div>
                    <div className="info3-text">
                      <div className="info3-card">
                        {
                          lackCards > 0 ?
                            `我得到了${this.cardName}，再集${lackCards}张可获得${prizeArray.name}，你也来参加吧` :
                            `我得到了${this.cardName}，已获得${prizeArray.name}大奖,你也来参加吧!`
                        }
                      </div>
                    </div>
                  </div>
                  <div className="share-btn btn-margin3" onClick={this.handleClick}>我要参与</div>
                </footer>
              </div>
        }
      </div>
    )
  }
}

export default connect(state => ({
  data: state.shareItem
}), dispatch => ({
  fetchShareInfo: bindActionCreators(fetchShareInfo, dispatch)
}))(Share)
