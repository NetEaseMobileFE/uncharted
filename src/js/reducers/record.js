import deepAssign from 'deep-assign'

export const INIT_STATE = {}
export default function record(state = INIT_STATE, action) {
  switch (action.type) {
    case 'FETCH_RECORD_INFO':
      if (!!state.record) {
        if (action.data.lotteryPrizes.length === 0) {
          return deepAssign({}, state, { record: { noMoreData: true } })
        } else {
          let currentArray = [].concat(state.record.lotteryPrizes, action.data.lotteryPrizes)
          return deepAssign({}, state, { record: { lotteryPrizes: currentArray, noMoreData: false } })
        }
      }
      return deepAssign({}, state, {
        record: deepAssign({}, state.record, action.data)
      })
    case 'CLEAR_RECORD_INFO':
      state.record = null
    // return deepAssign({}, state, { mycards: null })
    default: 
      return state
  }
}
