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

export function sendLotteryId(id) {
  fetch(`http://t.c.m.163.com/uc/activity/ca   rd/prize/share?lotteryId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'same-origin'
  }).then((res) => {
    console.log(res)
  }, () => {
    alert('Error submitting form!')
  })
}
