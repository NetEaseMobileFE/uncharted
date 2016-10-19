import deepAssign from 'deep-assign'

export const INIT_STATE = {}
export default function mycards(state = INIT_STATE, action) {
  switch (action.type) {
    case 'FETCH_MYCARDS_INFO':
      if (!!state.mycards) {
        // console.log('已经存在数据...')
        const actionPage = action.data.page
        const recordPage = state.mycards.page
        const actionDataLen = action.data.lotteryCards.length
        const recordDataLen = state.mycards.lotteryCards.length
        if (actionPage === recordPage) {
          // console.log('获取页数相同...')
          if (actionDataLen === recordDataLen % 10) {
            return deepAssign({}, state, { mycards: { noMoreData: true } })
          } else {
            state.mycards.lotteryCards.splice(recordPage * 10, recordDataLen % 10)
            let currentArray = [].concat(state.mycards.lotteryCards, action.data.lotteryCards)
            return deepAssign({}, state, { mycards: { lotteryCards: currentArray, noMoreData: false } })
          }
        } else if (actionDataLen === 0) {
          // console.log('获取页数不同,并且当前页数所获取数据为空...')
          return deepAssign({}, state, { mycards: { noMoreData: true } })
        } else if (actionDataLen !== 0) {
          // console.log('获取页数不同,并且当前页数所获取数据不为空...')
          let currentArray = [].concat(state.mycards.lotteryCards, action.data.lotteryCards)
          return deepAssign({}, state, { mycards: { lotteryCards: currentArray, noMoreData: false , page: action.data.page } })
        }
      } else {
        return deepAssign({}, state, {
          mycards: deepAssign({}, state.mycards, action.data)
        })
      }
    default: 
      return state
  }
}
