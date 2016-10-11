export function secondShareInit(data) {
  let shareData = {}
  let imgurl = data.img
  let shareUrl = window.location.href
  let summary = data.content
  let title = data.title
  shareData = {
    imgurl,
    shareUrl,
    summary,
    title
  }

  document.addEventListener('WeixinJSBridgeReady', () => {
    window.WeixinJSBridge.on('menu:share:appmessage', () => {
      window.WeixinJSBridge.invoke('sendAppMessage', {
        img_url: shareData.imgurl,
        link: shareData.shareUrl,
        desc: shareData.summary,
        title: shareData.title
      }, () => {
        // window.neteaseTracker && window.neteaseTracker(false, shareData.shareCallbackUrl + '&spsf=wx', '', 'sps')
      })
    })

    window.WeixinJSBridge.on('menu:share:timeline', () => {
      window.WeixinJSBridge.invoke('shareTimeline', {
        img_url: shareData.imgurl,
        img_width: '200',
        img_height: '200',
        link: shareData.shareUrl,
        desc: shareData.summary,
        title: shareData.title
      }, () => {
        // window.neteaseTracker && window.neteaseTracker(false, shareData.shareCallbackUrl + '&spsf=wx', '', 'sps')
      })
    })
  })
  document.addEventListener('YixinJSBridgeReady', () => {
    window.YixinJSBridge.on('menu:share:appmessage', () => {
      window.YixinJSBridge.invoke('sendAppMessage', {
        img_url: shareData.imgurl,
        link: shareData.shareUrl,
        desc: shareData.summary,
        title: shareData.title
      }, () => {
        // window.neteaseTracker && window.neteaseTracker(false, shareData.shareCallbackUrl + '&spsf=yx', '', 'sps')
      })
    })

    window.YixinJSBridge.on('menu:share:timeline', () => {
      window.YixinJSBridge.invoke('shareTimeline', {
        img_url: shareData.imgurl,
        img_width: '200',
        img_height: '200',
        link: shareData.shareUrl,
        desc: shareData.summary,
        title: shareData.title
      }, () => {
        // window.neteaseTracker && window.neteaseTracker(false, shareData.shareCallbackUrl + '&spsf=yx', '', 'sps')
      })
    })
  })
}
