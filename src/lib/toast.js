import { useSyncExternalStore } from "react";

let toasts = [];
let nextId = 1;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

export function showToast(message, ms = 2600) {
  const id = nextId++;
  // Keep at most 2 on screen so they never bury the content underneath.
  toasts = [...toasts, { id, message }].slice(-2);
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, ms);
}

export const useToasts = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => toasts
  );
