import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchShareInfo } from '../actions/shareItem'
import '../../css/Share.scss'
import { secondShareInit } from '../utils/secondShare'
import { erilizeUrl, changeUrl, erilizeText } from '../utils/util'

import CurrentActivity from '../components/CurrentActivity/index'
import ShareBanner from '../components/ShareBanner'

// 获奖分享页面, 未获取分享页面 ,晒卡页面
class Share extends Component {

  static defaultProps = {
    isNotDisplay: true,
    MarqClass: 'r-prize-another',
    prizeTitle: '头条集卡得大奖',
    address: '',
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
    }
    this.cardImg = ''
    this.cardName = ''
    this.props.fetchShareInfo(params.cycleId)
  }

  // 点击回流
  handleClick() {
    window.location.href = changeUrl('http://m.163.com/newsapp/applinks.html?url=https://t.c.m.163.com/uncharted/index.html', 2)
  }

  /** *******************
   * desc:二次分享数据设定
   * params: cardAmount: 当前收集到的几种卡片 lackCards: 还差几张集齐 cardName: 卡片名称 cardImg: 卡片图片 prizeName: 奖品名称 prizeImg: 奖品图片
   * return
   **********************/
  secondShare(cardAmount, lackCards, cardName, cardImg, prizeName, prizeImg) {
    let secondShareOption = {
      title: '',
      content: '',
      img: ''
    }
    const allCards = cardAmount + lackCards
    switch (parseInt(this.state.winnStatus, 10)) {
      case 100:// 分享集卡活动
        secondShareOption.title = `我还差${lackCards}张卡，集齐可得${prizeName}。私聊我，咱们互换吧~` // 已经有卡,未集齐
        secondShareOption.content = '网易新闻,集卡赢大奖啦'
        secondShareOption.img = prizeImg
        if (lackCards === 0) {
          // 已经集齐
          secondShareOption.title = `我参加网易新闻集卡活动，获得了${prizeName}。人品大爆发啊~`
        } else if (cardAmount === 0) {
          // 集齐0张
          secondShareOption.title = `我发现了个好玩的活动，集齐${allCards}张卡可得${prizeName}，一般人我不告诉TA`
        }
        break
      case 200:// 已经获奖
        secondShareOption.title = `我参加网易新闻集卡活动，获得了${prizeName}。人品大爆发啊~`
        secondShareOption.content = '网易新闻,集卡赢大奖啦'
        secondShareOption.img = prizeImg
        break
      case 300:// 晒卡
        secondShareOption.title = `我得到了${cardName}，集齐可得${prizeName},你也来参加吧`
        secondShareOption.content = '网易新闻,集卡赢大奖啦'
        secondShareOption.img = cardImg
        break
      default:
        break
    }
    secondShareInit(secondShareOption)
  }

  render() {
    const { data } = this.props
    const { share } = data
    if (!share) {
      return null
    }
    const params = erilizeUrl(window.location.href)
    const { cardId, cardLen, nowAmount } = params
    const prizeArray = share.prize
    let lackCards = (parseInt(cardLen, 10) - parseInt(nowAmount, 10))
    lackCards = lackCards <= 0 ? 0 : lackCards

    const cycleTheme = share.cycleInfo.theme // 当期主题

    // 得到当前分享的卡片的数据
    share.cards.forEach((card) => {
      if (parseInt(card.id, 10) === parseInt(cardId, 10)) {
        this.cardImg = card.image
        this.cardName = card.name
      }
    })

    // 调用二次分享
    this.secondShare(params.cardLen, lackCards, this.cardName, this.cardImg, prizeArray.name, prizeArray.image)

    // 卡片背景
    const bgImg = {
      background: `url(${this.cardImg}) no-repeat center`,
      backgroundSize: 'cover'
    }

    // 奖品背景
    const prizeImg = {
      background: `url(${prizeArray.image}) no-repeat center`,
      backgroundSize: 'cover'
    }
    return (
      <div>
        <ShareBanner />
        { // 分享集卡活动
          this.state.winnStatus === '100' &&
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
                        {
                          parseInt(nowAmount, 10) === 0 ?
                            erilizeText(`我还差${lackCards}张卡,集齐可得${prizeArray.name}。私聊我，咱们互换吧~`, 30)
                            :
                            erilizeText(`我发现了个好玩的活动,集齐${parseInt(cardLen, 10)}张可得${prizeArray.name},一般人我不告诉TA`, 35)
                        }
                      </div>
                    </div>
                    :
                    <div className="info1">
                      <div className="card-No">
                        {erilizeText(`我参加了网易新闻集卡活动,获得了${prizeArray.name}, 人品大爆发啊~`, 36)}
                      </div>
                    </div>
                }
                <div className="share-btn btn-margin12" onClick={this.handleClick}>我要参与</div>
              </footer>
            </div>
        }
        { // 已经中奖
          this.state.winnStatus === '200' &&
            <div className="share oneBg">
              <header className="header mb2">
                <div className="info">
                  <div className="userinfo">{erilizeText(`我参加了网易新闻集卡活动,获得了${prizeArray.name}, 人品大爆发啊~`, 36)}</div>
                  <div className="introduce"></div>
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
            </div>
        }
        { // 晒卡
          this.state.winnStatus === '300' &&
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
                          `我得到了${this.cardName}，集齐可得${prizeArray.name}，一般人我不告诉TA` :
                          `我得到了${this.cardName}，得到了${prizeArray.name},一般人我不告诉TA`
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
