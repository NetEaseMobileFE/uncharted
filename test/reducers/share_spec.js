// import { expect } from 'chai'
// import share, { INIT_STATE } from '../../src/js/reducers/share'
// describe('Test reducer share', () => {
//   it('should handle FETCH_SHARE_INFO', () => {
//     const action1 = {
//       type: 'FETCH_SHARE_INFO',
//       data: { a: 'a', b: 'b' }
//     }
//     const anotherState = share(INIT_STATE, action1)
//     expect(anotherState.notlogin).to.eql({ a: 'a', b: 'b' })
//     const action2 = {
//       type: 'FETCH_SHARE_INFO',
//       data: { a: 'aa' }
//     }
//     expect(share(anotherState, action2).notlogin).to.eql({ a: 'aa', b: 'b'})
//   })
// })