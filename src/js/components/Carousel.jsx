import React, { Component } from 'react'
import { erilizeText } from '../utils/util.js'

export default class Carousel extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.carousel = this.carousel.bind(this)
  }

  componentDidMount() {
    const data = this.props.data
    const timeOut = data.timeOut
    if (!timeOut) {
      const cliHeight = this.cli1.clientHeight
      let carouselStyle = `0% {transform: translateY(0px);}`
      let webkitCarouselStyle = `0% {-webkit-transform: translateY(0px);}`
      for (let i = 1, len = data.carousel.length; i <= len; i++) {
        carouselStyle +=  `${100 / len * i}% {transform: translateY(-${cliHeight * i}px);}`
        webkitCarouselStyle +=  `${100 / len * i}% {-webkit-transform: translateY(-${cliHeight * i}px);}`
      }
      this.carousel(`@-webkit-keyframes scrollText {${webkitCarouselStyle}}`)
      this.carousel(`@keyframes scrollText {${carouselStyle}}`)
      this.box1.style.cssText = `-webkit-animation: scrollText ${data.carousel.length}s infinite ease-in-out`
    }
  }

  handleClick() {
    window.location = 'newsapp://subject/SJ07092985555724594961'
  }

  carousel (rule) {
    if (document.styleSheets && document.styleSheets.length) {
      try {
        document.styleSheets[0].insertRule(rule, 0)
      }
      catch (ex) {
        console.warn(ex.message, rule)
      }
    }
    else {
      var style = document.createElement("style")
      style.innerHTML = rule
      document.head.appendChild(style)
    }
    return
  }

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
            <div className="award-info" key={data.carousel.length} ref={ (e) => { this[`cli1`] = e } }>{erilizeText(`${data.carousel[0].passport}刚刚得到一张${data.carousel[0].name}`, 40)}</div>
          </div>
        </div>
      )
    }
  }
}


