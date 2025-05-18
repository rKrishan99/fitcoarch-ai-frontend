import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./context/ModalContext.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SprinnerContextProvider } from "./context/SprinnerContext.jsx";
import { store } from "./store/store.js";
import "aos/dist/aos.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserBioFormContextProvider } from "./context/UserBioFormContext.jsx";
import { StepsContextProvider } from "./context/StepsContext.jsx";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!CLIENT_ID) {
  console.error("Google Client ID is missing. Please check your .env file");
}

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <BrowserRouter>
          <ModalContextProvider>
            <SprinnerContextProvider>
              <UserBioFormContextProvider>
                <StepsContextProvider>
                  <App />
                </StepsContextProvider>
              </UserBioFormContextProvider>
            </SprinnerContextProvider>
          </ModalContextProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </ApolloProvider>
);
