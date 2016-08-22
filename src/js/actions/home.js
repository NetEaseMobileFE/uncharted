import fetch from 'isomorphic-fetch'

export function fetchBasicInfo() {
  return (dispatch) => {
    return fetch('http://t.c.m.163.com/uc/activity/card/exchange/userinfo', { credentials: 'same-origin' })
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
*本地测试路径：/login.json
*后台测试路径：http://t.c.m.163.com/uc/activity/card/exchange/userinfo
***************************/


export function fetchNotloginInfo() {
  return (dispatch) => {
    return fetch('http://t.c.m.163.com/uc/activity/card/exchange/info')
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_NOTLOGIN_INFO',
          data: json.data
        })
      })
  }
}

/** ************************
*本地测试路径：/notlogin.json
*后台测试路径：http://t.c.m.163.com/uc/activity/card/exchange/info
***************************/


export function changeCardsNum(cardNumInfo) {
  return (dispatch) => {
    return dispatch({
      type: 'CHANGE_CARDS_NUM',
      data: cardNumInfo
    })
  }
}


export function changeLotteryStatus(lotteryStatus) {
  return (dispatch) => {
    return dispatch({
      type: 'CHANGE_LOTTERY_STATUS',
      data: lotteryStatus
    })
  }
}


export function fetchPastPrizeInfo() {
  return (dispatch) => {
    return fetch('/pastprize.json')
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_PASTPRIZE_INFO',
          data: json.data
        })
      })
  }
}

