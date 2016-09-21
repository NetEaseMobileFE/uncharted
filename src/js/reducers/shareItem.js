import deepAssign from 'deep-assign'

export const INIT_STATE = {}
export default function shareItem(state = INIT_STATE, action) {
  switch (action.type) {
    case 'FETCH_SHAREITEM_INFO':
      return deepAssign({}, state, {
        notlogin: deepAssign({}, state.notlogin, action.data)
      })
    case 'FETCH_SHARE_INFO':
      return deepAssign({}, state, {
        share: deepAssign({}, state.shareInfo, action.data)
      })
    case 'FETCH_QUERY_CARD':
      return deepAssign({}, state, {
        queryCard: deepAssign({}, state.queryCard, action.data)
      })
    default: 
      return state
  }
}
