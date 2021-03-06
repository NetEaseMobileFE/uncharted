import React, { Component } from 'react'
import { erilizeText } from '../utils/util.js'

export default class Carousel extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.scrollUp = this.scrollUp.bind(this)
  }

  componentDidMount() {
    const timeOut = this.props.data.timeOut
    if (!timeOut) {
      const area = this.area
      const box1 = this.box1
      const cliHeight = this.cli1.clientHeight
      this.intervalToken = setInterval(() => {
        this.scrollUp(area, box1, cliHeight)
      }, 50)
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalToken)
    return true
  }

  handleClick() {
    window.location = 'newsapp://subject/SJ07092985555724594961'
  }
  
  /* eslint-disable no-param-reassign */
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
  /* eslint-enable no-param-reassign */

  render() {
    const data = this.props.data
    const timeOut = data.timeOut
    if (timeOut) {
      return <div className='h-carousel' onClick={this.handleClick}>#晒一晒我的集卡#</div>
    } else {
      return (
        <div className="h-carousel" ref={ (e) => { this.area = e } }>
          <div className="carousel-box1" onClick={this.handleClick} ref={ (e) => { this.box1 = e } }>
            {
              data.carousel.map((item, index) => {
                return (
                  <div className="award-info" key={index} ref={ (e) => { this[`cli${index}`] = e } }>{erilizeText(`${item.passport}刚刚得到一张${item.name}`, 40)}</div>
                )
              })
            }
          </div>
          <div className="carousel-box2" ref={ (e) => { this.box2 = e } }>
            {
              data.carousel.map((item, index) => {
                return (
                  <div className="award-info" key={index}>{`${item.passport}刚刚得到一张${item.name}`}</div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }
}
