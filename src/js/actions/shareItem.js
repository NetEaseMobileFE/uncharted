import fetch from 'isomorphic-fetch'
import { changeUrl } from './../utils/util'
/** ************************
 *本地测试路径：/notlogin.json
 *后台测试路径：//t.c.m.163.com/uc/activity/card/exchange/info
 ***************************/

export function fetchShareItemInfo() {
  return (dispatch) => {
    return fetch(changeUrl('//t.c.m.163.com/uc/activity/card/exchange/info', 1))
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
    return fetch(changeUrl(`//t.c.m.163.com/uc/activity/card/exchange/past/info?cycleId=${id}`, 1))
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_SHARE_INFO',
          data: json.data
        })
      })
  }
}

export function fetchQueryCard(giftId, cardId) {
  return () => {
    return fetch(changeUrl(`//t.c.m.163.com/uc/activity/card/gift/find?giftId=${encodeURIComponent(giftId)}&cardId=${cardId}`, 1))
      .then(res => res.json())
      .then((json) => {
        return json
      })
  }
}
