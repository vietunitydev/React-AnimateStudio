import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiResponse, ApiError } from '../types/response.types.ts'

class ApiService {
    private api: AxiosInstance

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4999/api',
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        this.setupInterceptors()
    }

    private setupInterceptors() {
        // Request Interceptor
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token')
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        // Response Interceptor
        this.api.interceptors.response.use(
            (response: AxiosResponse<ApiResponse>) => {
                // Nếu response có success: false, throw error
                if (response.data && !response.data.success) {
                    return Promise.reject(this.handleApiError(response.data))
                }
                return response
            },
            (error) => {
                // Handle 401 Unauthorized
                if (error.response?.status === 401) {
                    localStorage.removeItem('token')
                    window.location.href = '/auth/login'
                }
                return Promise.reject(this.handleError(error))
            }
        )
    }

    private handleApiError(response: ApiResponse): ApiError {
        return {
            code: response.error?.code || 'API_ERROR',
            message: response.error?.message || response.message || 'An error occurred',
            details: response.error?.details,
            stack: response.error?.stack,
            status: 400,
        }
    }

    private handleError(error: any): ApiError {
        if (error.response) {
            const data = error.response.data as ApiResponse
            return {
                code: data.error?.code || 'SERVER_ERROR',
                message: data.error?.message || data.message || 'An error occurred',
                details: data.error?.details,
                stack: data.error?.stack,
                status: error.response.status,
            }
        } else if (error.request) {
            return {
                code: 'NETWORK_ERROR',
                message: 'No response from server',
                status: 0,
            }
        } else {
            return {
                code: 'UNKNOWN_ERROR',
                message: error.message || 'An unexpected error occurred',
            }
        }
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.api.get<ApiResponse<T>>(url, config)
        return response.data
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.api.post<ApiResponse<T>>(url, data, config)
        return response.data
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.api.put<ApiResponse<T>>(url, data, config)
        return response.data
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.api.patch<ApiResponse<T>>(url, data, config)
        return response.data
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.api.delete<ApiResponse<T>>(url, config)
        return response.data
    }
}

export const apiService = new ApiService()