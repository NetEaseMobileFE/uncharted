import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as actions from '../actions/home'
import '../../css/home.scss'
import '../../css/currentActivity.scss'

import CurrentActivity from '../components/CurrentActivity'
import Carousel from '../components/Carousel'
import MyWinning from '../components/MyWinning'
import PastWinning from '../components/PastWinning'
import MyCollection from '../components/MyCollection'
import Rules from '../components/Rules'
import NEWSAPPAPI from 'newsapp'


class Home extends Component {
  constructor(props) {
    super(props)
    this.intervals = []
    this.judgeHlcStatus = this.judgeHlcStatus.bind(this)
    this.state = {
      loginStatus: false,
      isNotHomePage: false,
      collCardStatus: false
    }
    this.props.actions.fetchNotloginInfo()
    NEWSAPPAPI.login((rs) => {
      if (!!rs) {
        this.props.actions.fetchBasicInfo()
        this.setState({
          loginStatus: true
        })
      }
    })
  }
  
  componentDidMount() {
    // this.judgeHlcStatus()
  }

  judgeHlcStatus() {
    NEWSAPPAPI.settings((rs) => {
      alert(rs.headlineCard)
      this.settings({
        collCardStatus: rs.headlineCard
      })
    })
  }

  render() {
    const { data, history } = this.props
    const { basic, notlogin } = data
    if (!notlogin) {
      return null
    }
    console.log(data)
    if (this.state.loginStatus) {
      if (!basic) {
        return null
      }
      let cycleId = notlogin.cycleInfo.id
      let curPrizeStatus
      basic.lotteryPrizes.map((item) => {
        if (item.cycleInfo.id === cycleId) {
          curPrizeStatus = item.lotteryInfo.status
        }
        return curPrizeStatus
      })
      return (
        <div className="h-main-container">
          <CurrentActivity 
            data={data}
            isNotHomePage={this.state.isNotHomePage} 
            loginStatus={this.state.loginStatus} 
            push={history.push} 
            changeCardsNum={this.props.actions.changeCardsNum}
            collCardStatus={this.state.collCardStatus}
            loginStatus={this.state.loginStatus}
            curPrizeStatus={curPrizeStatus}
          />
          <Carousel data={notlogin.carousel} />
          <div className="list-change-style">
            {
              !!basic.lotteryPrizes && 
              basic.lotteryPrizes.length !== 0 && 
                <MyWinning
                  data={basic}
                  push={history.push}
                  changeLotteryStatus={this.props.actions.changeLotteryStatus}
                  cycleId={notlogin.cycleInfo.cycleId}
                />
            }
            {
              !!notlogin && <PastWinning data={notlogin} />
            }
          </div>
          <MyCollection data={basic.lotteryCards} />
          <Rules />
        </div>
      )
    } else {
      return (
        <div className="h-main-container">
          <CurrentActivity 
            data={data}
            fetchBasicInfo={this.props.actions.fetchBasicInfo} 
            isNotHomePage={this.state.isNotHomePage} 
            loginStatus={this.state.loginStatus} 
            push={history.push} 
          />
          <Carousel data={notlogin.carousel} />
          <div className="list-change-style">
          {
            !!notlogin && <PastWinning data={notlogin} />
          }
          </div>
          <Rules />
        </div>
      )
    }
  }
}

export default connect(state => ({ 
  data: state.home 
}), dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  push: bindActionCreators(push, dispatch)
}))(Home)





