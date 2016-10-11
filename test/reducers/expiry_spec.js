import { expect } from 'chai'
import expiry, { INIT_STATE } from '../../src/js/reducers/expiry'
describe('Test reducer expiry', () => {
  it('should handle FETCH_EXPIRY_PARAMS', () => {
    const action1 = {
      type: 'FETCH_EXPIRY_PARAMS',
      data: { a: 'a', b: 'b' }
    }
    const anotherState = expiry(INIT_STATE, action1)
    expect(anotherState.expiryParams).to.eql({ a: 'a', b: 'b' })
    const action2 = {
      type: 'FETCH_EXPIRY_PARAMS',
      data: { a: 'aa' }
    }
    expect(expiry(anotherState, action2).expiryParams).to.eql({ a: 'aa', b: 'b' })
  })
})
