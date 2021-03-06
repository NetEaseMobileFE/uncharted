import React, { Component } from 'react'
import NEWSAPPAPI from 'newsapp'
import { erilizeText, changeUrl, validator } from '../../utils/util'

export default class Prize extends Component {
  constructor(props) {
    super(props)
    this.handleShare = this.handleShare.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleParticipate = this.handleParticipate.bind(this)
    this.handleToGetPrize = this.handleToGetPrize.bind(this)
  }

  componentDidMount() {
    const { nowAmount, sumAmount } = this.props.data
    setTimeout(() => {
      const { data, cycleId } = this.props.data
      let wxTitle = `我还差${sumAmount - nowAmount}张卡,集齐可得${data.name}，私聊我,咱俩互换吧！`
      if (sumAmount === nowAmount) {
        wxTitle = `我参加网易新闻集卡活动，获得了${data.name}。人品大爆发啊~`
      } else if (nowAmount === 0) {
        wxTitle = `我发现了个好玩的活动，集齐${sumAmount}张卡可得${data.name}，一般人我不告诉ta`
      }
      NEWSAPPAPI.ui.button('分享', () => {
        const shareData = {
          wbText: '网易新闻,集卡赢大奖啦' + changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=100&cycleId=${cycleId}&nowAmount=${nowAmount}&cardLen=${sumAmount}`, 2),
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
    const { push, cycleId, prizeId, lotteryId, data, nowAmount, sendLotteryId } = this.props.data
    const shareData = {
      wbText: '网易新闻,集卡赢大奖啦' + changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=200&cardAmount=${nowAmount}&cycleId=${cycleId}`, 2),
      wbPhoto: `${data.image}`,
      wxText: '网易新闻,集卡赢大奖啦',
      wxTitle: `我参加网易新闻集卡活动，获得了${data.name}。人品大爆发啊~`,
      wxUrl: changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=200&cardAmount=${nowAmount}&cycleId=${cycleId}`, 2),
      wxPhoto: `${data.image}`
    }
    NEWSAPPAPI.share.invoke(shareData, () => {
      sendLotteryId(lotteryId)
        .then((json) => {
          let errcode = parseInt(json.errcode, 10)
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
    const { fetchBasicInfo } = this.props.data
    NEWSAPPAPI.login(true, (rs) => {
      fetchBasicInfo()
      this.setState({
        loginStatus: !!rs
      })
    })
  }

  handleToGetPrize() {
    const { push, cycleId, prizeId, lotteryId } = this.props.data
    push(`/expiry?prizeId=${prizeId}&cycleId=${cycleId}&lotteryId=${lotteryId}`)
  }

  render() {
    const { data, collCardStatus, curPrizeStatus, nowAmount, sumAmount, isNotDisplay } = this.props.data
    // 奖品详情信息
    let prizeInfo = {
      finalFunc: '',
      finalBtnText: '',
      finalClass: 'prize-btn',
      finalLabelText: ''
    }

    if (!collCardStatus) {
      // 未开启集卡功能
      // 或者
      // 当前版本过低
      prizeInfo = {
        finalFunc: this.handleParticipate,
        finalBtnText: '立即参与',
        finalClass: 'prize-btn btn-bgc3',
        finalLabelText: '您已关闭此功能'
      }
      const ua = navigator.userAgent
      if (Math.floor(+(ua.split('NewsApp/', 3)[1])) < 16) {
        prizeInfo.finalLabelText = '当前版本过低'
      }
    } else if (curPrizeStatus !== undefined && curPrizeStatus !== null) {
      // 已经中奖
      switch (curPrizeStatus) {
        case -1:
          prizeInfo = {
            finalFunc: null,
            finalBtnText: '已失效',
            finalClass: 'prize-btn btn-bgc1',
            finalLabelText: ''
          }
          break
        case 0:
          prizeInfo = {
            finalFunc: this.handleShare,
            finalBtnText: `分享后领取(${nowAmount}/${sumAmount})`,
            finalClass: 'prize-btn btn-bgc2',
            finalLabelText: ''
          }
          break
        case 1:
          prizeInfo = {
            finalFunc: this.handleToGetPrize,
            finalBtnText: '点击领取',
            finalClass: 'prize-btn btn-bgc2',
            finalLabelText: ''
          }
          break
        case 2:
          prizeInfo = {
            finalFunc: null,
            finalBtnText: '已领取',
            finalClass: 'prize-btn btn-bgc3',
            finalLabelText: ''
          }
          break
      }
    } else if (nowAmount !== sumAmount) {
      // 未中奖
      prizeInfo = {
        finalFunc: this.handleShare,
        finalBtnText: `集齐可领取(${nowAmount}/${sumAmount})`,
        finalClass: 'prize-btn btn-bgc1',
        finalLabelText: ''
      }
    }

    let imgBg = data.image
    const bgImgStyle = {
      background: `url(${imgBg}) no-repeat center`,
      backgroundSize: '100% 100%'
    }
    return (
      <div className="cur-prize">
        <div className="cur-prize-img">
          <div className="prize-img-bg" style={bgImgStyle}></div>
        </div>
        <div className="r-prize">
          <label className="prize-label-text">本期奖品</label>
          <span className="prize-info">{erilizeText(data.name, 7)}</span>
          {
            !isNotDisplay &&
              <span className="prize-status">{prizeInfo.finalLabelText}</span>
          }
          {
            !isNotDisplay &&
              <div className={prizeInfo.finalClass} onClick={prizeInfo.finalFunc}>{prizeInfo.finalBtnText}</div>
          }
        </div>
      </div>
    )
  }
}

