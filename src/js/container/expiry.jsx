import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/Expiry'
import { fetchBasicInfo } from '../actions/Home'
import { erilizeUrl, writeObj } from '../utils/util'
import NEWSAPPAPI from 'newsapp'

import '../../css/Expiry.scss'

class Expiry extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.cancel = this.cancel.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
      warnDisplay: false,
      displayInfo: false,
      username: '',
      tele: '',
      address: '',
      device: ''
    }
    this.params = null
    this.udid = null
  }

  componentDidMount() {
    NEWSAPPAPI.device((rs) => {
      this.udid = rs.u
    })
    this.params = erilizeUrl(window.location.href)
    this.tele.addEventListener('blur', () => {
      const reg = /^1[3|4|5|7|8][0-9]{9}$/
      const flag = reg.test(this.tele.value)
      if (flag === false) {
        alert('手机号码格式错误')
      }
    }, false)
  }

  componentWillUnmount() {
    fetchBasicInfo()
  }

  handleClick() {
    if (this.username.value.length === 0 || this.tele.value.length === 0 || this.address.value.length === 0) {
      alert('请输入完整的个人信息!')
      return
    }
    this.setState({
      warnDisplay: true,
      username: this.username.value,
      tele: this.tele.value,
      address: this.address.value
    })
  }

  cancel() {
    this.setState({
      warnDisplay: false
    })
  }

  submit() {
    const userInfo = {
      address: this.state.address,
      username: this.state.username,
      tele: this.state.tele,
      udid: this.udid
    }
    const xhr = new XMLHttpRequest()
    let webState = null
    xhr.open('post', 'http://t.c.m.163.com/uc/activity/card/prize/exchange', true)
    xhr.send(null)
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          webState = true
        } else {
          alert('当前网络不稳定,请稍后再试')
          webState = false
        }
      }
    }

    setTimeout(() => {
      if (!webState) {
        this.cancel()
        return false
      }
      NEWSAPPAPI.login(() => {})
      this.props.fetchExpiryParams(this.params, userInfo)
        .then(() => {
          const errcode = this.props.data.expiryParams.errcode
          switch (errcode) {
            case 0:
              this.setState({
                warnDisplay: false,
                displayInfo: true
              })
              break
            case 1:
              this.cancel()
              alert('领奖失败，请稍后再试')
              break
            case 400:
              this.cancel()
              alert('服务器繁忙,请稍后再试')
              break
            case 415:
              this.cancel()
              alert('奖品已过期')
              break
            case 416:
              this.cancel()
              alert('奖品条件不满足')
              break
            case 417:
              this.cancel()
              alert('领奖失败，请稍后再试')
              break
            default:
              return
          }
        })
    }, 500)
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
                    <input type="text" ref={(ref) => { this.username = ref }} />
                  </div>
                </article>
                <article className="form-item">
                  <div className="label">手机：</div>
                  <div className="input">
                    <input type="tel" ref={(ref) => { this.tele = ref }} />
                  </div>
                </article>
                <article className="form-item">
                  <div className="label">住址：</div>
                  <div className="input">
                    <input type="text" ref={(ref) => { this.address = ref }} />
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
                  <div className="prompt">我们将在每期活动结束后的7个工作日内为您寄出奖品，有问题请发邮件至vivojika2016@163.com</div>
                </div>
              </footer>
            </div>
        }
      </div>
    )
  }
}

export default connect(state => ({ data: state.expiry }), actions)(Expiry)
