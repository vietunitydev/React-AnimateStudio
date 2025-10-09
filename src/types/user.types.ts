export interface User {
    id: string
    provider: 'google'
    providerUserID: string
    email: string
    name: string
    picture: string
    email_verified: boolean
    lastLoginAt: Date
    createdAt: Date
    updatedAt: Date
}