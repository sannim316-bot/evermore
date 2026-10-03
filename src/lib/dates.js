const pad = (n) => String(n).padStart(2, "0");

/** Local calendar day as YYYY-MM-DD (device timezone). */
export const dateKey = (d = new Date()) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const parse = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (key, delta) => {
  const d = parse(key);
  d.setDate(d.getDate() + delta);
  return dateKey(d);
};

/** Whole days since epoch, used to rotate the daily spark. */
export const dayNumber = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
};

export const weekdayLetter = (key) =>
  parse(key).toLocaleDateString(undefined, { weekday: "narrow" });

export const greeting = (d = new Date()) => {
  const h = d.getHours();
  if (h < 5) return "Still up";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

export const formatMoment = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
