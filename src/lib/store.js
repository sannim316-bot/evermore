import { useSyncExternalStore } from "react";

/**
 * Evermore keeps everything on the device. There are no accounts and no
 * servers: this tiny store persists to localStorage and nothing else.
 */
const KEY = "evermore:v1";

export const initialState = {
  version: 1,
  name: "",
  onboarded: false,
  points: 0,
  streak: 0,
  longestStreak: 0,
  lastActive: null,
  activeDays: [],
  daily: { date: null, checkIn: false, spark: false, moment: false },
  stats: { checkIns: 0, sparks: 0, moments: 0 },
  moments: [],
  visitedCommunity: false,
};

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...initialState };
    const saved = JSON.parse(raw);
    return {
      ...initialState,
      ...saved,
      daily: { ...initialState.daily, ...saved.daily },
      stats: { ...initialState.stats, ...saved.stats },
      activeDays: Array.isArray(saved.activeDays) ? saved.activeDays : [],
      moments: Array.isArray(saved.moments) ? saved.moments : [],
    };
  } catch {
    // Corrupt or unavailable storage: start fresh rather than crash.
    return { ...initialState };
  }
}

let state = load();
const listeners = new Set();

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked: keep working in memory for this session.
  }
}

const emit = () => listeners.forEach((l) => l());

export const getState = () => state;

export const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function setState(next) {
  state = next;
  persist();
  emit();
}

export function resetAll() {
  state = { ...initialState };
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* nothing to clear */
  }
  emit();
}

export const useStore = () => useSyncExternalStore(subscribe, getState);
