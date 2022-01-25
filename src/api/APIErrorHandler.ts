import { ApiErrorResponse } from 'apisauce'

export const UNKNOWN_ERROR = {
  kind: 'unknown' as const,
  temporary: true,
  translation: 'genericError.errorMessage' as const,
}
export const CONNECTION_ERROR = {
  kind: 'cannot-connect' as const,
  temporary: true,
  translation: 'genericError.cannot-connect' as const,
}
export const TIMEOUT_ERROR = {
  kind: 'timeout' as const,
  temporary: true,
  translation: 'genericError.cannot-connect' as const,
}
export const SERVER_ERROR = {
  kind: 'server' as const,
  translation: 'genericError.errorMessage' as const,
}
export const UNAUTHORIZED_ERROR = {
  kind: 'unauthorized' as const,
  status: 401 as const,
  translation: 'genericError.unauthorized' as const,
}
export const FORBIDDEN_ERROR = {
  kind: 'forbidden' as const,
  status: 403 as const,
  translation: 'genericError.errorMessage' as const,
}
export const NOT_FOUND_ERROR = {
  kind: 'not-found' as const,
  status: 404 as const,
  translation: 'genericError.errorMessage' as const,
}
export const UNPROCESSABLE_ENTITY_ERROR = {
  kind: 'unprocessable-entity' as const,
  status: 422 as const,
  translation: 'genericError.errorMessage' as const,
}

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | typeof TIMEOUT_ERROR
  /**
   * Cannot connect to the server for some reason.
   */
  | typeof CONNECTION_ERROR
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | typeof SERVER_ERROR
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | typeof UNAUTHORIZED_ERROR
  /**
   * We don't have access to perform that request. This is 403.
   */
  | typeof FORBIDDEN_ERROR
  /**
   * Unable to find that resource.  This is a 404.
   */
  | typeof NOT_FOUND_ERROR
  /**
   * Unprocessable Entity.  This is a 422.
   */
  | typeof UNPROCESSABLE_ENTITY_ERROR
  /**
   * All other 4xx series errors.
   */
  | { kind: 'rejected'; status: number | null; translation: string }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | typeof UNKNOWN_ERROR
  /**
   * The data we received is not in the expected format.
   */
  | { kind: 'bad-data'; translation: string }

export type CustomError = { error: GeneralApiProblem | null }
export function getError(response: ApiErrorResponse<any>): CustomError {
  const error = getGeneralApiProblem(response)
  return {
    error,
  }
}
/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: ApiErrorResponse<any>,
): GeneralApiProblem | null {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      return CONNECTION_ERROR
    case 'NETWORK_ERROR':
      return CONNECTION_ERROR
    case 'TIMEOUT_ERROR':
      return TIMEOUT_ERROR
    case 'SERVER_ERROR':
      return SERVER_ERROR
    case 'UNKNOWN_ERROR':
      return UNKNOWN_ERROR
    case 'CLIENT_ERROR':
      switch (response.status) {
        case 401:
          return UNAUTHORIZED_ERROR
        case 403:
          return FORBIDDEN_ERROR
        case 404:
          return NOT_FOUND_ERROR
        case 422:
          return UNPROCESSABLE_ENTITY_ERROR
        default:
          return {
            kind: 'rejected',
            status: response.status ?? null,
            translation: 'genericError.errorMessage',
          }
      }
    case 'CANCEL_ERROR':
    default:
      return null
  }
}
