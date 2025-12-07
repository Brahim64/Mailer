export interface GoogleLoginRequest {
    credential: string;
}
export interface FirstMessageRequest {
    senderId: string;
    recipientId: string;
    content: string;
}