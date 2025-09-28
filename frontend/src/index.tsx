import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import ChatPage from "./pages/ChatPage";
import ErrorBoundary from "./entities/ErrorBoundary";
import ToastProvider from "./entities/ToastProvider";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={store}>
      <ToastProvider position="top-right">
        <ErrorBoundary fallback={<div>Oops! Something broke.</div>}>
          <ChatPage />
        </ErrorBoundary>
      </ToastProvider>
    </Provider>
);
