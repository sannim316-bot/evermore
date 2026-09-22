export const BADGES = [
  { id: "first-step", emoji: "👣", title: "First step", desc: "Check in for the first time.", test: (s) => s.stats.checkIns >= 1 },
  { id: "streak-3", emoji: "🔥", title: "On a roll", desc: "Reach a 3-day streak.", test: (s) => s.longestStreak >= 3 },
  { id: "streak-7", emoji: "🌟", title: "One full week", desc: "Reach a 7-day streak.", test: (s) => s.longestStreak >= 7 },
  { id: "streak-30", emoji: "🏔️", title: "Unstoppable", desc: "Reach a 30-day streak.", test: (s) => s.longestStreak >= 30 },
  { id: "spark-1", emoji: "✨", title: "Spark starter", desc: "Complete your first daily spark.", test: (s) => s.stats.sparks >= 1 },
  { id: "spark-10", emoji: "💫", title: "Spark collector", desc: "Complete 10 daily sparks.", test: (s) => s.stats.sparks >= 10 },
  { id: "moment-1", emoji: "📝", title: "First moment", desc: "Save your first private moment.", test: (s) => s.stats.moments >= 1 },
  { id: "moment-10", emoji: "📚", title: "Storyteller", desc: "Save 10 moments.", test: (s) => s.stats.moments >= 10 },
  { id: "points-100", emoji: "💯", title: "Century", desc: "Earn 100 points.", test: (s) => s.points >= 100 },
  { id: "points-500", emoji: "🚀", title: "Rising star", desc: "Earn 500 points.", test: (s) => s.points >= 500 },
  { id: "points-2000", emoji: "👑", title: "Evermore legend", desc: "Earn 2,000 points.", test: (s) => s.points >= 2000 },
  { id: "community", emoji: "💬", title: "Part of the crowd", desc: "Visit the Evermore community on Telegram.", test: (s) => s.visitedCommunity },
];

export const unlocked = (s) => BADGES.filter((b) => b.test(s));

export const newlyUnlocked = (prev, next) => {
  const before = new Set(unlocked(prev).map((b) => b.id));
  return unlocked(next).filter((b) => !before.has(b.id));
};
