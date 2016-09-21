import React, { Component } from 'react'
import UniversalTitle from './UniversalTitle'
import { erilizeText } from './../utils/util.js'

export default class MyCollection extends Component {
  constructor(props) {
    super(props)
    this.compareCards = this.compareCards.bind(this)
    this.finalCards = null
  }
  /* eslint-disable */
  compareCards(allCards, myCards) {
    this.finalCards = allCards
    this.finalCards.map((card) => {
      myCards.map((myCard) => {
        if (card.id === myCard.cardId) {
          card.amount = myCard.amount  
        }
        return true
      })
      return true
    })
  }

  render() {
    const { data } = this.props
    let count = 0

    this.compareCards(this.props.data[0].cards, this.props.data[0].myCards)
    this.finalCards.map((item) => {
      if (!!item.amount) {
        count = count + item.amount
      }
      return true
    })

    return (
      <div className="coll-cards-container">
        <UniversalTitle
          text="我的集卡记录" 
          showMore={data.length > 1 ? '查看全部 >' : ''} 
          link={data.length > 1 ? '/mycards?' : ''} 
        />
        <div className="collect-cards">
          <div>{erilizeText(data[0].cycleInfo.theme, 8)}</div>
          <div>{`共${count}张`}</div>
        </div>
        <ul className="coll-cardsls">
        {
          data[0].cards.map((item, index) => {
            const bgStyle = {
              background: `url(${item.smallImage}) no-repeat center`,
              backgroundSize: '100% 100%'
            }
            let cardText = 'X' + item.amount
            if (count > 99) {
              cardText = '99+'
            }
            if (index <= 5) {
              return (
                <li className="coll-cardsli" key={index}>
                  <div style={bgStyle} className="coll-cardsbg"></div>
                  {!item.amount && <div className="card-shade"></div>}
                  {!!item.amount && <span>{cardText}</span>}
                </li>
              )
            } else {
              return console.log('太多了,显示不过来')
            }
          }) 

        }
        </ul>
      </div>
    )
  }
}

