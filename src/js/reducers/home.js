import deepAssign from 'deep-assign'

export const INIT_STATE = {}
export default function home(state = INIT_STATE, action) {
  let newState = deepAssign({}, {}, state)
  switch (action.type) {
    case 'FETCH_BASIC_INFO':
      return deepAssign({}, state, {
        basic: deepAssign({}, state.basic, action.data)
      })
    case 'FETCH_NOTLOGIN_INFO':
      return deepAssign({}, state, {
        notlogin: deepAssign({}, state.notlogin, action.data)
      })
    case 'CHANGE_LOTTERY_STATUS':
      // 更改
      newState.basic.lotteryPrizes.map((item) => {
        if (item.lotteryInfo.id === action.data.lotteryId) {
          return deepAssign({}, item, { lotteryInfo: { status: action.data.status } })
        } else {
          return item
        }
      })
      return newState
    case 'FETCH_LOTTERY_ID':
      return deepAssign({}, state, {
        sendLotteryId: deepAssign({}, state.sendLotteryId, action.data)
      })
    case 'FETCH_SHARE_CARD':
      return deepAssign({}, state, {
        shareCard: deepAssign({}, state.shareCard, action.data)
      })
    case 'LOGIN_NEWS_APP':
      return deepAssign({}, state, {loginStatus: action.data})
    default: 
      return state
  }
}
