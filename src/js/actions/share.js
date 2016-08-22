import fetch from 'isomorphic-fetch'

// export function fetchPastInfo(id) {
//   return (dispatch) => {
//     return fetch(`http://t.c.m.163.com/uc/activity/card/exchange/past/info?cycleId=${id}`)
//       .then(res => res.json())
//       .then((json) => {
//         dispatch({
//           type: 'FETCH_PAST_INFO',
//           data: json.data
//         })
//       })
//   }
// }

/** ************************
*本地测试路径：/login.json
*后台测试路径：http://t.c.m.163.com/uc/activity/card/exchange/userinfo
***************************/


export function fetchShareInfo(id) {
  return (dispatch) => {
    return fetch(`http://t.c.m.163.com/uc/activity/card/exchange/past/info?cycleId=${id}`)
      .then(res => res.json())
      .then((json) => {
        dispatch({
          type: 'FETCH_SHARE_INFO',
          data: json.data
        })
      })
  }
}

/** ************************
*本地测试路径：/notlogin.json
*后台测试路径：http://t.c.m.163.com/uc/activity/card/exchange/info
***************************/

