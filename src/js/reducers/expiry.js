import deepAssign from 'deep-assign'

export const INIT_STATE = {}
export default function getPrize(state = INIT_STATE, action) {
  switch (action.type) {
    case 'FETCH_EXPIRY_PARAMS':
      return deepAssign({}, state, {
        expiryParams: deepAssign({}, state.expiryParams, action.data)
      })
    default:
      return state
  }
}
