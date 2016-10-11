import { expect } from 'chai'
import shareItem, { INIT_STATE } from '../../src/js/reducers/shareItem'
describe('Test reducer shareItem', () => {
  it('should handle FETCH_MYCARDS_INFO', () => {
    const action1 = {
      type: 'FETCH_SHAREITEM_INFO',
      data: { a: 'a', b: 'b' }
    }
    const anotherState = shareItem(INIT_STATE, action1)
    expect(anotherState.notlogin).to.eql({ a: 'a', b: 'b' })
    const action2 = {
      type: 'FETCH_SHAREITEM_INFO',
      data: { a: 'aa' }
    }
    expect(shareItem(anotherState, action2).notlogin).to.eql({ a: 'aa', b: 'b' })
  })
})
