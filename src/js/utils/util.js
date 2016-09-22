

export const isAndroid = navigator.userAgent.match(/android/ig)
export const isIos = navigator.userAgent.match(/iphone|ipod|ipad/ig)

/** *******************
 *线上地址
 *
 **********************/

export const testPastInfo = 'http://t.c.m.163.com/uc/activity/card/exchange/past/info'
export const testNotloginInfo = 'http://t.c.m.163.com/uc/activity/card/exchange/info'
export const testBasicInfo = 'http://t.c.m.163.com/uc/activity/card/exchange/userinfo'
export const testPastCardListInfo = 'http://t.c.m.163.com/uc/activity/card/list'
export const testPastPrizeListInfo = 'http://t.c.m.163.com/uc/activity/card/prize/list'
export const testGiftFind = 'http://t.c.m.163.com/uc/activity/card/gift/find'
export const testGiftSend = 'http://t.c.m.163.com/uc/activity/card/gift/send'
export const testGiftReceive = 'http://t.c.m.163.com/uc/activity/card/gift/receive'
export const testPrizeShare = 'http://t.c.m.163.com/uc/activity/card/prize/share'
export const testPrizeExchange = 'http://t.c.m.163.com/uc/activity/card/prize/exchange'

/** *******************
 *测试是否是线上环境,若是线上环境,则将url进行转换
 *
 **********************/
export function changeUrl(url, type) {
  let finalUrl = url
  const onLineBool = window.location.href.match(/t.c.m/ig)
  if (!onLineBool) {
    if (type === 1) {
      finalUrl = url.replace(/t.c.m/, 'c.m')
    } else {
      finalUrl = url.replace(/t.c.m.163.com/, 'c.m.163.com/nc/qa')
    }
  }
  return finalUrl
}

/** *******************
 *转换url参数
 *
 **********************/
export function erilizeUrl(url) {
  let result = {}
  let urlArray = url.split('?')
  for (let urlIndex = 1; urlIndex < urlArray.length; urlIndex++) {
    let map = urlArray[urlIndex].split('&')
    for (let i = 0, len = map.length; i < len; i++) {
      result[map[i].split('=')[0]] = map[i].split('=')[1]
    }
  }
  return result
}

export function erilizeText(text, len) {
  if (text && text.length > len) {
    return (text.slice(0, len) + '...')
  }
  return text
}

export function writeObj(obj) {
  let description = ''
  for (let i in obj) {
    let property = obj[i]
    description += i + ' = ' + property + '\n'
  }
  alert(description)
}

// 涉及到异步问题,需要延迟监听
// export function judgeStateOfWeb(type, url) {
//   const xhr = new XMLHttpRequest()
//   xhr.open(type, url, true)
//   xhr.send(null)
//   xhr.onreadystatechange = () => {
//     alert('readyState: ' + xhr.readyState)
//     alert('status: ' + xhr.status)
//     if (xhr.readyState == 4) {
//       if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//         return true
//       } else {
//         alert('当前网络不稳定,请稍后再试')
//         return false
//       }
//     }
//   }
// }

export function limitTime(begin, end) {
  const beginTime = new Date(begin)
  const endTime = new Date(end)
  const limit = `${beginTime.getMonth() + 1}.${beginTime.getDate()} - ${endTime.getMonth() + 1}.${endTime.getDate() - 1}`
  return limit
}
