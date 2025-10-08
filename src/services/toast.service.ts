import { ApiResponse, ApiError } from '@/types/response.types'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
    id: string
    type: ToastType
    title?: string
    message: string
    duration?: number
}

class ToastService {
    private listeners: ((toast: ToastMessage) => void)[] = []

    subscribe(listener: (toast: ToastMessage) => void) {
        this.listeners.push(listener)
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener)
        }
    }

    private notify(toast: Omit<ToastMessage, 'id'>) {
        const toastWithId: ToastMessage = {
            ...toast,
            id: Math.random().toString(36).substring(7),
            duration: toast.duration || 3000,
        }
        this.listeners.forEach(listener => listener(toastWithId))
    }

    success(message: string, title?: string) {
        this.notify({ type: 'success', message, title })
    }

    error(message: string, title?: string) {
        this.notify({ type: 'error', message, title })
    }

    warning(message: string, title?: string) {
        this.notify({ type: 'warning', message, title })
    }

    info(message: string, title?: string) {
        this.notify({ type: 'info', message, title })
    }

    // Helper để xử lý API response
    handleApiResponse<T>(response: ApiResponse<T>) {
        if (response.success) {
            if (response.message) {
                this.success(response.message)
            }
        } else {
            this.error(
                response.error?.message || response.message || 'An error occurred',
                'Error'
            )
        }
    }

    // Helper để xử lý API error
    handleApiError(error: ApiError) {
        this.error(error.message, `Error ${error.code}`)
    }
}

export const toastService = new ToastService()