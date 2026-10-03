# Play Store checklist for the no-login Evermore

The app changed a lot (no accounts, no backend, no user-generated content), so
several Play Console answers need to change with it. Answer everything based on
what the app actually does; the notes below are a guide, not legal advice.

## Build
- [ ] Deploy this branch to Vercel **first**. Play links to `/privacy-policy` and
      `/child-safety`, and those URLs must show the updated text.
- [ ] `npm install && npm run android:sync`, then `npm run android:open`.
- [ ] In `android/app/build.gradle`, raise `versionCode` above every build you've
      already uploaded (a fresh Capacitor template starts at 1) and set
      `versionName "1.0.0"`.
- [ ] Target SDK: Capacitor 8's template targets API 36. Confirm in
      `android/variables.gradle` that this still meets Play's current requirement.
- [ ] Build a signed **AAB** (Play App Signing) and upload it.
- [ ] Test on a real device or emulator: first launch, check-in, moments, the
      Telegram button, and the hardware back button.

## Play Console: things that must be updated
- [ ] **Data safety**: no data collected or shared. This is only true while the
      app has no analytics, ads or crash-reporting SDKs. Re-check if you add one.
- [ ] **App access**: everything is available without login. Remove any test
      credentials you supplied earlier.
- [ ] **Account creation / deletion**: the app no longer lets people create an
      account, so answer "no". Clear any old account-deletion URL.
- [ ] **Content rating**: redo the questionnaire. There is no in-app
      user-to-user interaction any more; the Telegram button is a link out.
- [ ] **Target audience**: choose age groups deliberately. Avoid under-13 groups
      (would pull in the Families policy, and the app links to Telegram).
- [ ] **Privacy policy URL**: unchanged (`/privacy-policy`), content updated.
- [ ] **Child safety standards URL**: unchanged (`/child-safety`), content updated.
- [ ] **Store listing**: rewrite the description and retake screenshots. Don't
      mention login, posts, comments or the leaderboard; they no longer exist.

## Outside the app
- [ ] Old Supabase project still holds test accounts/posts. The privacy policy
      says you'll delete them on request; delete the data or the project.
- [ ] Telegram: pin a rules message and have at least one moderator. If the
      link is to a **group** (people can chat) rather than a broadcast channel,
      you're moderating live conversation, and the child-safety page promises
      you'll act on reports.
- [ ] Have a lawyer or Play policy specialist read the two legal pages if you
      can. They were drafted to match the app's actual behaviour, not reviewed
      by counsel.
