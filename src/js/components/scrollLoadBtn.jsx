import React, { Component } from 'react'
import '../../css/ShareBanner.scss'

export default class ScrollLoadBtn extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      scrollBtn: false
    }
  }

  componentDidMount() {
    const parentComponent = this.props.data.parentComponent
    if (parentComponent === 'record') {
      this.page = +(sessionStorage.record) || 1
      sessionStorage.removeItem('record')
    } else if (parentComponent === 'myCards') {
      this.page = +(sessionStorage.myCards) || 1
      sessionStorage.removeItem('myCards')
    }
    document.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount() {
    const parentComponent = this.props.data.parentComponent
    if (parentComponent === 'record') {
      sessionStorage.setItem('record', this.page)
    } else if (parentComponent === 'myCards') {
      sessionStorage.setItem('myCards', this.page)
    }
    document.removeEventListener('scroll', this.handleScroll, false)
  }

  handleScroll() {
    const data = this.props.data
    let pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight  // 获取页面总高度（总高度 = 卷去高度 + 可视区域高度）
    let getScrollTop = document.documentElement.scrollTop || document.body.scrollTop // 获取页面卷去的高度
    let bodyHeight = document.documentElement.clientHeight || document.body.clientHeight   // 获取页面可视区域宽度
    if (getScrollTop + bodyHeight + 10 > pageHeight && !this.state.scrollBtn) {
      this.setState({
        scrollBtn: true
      })
      this.page++
      data.getData(this.page, 10)
    } else if (getScrollTop + bodyHeight + 100 < pageHeight) {
      this.setState({
        scrollBtn: false
      })
    }
  }

  render() {
    const data = this.props.data
    let text
    if (data.addData) {
      text = '没有更多了'
    } else {
      text = '正在加载'
    }
    return (
      <div>
        {
          this.state.scrollBtn &&
            <div className="load-btn">
              <div className="logo"></div>
              <div className="text">{text}</div>
            </div>
        }
      </div>
    )
  }
}
