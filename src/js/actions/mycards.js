import fetch from 'isomorphic-fetch'
import { changeUrl } from './../utils/util'

export function fetchMycardsInfo(page = 1, pageSize = 10) {
  return (dispatch) => {
    return fetch(changeUrl(`http://t.c.m.163.com/uc/activity/card/list?page=${page}&pageSize=${pageSize}`, 1), { credentials: 'same-origin' })
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_MYCARDS_INFO',
          data: json.data
        })
      })
  }
}

/** ************************
*本地测试路径：/mycards.json
*后台测试路径：http://t.c.m.163.com/uc/activity/card/list
***************************/


export function clearStore() {
  return (dispatch) => {
    return (
        dispatch({
          type: 'CLEAR_MYCARDS_INFO',
          data: null
        })
    )
  }
}
