import fetch from 'isomorphic-fetch'

export function fetchRecordInfo(page = 1, pageSize = 10) {
  return (dispatch) => {
    return fetch(`http://t.c.m.163.com/uc/activity/card/prize/list?page=${page}&pageSize=${pageSize}`)
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_RECORD_INFO',
          data: json.data
        })
      })
  }
}

/** ************************
*本地测试路径：/record.json
*后台测试路径：http://t.c.m.163.com/uc/activity/card/prize/list
***************************/

export function clearStore() {
  return (dispatch) => {
    return (
      dispatch({
        type: 'CLEAR_RECORD_INFO',
        data: null
      })
    )
  }
}