import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/share'
import '../../css/share.scss'
import NEWSAPPAPI from 'newsapp'
import { init ,setShareData } from './../utils/secondShare'
import { erilizeUrl } from './../utils/util'

import CurrentActivity from '../components/CurrentActivity'
import ShareBanner from '../components/ShareBanner'

//获奖分享页面, 未获取分享页面 ,晒卡页面
class Share extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    const params = erilizeUrl(window.location.href)
    this.secondShare = this.secondShare.bind(this)
    this.setState({
      winnStatus: params.winnStatus,
      cardId: params.cardId || 'not find the cardId!',
      cardAmount: params.cardAmount,
      cycleId: params.cycleId,
      prizeName: params.prizeName,
      cardName: params.cardName,
      cardLen: params.cardLen,
      prizeImg: params.prizeImg,
      cardImg: params.cardImg
    })
    this.props.fetchShareInfo(params.cycleId)
  }

  state = {
    cycleId: '',
    cycleTheme: '',
    cardId: '',
    cardImg: '',
    cardAmount: '',
    winnStatus: '',
    prizeName: '',
    cardName: '',
    cardLen: '',
    prizeImg: ''
    // 100：没得奖，普通分享
    // 200: 已经集齐，已得奖
    // 300: 晒卡
  }

  static defaultProps = {
    isNotDisplay: true,
    MarqClass: 'r-prize-another',
    prizeTitle: '头条集卡得大奖！',
    address: '11111'
  }

  componentDidMount() {

  }

  handleClick() {
    window.location = 'http://m.163.com/newsapp/applinks.html?url=newsapp://startup'
    console.log('打开客户端')
  }

  secondShare(cardAmount, lackCards, cardName, cardImg, prizeName, prizeImg) {
    let secondShareOption = {
      title: '',
      content: '',
      img: ''
    }
    switch (this.state.winnStatus) {
      case 100:// 没有获奖
        secondShareOption.title = `我集到了${cardAmount}张卡，再集${lackCards}张可获得${prizeName}，你也来参加吧！`
        secondShareOption.content = '网易新闻,集卡赢大奖'
        secondShareOption.img = prizeImg
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
        break
      default:
        return
    }
    init(secondShareOption.title, secondShareOption.content, secondShareOption.img)
  }

  render() {
    const { data } = this.props
    const { share } = data
    console.log(this.props)
    if (!share) {
      return null
    }

    const params = erilizeUrl(window.location.href)
    const prizeArray = share.prize
    const lackCards = share.cards.length - parseInt(params.nowAmount, 10)
    const cycleTheme = share.cycleInfo.theme
    let cardImg
    
    share.cards.map((card) => {
      if (parseInt(card.id, 10) === parseInt(this.state.cardId, 10)) {
        cardImg = card.image
      }
      return true
    })
    // 调用二次分享
    this.secondShare(params.nowAmount, lackCards, params.cardName, cardImg, prizeArray.name, prizeArray.image)

    const bgImg = {
      background: `url(${cardImg}) no-repeat center`,
      backgroundSize: 'cover'
    }
    const prizeImg = {
      background: `url(${prizeArray.image}) no-repeat center`,
      backgroundSize: 'cover'
    }
    console.log(this.state.winnStatus)
    return (
      <div>
        <ShareBanner />
        {
          this.state.winnStatus === '100' ?
            <div className="share oneBg">
              <header className="header mb1">
                <div className="title">{this.props.prizeTitle}</div>
                <div className="text">{cycleTheme}</div>
              </header>
              <CurrentActivity data={data} isNotHomePage={this.props.isNotDisplay} MarqClass={this.props.MarqClass} />
              <footer className="footer">
                <div className="info1">
                  <div className="card-No">
                    “我已集齐{params.nowAmount}张，再集{lackCards}张
                  </div>
                  <div className="prize">
                    可获得{prizeArray.name}，你也来参加吧”
                  </div>
                </div>
                <div className="share-btn btn-margin12" onClick={this.handleClick}>我要参与</div>
              </footer>
            </div> : 
            this.state.winnStatus === '200' ? 
              <div className="share oneBg">
                <header className="header mb2">
                  <div className="info">
                    <div className="userinfo">{`我获得了${prizeArray.name}`}</div>
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
                  <div className="title">{this.props.prizeTitle}</div>
                  <div className="text">{cycleTheme}</div>
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
                        “我已集齐{params.nowAmount}张，再集{lackCards}张可获得{prizeArray.name}，你也来参加吧”
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
export default connect(state => ({ data: state.share }), actions)(Share)
