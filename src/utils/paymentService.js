import { get, post, del, createAuthHeaders } from '../utils/api.js'

class PaymentService {
    async createPayment(plan) {
        try{
            console.log(plan);
            const response = await post('/payments/create',{plan: plan});
            console.log(response);
            return response;
        }
        catch(error){
            console.error('Error fetching projects:', error);
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }

    async clientVNPayReturn(queryString) {
        try{
            console.log(queryString);

            const response = await get('/payments/vnpay_return?$'+queryString);
            console.log(response);
            return response;
        }
        catch(error){
            console.error('Error fetching projects:', error);
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }

    async checkStatusOder(orderId) {
        try{
            const response = await get('/payments/check-key/'+orderId);
            console.log(response);
            return response;
        }
        catch(error){
            console.error('Error fetching projects:', error);
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }

    async getOrders(apiKey, params = {}) {
        try {
            const headers = createAuthHeaders(apiKey);
            const query = new URLSearchParams();
            if (params.page) query.append('page', params.page.toString());
            if (params.limit) query.append('limit', params.limit.toString());
            if (params.search) query.append('search', params.search);
            if (params.sortBy) query.append('sortBy', params.sortBy);
            if (params.sortOrder) query.append('sortOrder', params.sortOrder);

            const response = await get(`/payments/orders?${query.toString()}`, headers);
            return response;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }

    async getPaymentStats(apiKey, params = {}) {
        try {
            const headers = createAuthHeaders(apiKey);
            const query = new URLSearchParams();
            if (params.fromDate) query.append('fromDate', params.fromDate);
            if (params.toDate) query.append('toDate', params.toDate);

            const response = await get(`/payments/stats?${query.toString()}`, headers);
            return response;
        } catch (error) {
            console.error('Error fetching payment stats:', error);
            throw new Error(`Failed to fetch stats: ${error.message}`);
        }
    }
}

const paymentService = new PaymentService();
export default paymentService;