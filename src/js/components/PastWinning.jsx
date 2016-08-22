import React, { Component } from 'react'
import UniversalTitle from './UniversalTitle'

export default class PastWinning extends Component {
  render() {
    const { data } = this.props
    return (
      <div className="pari-record">
        <UniversalTitle text={'往期获奖用户'} showMore={'查看全部>'} link={'/record'} />
        <ul className="pari-recordls">
        {
          data.lotteryPrizes.map((record, index) => {
            const bgStyle = {
              background: `url(${record.prize.image}) no-repeat center`,
              backgroundSize: '1.08rem 1.05rem'
            }
            return (
              <li className="pari-li" key={index}>
                <div className="pari-li-l">
                  <div className="pari-logo"></div>
                  <div className="pari-li-l-r">
                    <div className="pari-prize">
                      {record.cycleInfo.theme}
                      {record.prize.name}
                    </div>
                    <div className="pari-user">{record.lotteryInfo.passport}</div>
                  </div>
                </div>
                <div className="pari-li-r">
                  <div style={bgStyle} className="past-prizebg"></div>
                </div>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}
