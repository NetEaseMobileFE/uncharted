import { expect } from 'chai'
import record, { INIT_STATE } from '../../src/js/reducers/record'
describe('Test reducer record', () => {
  it('should handle FETCH_RECORD_INFO', () => {
    const action1 = {
      type: 'FETCH_RECORD_INFO',
      data: {a:{b:{d:1}}}
    }
    const anotherState = record(INIT_STATE, action1)
    expect(anotherState.record).to.eql({a:{b:{d:1}}})
    const action2 = {
      type: 'FETCH_RECORD_INFO',
      data: { a: {b:{c:2}} }
    }
    expect(record(anotherState, action2).record).to.eql({a:{b:{d:1,c:2}}})
  })
})