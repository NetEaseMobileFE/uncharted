import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/mycards'
import ScrollLoadBtn from '../components/scrollLoadBtn'

import '../../css/mycards.scss'
import '../../css/scrollLoadBtn.scss'

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
      })
    })
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
      getData: this.props.fetchMycardsInfo
    }
    console.log(data)
    mycards.lotteryCards.map((item) => {
      return this.compareCards(item.cards, item.myCards)
    })
    
    return (
      <div className="mycards-container">
        <ul className="mycards-ls">
        {
          mycards.lotteryCards.map((item, index) => {
            let cardNum = 0
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
                    <div>{item.cycleInfo.theme}</div>
                    {

                    }
                    <div>共集齐{cardNum}张</div>
                  </div>
                  <ul className="ls">
                  {
                    item.cards.map((card, count) => {
                      const bgStyle = {
                        background: `url(${card.image}) no-repeat center`,
                        backgroundSize: '100% 100%'
                      }
                      return (
                        <li className="li" key={count}>
                          <div style={bgStyle} className="card-bg"></div>
                          <div className="number">{!!card.amount ? `X${card.amount}` : ''}</div>
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
        <ScrollLoadBtn data={pageParams}/>
      </div>
    )
  }
}


export default connect(state => ({ data: state.mycards }), actions)(Mycards)
