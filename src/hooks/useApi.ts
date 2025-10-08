import { useState, useCallback } from 'react'
import { ApiResponse, ApiError } from '@/types/response.types'

interface UseApiReturn<T> {
    data: T | null
    loading: boolean
    error: ApiError | null
    execute: (...args: any[]) => Promise<T | null>
    reset: () => void
    response: ApiResponse<T> | null
}

export function useApi<T>(
    apiFunc: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiReturn<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const [response, setResponse] = useState<ApiResponse<T> | null>(null)

    const execute = useCallback(
        async (...args: any[]) => {
            try {
                setLoading(true)
                setError(null)
                const res = await apiFunc(...args)
                setResponse(res)

                if (res.success && res.data) {
                    setData(res.data)
                    return res.data
                } else {
                    const err: ApiError = {
                        code: res.error?.code || 'UNKNOWN_ERROR',
                        message: res.error?.message || res.message || 'An error occurred',
                        details: res.error?.details,
                    }
                    setError(err)
                    return null
                }
            } catch (err: any) {
                setError(err)
                return null
            } finally {
                setLoading(false)
            }
        },
        [apiFunc]
    )

    const reset = useCallback(() => {
        setData(null)
        setError(null)
        setLoading(false)
        setResponse(null)
    }, [])

    return { data, loading, error, execute, reset, response }
}