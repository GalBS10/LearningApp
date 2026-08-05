// Local-first storage layer. No backend — everything lives on-device.
// Uses react-native-mmkv for fast key-value storage.
// npm install react-native-mmkv

import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'effective-java-app' });

const KEYS = {
  PURCHASE_STATUS: 'purchase_status', // 'free' | 'unlocked'
  DAILY_GOAL_MINUTES: 'daily_goal_minutes',
  CURRENT_STREAK: 'current_streak',
  LONGEST_STREAK: 'longest_streak',
  LAST_ACTIVE_DATE: 'last_active_date', // YYYY-MM-DD
  PROGRESS_PREFIX: 'progress:', // + item_number -> JSON
  SESSION_PREFIX: 'session:', // + YYYY-MM-DD -> JSON
} as const;

// ---- Paywall ----

export const FREE_ITEM_LIMIT = 7; // items 1-7 always free, matches the trial list

export function canAccessItem(itemNumber: number): boolean {
  if (itemNumber <= FREE_ITEM_LIMIT) return true;
  return getPurchaseStatus() === 'unlocked';
}

export function getPurchaseStatus(): 'free' | 'unlocked' {
  return (storage.getString(KEYS.PURCHASE_STATUS) as 'free' | 'unlocked') ?? 'free';
}

// Call this only after react-native-iap confirms a valid receipt.
export function markUnlocked(): void {
  storage.set(KEYS.PURCHASE_STATUS, 'unlocked');
}

// ---- Daily goal ----

export function getDailyGoalMinutes(): number {
  return storage.getNumber(KEYS.DAILY_GOAL_MINUTES) ?? 10; // default 10 min/day
}

export function setDailyGoalMinutes(minutes: number): void {
  storage.set(KEYS.DAILY_GOAL_MINUTES, minutes);
}

// ---- Study sessions (drives streaks + "goal met today" notification gating) ----

interface StudySession {
  date: string; // YYYY-MM-DD
  minutesSpent: number;
  goalMet: boolean;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getTodaySession(): StudySession {
  const raw = storage.getString(KEYS.SESSION_PREFIX + todayKey());
  if (raw) return JSON.parse(raw);
  return { date: todayKey(), minutesSpent: 0, goalMet: false };
}

// Call this as the user studies (e.g. every 30s while a lesson screen is active).
export function addStudyMinutes(minutes: number): StudySession {
  const session = getTodaySession();
  session.minutesSpent += minutes;
  const goal = getDailyGoalMinutes();
  const wasGoalMet = session.goalMet;
  session.goalMet = session.minutesSpent >= goal;

  storage.set(KEYS.SESSION_PREFIX + session.date, JSON.stringify(session));

  if (!wasGoalMet && session.goalMet) {
    updateStreakOnGoalMet();
  }

  return session;
}

// Notifications should check this before firing — suppress once goal is met today.
export function hasMetGoalToday(): boolean {
  return getTodaySession().goalMet;
}

function updateStreakOnGoalMet(): void {
  const lastActive = storage.getString(KEYS.LAST_ACTIVE_DATE);
  const today = todayKey();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  let streak = storage.getNumber(KEYS.CURRENT_STREAK) ?? 0;

  if (lastActive === yesterday) {
    streak += 1; // continued streak
  } else if (lastActive !== today) {
    streak = 1; // streak broken or first day, restart
  }
  // if lastActive === today, goal was already met today — no-op

  storage.set(KEYS.CURRENT_STREAK, streak);
  storage.set(KEYS.LAST_ACTIVE_DATE, today);

  const longest = storage.getNumber(KEYS.LONGEST_STREAK) ?? 0;
  if (streak > longest) {
    storage.set(KEYS.LONGEST_STREAK, streak);
  }
}

export function getCurrentStreak(): number {
  return storage.getNumber(KEYS.CURRENT_STREAK) ?? 0;
}

export function getLongestStreak(): number {
  return storage.getNumber(KEYS.LONGEST_STREAK) ?? 0;
}

// ---- Item progress ----

interface ItemProgress {
  itemNumber: number;
  completed: boolean;
  quizScore: number | null; // e.g. 4/5 -> 0.8
  completedAt: string | null; // ISO timestamp
}

export function getItemProgress(itemNumber: number): ItemProgress {
  const raw = storage.getString(KEYS.PROGRESS_PREFIX + itemNumber);
  if (raw) return JSON.parse(raw);
  return { itemNumber, completed: false, quizScore: null, completedAt: null };
}

export function markItemComplete(itemNumber: number, quizScore: number): void {
  const progress: ItemProgress = {
    itemNumber,
    completed: true,
    quizScore,
    completedAt: new Date().toISOString(),
  };
  storage.set(KEYS.PROGRESS_PREFIX + itemNumber, JSON.stringify(progress));
}

export function getCompletedCount(totalItems: number): number {
  let count = 0;
  for (let i = 1; i <= totalItems; i++) {
    if (getItemProgress(i).completed) count++;
  }
  return count;
}

// ---- Highest unlocked item (drives "next lesson" + sequential lock UI) ----

export function getHighestUnlockedItem(totalItems: number): number {
  for (let i = 1; i <= totalItems; i++) {
    if (!getItemProgress(i).completed) return i;
  }
  return totalItems; // all done
}
