import React, { Component } from 'react'

export default class Subject extends Component {
  constructor(props) {
    super(props)
    this.countDown = this.countDown.bind(this)
    this.limitTime = this.limitTime.bind(this)
    this.intervals = []
    this.setInterval = this.setInterval.bind(this)
  }

  state = {
    timeStyle: false,
    cdTime: ''
  }

  componentDidMount() {
    this.setState({
      cdTime: this.countDown(this.props.subject.endTime)
    })
    this.setInterval(() => {
      this.setState({
        cdTime: this.countDown(this.props.subject.endTime)
      })
    }, 60 * 1000)
  }

  componentWillUnmount() {
    this.intervals.map((timer) => {
      clearInterval(timer)
    })
  }

  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  }

  countDown(endTime) {
    let currentTime = new Date().getTime()
    if (currentTime > endTime) {
      return '00:00'
    }
    let djs = endTime / 1000
    let startTime = Math.round(currentTime / 1000)
    let interval = djs - startTime
    let day = Math.floor(interval / (3600 * 24))
    let hour = Math.floor((interval - day * 3600 * 24) / 3600)
    let min = Math.floor(((interval - day * 3600 * 24 - hour * 3600)) / 60)
    hour = hour < 10 ? `0${hour}` : hour
    min = min < 10 ? `0${min}` : min
    if (day > 1) {
      this.setState({
        timeStyle: true
      })
      return `${day}`
    } else {
      this.setState({
        timeStyle: false
      })
      return `${hour}:${min}`
    }
  }

  limitTime(begin, end) {
    const beginTime = new Date(begin)
    const endTime = new Date(end)
    const limit = `${beginTime.getMonth() + 1}.${beginTime.getDate()} - ${endTime.getMonth() + 1}.${endTime.getDate() - 1}`
    return limit
  }

  render() {
    const subject = this.props.subject
    return (
      <header className="title-img">
        <div className={this.state.timeStyle ? 'cd cd-daystyle' : 'cd cd-hourstyle'}>
          <div className={this.state.timeStyle ? 'cd-in cd-daystyle-in' : 'cd-in cd-hourstyle-in'}>
            <div className="cd-l">倒计时</div>
            <div className={this.state.timeStyle ? 'cd-r cd-r-daystyle-in' : 'cd-r cd-r-hourstyle-in'}>
            {this.state.cdTime}
            {this.state.timeStyle && <span className="cd-unit">天</span>}
            </div>
          </div>
        </div>
        <div className="title-text">{`${subject.theme}主题 时限 ${this.limitTime(subject.beginTime, subject.endTime)}`}</div>
      </header>
    )
  }
}

