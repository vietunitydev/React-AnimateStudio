import { get, post, del, createAuthHeaders } from '../utils/api.js'

class KeyService {
    async getKeys(apiKey) {
        try {
            const headers = createAuthHeaders(apiKey);
            const response = await get('/keys', headers);
            return response;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }

    async createKey(apiKey, code, usesLeft) {
        try {

            const headers = createAuthHeaders(apiKey);
            const response = await post('/projects', {code:code, usesLeft:usesLeft}, headers);
            return response;
        } catch (error) {
            console.error('Error creating project:', error);
            throw new Error(`Failed to create project: ${error.message}`);
        }
    }

    async deleteProject(apiKey, keyId) {
        try {
            const headers = createAuthHeaders(apiKey);
            const response = await del(`/projects/${keyId}`, headers);
            return response;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw new Error(`Failed to delete project: ${error.message}`);
        }
    }
}

const keyService = new KeyService();
export default keyService;