import { addDays, dateKey } from "./dates";
import { getState, setState } from "./store";
import { newlyUnlocked } from "./badges";

export const POINTS = { checkIn: 10, spark: 20, moment: 5, weekBonus: 25 };

export const LEVEL_TITLES = [
  "Newcomer", "Explorer", "Regular", "Steady", "Rising",
  "Devoted", "Trailblazer", "Luminary", "Legend",
];

const floorFor = (level) => 50 * (level - 1) * (level - 1);

export function getLevel(points) {
  const level = Math.floor(Math.sqrt(points / 50)) + 1;
  const current = floorFor(level);
  const next = floorFor(level + 1);
  return {
    level,
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
    progress: (points - current) / (next - current),
    toNext: next - points,
  };
}

/** Streak shown to the user. A missed day resets it to 0 until they're active again. */
export function liveStreak(s, today = dateKey()) {
  if (s.lastActive === today || s.lastActive === addDays(today, -1)) return s.streak;
  return 0;
}

export function dailyState(s, today = dateKey()) {
  return s.daily.date === today
    ? s.daily
    : { date: today, checkIn: false, spark: false, moment: false };
}

/** Marks today active and advances the streak once per day. */
function touchStreak(s, today) {
  if (s.lastActive === today) return { s, bonus: 0 };
  const streak = s.lastActive === addDays(today, -1) ? s.streak + 1 : 1;
  const bonus = streak % 7 === 0 ? POINTS.weekBonus : 0;
  return {
    s: {
      ...s,
      streak,
      longestStreak: Math.max(s.longestStreak, streak),
      lastActive: today,
      activeDays: [...s.activeDays, today].slice(-400),
    },
    bonus,
  };
}

function award(kind, points, statKey, extra = (s) => s) {
  const today = dateKey();
  const prev = getState();
  const daily = dailyState(prev, today);
  if (daily[kind]) return null;

  const { s: touched, bonus } = touchStreak(prev, today);
  const gained = points + bonus;
  const next = extra({
    ...touched,
    points: touched.points + gained,
    daily: { ...daily, [kind]: true },
    stats: { ...touched.stats, [statKey]: touched.stats[statKey] + 1 },
  });
  setState(next);
  return {
    gained,
    bonus,
    streak: next.streak,
    badges: newlyUnlocked(prev, next),
  };
}

export const checkIn = () => award("checkIn", POINTS.checkIn, "checkIns");
export const completeSpark = () => award("spark", POINTS.spark, "sparks");

export function addMoment(text, mood) {
  const clean = text.trim();
  if (!clean) return null;
  const moment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text: clean.slice(0, 280),
    mood,
    createdAt: new Date().toISOString(),
  };
  const today = dateKey();
  const prev = getState();
  const firstToday = !dailyState(prev, today).moment;

  if (firstToday) {
    return award("moment", POINTS.moment, "moments", (s) => ({
      ...s,
      moments: [moment, ...s.moments],
    }));
  }
  // Extra moments the same day are saved but don't earn points.
  const next = {
    ...prev,
    moments: [moment, ...prev.moments],
    stats: { ...prev.stats, moments: prev.stats.moments + 1 },
  };
  setState(next);
  return { gained: 0, bonus: 0, streak: next.streak, badges: newlyUnlocked(prev, next) };
}

export function deleteMoment(id) {
  const prev = getState();
  setState({ ...prev, moments: prev.moments.filter((m) => m.id !== id) });
}

export function setName(name) {
  setState({ ...getState(), name: name.trim().slice(0, 30) });
}

export function finishOnboarding(name = "") {
  setState({ ...getState(), onboarded: true, name: name.trim().slice(0, 30) });
}

export function markCommunityVisited() {
  const prev = getState();
  if (prev.visitedCommunity) return null;
  const next = { ...prev, visitedCommunity: true };
  setState(next);
  return { gained: 0, badges: newlyUnlocked(prev, next) };
}
