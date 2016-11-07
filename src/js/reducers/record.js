import deepAssign from 'deep-assign'

export const INIT_STATE = {}
export default function record(state = INIT_STATE, action) {
  switch (action.type) {
    case 'FETCH_RECORD_INFO':
      if (!!state.record) {
        // console.log('已经存在数据...')
        const actionPage = action.data.page
        const recordPage = state.record.page
        const actionDataLen = action.data.lotteryPrizes.length
        if (actionPage === recordPage || actionDataLen === 0) {
          // console.log('获取页数相同...')
          return deepAssign({}, state, { record: { noMoreData: true } })
        } else if (actionDataLen !== 0) {
          // console.log('获取页数不同,并且当前页数所获取数据不为空...')
          let currentArray = [].concat(state.record.lotteryPrizes, action.data.lotteryPrizes)
          return deepAssign({}, state, { record: { lotteryPrizes: currentArray, noMoreData: false , page: action.data.page } })
        }
      } else {
        return deepAssign({}, state, {
          record: deepAssign({}, state.record, action.data)
        })
      }
    default: 
      return state
  }
}
