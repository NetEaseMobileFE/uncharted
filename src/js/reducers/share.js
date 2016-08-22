import deepAssign from 'deep-assign'

export const INIT_STATE = {}
export default function share(state = INIT_STATE, action) {
  switch (action.type) {
    case 'FETCH_SHARE_INFO':
      return deepAssign({}, state, {
        share: deepAssign({}, state.share, action.data)
      })
    default: 
      return state
  }
}
