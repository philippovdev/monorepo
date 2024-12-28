import { type FetchContext } from 'ofetch'

export const useInterceptors = () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRequest: (ctx: FetchContext) => {
      //
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRequestError: (ctx: FetchContext) => {
      //
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onResponse: (ctx: FetchContext & { response: Response }) => {
      //
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onResponseError: (ctx: FetchContext & { response?: Response; error: Error }) => {
      //
    }
  }
}
