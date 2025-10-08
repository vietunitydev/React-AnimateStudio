import { useEffect, useState } from 'react'
import { toastService, ToastMessage } from '@/services/toast.service'

export function useToast() {
    const [toasts, setToasts] = useState<ToastMessage[]>([])

    useEffect(() => {
        const unsubscribe = toastService.subscribe((toast) => {
            setToasts(prev => [...prev, toast])

            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== toast.id))
            }, toast.duration)
        })

        return unsubscribe
    }, [])

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    return { toasts, removeToast }
}