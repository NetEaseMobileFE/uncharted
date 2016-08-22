import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/record'
import ScrollLoadBtn from '../components/scrollLoadBtn'
import '../../css/record.scss'

import deepAssign from 'deep-assign'

class Record extends Component {
  constructor(props) {
    super(props)
    this.props.fetchRecordInfo()
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
    // console.log(record)
    console.log(record.noMoreData)
    return (
      <div className="record-page">
        <ul className="ls">
        {
          data.record.lotteryPrizes.map((record, index) => {
            // console.log(record)
            const bgStyle = {
              background: `url(${record.prize.image}) no-repeat center`,
              backgroundSize: `1.08rem 1.05rem`
            }
            return (
              <li className="li" key={index}>
                <div className="li-l">
                  <div className="logo"></div>
                  <div className="li-l-r">
                    <div className="prize">{record.prize.name}</div>
                    <div className="user">{record.lotteryInfo.passport}</div>
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
        <ScrollLoadBtn data={pageParams}/>
      </div>
    )
  }
}
export default connect(state => ({ data: state.record }), actions)(Record)
