import { expect } from 'chai'
import home, { INIT_STATE } from '../../src/js/reducers/home'
describe('Test reducer home', () => {
  it('should handle FETCH_BASIC_INFO', () => {
    const action1 = {
      type: 'FETCH_BASIC_INFO',
      data: { a: 'a', b: 'b' }
    }
    const anotherState = home(INIT_STATE, action1)
    expect(anotherState.basic).to.eql({ a: 'a', b: 'b' })
    const action2 = {
      type: 'FETCH_BASIC_INFO',
      data: { a: 'aa' }
    }
    expect(home(anotherState, action2).basic).to.eql({ a: 'aa', b: 'b'})
  })
  it('should handle FETCH_NOTLOGIN_INFO', () => {
    const action1 = {
      type: 'FETCH_NOTLOGIN_INFO',
      data: { a: 'a', b: 'b' }
    }
    const anotherState = home(INIT_STATE, action1)
    expect(anotherState.notlogin).to.eql({ a: 'a', b: 'b' })
    const action2 = {
      type: 'FETCH_NOTLOGIN_INFO',
      data: { a: 'aa' }
    }
    expect(home(anotherState, action2).notlogin).to.eql({ a: 'aa', b: 'b'})
  })
})