import { get, post, del, createAuthHeaders } from '../utils/api.js'

class AuthService {
    async LoginWithGoogle(){
        try{
            const response = await get('/auth/google');
            console.log(response);
            return response;
        }
        catch (error) {
            console.error('Error fetching projects:', error);
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }
}

const authService = new AuthService();
export default authService;