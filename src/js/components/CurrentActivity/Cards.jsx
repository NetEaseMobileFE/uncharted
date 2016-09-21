import React, { Component } from 'react'
import CardDialog from './../CardDialog'

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.compareCards = this.compareCards.bind(this)
    this.introCards = this.introCards.bind(this)
    this.changeCardStatus = this.changeCardStatus.bind(this)
  }

    
  state = {
    boolCardDialog: false,
    cardAmount: 0,
    cardImg: '',
    cardText: '',
    cardName: '',
    cardId: '',
    sendCardDom: false
  }

  changeCardStatus(cardDialogstatus) {
    this.setState({
      boolCardDialog: cardDialogstatus,
    })
  }
  /* eslint-disable */
  compareCards(allCards, myCards) {
    let finalCards = allCards
    finalCards.map((card) => {
      myCards.map((myCard) => {
        if (card.id === myCard.cardId) {
          card.amount = myCard.amount
        }
        return null
      })
      return null
    })
    return finalCards
  }

  introCards(amount, image, mark, cname, cId, target, endTime) {
    this.setState({
      boolCardDialog: true,
      cardAmount: amount,
      cardImg: image,
      cardMark: mark,
      cardName: cname,
      cardId: cId,
      sendCardDom: true,
      cardDom: target,
      endTime
    })
  }


  render() {
    const allCards = this.props.allCards
    let finalCards
    let cardLen = allCards.length % 3
    if (!!this.props.myCards) {
      finalCards = this.compareCards(this.props.allCards, this.props.myCards)
    }

    return (
      <ul className="coll-cards-ls">
        { 
          this.state.boolCardDialog && 
            <CardDialog
              cardType={this.props.myCards.length}
              cardAmount={this.state.cardAmount}
              cardId={this.state.cardId}
              cardLen={allCards.length}
              cardImg={this.state.cardImg}
              prizeName={this.props.prizeName}
              cardName={this.state.cardName}
              cardImage={this.state.cardImg}
              cardMark={this.state.cardMark}
              changeCardStatus={this.changeCardStatus}
              changeCardsNum={this.props.changeCardsNum}
              cycleId={this.props.cycleId}
              endTime={this.state.endTime}
              prizeId={this.props.prizeId}
            />
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
              backgroundSize: 'cover'
            }

            return (
              <li 
                className="card-li"
                key={index} 
                onClick={ 
                  this.props.isNotHomePage ? '' : 
                  (event) => { this.introCards(card.amount, card.image, card.mark, card.name, card.id, event.target, this.props.endTime) }
                }
              >

                <div className="li-img">
                  <div className="img-bg" style={bgStyle}></div>
                  {(this.props.loginStatus === true && !card.amount === true) && <div className="card-shade"></div>}
                  {!!card.amount && <span className="card-sum">{'X' + curAmount}</span>}
                  {!!card.amount && <span className="card-logo" style={{ display: card.amount > 1 ? '' : 'none' }}>送</span>}
                </div>
                {
                  intAmount === 2 ? 
                    <div className="img-shade-container">
                      <div className="img-shade1" style={bgStyle}></div> 
                    </div>
                  : intAmount > 2 ? 
                    <div className="img-shade-container">
                      <div className="img-shade1" style={bgStyle}></div>
                      <div className="img-shade2" style={bgStyle}></div>
                    </div>
                  : ''
                }
              </li> 
            )
          })
        }
        {
          cardLen === 1 || cardLen === 2 &&
            <div className={cardLen === 1 ? 'morediv2' : cardLen === 2 ? 'morediv1' : ''}></div>
        }
      </ul>
    )
  }
}

