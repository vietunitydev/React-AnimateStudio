import { get, post, del, createAuthHeaders } from '../utils/api.js'

class KeyService {
    async getKeys(apiKey, params = {}) {
        try {
            const headers = createAuthHeaders(apiKey);
            const query = new URLSearchParams();
            if (params.page) query.append('page', params.page.toString());
            if (params.limit) query.append('limit', params.limit.toString());
            if (params.search) query.append('search', params.search);
            if (params.sortBy) query.append('sortBy', params.sortBy);
            if (params.sortOrder) query.append('sortOrder', params.sortOrder);

            const response = await get(`/keys?${query.toString()}`, headers);
            return response;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }

    async createKey(apiKey, code, usesLeft) {
        try {

            const headers = createAuthHeaders(apiKey);
            const response = await post('/keys', {code:code, usesLeft:usesLeft}, headers);
            return response;
        } catch (error) {
            console.error('Error creating project:', error);
            throw new Error(`Failed to create project: ${error.message}`);
        }
    }

    async deleteKey(apiKey, keyId) {
        try {
            const headers = createAuthHeaders(apiKey);
            const response = await del(`/keys/${keyId}`, headers);
            return response;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw new Error(`Failed to delete project: ${error.message}`);
        }
    }
}

const keyService = new KeyService();
export default keyService;