import {createContext, ReactNode, useEffect, useState} from 'react'
import {AuthContextType} from '@/types/common.types'
import authService from "@/services/authService.ts";
import {User} from "@/types/user.types.ts";
import {ApiResponse} from "@/types/response.types.ts";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Check authentication status
    const checkAuth = async () => {
        try {
            const response: ApiResponse = await authService.getUserInfo()

            setUser(response.data.user)
        } catch (error) {
            setUser(null)
            console.error('Auth check error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const loginWithGoogle = () => {
        authService.loginWithGoogle()
    }

    // Logout
    const logout = async () => {
        try {
            await authService.logout()
            setUser(null)
            window.location.href = '/login'
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    // Check auth on mount
    useEffect(() => {
        checkAuth()
    }, [])

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        loginWithGoogle,
        logout,
        checkAuth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider')
//     }
//     return context
// }