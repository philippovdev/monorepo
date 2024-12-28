import { useRequest } from '@onvp/http'
import { useInterceptors } from './useInterceptors';

const interceptors = useInterceptors();

export const client = useRequest(import.meta.env.VITE_API_URL, {
  credentials: 'include',
  interceptors
})
