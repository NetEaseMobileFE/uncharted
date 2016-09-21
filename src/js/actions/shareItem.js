import fetch from 'isomorphic-fetch'

/** ************************
 *本地测试路径：/notlogin.json
 *后台测试路径：http://t.c.m.163.com/uc/activity/card/exchange/info
 ***************************/

export function fetchShareItemInfo() {
  return (dispatch) => {
    return fetch('http://t.c.m.163.com/uc/activity/card/exchange/info')
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_SHAREITEM_INFO',
          data: json.data
        })
      })
  }
}

export function fetchShareInfo(id) {
  return (dispatch) => {
    return fetch(`http://t.c.m.163.com/uc/activity/card/exchange/past/info?cycleId=${id}`)
      .then(res => res.json())
      .then((json) => {
        console.log(id)
        console.log(json)
        dispatch({
          type: 'FETCH_SHARE_INFO',
          data: json.data
        })
      })
  }
}

export function fetchQueryCard(giftId, cardId) {
  console.log(giftId, cardId)
  return (dispatch) => {
    return fetch(`http://t.c.m.163.com/uc/activity/card/gift/find?giftId=${encodeURIComponent(giftId)}&cardId=${cardId}`)
      .then(res => res.json())
      .then((json) => {
        console.log(json)
        dispatch({
          type: 'FETCH_QUERY_CARD',
          data: json
        })
      })
  }
}
