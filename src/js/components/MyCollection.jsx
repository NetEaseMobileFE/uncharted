import React, { Component } from 'react'
import UniversalTitle from './UniversalTitle'
import { erilizeText } from '../utils/util.js'

export default class MyCollection extends Component {
  constructor(props) {
    super(props)
    this.compareCards = this.compareCards.bind(this)
    this.finalCards = null
  }
  /* eslint-disable */
  // 将未登录后台接口中的所有卡片与我拥有的卡片Id进行对比,进行组合,得出一个同时拥有卡片id,卡片数据,以及卡片其他详情信息的对象,以方便遍历
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
    let classNameLs = 'coll-cardsls'
    let classNameLi = 'coll-cardsli'
    if (data[0].cards.length >= 6) {
      classNameLs += ' space-between'
      classNameLi += ' margin0'
    }
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
        <ul className={classNameLs}>
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
                <li className={classNameLi} key={index}>
                  <div style={bgStyle} className="coll-cardsbg"></div>
                  {!item.amount && <div className="card-shade"></div>}
                  {!!item.amount && <span className="card-desc">{cardText}</span>}
                </li>
              )
            } else {
              // return console.log('太多了,显示不过来')
            }
          }) 

        }
        </ul>
      </div>
    )
  }
}

