import { useRequest } from '@onvp/http'

import { useInterceptors } from './useInterceptors'

const interceptors = useInterceptors()

export const clientV2 = useRequest(import.meta.env.VITE_API_URL, {
  credentials: 'include',
  interceptors,
})

export const client = useRequest(import.meta.env.VITE_API_BASE_URL, {
  credentials: 'include',
  interceptors,
})
