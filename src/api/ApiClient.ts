import apisauce from 'apisauce'
import { CustomError, getError } from './APIErrorHandler'

type APIResponse = any | CustomError

type Headers = {
  'Cache-Control': string
  'content-type': string
  Accept: string
  Authorization: string
}

export const getInstance = async (token?: string) => {
  let bearerToken
  if (token) {
    bearerToken = token
  } else {
    bearerToken = 'testtoken'
  }
  let headers: Headers = {
    'Cache-Control': 'no-cache',
    'content-type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + bearerToken,
  }

  return apisauce.create({
    baseURL: `http://localhost:3000`,
    headers,
  })
}

const APIClient = {
  get: async (
    url: string,
    params?: {},
    token?: string,
  ): Promise<APIResponse> => {
    const api = await getInstance(token)
    const response = await api.get(url, params)
    if (!response.ok) {
      throw getError(response)
    }
    return response.data
  }
}

export default APIClient
