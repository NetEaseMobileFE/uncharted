export function secondShareInit(data) {
  // alert(data)
  // console.log(data)
  // alert(`${data.title} - ${data.content} - ${data.img}`)
  let shareData = {}
  let imgurl = data.img
  let shareUrl = window.location.href
  let summary = data.content
  let title = data.title
  // let params = window.location.href
  // let spsw = params.spsw
  // let spss = params.spss
  // document.querySelector('[name="yixin-share-desc"]').setAttribute('content', summary)
  // if (spss === 'imoney') {
  //   imgurl = 'http://img4.cache.netease.com/utf8/3g/touch/images/200x200-icon2.png'
  // }
  // shareUrl += '&f=wx'
  // const shareCallbackUrl = 'http://sps.163.com/func/?func=sharedone&spst=4&modelid=' + liveid + '&spsw=' + params.w + '&spss=' + params.spss
  shareData = {
    imgurl,
    shareUrl,
    summary,
    title
    // shareCallbackUrl
  }
  // const div = document.createElement('div')
  // div.innerHTML = ''

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
