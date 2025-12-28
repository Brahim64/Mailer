import * as signalR from "@microsoft/signalr";

export const chatConnection = new signalR.HubConnectionBuilder()
  .withUrl(import.meta.env.VITE_BACKEND_CHAT_URL, {
    accessTokenFactory: () => localStorage.getItem("token") ?? "",
  })
  .withAutomaticReconnect()
  .build();
