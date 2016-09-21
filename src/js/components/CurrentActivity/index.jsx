import React, { Component } from 'react'
import Cards from './Cards'
import Prize from './Prize'
import Subject from './Subject'
import './../../../css/home.scss'
import './../../../css/currentActivity.scss'
import { isAndroid, isIos } from './../../utils/util'

export default class CurrentActivity extends Component {

  componentDidMount() {

  }
  render() {
    const { data, push, loginStatus, isNotHomePage } = this.props
    let className = 'cur-prize-container'
    if (isIos) {
      className += ' ios-animation'
    } else if (isAndroid) {
      className += ' android-animation'
    }
    if (this.props.isNotHomePage) {
      // 不是主页
      const share = data.share
      return (
        <div className="marquee-outer">
          <div className={className}>
            <div className="inner">
              <Prize 
                data={share.prize} 
                IsNotDisplay={isNotHomePage} 
                MarqClass={this.props.MarqClass} 
                sumAmount={share.cards.length}
              />
              <Cards allCards={share.cards} isNotHomePage={isNotHomePage} loginStatus={loginStatus} prizeName={share.prize.name} endTime={share.cycleInfo.endTime} />
            </div>
          </div>
        </div>
      )
    } else {
      // 是主页
      const basic = data.basic
      const notlogin = data.notlogin
      return (
        <div className="marquee-outer">
          <Subject subject={notlogin.cycleInfo} />
          <div className={className}>
            <div className="inner">
              <Prize 
                data={notlogin.prize} 
                IsNotDisplay={isNotHomePage} 
                MarqClass={this.props.MarqClass} 
                fetchBasicInfo={this.props.fetchBasicInfo}
                nowAmount={loginStatus ? basic.myCards.length : ''}
                sumAmount={notlogin.cards.length}
                cycleId={notlogin.cycleInfo.id}
                prizeId={notlogin.prize.id}
                push={push}
                collCardStatus={this.props.collCardStatus}
                loginStatus={this.props.loginStatus}
                curPrizeStatus={this.props.curPrizeStatus}
                shareYet={this.props.changeLotteryStatus}
                lotteryId={this.props.lotteryId}
                sendLotteryId={this.props.sendLotteryId}
                sendLotteryIdErrCode={this.props.sendLotteryIdErrCode}
              />
              <Cards 
                allCards={notlogin.cards} 
                isNotHomePage={isNotHomePage} 
                loginStatus={loginStatus} 
                prizeName={notlogin.prize.name} 
                myCards={loginStatus ? basic.myCards : ''} 
                endTime={notlogin.cycleInfo.endTime}
                changeCardsNum={this.props.changeCardsNum} 
                cycleId={notlogin.cycleInfo.id}
                prizeId={notlogin.prize.id}
              />
            </div>
          </div>
        </div>
      )
    }
  }
}

