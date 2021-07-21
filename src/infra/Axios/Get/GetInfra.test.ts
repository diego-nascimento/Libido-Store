import axios from 'axios'
jest.mock('axios')

const requestSpy = jest.fn()
axios.request = requestSpy()

describe('GetInfra', () => {
  test('Should be called with correct params')
})
