import type { User } from "@/models/User";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + '/users';

export async function getUserProfile(): Promise<User> {
    try {
        const response = await axios.get<User>(API_BASE_URL+"/me", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch user profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
export async function getUserByMail(email: string): Promise<User> {
    try {
        const response = await axios.get<User>(`${API_BASE_URL}/by-email`, {
            params: { email },
            withCredentials: true,
        });
        console.log("Fetched user by email:", response.data);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch user by email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}