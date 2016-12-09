import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/myCards'
import ScrollLoadBtn from '../components/ScrollLoadBtn'
import { erilizeText, compareCards, sessionStorageHeight } from '../utils/util.js'
import NEWSAPPAPI from 'newsapp'
import deepAssign from 'deep-assign'
import '../../css/MyCards.scss'
import '../../css/ScrollLoadBtn.scss'

class Mycards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollBtn: false
    }
  }

  componentDidMount() {
    window.scrollTo(0, +(sessionStorage.myCardsHeight))
    sessionStorage.removeItem('myCardsHeight')
    NEWSAPPAPI.ui.title('我的集卡')
    if (!this.props.data.mycards) {
      this.props.fetchMycardsInfo()
    }
  }

  componentWillUnmount() {
    sessionStorageHeight('myCardsHeight')
  }

  render() {
    const { data } = this.props
    const mycards = data.mycards
    if (!mycards) {
      return null
    }// 初始化的时候没有定义，如果不判断可能会报错

    let finalcards = deepAssign({},mycards)
    finalcards.lotteryCards.forEach((item) => {
      item.cards = compareCards(item.cards, item.myCards)
    })
    const pageParams = {
      dataLen: mycards.lotteryCards.length,
      whichPage: mycards,
      getData: this.props.fetchMycardsInfo,
      addData: mycards.noMoreData,
      parentComponent: 'myCards'
    }

    return (
      <div className="mycards-container">
        <ul className="mycards-ls">
        {
          finalcards.lotteryCards.map((item, index) => {
            let cardNum = 0
            if (item.cards.length === 0) {
              return null
            }
            item.cards.map((card, index) => {
              if (!!item.myCards[index]) {
                cardNum = cardNum + parseInt(item.myCards[index].amount, 10)
              }
              return cardNum
            })
            return (
              <li className="mycards-li" key={index}>
                <div className="OneSubcards">
                  <div className="cards">
                    <div>{erilizeText(item.cycleInfo.theme, 8)}</div>
                    <div>共集齐{cardNum}张</div>
                  </div>
                  <ul className="ls">
                    {
                      item.cards.map((card, count) => {
                        const bgStyle = {
                          background: `url(${card.smallImage}) no-repeat center`,
                          backgroundSize: '100% 100%'
                        }
                        let cardText
                        if (!!card.amount) {
                          cardText = `X${card.amount}`
                          if (card.amount > 99) {
                            cardText = '99+'
                          }
                        }
                        return (
                          <li className="li" key={count}>
                            {!card.amount && <div className="card-bg shade-img"></div>}
                            <div style={bgStyle} className="card-bg"></div>
                            {
                              !!cardText && <div className="number">{cardText}</div>
                            }
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </li>
            )
          })
        }
        </ul>
        <ScrollLoadBtn data={pageParams} />
      </div>
    )
  }
}


export default connect(state => ({ data: state.mycards }), actions)(Mycards)
