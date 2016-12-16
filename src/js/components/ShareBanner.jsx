import React from 'react'
import '../../css/ShareBanner.scss'
import { changeUrl } from '../utils/util'

export default function ShareBanner() {
  const url = `http://m.163.com/newsapp/applinks.html?url=${changeUrl('//t.c.m.163.com/uncharted/index.html', 2)}`
  return (
    <a className="share-banner" href={url}>
      <div className="banner-inner">
        <div className="banner-l"></div>
        <div className="banner-r">立即打开 ></div>
      </div>
    </a>
  )
}

