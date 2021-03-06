import React, { Component } from 'react'
import UniversalTitle from './UniversalTitle'
import { erilizeText } from '../utils/util.js'

export default class PastWinning extends Component {
  render() {
    const { data } = this.props
    return (
      <div className="pari-record">
        {
          data.lotteryPrizes.length > 2 ? <UniversalTitle text={'往期获奖用户'} showMore={'查看全部>'} link={'/record'} /> :
            <UniversalTitle text={'往期获奖用户'} />
        }
        <ul className="pari-recordls">
        {
          data.lotteryPrizes.map((record, index) => {
            if (index >= 2) {
              return true
            }
            const bgStyle = {
              background: `url(${record.prize.image}) no-repeat center`,
              backgroundSize: '100% 100%'
            }
            const headBg = {
              background: `url(${record.lotteryInfo.head}) no-repeat center`,
              backgroundSize: '100% 100%'
            }
            return (
              <li className="pari-li" key={index}>
                <div className="pari-li-l">
                  <div className="pari-logo">
                    <div className="logo-header" style={headBg}></div>
                  </div>
                  <div className="pari-li-l-r">
                    <div className="pari-prize">
                      {erilizeText(record.cycleInfo.theme, 8) + '主题 '}
                      {erilizeText(record.prize.name, 10)}
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
