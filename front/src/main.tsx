import { createRoot } from "react-dom/client";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import App from "./App";
import Messages from "./pages/Messages";


const router= createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "messages",
        element: <Messages />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
