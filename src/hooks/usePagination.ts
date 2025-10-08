import { useState, useCallback } from 'react'
import { PaginationInfo } from '@/types/response.types'

interface UsePaginationReturn {
    pagination: PaginationInfo
    setPage: (page: number) => void
    setLimit: (limit: number) => void
    nextPage: () => void
    prevPage: () => void
    setPagination: (pagination: PaginationInfo) => void
}

export function usePagination(
    initialPage: number = 1,
    initialLimit: number = 10
): UsePaginationReturn {
    const [pagination, setPaginationState] = useState<PaginationInfo>({
        page: initialPage,
        limit: initialLimit,
        total: 0,
        totalPages: 0,
    })

    const setPage = useCallback((page: number) => {
        setPaginationState((prev) => ({ ...prev, page }))
    }, [])

    const setLimit = useCallback((limit: number) => {
        setPaginationState((prev) => ({ ...prev, limit, page: 1 }))
    }, [])

    const nextPage = useCallback(() => {
        setPaginationState((prev) => {
            if (prev.page < prev.totalPages) {
                return { ...prev, page: prev.page + 1 }
            }
            return prev
        })
    }, [])

    const prevPage = useCallback(() => {
        setPaginationState((prev) => {
            if (prev.page > 1) {
                return { ...prev, page: prev.page - 1 }
            }
            return prev
        })
    }, [])

    const setPagination = useCallback((newPagination: PaginationInfo) => {
        setPaginationState(newPagination)
    }, [])

    return {
        pagination,
        setPage,
        setLimit,
        nextPage,
        prevPage,
        setPagination,
    }
}