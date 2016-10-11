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
    expect(home(anotherState, action2).basic).to.eql({ a: 'aa', b: 'b' })
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
    expect(home(anotherState, action2).notlogin).to.eql({ a: 'aa', b: 'b' })
  })
  
  it('should handle FETCH_LOTTERY_ID', () => {
    const action1 = {
      type: 'FETCH_LOTTERY_ID',
      data: { a: 'a', b: 'b' }
    }
    const anotherState = home(INIT_STATE, action1)
    expect(anotherState.sendLotteryId).to.eql({ a: 'a', b: 'b' })
    const action2 = {
      type: 'FETCH_LOTTERY_ID',
      data: { a: 'aa' }
    }
    expect(home(anotherState, action2).sendLotteryId).to.eql({ a: 'aa', b: 'b' })
  })
  it('should handle FETCH_SHARE_CARD', () => {
    const action1 = {
      type: 'FETCH_SHARE_CARD',
      data: { a: 'a', b: 'b' }
    }
    const anotherState = home(INIT_STATE, action1)
    expect(anotherState.shareCard).to.eql({ a: 'a', b: 'b' })
    const action2 = {
      type: 'FETCH_SHARE_CARD',
      data: { a: 'aa' }
    }
    expect(home(anotherState, action2).shareCard).to.eql({ a: 'aa', b: 'b' })
  })
})
