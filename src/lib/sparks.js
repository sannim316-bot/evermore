import { dayNumber } from "./dates";

/** One small, doable thing per day. Rotates by calendar day. */
export const SPARKS = [
  { cat: "Reflect", text: "Write down three things that went right this week." },
  { cat: "Move", text: "Take a 10-minute walk without your phone in your hand." },
  { cat: "Connect", text: "Message someone you haven't spoken to in a while." },
  { cat: "Create", text: "Doodle, hum, or write something for five minutes. No judging." },
  { cat: "Learn", text: "Look up one thing you've always wondered about and read about it." },
  { cat: "Reflect", text: "What is one thing you're avoiding? Name it, then do the first tiny step." },
  { cat: "Connect", text: "Tell someone specifically what you appreciate about them." },
  { cat: "Move", text: "Stretch for five minutes: neck, shoulders, back, legs." },
  { cat: "Create", text: "Take a photo of something ordinary that looks quietly beautiful." },
  { cat: "Learn", text: "Learn three words in a language you don't speak." },
  { cat: "Reflect", text: "Describe your ideal ordinary day in a few sentences." },
  { cat: "Connect", text: "Ask a friend or family member what they're looking forward to." },
  { cat: "Move", text: "Drink a full glass of water, then stand up and reset your posture." },
  { cat: "Create", text: "Write a two-line poem about today's weather." },
  { cat: "Learn", text: "Watch or read something about a skill you'd like to pick up." },
  { cat: "Reflect", text: "What made you smile recently? Save it as a moment." },
  { cat: "Connect", text: "Send a thank-you message to someone who helped you." },
  { cat: "Move", text: "Do 20 slow breaths. In through the nose, long out through the mouth." },
  { cat: "Create", text: "Rearrange one small corner of your space so it feels better." },
  { cat: "Learn", text: "Teach someone something small you know well." },
  { cat: "Reflect", text: "Write a note to yourself one year from now." },
  { cat: "Connect", text: "Compliment someone genuinely today." },
  { cat: "Move", text: "Take the stairs, or walk to something you'd normally ride to." },
  { cat: "Create", text: "Plan a simple meal you'd be proud to cook this week." },
  { cat: "Learn", text: "Read for 15 minutes. Anything you enjoy counts." },
  { cat: "Reflect", text: "What would you tell a friend in your exact situation?" },
  { cat: "Connect", text: "Join the Evermore Telegram channel and say hi." },
  { cat: "Move", text: "Dance to one full song. Seriously, the whole song." },
  { cat: "Create", text: "Make a playlist for the mood you want tomorrow to have." },
  { cat: "Learn", text: "Pick a goal and write the very next physical action for it." },
];

export const sparkForDay = (key) => SPARKS[dayNumber(key) % SPARKS.length];
