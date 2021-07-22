import axios from 'axios'
import { GetInfra } from './GetInfra'
jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios >

describe('GetInfra', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('Axios should be called with correct params', async () => {
    const sut = new GetInfra()
    await sut.Get({
      url: 'any_url',
      body: 'any_data'
    })
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith('any_url', {
      data: 'any_data'
    })
  })

  test('Should return 200 and information from body if statusCode is 200', async () => {
    const sut = new GetInfra()
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: 'any_data'
    })
    const response = await sut.Get({
      url: 'any_url',
      body: 'any_data'
    })
    expect(response.body).toEqual('any_data')
    expect(response.StatusCode).toBe(200)
  })

  test('Should return 400 and message error if statusCode equal 400', async () => {
    const sut = new GetInfra()
    mockedAxios.get.mockResolvedValueOnce({
      status: 400,
      data: 'any_data'
    })
    const response = await sut.Get({
      url: 'any_url',
      body: 'any_data'
    })
    expect(response.body).toEqual('Não Encontrado')
    expect(response.StatusCode).toBe(400)
  })

  test('Should return 404 and message error if statusCode equal 400', async () => {
    const sut = new GetInfra()
    mockedAxios.get.mockResolvedValueOnce({
      status: 404,
      data: 'any_data'
    })
    const response = await sut.Get({
      url: 'any_url',
      body: 'any_data'
    })
    expect(response.body).toEqual('Não Encontrado')
    expect(response.StatusCode).toBe(404)
  })

  test('Should return 500 and message error if axios throws', async () => {
    const sut = new GetInfra()
    mockedAxios.get.mockRejectedValueOnce({
      status: 500,
      data: 'any_data'
    })
    const response = await sut.Get({
      url: 'any_url',
      body: 'any_data'
    })
    expect(response.body).toEqual('Algo deu Errado, Tente mais tarde')
    expect(response.StatusCode).toBe(500)
  })

  test('Should return statusCode and body is axios return untrated status', async () => {
    const sut = new GetInfra()
    mockedAxios.get.mockResolvedValueOnce({
      status: 201,
      data: 'any_data'
    })
    const response = await sut.Get({
      url: 'any_url',
      body: 'any_data'
    })
    expect(response.body).toEqual('any_data')
    expect(response.StatusCode).toBe(201)
  })
})
