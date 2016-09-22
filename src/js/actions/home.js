import fetch from 'isomorphic-fetch'
import { changeUrl } from './../utils/util'

/** ************************
 * 本地测试路径：/login.json
 * 后台测试路径：http://t.c.m.163.com/uc/activity/card/exchange/userinfo
 * 获取登陆数据
 ***************************/

export function fetchBasicInfo() {
  return (dispatch) => {
    return fetch(changeUrl('http://t.c.m.163.com/uc/activity/card/exchange/userinfo', 1), { credentials: 'same-origin' })
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_BASIC_INFO',
          data: json.data
        })
      })
  }
}


/** ************************
 * 本地测试路径：/notlogin.json
 * 后台测试路径：http://t.c.m.163.com/uc/activity/card/exchange/info
 * 获取为登陆数据
 ***************************/

export function fetchNotloginInfo() {
  return (dispatch) => {
    return fetch(changeUrl('http://t.c.m.163.com/uc/activity/card/exchange/info', 1))
      .then(res => res.json())
      .then((json) => {
        console.log(json)
        dispatch({
          type: 'FETCH_NOTLOGIN_INFO',
          data: json.data
        })
      })
  }
}

/** ************************
 * 更改卡片数量
 ***************************/

export function changeCardsNum(cardNumInfo) {
  return (dispatch) => {
    return dispatch({
      type: 'CHANGE_CARDS_NUM',
      data: cardNumInfo
    })
  }
}

/** ************************
 * 更卡获奖状态
 ***************************/

export function changeLotteryStatus(lotteryStatus) {
  return (dispatch) => {
    return dispatch({
      type: 'CHANGE_LOTTERY_STATUS',
      data: lotteryStatus
    })
  }
}

/** ************************
 * 获取历史获奖记录
 ***************************/

// export function fetchPastPrizeInfo() {
//   return (dispatch) => {
//     return fetch('/pastprize.json')
//       .then(res => res.json())
//       .then((json) => {
//         dispatch({
//           type: 'FETCH_PASTPRIZE_INFO',
//           data: json.data
//         })
//       })
//   }
// }

/** ************************
 * 获取我的集卡记录
 ***************************/

export function fetchCardInfo(cardId) {
  return (dispatch) => {
    return fetch(changeUrl(`http://t.c.m.163.com/uc/activity/card/gift/send?cardId=${cardId}`, 1), { credentials: 'same-origin' })
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_CARD_INFO',
          data: json.data
        })
      })
  }
}

/** ************************
 * 兑奖接口
 ***************************/

export function sendLotteryId(id) {
  return (dispatch) => {
    return fetch(changeUrl(`http://t.c.m.163.com/uc/activity/card/prize/share?lotteryId=${id}`, 1), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_LOTTERY_ID',
          data: json
        })
      })
  }
}

/** ************************
 * 领取卡片
 ***************************/

export function receiveCardId(giftId, cardId) {
  const params = `cardId=${cardId}&giftId=${encodeURIComponent(giftId)}`
  return (dispatch) => {
    return fetch(changeUrl('http://t.c.m.163.com/uc/activity/card/gift/receive', 1), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // credentials: 'same-origin',
      credentials: 'include',
      body: params
    })
      .then(res => res.json())
      .then((json) => {
        console.log(json)
        dispatch({
          type: 'FETCH_SHARE_CARD',
          data: json.data
        })
      })
  }
}

/** ************************
 * 查询卡片
 ***************************/

// export function fetchQueryCard(giftId, cardId) {
//   console.log(giftId, cardId)
//   return (dispatch) => {
//     return fetch(`http://t.c.m.163.com/uc/activity/card/gift/find?giftId=${encodeURIComponent(giftId)}&cardId=${cardId}`)
//       .then(res => res.json())
//       .then((json) => {
//         console.log(json)
//         dispatch({
//           type: 'FETCH_QUERY_CARD',
//           data: json
//         })
//       })
//   }
// }