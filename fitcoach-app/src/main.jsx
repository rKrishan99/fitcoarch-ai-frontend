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
import 'aos/dist/aos.css';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <ModalContextProvider>
          <SprinnerContextProvider>
            <App />
          </SprinnerContextProvider>
        </ModalContextProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
