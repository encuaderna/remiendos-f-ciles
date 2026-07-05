import { useState, useEffect, useCallback } from "react";

function readFromStorage(key, initialValue) {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return initialValue;
    const parsed = JSON.parse(item);
    // Type guard: if initialValue is array, ensure we return an array
    if (Array.isArray(initialValue) && !Array.isArray(parsed)) return initialValue;
    return parsed;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => readFromStorage(key, initialValue));

  // Sync across browser tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        setStoredValue(readFromStorage(key, initialValue));
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key]);

  const setValue = useCallback((value) => {
    setStoredValue((prev) => {
      const newValue = typeof value === "function" ? value(prev) : value;
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch { /* storage full */ }
      return newValue;
    });
  }, [key]);

  return [storedValue, setValue];
}