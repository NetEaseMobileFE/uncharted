import { expect } from 'chai'
import mycards, { INIT_STATE } from '../../src/js/reducers/mycards'
describe('Test reducer mycards', () => {
  it('should handle FETCH_MYCARDS_INFO', () => {
    const action1 = {
      type: 'FETCH_MYCARDS_INFO',
      data: { a: 'a', b: 'b' }
    }
    const anotherState = mycards(INIT_STATE, action1)
    expect(anotherState.mycards).to.eql({ a: 'a', b: 'b' })
    const action2 = {
      type: 'FETCH_MYCARDS_INFO',
      data: { a: 'aa' }
    }
    expect(mycards(anotherState, action2).mycards).to.eql({ a: 'aa', b: 'b'})
  })
})