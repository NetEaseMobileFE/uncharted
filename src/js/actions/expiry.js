import fetch from 'isomorphic-fetch'
import { changeUrl } from './../utils/util'

export function fetchExpiryParams(params, userInfo) {
  const paramInfo = `${encodeURI('prizeId=' + params.prizeId + '&cycleId=' + params.cycleId + '&lotteryId=' + params.lotteryId + '&address=' + userInfo.address + '&name=' + userInfo.username + '&phone=' + userInfo.tele + '&udid=' + userInfo.udid)}`
  return (dispatch) => {
    return fetch(changeUrl('http://t.c.m.163.com/uc/activity/card/prize/exchange', 1), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
      body: paramInfo
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_EXPIRY_PARAMS',
          data: json
        })
      })
  }
}

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
