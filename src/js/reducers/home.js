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
    case 'CHANGE_CARDS_NUM':
      newState.basic.myCards.map((item, index) => {
        if (action.data.cardId === 0) {
          newState.basic.myCards.splice(index, 1)
        } else if (item.cardId === action.data.cardId) {
          item.amount = action.data.amount
        }
        return true
      })
      return newState
    case 'CHANGE_LOTTERY_STATUS':
      newState.basic.lotteryPrizes.map((item) => {
        if (item.lotteryInfo.id === action.data.lotteryId) {
          item.lotteryInfo.status = action.data.status
        }
        return true
      })
      return newState
    default: 
      return state
  }
}
