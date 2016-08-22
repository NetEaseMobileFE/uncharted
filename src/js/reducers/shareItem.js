import deepAssign from 'deep-assign'

export const INIT_STATE = {}
export default function shareItem(state = INIT_STATE, action) {
  switch (action.type) {
    case 'FETCH_SHAREITEM_INFO':
      return deepAssign({}, state, {
        notlogin: deepAssign({}, state.notlogin, action.data)
      })
    default: 
      return state
  }
}
