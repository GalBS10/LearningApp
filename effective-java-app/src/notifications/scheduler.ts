// Wraps @notifee/react-native (not expo-notifications — this is a bare RN
// project). Suppresses the daily reminder once the user has already hit
// their study goal for the day, using the real tracking in appStorage.ts —
// do not duplicate that logic here.

import notifee, { TriggerType, AndroidImportance, EventType } from '@notifee/react-native';
import { hasMetGoalToday } from '../storage/appStorage';

const CHANNEL_ID = 'daily-reminder';
const NOTIFICATION_ID = 'daily-study-reminder';

export async function setupNotificationChannel(): Promise<void> {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Daily study reminder',
    importance: AndroidImportance.DEFAULT,
  });
}

export async function requestNotificationPermission(): Promise<boolean> {
  const settings = await notifee.requestPermission();
  return settings.authorizationStatus >= 1;
}

// Call this once (e.g. after onboarding, or on app start) to schedule the
// recurring daily check. Call it again any time the goal time changes.
export async function scheduleDailyReminder(hour = 18, minute = 0): Promise<void> {
  await notifee.createTriggerNotification(
    {
      id: NOTIFICATION_ID,
      title: 'Learning goal',
      body: "Time for today's Effective Java lesson!",
      android: { channelId: CHANNEL_ID },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: nextTriggerTime(hour, minute),
      repeatFrequency: 1, // daily
    },
  );
}

// Suppress or cancel the notification if the goal has already been met today.
export async function suppressIfGoalMet(notificationId: string = NOTIFICATION_ID): Promise<void> {
  if (hasMetGoalToday()) {
    await notifee.cancelNotification(notificationId);
  }
}

// Registers background and foreground handlers to suppress notification if goal was completed today
export function registerNotificationEventHandlers(): void {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.DELIVERED && detail.notification?.id) {
      await suppressIfGoalMet(detail.notification.id);
    }
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.DELIVERED && detail.notification?.id) {
      suppressIfGoalMet(detail.notification.id);
    }
  });
}

function nextTriggerTime(hour: number, minute: number): number {
  const now = new Date();
  const trigger = new Date();
  trigger.setHours(hour, minute, 0, 0);
  if (trigger.getTime() <= now.getTime()) {
    trigger.setDate(trigger.getDate() + 1);
  }
  return trigger.getTime();
}
