import deepAssign from 'deep-assign'

export const INIT_STATE = {}
export default function mycards(state = INIT_STATE, action) {
  switch (action.type) {
    case 'FETCH_MYCARDS_INFO':
      console.log(action.data)
      if (!!state.mycards) {
        console.log(state)
        let currentArray = [].concat(state.mycards.lotteryCards, action.data.lotteryCards)
        return deepAssign({}, state, { mycards: { lotteryCards: currentArray } })
      }
      return deepAssign({}, state, {
        mycards: deepAssign({}, state.mycards, action.data)
      })
    default: 
      return state
  }
}
