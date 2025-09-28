import React, { createContext, useRef, useMemo, ReactNode, useContext } from "react";
import { Toast, ToastMessage } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

type ToastOptions = Omit<ToastMessage, "severity" | "detail">;

type ToastContextType = {
  warn: (message: string, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  remove: () => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children, position = "top-right" }) => {
  const toastRef = useRef<Toast>(null);

  const show =
    (severity: "success" | "info" | "warn" | "error") =>
    (message: string, options: ToastOptions = {}) => {
      const toastOptions: ToastMessage = {
        severity,
        detail: message,
        ...options,
      };
      toastRef.current?.show(toastOptions);
    };

  const contextValue = useMemo<ToastContextType>(() => ({
    warn: show("warn"),
    success: show("success"),
    error: show("error"),
    info: show("info"),
    remove: () => toastRef.current?.clear(),
  }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast ref={toastRef} position={position} />
      <ConfirmDialog />
    </ToastContext.Provider>
  );
};

export default ToastProvider;