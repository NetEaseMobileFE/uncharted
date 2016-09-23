import React, { Component } from 'react'
import NEWSAPPAPI from 'newsapp'
import { erilizeText, changeUrl } from '../../utils/util'

export default class Prize extends Component {
  constructor(props) {
    super(props)
    this.handleShare = this.handleShare.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleParticipate = this.handleParticipate.bind(this)
    this.handleToGetPrize = this.handleToGetPrize.bind(this)
    this.state = {
      prizeStatus: this.props.collCardStatus, // 是否开启活动
      loginStatus: this.props.loginStatus, // 登陆状态
      // shareStatus: false,
    }
  }

  componentDidMount() {
    const { nowAmount, sumAmount } = this.props
    if (!!nowAmount && nowAmount === sumAmount) {
      this.setState({
        winnStatus: 200
      })
    } else {
      this.setState({
        winnStatus: 100
      })
    }
    setTimeout(() => {
      const { data, cycleId } = this.props
      let wxTitle = `我集到了${nowAmount}张卡，再集${sumAmount - nowAmount}张可获得${data.name}，你也来参加吧！`
      if (sumAmount === nowAmount) {
        wxTitle = `我参加网易新闻集卡活动，获得了${data.name}。人品大爆发啊~`
      } else if (nowAmount === 0) {
        wxTitle = `我发现了个好玩的活动，集齐${sumAmount}张卡可得${data.name}，一般人我不告诉ta`
      }
      NEWSAPPAPI.ui.button('分享', () => {
        const shareData = {
          wbText: '网易新闻,集卡赢大奖啦' + changeUrl(` http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=100&cycleId=${cycleId}&nowAmount=${nowAmount}&cardLen=${sumAmount}`, 2),
          wbPhoto: `${data.image}`,
          wxText: '网易新闻,集卡赢大奖啦',
          wxTitle,
          wxUrl: changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=100&cycleId=${cycleId}&nowAmount=${nowAmount}&cardLen=${sumAmount}`, 2),
          wxPhoto: `${data.image}`
        }
        NEWSAPPAPI.share.invoke(shareData, () => {
          return null
        })
      })
    }, 500)
  }

  handleShare() {
    let { push, cycleId, prizeId, lotteryId, data, nowAmount } = this.props
    const shareData = {
      wbText: '网易新闻,集卡赢大奖啦' + changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=${this.state.winnStatus}&cardAmount=${nowAmount}&cycleId=${cycleId}`, 2),
      wbPhoto: `${data.image}`,
      wxText: '网易新闻,集卡赢大奖啦',
      wxTitle: `我参加网易新闻集卡活动，获得了${data.name}。人品大爆发啊~`,
      wxUrl: changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=${this.state.winnStatus}&cardAmount=${nowAmount}&cycleId=${cycleId}`, 2),
      wxPhoto: `${data.image}`
    }

    NEWSAPPAPI.share.invoke(shareData, () => {
      this.props.sendLotteryId(lotteryId)
        .then(() => {
          let errcode = parseInt(this.props.sendLotteryIdErrCode, 10)
          if (errcode === 0) {
            push(`/expiry?prizeId=${prizeId}&cycleId=${cycleId}&lotteryId=${lotteryId}`)
          } else if (errcode === 400) {
            alert('请在登陆后领奖')
          } else if (errcode === 412) {
            alert('服务器繁忙')
            console.log('参数错误')
          } else if (errcode === 1) {
            alert('服务器繁忙')
            console.log('服务器内部错误')
          } else {
            alert('服务器繁忙')
          }
        })
    })
  }

  handleParticipate() {
    // 需要打开设置
    NEWSAPPAPI.device((rs) => {
      if (Math.floor(parseInt(rs.v, 10)) < 16) {
        alert('升级到最新版才能参加活动')
      } else {
        window.location.href = 'pushview://settings'
      }
    })
  }

  handleLogin() {
    NEWSAPPAPI.login(true, (rs) => {
      this.props.fetchBasicInfo()
      this.setState({
        loginStatus: !!rs
      })
    })
  }

  handleToGetPrize() {
    let { push, cycleId, prizeId, lotteryId } = this.props
    push(`/expiry?prizeId=${prizeId}&cycleId=${cycleId}&lotteryId=${lotteryId}`)
  }

  render() {
    const { data } = this.props
    // 这个按钮,有8种状态 以后用数组判断
    let finalFunc = ''
    let finalBtnText = ''
    let finalClass = 'prize-btn'
    let finalLabelText = ''
    if (!this.props.collCardStatus) {
      // 未开启集卡功能
      // alert(1)
      finalFunc = this.handleParticipate
      finalBtnText = '立即参与'
      finalClass += ' btn-bgc3'
      finalLabelText = '您已关闭此功能'
    } else if (this.props.curPrizeStatus === 2) {
      // 已经领取
      finalFunc = null
      finalBtnText = '已领取'
      finalClass += ' btn-bgc3'
    } else if (this.props.curPrizeStatus === 1) {
      // 已经分享未领取
      finalFunc = this.handleToGetPrize
      finalBtnText = '点击领取'
      finalClass += ' btn-bgc2'
    } else if (this.props.curPrizeStatus === 0) {
      // 未领取
      finalFunc = this.handleShare
      finalBtnText = `分享后领取(${this.props.nowAmount}/${this.props.sumAmount})`
      finalClass += ' btn-bgc2'
    } else if (this.props.curPrizeStatus === -1) {
      // 已失效
      finalFunc = null
      finalBtnText = '已失效'
      finalClass += ' btn-bgc1'
    } else if (this.props.nowAmount !== this.props.sumAmount) {
      finalFunc = null
      finalBtnText = `集齐可领取(${this.props.nowAmount}/${this.props.sumAmount})`
      finalClass += ' btn-bgc1'
    } else {
      finalFunc = null
      finalBtnText = '未知状态'
    }

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
          <span className="prize-info">{erilizeText(data.name, 7)}</span>
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

