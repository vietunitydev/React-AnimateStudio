/**
 * Base response interface
 */
export interface ApiResponse<T = any> {
    success: boolean
    message?: string
    data?: T
    error?: ErrorDetail
    metadata?: ResponseMetadata
}

/**
 * Error detail structure
 */
export interface ErrorDetail {
    code: string
    message: string
    details?: any
    stack?: string
}

/**
 * Response metadata
 */
export interface ResponseMetadata {
    timestamp: string
    requestId?: string
    duration?: number
    pagination?: PaginationInfo
}

/**
 * Pagination information
 */
export interface PaginationInfo {
    page: number
    limit: number
    total: number
    totalPages: number
}

// Form Types
export interface FormField {
    name: string
    label: string
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea'
    placeholder?: string
    required?: boolean
    validation?: any
}

// Route Types
export interface RouteConfig {
    path: string
    element: React.ReactElement
    isPrivate?: boolean
    children?: RouteConfig[]
}

// Pagination Params
export interface PaginationParams {
    page?: number
    limit?: number
}

// API Error Type
export interface ApiError extends ErrorDetail {
    status?: number
}