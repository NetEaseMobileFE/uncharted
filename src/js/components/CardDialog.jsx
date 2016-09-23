import React, { Component } from 'react'
import NEWSAPPAPI from 'newsapp'
import { changeUrl, erilizeText } from '../utils/util'
export default class CardDialog extends Component {
  constructor(props) {
    super(props)
    this.close = this.close.bind(this) // 关闭弹窗,并移除监听事件
    this.present = this.present.bind(this) // 赠送卡片
    this.shareCard = this.shareCard.bind(this) // 晒卡片
    this.giftId = null
  }

  componentDidMount() {
    this.cardDialog.addEventListener('touchmove', (event) => {
      event.preventDefault()
    }, false)
  }

  componentWillUnmount() {
    this.cardDialog.removeEventListener('touchmove', (event) => {
    }, false)
  }
  close() {
    this.props.changeCardStatus(false)
  }


  present() {
    const { cardId, cycleId, cardLen, cardName, prizeName, cardImg, prizeId } = this.props
    this.props.changeCardStatus(false)
    let shareData = {}
    this.props.sendCard(cardId)
      .then((json) => {
        this.giftId = json.data.giftId
        console.log(changeUrl('http://t.c.m.163.com/uncharted/index.html#/shareCard?cycleId=' + cycleId + '&cardId=' + cardId + '&cardLen=' + cardLen + '&prizeId=' + prizeId + '&giftId=' + encodeURIComponent(this.giftId) + '&', 2))
        shareData = {
          wbText: '网易新闻，集卡赢大奖' + changeUrl('http://t.c.m.163.com/uncharted/index.html#/shareCard?cycleId=' + cycleId + '&cardId=' + cardId + '&cardLen=' + cardLen + '&prizeId=' + prizeId + '&giftId=' + encodeURIComponent(this.giftId) + '&', 2),
          wbPhoto: cardImg,
          wxText: '网易新闻，集卡赢大奖',
          wxTitle: `${cardName}送给你，集齐可领取${prizeName}，不用谢我，我只是个传说。`,
          wxUrl: changeUrl(`http://t.c.m.163.com/uncharted/index.html#/shareCard?cycleId=${cycleId}&cardId=${cardId}&cardLen=${cardLen}&prizeId=${prizeId}&giftId=${this.giftId}&uName=111&`, 2),
          wxPhoto: cardImg
        }
        NEWSAPPAPI.share.invoke(shareData, () => {
        })
      })
  }

  // 晒卡片
  shareCard() {
    let wxTitle = `我得到了${this.props.cardName}，集齐可得${this.props.prizeName},一般人我不告诉TA`
    const shareData = {
      wbText: '网易新闻，集卡赢大奖' + changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=300&cycleId=${this.props.cycleId}&cardId=${this.props.cardId}&nowAmount=${this.props.cardType}&cardLen=${this.props.cardLen}`, 2),
      wbPhoto: this.props.cardImg,
      wxText: '网易新闻，集卡赢大奖',
      wxTitle,
      wxUrl: changeUrl(`http://t.c.m.163.com/uncharted/index.html#/share?winnStatus=300&cycleId=${this.props.cycleId}&cardId=${this.props.cardId}&nowAmount=${this.props.cardType}&cardLen=${this.props.cardLen}`, 2),
      wxPhoto: this.props.cardImg
    }
    NEWSAPPAPI.share.invoke(shareData, () => {
    })
  }

  render() {
    const bgImg = {
      background: `url(${this.props.cardImg}) no-repeat center`,
      backgroundSize: '100% 100%'
    }
    return (
      <div className="h-card-dialog" ref={(ref) => { this.cardDialog = ref }}>
        <div className="dialog-inner">
          <div className="cover">
            <div className="cover-card-bg" style={bgImg}>
              {
                !!this.props.cardAmount && <div className="share" onClick={this.shareCard}>晒卡</div>
              }
            </div>
          </div>
          <footer className="footer">
            <div className="info">{erilizeText(this.props.cardMark, 28)}</div>
            <div className={parseInt(this.props.cardAmount, 10) > 1 ? 'btn justify-content1' : 'btn justify-content2'}>
              <div className="close" onClick={this.close}>关闭</div>
              {
                parseInt(this.props.cardAmount, 10) > 1 && <div className="present" onClick={this.present}>送给朋友</div>
              }
            </div>
          </footer>
        </div>
      </div>
    )
  }

}
