import React, { Component } from 'react'
import '../../css/ShareBanner.scss'

export default class ScrollLoadBtn extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.page = 1
    this.state = {
      page: 1,
      scrollBtn: false
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, false)
  }

  handleScroll() {
    const data = this.props.data
    let pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight  // 获取页面总高度（总高度 = 卷去高度 + 可视区域高度）
    let getScrollTop = document.documentElement.scrollTop || document.body.scrollTop // 获取页面卷去的高度
    let bodyHeight = document.documentElement.clientHeight || document.body.clientHeight   // 获取页面可视区域宽度
    if (getScrollTop + bodyHeight + 10 >= pageHeight && !this.state.scrollBtn) {
      this.setState({
        page: this.state.page + 1,
        scrollBtn: true
      })
      data.getData(this.state.page, this.state.pageSize)
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
