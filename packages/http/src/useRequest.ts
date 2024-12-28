import { createFetch, type FetchContext, type FetchOptions } from 'ofetch'

export interface InterceptorHooks<T = unknown, R extends 'json' = 'json'> {
  onRequest?: (ctx: FetchContext<T, R>) => void
  onRequestError?: (ctx: FetchContext<T, R> & { error: Error }) => void
  onResponse?: (ctx: FetchContext<T, R> & { response: Response }) => void
  onResponseError?: (ctx: FetchContext<T, R> & { response?: Response; error: Error }) => void
}

export interface UseRequestOptions<T = unknown, R extends 'json' = 'json'>
  extends Omit<FetchOptions<R, T>, 'baseURL' | 'signal'> {
  interceptors?: InterceptorHooks<T, R>
}

type BodyType = BodyInit | Record<string, unknown> | null | undefined

export interface UseRequestReturn {
  get<R = unknown>(url: string, config?: Omit<FetchOptions<'json', R>, 'method'>): Promise<R>
  post<R = unknown>(url: string, body?: BodyType, config?: Omit<FetchOptions<'json', R>, 'method' | 'body'>): Promise<R>
  put<R = unknown>(url: string, body?: BodyType, config?: Omit<FetchOptions<'json', R>, 'method' | 'body'>): Promise<R>
  patch<R = unknown>(url: string, body?: BodyType, config?: Omit<FetchOptions<'json', R>, 'method' | 'body'>): Promise<R>
  delete<R = unknown>(url: string, config?: Omit<FetchOptions<'json', R>, 'method'>): Promise<R>
  abort(): void
}

/**
 * Creates a reusable fetch client with optional interceptors and easy abort control.
 *
 * @param baseURL - The base URL for all requests
 * @param options - Additional config + interceptors
 * @returns An object with typed HTTP methods (get, post, etc.) + an `abort()` function
 */
export function useRequest<T = unknown>(
  baseURL: string,
  options: UseRequestOptions<T> = {}
): UseRequestReturn {
  // AbortController for cancellation
  let controller = new AbortController()

  const { interceptors, ...ofetchConfig } = options

  const ofetchInstance = createFetch({

    defaults: {
      baseURL,
      responseType: 'json',
      signal: controller.signal,
      ...ofetchConfig,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onRequest(ctx: FetchContext<T, 'json'>) {
        interceptors?.onRequest?.(ctx)
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onRequestError(ctx: FetchContext<T, 'json'> & { error: Error }) {
        interceptors?.onRequestError?.(ctx)
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onResponse(ctx: FetchContext<T, 'json'> & { response: Response }) {
        interceptors?.onResponse?.(ctx)
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onResponseError(ctx: FetchContext<T, 'json'> & { response?: Response; error: Error }) {
        interceptors?.onResponseError?.(ctx)
      }
    }
  })

  function abort(): void {
    controller.abort()
    controller = new AbortController()
  }

  async function get<R = unknown>(
    url: string,
    config?: Omit<FetchOptions<'json', R>, 'method'>
  ): Promise<R> {
    return ofetchInstance<R>(url, { method: 'GET', ...config })
  }

  async function post<R = unknown>(
    url: string,
    body?: BodyType,
    config?: Omit<FetchOptions<'json', R>, 'method' | 'body'>
  ): Promise<R> {
    return ofetchInstance<R>(url, { method: 'POST', body, ...config })
  }

  async function put<R = unknown>(
    url: string,
    body?: BodyType,
    config?: Omit<FetchOptions<'json', R>, 'method' | 'body'>
  ): Promise<R> {
    return ofetchInstance<R>(url, { method: 'PUT', body, ...config })
  }

  async function patch<R = unknown>(
    url: string,
    body?: BodyType,
    config?: Omit<FetchOptions<'json', R>, 'method' | 'body'>
  ): Promise<R> {
    return ofetchInstance<R>(url, { method: 'PATCH', body, ...config })
  }

  async function del<R = unknown>(
    url: string,
    config?: Omit<FetchOptions<'json', R>, 'method'>
  ): Promise<R> {
    return ofetchInstance<R>(url, { method: 'DELETE', ...config })
  }

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    abort
  }
}
