import type { GoogleLoginRequest } from '@/models/Request';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + '/auth/google';



export async function googleLogin(request: GoogleLoginRequest) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}`,
            request,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(`Google login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}