import deepAssign from 'deep-assign'

export const isAndroid = navigator.userAgent.match(/android/ig)
export const isIos = navigator.userAgent.match(/iphone|ipod|ipad/ig)


/** *******************
 * desc: 判断是否是线上环境,若是线上环境,则将url进行转换,同时支持c.m和c.3g两种线上地址
 * params url: 待转换的url type: 有两个值,1和2,1代表各种后台接口的转换 2代表各种实际页面(类似分享页面的url更改)
 * return 经过转换的url
 **********************/

export function changeUrl(url, type) {
  let finalUrl = url
  const onLineBool = window.location.href.match(/t.c.m/i)
  if (!onLineBool) {
    if (type === 1) {
      finalUrl = url.replace(/t.c.m/, 'c.m')
    } else {
      finalUrl = url.replace(/t.c.m.163.com/, 'c.m.163.com/nc/qa')
    }
  }
  if (window.location.href.match(/c.3g/i)) {
    finalUrl = finalUrl.replace(/c.m/i, 'c.3g')
  }
  return finalUrl
}


/** *******************
 * desc:将url的search转换成键值对格式
 * params: url:待解析的url
 * return search的键值对
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


/** *******************
 * desc:截取文本
 * params: text: 待截取的文本 len: 需要限制的长度,多余的字数用...表示
 * return 处理好的文本
 **********************/

export function erilizeText(text, len) {
  if (text && text.length > len) {
    return (text.slice(0, len) + '...')
  }
  return text
}


/** *******************
 * desc:用于调试,在移动端上可以打印对象
 * params: obj:待打印的对象
 **********************/

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

/** *******************
 * desc: 将开始时间与结束时间转换成字符串
 * params: begin 开始时间,单位为毫秒数 end 结束时间,单位为毫秒数
 **********************/

export function limitTime(begin, end) {
  const beginTime = new Date(begin)
  const endTime = new Date(end - 1000 * 60 * 60 * 24)
  const limit = `${beginTime.getMonth() + 1}.${beginTime.getDate()} - ${endTime.getMonth() + 1}.${endTime.getDate()}`
  return limit
}


export function compareCards(allCards, myCards) {
  return allCards.map((finalCardItem) => {
    let newFinalCardItem = deepAssign({}, finalCardItem)
    let newArray = myCards.find(val => val.cardId === finalCardItem.id)
    return newArray ? deepAssign({}, finalCardItem, { amount: newArray.amount }) :
      newFinalCardItem
  })
}


export function ePreventDefault(e) {
  e.preventDefault()
}

export function sessionStorageHeight(name) {
  let getScrollTop = document.documentElement.scrollTop || document.body.scrollTop // 获取页面卷去的高度
  sessionStorage.setItem(name, getScrollTop)
}
