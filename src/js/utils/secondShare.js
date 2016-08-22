// 易信中，要求全局设置shareData这个变量用于分享
window.shareData = {}
export function setShareData(title = '网易新闻集卡赢大奖', content, img) {
  let url = location.href
  if (url.match(/from=newsapp/)) {
    url += '&f=newsapp'
  }
  window.shareData = {
    imgUrl: img,  
    tImgUrl: img,
    fImgUrl: img,
    wImgUrl: img,
    href: location.href,
    timeLineLink: location.href,
    sendFriendLink: location.href,
    weiboLink: location.href,
    tTitle: title,
    tContent: content,
    fTitle: title,
    fContent: content,
    wContent: title
  }
}
export function init(title, content, img) {
  setShareData(title, content, img)
  document.addEventListener('WeixinJSBridgeReady', () => {
    window.WeixinJSBridge.on('menu:share:appmessage', () => {
      window.WeixinJSBridge.invoke('sendAppMessage', {
        'img_url': window.shareData.imgUrl,
        'link': window.shareData.href,
        'desc': window.shareData.fContent,
        'title': window.shareData.fTitle
      }, () => {
      })
    })

    window.WeixinJSBridge.on('menu:share:timeline', () => {
      window.WeixinJSBridge.invoke('shareTimeline', {
        'img_url': window.shareData.imgUrl,
        'img_width': '80',
        'img_height': '80',
        'link': window.shareData.href,
        'desc': window.shareData.tContent,
        'title': window.shareData.tTitle
      }, () => {
      })
    })
  })
  document.addEventListener('YixinJSBridgeReady', () => {
    window.YixinJSBridge.on('menu:share:appmessage', () => {
      window.YixinJSBridge.invoke('sendAppMessage', {
        'img_url': window.shareData.imgUrl,
        'link': window.shareData.href,
        'desc': window.shareData.fContent,
        'title': window.shareData.fTitle
      }, () => {
      })
    })

    window.YixinJSBridge.on('menu:share:timeline', () => {
      window.YixinJSBridge.invoke('shareTimeline', {
        'img_url': window.shareData.imgUrl,
        'img_width': '80',
        'img_height': '80',
        'link': window.shareData.href,
        'desc': window.shareData.tContent,
        'title': window.shareData.tTitle
      }, () => {
      })
    })
  })
}
