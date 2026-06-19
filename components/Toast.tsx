"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Check, X, AlertCircle } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<{
  show: (message: string, type?: ToastType) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast flex items-center gap-2.5 min-w-[260px]"
          >
            <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
              t.type === "success" ? "bg-[var(--success)]" :
              t.type === "error" ? "bg-[var(--danger)]" :
              "bg-[var(--primary)]"
            }`}>
              {t.type === "error" ? <X className="w-3 h-3 text-white" /> :
               t.type === "info" ? <AlertCircle className="w-3 h-3 text-white" /> :
               <Check className="w-3 h-3 text-white" />}
            </span>
            <span className="text-sm">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
