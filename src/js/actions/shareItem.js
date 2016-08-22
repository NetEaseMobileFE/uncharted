import fetch from 'isomorphic-fetch'

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

/** ************************
*本地测试路径：/notlogin.json
*后台测试路径：http://t.c.m.163.com/uc/activity/card/exchange/info
***************************/
