import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import App from "./App";


const container = document.getElementById("root")!;
const root = createRoot(container);


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!clientId) {
  console.error("VITE_GOOGLE_CLIENT_ID is not set. Add it to your .env and restart.");
}
root.render(
  clientId ? (
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  ) : (
    <App />
  )
);