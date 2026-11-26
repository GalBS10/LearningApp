# Project TODO & Roadmap

## 📱 Project Overview
Effective Java interview preparation mobile app built with React Native (v0.76.5) and TypeScript, targeting Android & iOS with a Duolingo-style progression feed, flashcards, quizzes, tap-to-reveal interview Q&A, and offline-first MMKV persistence.

---

## ✅ Completed Milestones

- [x] **Project Scaffolding & Native Folders**
  - Generated official RN 0.76.5 native scaffolds (`android/` and `ios/`).
  - Added required Android permissions (`POST_NOTIFICATIONS`, `SCHEDULE_EXACT_ALARM`, `RECEIVE_BOOT_COMPLETED`, `VIBRATE`).
  - Added `missingDimensionStrategy "store", "play"` to `android/app/build.gradle`.
  - Added `@react-native-community/cli` devDependencies in `package.json`.
  - Pushed to remote branch `chore/add-native-folders`.

- [x] **Core Screens & Navigation**
  - Onboarding screen (`OnboardingScreen.tsx`) with daily goal & notification opt-in.
  - Duolingo-style feed (`LessonFeedScreen.tsx`) with chapter progression and live state refresh (`useFocusEffect`).
  - Lesson study screen (`LessonDetailScreen.tsx`) with code blocks, flashcards, quizzes, and interview questions.
  - Progress dashboard (`ProgressScreen.tsx`) with streak, study stats, and goal visualization.
  - Paywall & unlock screen (`PaywallScreen.tsx`) with restore purchases & error handling.
  - Stack navigation wrapped in `<SafeAreaProvider>` in `App.tsx`.

- [x] **Functional Bug Fixes & Improvements**
  - Free trial item access aligned to Items `[1, 2, 3, 10, 11, 17, 80]` in `appStorage.ts`.
  - Continuous active study timer wired in `LessonDetailScreen.tsx` (increments every 30s).
  - Tap-to-reveal `InterviewQuestionCard.tsx` component implemented and rendered.
  - Progress screen made accessible by tapping header stats in `LessonFeedScreen.tsx`.
  - Daily notification scheduler with goal-met suppression handlers registered in `index.js`.
  - Flashcard flip animation and accessible UI polished in `Flashcard.tsx`.
  - TypeScript compilation (`tsc --noEmit`) and Metro production bundle verified clean.
  - Pushed to remote branch `fix/functional-bugs`.

---

## 🚀 High-Priority Next Tasks

### 1. Free Trial Content Authoring (6 Items)
Currently, only Item 1 (`item-001.json`) exists. Complete the free trial package so users can experience high-value lessons across multiple chapters:
- [x] **Item 2**: Consider a builder when faced with many constructor parameters (`item-002.json`)
- [x] **Item 3**: Enforce the singleton property with a private constructor or an enum type (`item-003.json`)
- [x] **Item 10**: Obey the general contract when overriding `equals` (`item-010.json`)
- [x] **Item 11**: Always override `hashCode` when you override `equals` (`item-011.json`)
- [ ] **Item 17**: Minimize mutability (`item-017.json`)
- [ ] **Item 80**: Prefer executors, tasks, and streams to threads (`item-080.json`)
- [ ] Register all new items in `src/content/index.ts`.

### 2. Physical Device & Emulator Testing (When Hard Drive Connected)
- [ ] Connect Android Studio / Android SDK from external hard drive.
- [ ] Connect physical Android phone with USB Debugging enabled.
- [ ] Verify `adb devices` lists the device.
- [ ] Run `npx react-native run-android` and test:
  - Daily onboarding flow and persistence.
  - Lesson reading and study timer accumulation.
  - Flashcard flip and self-evaluation voting.
  - Quiz answer validation and feedback.
  - Interview question card reveal and collapse.
  - Free trial unlock vs locked lesson paywall modal.
  - Progress screen streak and weekly chart display.
- [ ] Merge `fix/functional-bugs` into `master` after device test verification.

---

## 🎨 Branding & Visual Assets

- [ ] Design app launcher icon (adaptive icon for Android + iOS asset catalog).
- [ ] Replace placeholder default React Native icons in `android/app/src/main/res/mipmap-*`.
- [ ] Add branded splash screen / launch screen.
- [ ] Ensure legal/IP compliance: do not use copyrighted book covers, author photos, or trademarked "Effective Java" in store listing title (e.g. use "Effective Coding in Java" or "Java Mastery").

---

## 📦 Full Catalog Content Expansion (Items 4–90)

Generate remaining 83 lessons following the standard lesson schema (`LessonContent`):
- [ ] **Chapter 2 (Items 4–9)**: Creating and Destroying Objects
- [ ] **Chapter 3 (Items 12–14)**: Methods Common to All Objects
- [ ] **Chapter 4 (Items 15–25)**: Classes and Interfaces
- [ ] **Chapter 5 (Items 26–33)**: Generics
- [ ] **Chapter 6 (Items 34–41)**: Enums and Annotations
- [ ] **Chapter 7 (Items 42–48)**: Lambdas and Streams
- [ ] **Chapter 8 (Items 49–56)**: Methods
- [ ] **Chapter 9 (Items 57–67)**: General Programming
- [ ] **Chapter 10 (Items 68–77)**: Exceptions
- [ ] **Chapter 11 (Items 78–84)**: Concurrency
- [ ] **Chapter 12 (Items 85–90)**: Serialization

---

## 💳 Store Monetization & Release Prep

- [ ] Create In-App Product SKU (`unlock_all_lessons`) in Google Play Console & Apple App Store Connect.
- [ ] Test purchase flow using Google Play License Testing and Apple Sandbox tester accounts.
- [ ] Generate Android production release keystore (`keytool -genkey -v -keystore release.keystore ...`).
- [ ] Configure signing configs in `android/app/build.gradle`.
- [ ] Build release AAB (`./gradlew bundleRelease`) and verify bundle integrity.
- [ ] Prepare Google Play Store listing: descriptions, privacy policy URL, screenshots, and feature graphic.
