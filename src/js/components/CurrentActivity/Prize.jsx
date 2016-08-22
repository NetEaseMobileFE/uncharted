import React, { Component } from 'react'
import NEWSAPPAPI from 'newsapp'
import { sendLotteryId } from './../../utils/util'

export default class Prize extends Component {
  constructor(props) {
    super(props)
    this.handleShare = this.handleShare.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleParticipate = this.handleParticipate.bind(this)
    this.state = {
      prizeStatus: this.props.collCardStatus, // 是否开启活动
      loginStatus: this.props.loginStatus, // 登陆状态
      shareStatus: false,
      winnStatus: 100, // 100为未集齐，200为集齐
    }
  }

  handleShare() {
    let { push, cycleId, prizeId, lotteryId } = this.props
    const shareData = {
      wbText: '网易新闻,集卡赢大奖',
      wbPhoto: `${this.props.data.image}`,
      wxText: '网易新闻,集卡赢大奖',
      wxTitle: `我中奖啦，获得了${this.props.data.name}你也来参加吧！`,
      wxUrl: `http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=${this.state.winnStatus}&cardAmount=${this.props.nowAmount}&prizeName=${this.props.data.name}&prizeImg=${this.props.data.image}`,
      wxPhoto: `${this.props.data.image}`
    }
    // NEWSAPPAPI.share.setData(shareData)
    NEWSAPPAPI.share.invoke(shareData, () => {
      push(`/expiry?prizeId=${prizeId}&cycleId=${cycleId}&lotteryId=${lotteryId}`)
      sendLotteryId(lotteryId)
    })
  }

  handleParticipate() {
    // 需要打开设置
  }

  handleLogin() {
    NEWSAPPAPI.login(true, (rs) => {
      this.props.fetchBasicInfo()
      this.setState({
        loginStatus: !!rs
      })
    })
  }

  componentDidMount() {
    if (!!this.props.nowAmount && this.props.nowAmount === this.props.sumAmount) {
      this.setState({
        winnStatus: 200
      })
    } else {
      this.setState({
        winnStatus: 100
      })
    }

    setTimeout(() => {
      NEWSAPPAPI.ui.button('分享', () => {
        const shareData = {
          wbText: '网易新闻,集卡赢大奖',
          wbPhoto: `${this.props.data.image}`,
          wxText: '网易新闻,集卡赢大奖',
          wxTitle: `我集到了${this.props.nowAmount}张卡，再集${this.props.sumAmount - this.props.nowAmount}张可获得${this.props.data.name}，你也来参加吧！`,
          wxUrl: `http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=100&cycleId=${this.props.cycleId}&nowAmount=${this.props.nowAmount}&cardLen=${this.props.sumAmount}&prizeName=${this.props.data.name}`,
          wxPhoto: `${this.props.data.image}`
        }
        NEWSAPPAPI.share.invoke(shareData, (rs) => {
        })
      })
    }, 300)    
  }

  render() {
    const { data } = this.props
    const finalFunc =  this.state.shareStatus ? '' : !this.state.loginStatus ? this.handleLogin : !this.state.prizeStatus ? this.handleParticipate : this.props.nowAmount === this.props.sumAmount ? this.handleShare : ''
    const finalClass = this.state.shareStatus ? 'prize-btn btn-bgc2' : !this.state.loginStatus ? 'prize-btn btn-bgc4' : !this.state.prizeStatus ? 'prize-btn btn-bgc3' : this.props.nowAmount === this.props.sumAmount ? 'prize-btn btn-bgc2' : 'prize-btn btn-bgc1'
    const finalLabelText = !this.state.loginStatus ? '登录参与活动' : !this.state.prizeStatus ? '您已关闭此功能' : ' '
    const finalBtnText = this.props.curPrizeStatus === 2 ? '已领取' : !this.state.loginStatus || !this.state.prizeStatus ? '立即参与' : this.props.nowAmount === this.props.sumAmount ? `分享后领取(${this.props.nowAmount}/${this.props.sumAmount})` : `集齐可领取(${this.props.nowAmount}/${this.props.sumAmount})`
    let imgBg = data.image
    const bgImgStyle = {
      background: `url(${imgBg}) no-repeat center`,
      backgroundSize: '100% 100%'
    }
    return (
      <div className="cur-prize">
        <div className="cur-prize-img">
          <div className="prizeImgBg" style={bgImgStyle}></div>
        </div>
        <div className={this.props.MarqClass || 'r-prize'}>
          <label className="prize-label-text">本期奖品</label>
          <span className="prize-info">{data.name}</span>
          {
            !this.props.IsNotDisplay && 
              <span className="prize-status">{finalLabelText}</span>
          }
          {
            !this.props.IsNotDisplay && 
              <div className={finalClass} onClick={finalFunc}>{finalBtnText}</div>
          }
        </div>
      </div>
    )
  }
}

