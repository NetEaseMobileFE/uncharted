import React, { Component } from 'react'
import { erilizeText } from '../utils/util.js'

export default class Carousel extends Component {
  constructor(props) {
    super(props)
    this.intervals = []
    this.handleClick = this.handleClick.bind(this)
    this.setInterval = this.setInterval.bind(this)
    this.scrollUp = this.scrollUp.bind(this)
    this.state = {
      userName: this.props.data[0].passport,
      cardName: this.props.data[0].name,
      displayText: '',
    }
  }

  componentDidMount() {
    const area = this.refs.area
    const box1 = this.refs.box1
    const cliHeight = this.refs.cli1.clientHeight
    this.setInterval(() => {
      this.scrollUp(area, box1, cliHeight)
    }, 50)
  }

  componentWillUnmount() {
    this.intervals.map((timer) => {
      clearInterval(timer)
      return true
    })
  }
  /* eslint-disable */
  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments))
  }

  handleClick() {
    window.location = 'newsapp://subject/SJ07092985555724594961'
  }

  scrollUp(area, con1, cliHeight) {
    if (area.scrollTop >= con1.scrollHeight) {
      area.scrollTop = 0
    } else {
      if (area.scrollTop % cliHeight === 0) {
        setTimeout(() => {
          this.speed = 0
          setTimeout(() => {
            this.speed = 1
          }, 1000)
        }, 0)
      }
      area.scrollTop = area.scrollTop + this.speed
    }
  }

  render() {
    const data = this.props.data
    return (
      <div className="h-carousel" ref="area">
        <div className="carouselbox1" onClick={this.handleClick} ref="box1">
        {
          data.map((item, index) => {
            return (
              <div className="awardInfo" key={index} ref={`cli${index}`}>{erilizeText(`${item.passport}刚刚得到一张${item.name}`, 40)}</div>
            )
          })
        }
        </div>
        <div className="carouselbox2" ref="box2">
        {
          data.map((item, index) => {
            return (
              <div className="awardInfo" key={index}>{`${item.passport}刚刚得到一张${item.name}`}</div>
            )
          })
        }
        </div>
      </div>
    )
  }
}
