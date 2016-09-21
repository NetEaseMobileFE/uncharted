import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as actions from '../actions/home'
import {fetchQueryCard} from '../actions/shareItem'
import '../../css/home.scss'
import '../../css/currentActivity.scss'

import CurrentActivity from '../components/CurrentActivity'
import Carousel from '../components/Carousel'
import MyWinning from '../components/MyWinning'
import PastWinning from '../components/PastWinning'
import MyCollection from '../components/MyCollection'
import Rules from '../components/Rules'
import CardDialog from '../components/CardDialog'
import NoCardToGet from '../components/NoCardToGet'
import NEWSAPPAPI from 'newsapp'
import { erilizeUrl, writeObj } from './../utils/util'

class Home extends Component {
  constructor(props) {
    super(props)
    this.intervals = []
    this.judgeHlcStatus = this.judgeHlcStatus.bind(this)
    this.judgeEdition = this.judgeEdition.bind(this)
    this.getCardStatus = this.getCardStatus.bind(this)
    this.getData = this.getData.bind(this)
    this.noCardToGet = this.noCardToGet.bind(this)
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
      noCard: false
    }
  }

  componentDidMount() {
    NEWSAPPAPI.ui.title('头条集卡兑大奖')
    NEWSAPPAPI.login((rs) => {
      // writeObj(rs)
      // alert(document.cookie)
      if (!!rs) {
        if (!!this.params.getCard) {
          this.props.fetchQueryCard(this.params.giftId, this.params.cardId).then(() => {
            const { queryCard } = this.props.shareItem
            if (!!queryCard.data.valid) {
              this.setState({
                cardStatus: !!this.params.getCard
              })
              this.props.actions.receiveCardId(this.params.giftId, this.params.cardId).then(() => {
                this.getData()
              })
            } else {
              this.noCardToGet()
              this.getData()
            }
          })
        } else {
          this.getData()
        }
      } else {
        alert('请登录')
      }
    })
    this.judgeEdition()
    window.__headlineCard_open = () => {
      this.judgeHlcStatus()
    }
    setTimeout(() => {
      if (!!this.params.getCard) {
        window.history.replaceState([], '', 'index.html#/?_k=7t7ju0')
      }
    }, 500)
  }

  getCardStatus() {
    this.setState({
      cardStatus: !this.state.cardStatus
    })
  }

  getData() {
    this.props.actions.fetchNotloginInfo()
    this.props.actions.fetchBasicInfo()
    this.setState({
      loginStatus: true
    })
  }

  judgeEdition() {
    NEWSAPPAPI.device((rs) => {
      if (Math.floor(parseInt(rs.v, 10)) < 16) {
        alert('升级到最新版才能参加活动')
      } else {
        this.judgeHlcStatus()
      }
    })
  }

  judgeHlcStatus() {
    NEWSAPPAPI.settings((rs) => {
      this.setState({
        collCardStatus: rs.headlineCard
      })
    })
  }

  noCardToGet() {
    this.setState({
      noCard: !this.state.noCard,
      cardStatus: false
    })
  }
  // closeWarnOfNoCard() {
  //   this.setState({
  //     noCard: true,
  //     cardStatus: false
  //   })
  // }
  render() {
    const { data, history } = this.props
    const { basic, notlogin } = data

    if (!notlogin) {
      return null
    }
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
    if (this.state.loginStatus) {
      if (!basic) {
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
        if (item.cardId === this.params.cardId) {
          cardDialogLen = item.amount
        }
        return true
      })
      return (
        <div className="h-main-container">
          {
            !!this.state.cardStatus &&
              <CardDialog
                cardType={basic.myCards.length}
                cardAmount={cardDialogLen}
                cardId={this.params.cardId}
                cardLen={notlogin.cards.length}
                cardImg={this.cardImg}
                prizeName={notlogin.prize.name}
                cardName={this.cardName}
                cardMark={this.cardMark}
                changeCardStatus={this.getCardStatus}
                changeCardsNum={this.props.actions.changeCardsNum}
                cycleId={notlogin.cycleInfo.id}
                endTime={notlogin.cycleInfo.endTime}
              />
          }
          {
            this.state.noCard &&
              <NoCardToGet noCardToGet={this.noCardToGet} />
          }
          <CurrentActivity 
            data={data}
            isNotHomePage={this.state.isNotHomePage} 
            loginStatus={this.state.loginStatus} 
            push={history.push} 
            changeCardsNum={this.props.actions.changeCardsNum}
            collCardStatus={this.state.collCardStatus}
            loginStatus={this.state.loginStatus}
            curPrizeStatus={curPrizeStatus}
            sendLotteryId={this.props.actions.sendLotteryId}
            lotteryId={basic.lotteryPrizes.length != 0 ? basic.lotteryPrizes[0].lotteryInfo.id : null}
            sendLotteryIdErrCode={this.props.data.sendLotteryId ? this.props.data.sendLotteryId.errcode : null}
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
                  cycleId={notlogin.cycleInfo.id}
                  sendLotteryId={this.props.actions.sendLotteryId}
                  sendLotteryIdErrCode={this.props.data.sendLotteryId ? this.props.data.sendLotteryId.errcode : null}
                />
            }
            {
              !!notlogin && notlogin.lotteryPrizes && <PastWinning data={notlogin} />
            }
          </div>
          {
            !!basic.lotteryCards[0] && basic.lotteryCards.length > 0 && <MyCollection data={basic.lotteryCards} />
          }
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
  data: state.home,
  shareItem: state.shareItem
}), dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  push: bindActionCreators(push, dispatch),
  fetchQueryCard: bindActionCreators(fetchQueryCard, dispatch)
}))(Home)

