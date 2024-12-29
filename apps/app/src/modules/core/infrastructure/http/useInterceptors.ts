import { type FetchContext } from 'ofetch'

export const useInterceptors = () => {
  return {
    onRequest: (ctx: FetchContext) => {
      console.log('temporary use of ctx', ctx)
    },

    onRequestError: (ctx: FetchContext) => {
      console.log('temporary use of ctx', ctx)
    },

    onResponse: (ctx: FetchContext & { response: Response }) => {
      console.log('temporary use of ctx', ctx)
    },

    onResponseError: (
      ctx: FetchContext & { response?: Response; error: Error }
    ) => {
      console.log('temporary use of ctx', ctx)
    },
  }
}
