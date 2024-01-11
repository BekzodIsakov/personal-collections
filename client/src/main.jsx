import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.js";
import { store } from "./store";
import { Provider } from "react-redux";
import AuthProvider from "./providers/authProvider.jsx";
import "./i18n.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Provider store={store}>
              <React.Suspense fallback='Loading...'>
                <App />
              </React.Suspense>
            </Provider>
          </AuthProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </React.StrictMode>
  </>
);
