import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
