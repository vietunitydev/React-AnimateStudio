import {apiService} from "@/services/api.ts";

class AuthService {
    async getUserInfo() {
        return await apiService.get('/users')
    }

    loginWithGoogle(){
        window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/google`
    }

    async logout(){
        return await apiService.get('/auth/logout')
    }
}

const authService = new AuthService()
export default authService