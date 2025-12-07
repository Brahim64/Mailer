import type { ChatRoom } from "@/models/chatroom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + '/chat';

export async function sendFirstMessage(FirstMessageRequest: { senderId: string; recipientId: string; content: string; }) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/first-message`,
            FirstMessageRequest,)
        return response.data;
    } catch (error) {
        throw new Error(`Sending first message failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function fetchChatRooms(userId: string): Promise<ChatRoom[]> {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/${userId}/chatrooms`);
        return response.data;
    } catch (error) {
        throw new Error(`Fetching chat rooms failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}