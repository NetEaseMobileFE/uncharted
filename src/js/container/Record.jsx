import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/Record'
import ScrollLoadBtn from '../components/ScrollLoadBtn'
import '../../css/Record.scss'
import { erilizeText, limitTime } from '../utils/util.js'

import NEWSAPPAPI from 'newsapp'
class Record extends Component {
  constructor(props) {
    super(props)
    this.props.fetchRecordInfo()
  }

  componentDidMount() {
    NEWSAPPAPI.ui.title('历史获奖记录')
  }

  componentWillUnmount() {
    this.props.clearStore() // 该方法是为了防止重复渲染相同数据
  }

  render() {
    const { data } = this.props
    const record = data.record
    if (!record) {
      return null
    }
    const pageParams = {
      page: 1,
      pageSize: 10,
      dataType: 1,
      whichCards: record,
      getData: this.props.fetchRecordInfo,
      addData: record.noMoreData
    }
    return (
      <div className="record-page">
        <ul className="ls">
        {
          data.record.lotteryPrizes.map((item, index) => {
            const bgStyle = {
              background: `url(${item.prize.image}) no-repeat center`,
              backgroundSize: '1.08rem 1.05rem'
            }
            const cycleTime = limitTime(item.cycleInfo.beginTime, item.cycleInfo.endTime)
            const cycleTheme = item.cycleInfo.theme
            const cyclePrize = item.prize.name
            const cycleDesc = cycleTime + cycleTheme + cyclePrize
            return (
              <li className="li" key={index}>
                <div className="li-l">
                  <div className="logo"></div>
                  <div className="li-l-r">
                    <div className="prize">{erilizeText(cycleDesc, 32)}</div>
                    <div className="user">{item.lotteryInfo.passport}</div>
                  </div>
                </div>
                <div className="li-r">
                  <div className="prize-bg" style={bgStyle}></div>
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
export default connect(state => ({ data: state.record }), actions)(Record)
