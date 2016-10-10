import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as actions from '../actions/Home'
import { fetchQueryCard } from '../actions/ShareItem'
import '../../css/Home.scss'
import '../../css/CurrentActivity.scss'

import CurrentActivity from '../components/CurrentActivity/index'
import Carousel from '../components/Carousel'
import MyWinning from '../components/MyWinning'
import PastWinning from '../components/PastWinning'
import MyCollection from '../components/MyCollection'
import Rules from '../components/Rules'
import CardDialog from '../components/CardDialog'
import NoCardToGet from '../components/NoCardToGet'
import SystemDialog from '../components/SystemDialog'
import NEWSAPPAPI from 'newsapp'
import { erilizeUrl, sessionStorageHeight } from './../utils/util'


class Home extends Component {
  constructor(props) {
    super(props)
    this.intervals = []
    this.judgeHlcStatus = this.judgeHlcStatus.bind(this)
    this.judgeEdition = this.judgeEdition.bind(this)
    this.getCardStatus = this.getCardStatus.bind(this)
    this.getData = this.getData.bind(this)
    this.noCardToGet = this.noCardToGet.bind(this)
    this.closeSD = this.closeSD.bind(this)
    this.openSD = this.openSD.bind(this)
    this.params = erilizeUrl(location.href)
    this.cardImg = null
    this.cardName = null
    this.cardMark = null
    this.state = {
      loginStatus: false,
      isNotHomePage: false,
      collCardStatus: false,
      needToUpdate: false,
      cardStatus: false,
      noCard: false,
      openSystemDialog: false
    }
  }

  componentDidMount() {
    // 更改title
    window.scrollTo(0, +(sessionStorage.homeHeight) || 0)
    sessionStorage.removeItem('homeHeight')
    NEWSAPPAPI.ui.title('头条集卡兑大奖')
    // 判断是否是登陆状态
    NEWSAPPAPI.login(true, (rs) => {
      // 登陆状态
      if (!!rs) {
        // 判断跳转的url中是否存在getCard参数,存在说明是从领卡页面进行跳转,需弹出卡片
        if (!!this.params.getCard) {
          // 验证卡片是否满足可领取状态
          this.props.fetchQueryCard(this.params.giftId, this.params.cardId).then((json) => {
            if (!!json.data && !!json.data.valid) {
              this.setState({
                cardStatus: !!this.params.getCard
              })
              // 领取卡片
              this.props.actions.receiveCardId(this.params.giftId, this.params.cardId).then(() => {
                this.getData()
              })
            } else {
              // 卡片不满足领卡状态, 弹出领卡失败页面
              this.noCardToGet()
              this.getData()
            }
          })
        } else {
          // 非领卡页跳转, 直接获取数据
          this.getData()
        }
        // 判断版本号和集卡功能开启状态
        this.judgeEdition()
        // this.judgeHlcStatus()
      }
    })

    // 从集卡页面跳转到设置页面并开启集卡功能时候,客户端会回调该函数
    window.__headlineCard_open = () => {
      this.judgeHlcStatus()
    }

    // 两个作用,一个是防止从领卡页面跳转的url导致重复领卡.另外是为了判断是否是第一次访问该url
    setTimeout(() => {
      // if (!!this.params.getCard) {
      //   window.history.replaceState([], '', 'index.html?visit=1&')
      // }
      window.history.replaceState([], '', 'index.html?visit=1&')
    }, 500)
  }

  componentWillUnmount() {
    sessionStorageHeight('homeHeight')
  }

  // 是否显示卡片详情页
  getCardStatus() {
    this.setState({
      cardStatus: !this.state.cardStatus
    })
  }

  // 获取登陆数据和未登录数据,并将登陆状态置为true
  getData() {
    this.props.actions.fetchNotloginInfo()
    this.props.actions.fetchBasicInfo()
    this.setState({
      loginStatus: true
    })
  }

  // 判断客户端版本是否低于16.0
  judgeEdition() {
    NEWSAPPAPI.device((rs) => {
      if (Math.floor(parseInt(rs.v, 10)) < 16) {
        if (+(this.params.visit) !== 1) {
          this.openSD('请升级到最新版网易新闻参与活动')
        }
      } else {
        this.judgeHlcStatus()
      }
    })
  }

  // 判断集卡功能是否开启
  judgeHlcStatus() {
    NEWSAPPAPI.settings((rs) => {
      this.setState({
        collCardStatus: rs.headlineCard
      })
    })
  }

  // 不是从卡片获取页跳转
  noCardToGet() {
    this.setState({
      noCard: !this.state.noCard,
      cardStatus: false
    })
  }

  openSD(desc) {
    this.setState({
      openSystemDialog: true,
      systemDialogDesc: desc
    })
  }

  closeSD() {
    this.setState({
      openSystemDialog: false
    })
  }

  render() {
    const { data, history } = this.props
    const { basic, notlogin } = data

    // 判断是否获取到未登录数据
    if (!notlogin) {
      return null
    }
    // 领卡时获取卡片的具体信息
    if (this.params.getCard) {
      notlogin.cards.map((item) => {
        if (item.id === parseInt(this.params.cardId, 10)) {
          this.cardImg = item.image
          this.cardName = item.name
          this.cardMark = item.mark
        }
        return null
      })
    }
    // 判断是否获取到登陆接口的数据
    if (!basic) {
      return null
    }
    // 判断客户端是否注入cookie失败
    if (!!basic && !basic.lotteryCards) {
      this.props.actions.fetchBasicInfo()
      return null
    }

    let cycleId = notlogin.cycleInfo.id
    let curPrizeStatus
    for (let index = 0; index < basic.lotteryPrizes.length; index++) {
      let item = basic.lotteryPrizes[index]
      if (item.cycleInfo.id === cycleId) {
        curPrizeStatus = item.lotteryInfo.status
        break
      }
    }
    
    let cardDialogLen = 0
    basic.myCards.map((item) => {
      if (item.cardId === +(this.params.cardId)) {
        cardDialogLen = item.amount
      }
      return true
    })

    // 系统弹窗参数
    const systemDialogParams = {
      onCloseSD: this.closeSD,
      desc: this.state.systemDialogDesc
    }

      // 从领卡回流页跳转回主页的弹窗组件参数
    const cardDialogParams = {
      cardType: basic.myCards.length,
      cardAmount: cardDialogLen,
      cardId: this.params.cardId,
      cardLen: notlogin.cards.length,
      cardImg: this.cardImg,
      prizeName: notlogin.prize.name,
      cardName: this.cardName,
      cardMark: this.cardMark,
      changeCardStatus: this.getCardStatus,
      changeCardsNum: this.props.actions.changeCardsNum,
      cycleId: notlogin.cycleInfo.id,
      endTime: notlogin.cycleInfo.endTime,
      sendCard: this.props.actions.sendCard,
      sendCardInfo: data.sendCardInfo,
      onOpenSD: this.openSD
    }

    // CurrentActivity组件参数
    const currentActivityParams = {
      data,
      curPrizeStatus,
      isNotHomePage: this.state.isNotHomePage,
      loginStatus: this.state.loginStatus,
      push: history.push,
      changeCardsNum: this.props.actions.changeCardsNum,
      collCardStatus: this.state.collCardStatus,
      sendLotteryId: this.props.actions.sendLotteryId,
      lotteryId: basic.lotteryPrizes.length !== 0 ? basic.lotteryPrizes[0].lotteryInfo.id : null,
      sendLotteryIdErrCode: this.props.data.sendLotteryId ? this.props.data.sendLotteryId.errcode : null,
      sendCard: this.props.actions.sendCard,
      sendCardInfo: data.sendCardInfo,
      onOpenSD: this.openSD
    }

    // 我的获奖记录组件参数
    const myWinningParams = {
      data: basic,
      push: history.push,
      changeLotteryStatus: this.props.actions.changeLotteryStatus,
      cycleId: notlogin.cycleInfo.id,
      sendLotteryId: this.props.actions.sendLotteryId,
      sendLotteryIdErrCode: this.props.data.sendLotteryId ? this.props.data.sendLotteryId.errcode : null
    }


    return (
      <div className="h-main-container">
        {this.state.openSystemDialog && <SystemDialog data={systemDialogParams} />}
        {!!this.state.cardStatus && <CardDialog data={cardDialogParams} />}
        {this.state.noCard && <NoCardToGet noCardToGet={this.noCardToGet} />}
        <CurrentActivity data={currentActivityParams} />
        <Carousel data={notlogin.carousel} />
        <div className="list-change-style">
          {!!basic.lotteryPrizes && basic.lotteryPrizes.length !== 0 && <MyWinning data={myWinningParams} />}
          {!!notlogin && notlogin.lotteryPrizes.length !== 0 && <PastWinning data={notlogin} />}
        </div>
        {!!basic.lotteryCards[0] && basic.lotteryCards.length > 0 && <MyCollection data={basic.lotteryCards} />}
        <Rules />
      </div>
    )
  }
}

export default connect(state => ({ 
  data: state.home,
  shareItem: state.shareItem
}), dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  push: bindActionCreators(push, dispatch),
  fetchQueryCard: bindActionCreators(fetchQueryCard, dispatch)
}))(Home)

