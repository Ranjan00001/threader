import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import ChatPage from "./pages/ChatPage";
import ErrorBoundary from "./entities/ErrorBoundary";
import ToastProvider from "./entities/ToastProvider";
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Layout from "./pages/Layout";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={store}>
      <ToastProvider position="top-right">
        <ErrorBoundary fallback={<div>Oops! Something broke.</div>}>
          <Layout
            headerTitle="Threader"
            sidebarContent={<div className="p-2">Sidebar items go here</div>}
            footer={<div className="text-sm opacity-70">© 2025 Threader</div>}
          >
            <ChatPage />
          </Layout>
        </ErrorBoundary>
      </ToastProvider>
    </Provider>
);
