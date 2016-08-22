import fetch from 'isomorphic-fetch'

export function fetchMycardsInfo(page = 1, pageSize = 10) {
  return (dispatch) => {
    return fetch(`http://t.c.m.163.com/uc/activity/card/list?page=${page}&pageSize=${pageSize}`, { credentials: 'same-origin' })
      .then(res => res.json())
      .then((json) => {
        console.log(json)
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
