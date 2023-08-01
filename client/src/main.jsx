import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.js";
import { store } from "./store";
import { Provider } from "react-redux";
import AuthProvider from "./providers/authProvider.jsx";
// import I18nProvider from "./providers/i18nProvider.jsx";
import "./i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        {/* <I18nProvider> */}
        <AuthProvider>
          <Provider store={store}>
            <React.Suspense fallback='Loading...'>
              <App />
            </React.Suspense>
          </Provider>
        </AuthProvider>
        {/* </I18nProvider> */}
      </ChakraProvider>
    </React.StrictMode>
  </>
);
