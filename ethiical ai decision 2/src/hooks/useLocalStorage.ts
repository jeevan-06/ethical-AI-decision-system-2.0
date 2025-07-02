import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}

export function useChat() {
  const [sessions, setSessions] = useLocalStorage('chat-sessions', []);
  const [activeSessionId, setActiveSessionId] = useLocalStorage('active-session', null);

  const createSession = (title?: string) => {
    const newSession = {
      id: crypto.randomUUID(),
      title: title || 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setSessions((prev: any[]) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    return newSession;
  };

  const addMessage = (sessionId: string, message: any) => {
    setSessions((prev: any[]) => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, messages: [...session.messages, message], updatedAt: new Date() }
          : session
      )
    );
  };

  return {
    sessions,
    activeSessionId,
    setActiveSessionId,
    createSession,
    addMessage
  };
}