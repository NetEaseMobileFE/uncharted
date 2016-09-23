import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/MyCards'
import ScrollLoadBtn from '../components/ScrollLoadBtn'
import { erilizeText } from '../utils/util.js'
import NEWSAPPAPI from 'newsapp'

import '../../css/MyCards.scss'
import '../../css/ScrollLoadBtn.scss'

class Mycards extends Component {
  constructor(props) {
    super(props)
    this.compareCards = this.compareCards.bind(this)
    this.props.fetchMycardsInfo()
  }

  state = {
    page: 1,
    scrollBtn: false
  }

  compareCards(allCards, myCards) {
    allCards.map((card) => {
      myCards.map((myCard) => {
        if (card.id === myCard.cardId) {
          card.amount = myCard.amount
        }
        return true
      })
      return true
    })
  }
  componentDidMount() {
    NEWSAPPAPI.ui.title('我的集卡')
  }

  componentWillUnmount() {
    this.props.clearStore() // 该方法是为了防止重复渲染相同数据
  }

  render() {
    const { data } = this.props
    const mycards = data.mycards
    if (!mycards) {
      return null
    }// 初始化的时候没有定义，如果不判断可能会报错
    const pageParams = {
      page: 1,
      pageSize: 10,
      dataType: 1,
      whichPage: mycards,
      getData: this.props.fetchMycardsInfo,
      addData: mycards.noMoreData
    }
    mycards.lotteryCards.map((item) => {
      return this.compareCards(item.cards, item.myCards)
    })
    
    return (
      <div className="mycards-container">
        <ul className="mycards-ls">
        {
          mycards.lotteryCards.map((item, index) => {
            let cardNum = 0
            if (item.cards.length === 0) {
              return null
            }
            item.cards.map((card) => {
              if (!!card.amount) {
                cardNum = cardNum + parseInt(card.amount, 10)
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
                        }
                        if (card.amount > 99) {
                          cardText = '99+'
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
