import { showToast } from "./toast";

/** Turns the result of an action into friendly toasts. */
export function announce(result) {
  if (!result) return;
  if (result.gained > 0) {
    const bonus = result.bonus ? ` (incl. +${result.bonus} weekly bonus 🎉)` : "";
    showToast(`+${result.gained} points${bonus}`);
  }
  result.badges?.forEach((b, i) =>
    setTimeout(() => showToast(`${b.emoji} Badge unlocked: ${b.title}`, 3200), 500 + i * 700)
  );
}
