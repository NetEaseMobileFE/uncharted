import React, { Component } from 'react'
import '../../css/ShareBanner.scss'

export default class ShareBanner extends Component {
  render() {
    return (
      <a className="share-banner" href="http://m.163.com/newsapp/applinks.html?url=http://t.c.m.163.com/uncharted/index.html">
        <div className="banner-inner">
          <div className="banner-l"></div>
          <div className="banner-r">立即打开 ></div>
        </div>
      </a>
    )
  }
}
