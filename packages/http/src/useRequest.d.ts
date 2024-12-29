import { type FetchContext, type FetchOptions } from 'ofetch';
export interface InterceptorHooks<T = unknown, R extends 'json' = 'json'> {
    onRequest?: (ctx: FetchContext<T, R>) => void;
    onRequestError?: (ctx: FetchContext<T, R> & {
        error: Error;
    }) => void;
    onResponse?: (ctx: FetchContext<T, R> & {
        response: Response;
    }) => void;
    onResponseError?: (ctx: FetchContext<T, R> & {
        response?: Response;
        error: Error;
    }) => void;
}
export interface UseRequestOptions<T = unknown, R extends 'json' = 'json'> extends Omit<FetchOptions<R, T>, 'baseURL' | 'signal'> {
    interceptors?: InterceptorHooks<T, R>;
}
type BodyType = BodyInit | Record<string, unknown> | null | undefined;
export interface UseRequestReturn {
    get<R = unknown>(url: string, config?: Omit<FetchOptions<'json', R>, 'method'>): Promise<R>;
    post<R = unknown>(url: string, body?: BodyType, config?: Omit<FetchOptions<'json', R>, 'method' | 'body'>): Promise<R>;
    put<R = unknown>(url: string, body?: BodyType, config?: Omit<FetchOptions<'json', R>, 'method' | 'body'>): Promise<R>;
    patch<R = unknown>(url: string, body?: BodyType, config?: Omit<FetchOptions<'json', R>, 'method' | 'body'>): Promise<R>;
    delete<R = unknown>(url: string, config?: Omit<FetchOptions<'json', R>, 'method'>): Promise<R>;
    abort(): void;
}
/**
 * Creates a reusable fetch client with optional interceptors and easy abort control.
 *
 * @param baseURL - The base URL for all requests
 * @param options - Additional config + interceptors
 * @returns An object with typed HTTP methods (get, post, etc.) + an `abort()` function
 */
export declare function useRequest<T = unknown>(baseURL: string, options?: UseRequestOptions<T>): UseRequestReturn;
export {};
//# sourceMappingURL=useRequest.d.ts.map