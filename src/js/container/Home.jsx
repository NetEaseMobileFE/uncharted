import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as actions from '../actions/home'
import { fetchQueryCard } from '../actions/shareItem'
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
      // loginStatus: false,
      isNotHomePage: false,
      collCardStatus: true,
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
          let giftId = decodeURIComponent(this.params.giftId)
          while (giftId.match(/%/i)) {
            giftId = decodeURIComponent(giftId)
          }
          this.props.fetchQueryCard(giftId, this.params.cardId).then((json) => {
            if (!!json.data && !!json.data.valid) {
              this.setState({
                cardStatus: !!this.params.getCard
              })
              // 领取卡片
              this.props.actions.receiveCardId(giftId, this.params.cardId).then(() => {
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
    // this.setState({
    //   loginStatus: true
    // })
    this.props.actions.loginNewsApp()
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

 // 打开系统弹窗
  openSD(desc) {
    this.setState({
      openSystemDialog: true,
      systemDialogDesc: desc
    })
  }

  // 关闭系统弹窗
  closeSD() {
    this.setState({
      openSystemDialog: false
    })
  }

  render() {
    const { data, history } = this.props
    const { basic, notlogin, loginStatus } = data
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
      cardType: basic.myCards.length, // 拥有卡片的类型数目
      cardAmount: cardDialogLen, // 该卡片的数目
      cardId: this.params.cardId, // 该卡片的id
      cardLen: notlogin.cards.length, // 兑奖需要集齐多少张卡
      cardImg: this.cardImg, // 卡片图
      prizeName: notlogin.prize.name, // 该期的奖品名称
      cardName: this.cardName, // 卡片名称
      cardMark: this.cardMark, // 卡片标注
      changeCardStatus: this.getCardStatus, // 控制该卡片弹窗是否显示的func
      cycleId: notlogin.cycleInfo.id, // 期信息
      endTime: notlogin.cycleInfo.endTime, // 期结束时间
      sendCard: this.props.actions.sendCard, // 送卡函数
      onOpenSD: this.openSD // 系统弹窗控制函数
    }

    // CurrentActivity组件参数
    const currentActivityParams = {
      data,
      curPrizeStatus, // 当前奖品状态
      isNotHomePage: this.state.isNotHomePage, // 判断是主页还是回流页
      loginStatus,
      push: history.push, // 路由跳转func
      collCardStatus: this.state.collCardStatus, // 判断是否是低版本或者为开启集卡功能
      sendLotteryId: this.props.actions.sendLotteryId, // 兑奖func
      lotteryId: basic.lotteryPrizes.length !== 0 ? basic.lotteryPrizes[0].lotteryInfo.id : null, // 中奖id
      sendCard: this.props.actions.sendCard, // 赠送卡片
      onOpenSD: this.openSD // 系统弹窗控制func
    }
    
    // 我的获奖记录组件参数
    const myWinningParams = {
      data: basic, // 登陆数据
      push: history.push, // 路由跳转func
      changeLotteryStatus: this.props.actions.changeLotteryStatus, // 分享之后需要改变一下中奖状态func
      cycleId: notlogin.cycleInfo.id, // 期信息
      sendLotteryId: this.props.actions.sendLotteryId, // 兑奖func
    }

    const timeOut = notlogin.cycleInfo.endTime < notlogin.now ? true : false
    const curouselParams = {
      carousel: notlogin.carousel, // 轮播信息
      timeOut // 是否过期
    }

    return (
      <div className="h-main-container">
        {this.state.openSystemDialog && <SystemDialog data={systemDialogParams} />}
        {!!this.state.cardStatus && <CardDialog data={cardDialogParams} />}
        {this.state.noCard && <NoCardToGet noCardToGet={this.noCardToGet} />}
        <CurrentActivity data={currentActivityParams} />
        <Carousel data={curouselParams} />
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

