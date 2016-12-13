import fetch from 'isomorphic-fetch'
import { changeUrl } from './../utils/util'

export function fetchRecordInfo(page = 1, pageSize = 10) {
  return (dispatch) => {
    return fetch(changeUrl(`//t.c.m.163.com/uc/activity/card/prize/list?page=${page}&pageSize=${pageSize}`, 1))
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
*后台测试路径：//t.c.m.163.com/uc/activity/card/prize/list
***************************/
