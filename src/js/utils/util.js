/** *******************
 *转换url参数
 *
 **********************/

export const isAndroid = navigator.userAgent.match(/android/ig)
export const isIos = navigator.userAgent.match(/iphone|ipod|ipad/ig)

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
