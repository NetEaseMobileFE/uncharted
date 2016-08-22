import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { erilizeUrl } from './../utils/util'
import NEWSAPPAPI from 'newsapp'

import '../../css/expiry.scss'

class Expiry extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.cancel = this.cancel.bind(this)
    this.submit = this.submit.bind(this)
    this.fetchExpiryParams = this.fetchExpiryParams.bind(this)
    // this.displayInfo = this.displayInfo.bind(this)
    this.state = {
      warnDisplay: false,
      displayInfo: false,
      username: '',
      tele: '',
      address: '',
      device: ''
    }
    this.params = erilizeUrl(window.location.href)
  }

  componentDidMount() {
    NEWSAPPAPI.getDeviceInfo((rs) => {
      // let keys = Object.keys(rs)
      // rs.u
      console.log(rs)
    })
  }

  handleClick() {
    this.setState({
      warnDisplay: true,
      username: this.refs.username.value,
      tele: this.refs.tele.value,
      address: this.refs.address.value
    })
    console.log(this.refs.username.value)
  }

  cancel() {
    this.setState({
      warnDisplay: false,
    })
  }

  submit() {
    this.setState({
      warnDisplay: false,
      displayInfo: true
    })
    this.fetchExpiryParams()
  }

  fetchExpiryParams() {
    let udid
    NEWSAPPAPI.device((rs) => {
      udid = Object.keys(rs)
    })
    fetch('http://t.c.m.163.com/uc/activity/card/prize/exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'same-origin',
      body: `
              prizeId=${this.params.prizeId}&
              cycleId=${this.params.cycleId}&
              lotteryId=${this.params.lotteryId}&
              address=${this.state.address}&
              name=${this.state.username}&
              phone=${this.state.tele}&
              udid=${udid}
            `
    }).then((res) => {
      let intRes = parseInt(res, 10)
      switch (intRes) {
        case 400:
          alert('未登录')
          break
        case 415:
          alert('奖品已经过期')
          break
        case 416:
          alert('奖品条件不满足')
          break
        case 417:
          alert('奖品库存不足')
          break
        case 1:
          alert('服务器内部错误')
          break
        default:
          return
      }
    }, () => {
      alert('Error submitting form!')
    })
  }

  render() {
    return (
      <div className="expiry-container">
        {
          !this.state.displayInfo && 
            <div className="expiry">
              <header className="exp-header">
                <div className="dot"></div>
                <div className="info">为了让客服及时联系您，请填写个人信息</div>
              </header>
              <section className="exp-section">
                <article className="form-item">
                  <div className="label">姓名：</div>
                  <div className="input">
                    <input type="text" ref="username" />
                  </div>
                </article>
                <article className="form-item">
                  <div className="label">手机：</div>
                  <div className="input">
                    <input type="tel" ref="tele" />
                  </div>
                </article>
                <article className="form-item">
                  <div className="label">住址：</div>
                  <div className="input">
                    <input type="text" ref="address" />
                  </div>
                </article>
              </section>
              <footer className="exp-footer">
                <div className="btn" onClick={this.handleClick}>立即提交</div>
              </footer>
            </div>
        }
        {
          this.state.warnDisplay &&
            <div className="exp-warnInfo">
              <div className="inner">
                <header className="header">确认信息</header>
                <section className="content">
                  <div className="item-info">
                    <span>姓名：</span>
                    <span>{this.state.username}</span>
                  </div>
                  <div className="item-info">
                    <span>手机：</span>
                    <span>{this.state.tele}</span>
                  </div>
                  <div className="item-info">
                    <span>住址：</span>
                    <span>{this.state.address}</span>
                  </div>
                </section>
                <footer className="footer">
                  <div className="cancel" onClick={this.cancel}>取消</div>
                  <div className="submit" onClick={this.submit}>确认</div>
                </footer>
              </div>
            </div>
        }
        {
          this.state.displayInfo &&
            <div className="exp-displayInfo">
              <header className="header">
                <div className="img"></div>
              </header>
              <section className="center">
                <div className="li">
                  <span className="tag">姓名：</span>
                  <span className="info">{this.state.username}</span>
                </div>
                <div className="li">
                  <span className="tag">电话：</span>
                  <span className="info">{this.state.tele}</span>
                </div>
                <div className="li">
                  <span className="tag">地址：</span>
                  <span className="info">{this.state.address}</span>
                </div>
              </section>
              <footer className="footer">
                <div className="useforuser">
                  <div className="logo"></div>
                  <div className="prompt">我们将尽快为您寄出奖品有任何问题请拨打123456联系客服</div>
                </div>
              </footer>
            </div>
        }
      </div>
    )
  }
}
export default connect()(Expiry)

