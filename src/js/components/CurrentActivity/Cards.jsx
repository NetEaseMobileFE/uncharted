import React, { Component } from 'react'
import CardDialog from '../CardDialog'
import { compareCards } from '../../utils/util.js'

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.introCards = this.introCards.bind(this) // 为卡片弹窗加载数据
    this.changeCardStatus = this.changeCardStatus.bind(this) // 更改卡片状态
    this.state = {
      boolCardDialog: false
    }
    this.cardParams = {
      cardAmount: 0,
      cardImg: null,
      cardMark: null,
      cardName: null,
      cardId: null,
    }
  }

  changeCardStatus(cardDialogstatus) {
    this.setState({
      boolCardDialog: cardDialogstatus,
    })
  }

  introCards(amount, image, mark, cname, cId) {
    this.setState({
      boolCardDialog: true
    })
    this.cardParams = {
      cardAmount: amount,
      cardImg: image,
      cardMark: mark,
      cardName: cname,
      cardId: cId,
    }
  }


  render() {
    const { allCards, now, myCards, prizeName, cycleId, sendCard, sendCardInfo, isNotHomePage, loginStatus, onOpenSD, endTime } = this.props.data
    let cardLen = allCards.length % 3
    let bottomShadeCN = ''
    if (cardLen === 1) {
      bottomShadeCN = 'morediv1'
    } else if (cardLen === 2) {
      bottomShadeCN = 'morediv2'
    }
    let finalCards
    if (!!myCards) {
      finalCards = compareCards(allCards, myCards)
    }
    let cardDialogParams = null
    if (this.state.boolCardDialog) {
      const { cardId, cardAmount, cardImg, cardName, cardMark } = this.cardParams
      cardDialogParams = {
        cardAmount,
        cardId,
        cardLen,
        cardImg,
        cardName,
        cardMark,
        prizeName,
        endTime,
        now,
        cycleId,
        sendCard,
        sendCardInfo,
        onOpenSD,
        cardType: myCards.length,
        changeCardStatus: this.changeCardStatus
      }
    }

    return (
      <ul className="coll-cards-ls">
        { 
          this.state.boolCardDialog && 
            <CardDialog data={cardDialogParams} />
        }
        {
          (finalCards || allCards).map((card, index) => {
            let intAmount = parseInt(card.amount, 10)
            let curAmount
            if (intAmount > 99) {
              curAmount = '99+'
            } else {
              curAmount = card.amount
            }
            const bgStyle = {
              background: `url(${card.smallImage}) no-repeat center`,
              backgroundSize: '100% 100%'
            }
            return (
              <li 
                className="card-li"
                key={index} 
                onClick={ 
                  isNotHomePage ? '' :
                  () => { this.introCards(card.amount, card.image, card.mark, card.name, card.id) }
                }
              >

                <div className="li-img">
                  <img className="img-bg" src={card.smallImage} />
                  {(loginStatus === true && !card.amount === true) && <div className="card-shade"></div>}
                  {!!card.amount && <span className="card-sum">{'X' + curAmount}</span>}
                  {!!card.amount && <span className="card-logo" style={{ display: card.amount > 1 ? '' : 'none' }}>送</span>}
                </div>
                {
                  intAmount === 2 &&
                    <div className="img-shade-container">
                      <div className="img-shade1" style={bgStyle}></div>
                    </div>
                }
                {
                  intAmount > 2 &&
                    <div className="img-shade-container">
                      <div className="img-shade1" style={bgStyle}></div>
                      <div className="img-shade2" style={bgStyle}></div>
                    </div>
                }
              </li> 
            )
          })
        }
        {

          cardLen === 1 || cardLen === 2 &&
            <div className={bottomShadeCN}></div>
        }
      </ul>
    )
  }
}

