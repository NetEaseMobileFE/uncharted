import React, { Component } from 'react'
import Cards from './Cards'
import Prize from './Prize'
import Subject from './Subject'
import './../../../css/home.scss'
import './../../../css/currentActivity.scss'

export default class CurrentActivity extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){

  }
  render() {
    const { data, push, loginStatus, isNotHomePage } = this.props
    if (this.props.isNotHomePage) {
      // 不是主页
      const share = data.share
      return (
        <div className="marquee-outer">
          <div className="cur-prize-container">
            <div className="inner inner-imgbg">
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
          <div className="cur-prize-container">
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
              />
              <Cards 
                allCards={notlogin.cards} 
                isNotHomePage={isNotHomePage} 
                loginStatus={loginStatus} 
                prizeName={notlogin.prize.name} 
                myCards={loginStatus ? basic.myCards : ''} 
                endTime={notlogin.cycleInfo.endTime}
                changeCardsNum={this.props.changeCardsNum} 
                cycleid={notlogin.cycleInfo.cycleid}
              />
            </div>
          </div>
        </div>
      )
    }

  }
}

