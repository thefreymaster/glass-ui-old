import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import { GlobalStateProvider } from "./providers/Global";
import { SocketProvider } from "./providers/Socket/index.tsx";
import ErrorBoundary from "./components/ErrorBoundry/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SocketProvider>
        <GlobalStateProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </GlobalStateProvider>
      </SocketProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
