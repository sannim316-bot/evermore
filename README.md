# Evermore

A small, local-first daily-habit app: check in, keep a streak, complete a daily
spark, save private moments, earn badges. Community lives on Telegram.

**No accounts. No backend. Everything is stored on the device.**

## Stack
React 19 · Vite · React Router · Capacitor (Android) · lucide-react

## Develop
```bash
npm install
npm run dev
```

## Android
```bash
npm run android:sync   # vite build + cap sync android
npm run android:open   # open in Android Studio
```
See [`PLAY_STORE_CHECKLIST.md`](./PLAY_STORE_CHECKLIST.md) before publishing.

## Structure
```
src/
  lib/         store (localStorage), progress rules, badges, daily sparks, links
  components/  AppShell (tabs), Welcome, TelegramCard, Toaster, LegalLayout
  pages/       Today, Moments, Journey, Community, About, PrivacyPolicy, ChildSafety
```
The Telegram link and contact email live in `src/lib/links.js`.
