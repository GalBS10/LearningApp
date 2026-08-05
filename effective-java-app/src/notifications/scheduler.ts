import * as Notifications from 'expo-notifications';

export async function scheduleDailyReminder() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Learning goal',
      body: 'Time for your Effective Java lesson!',
    },
    trigger: { hour: 18, minute: 0, repeats: true },
  });
}

export function hasMetGoalToday(): boolean {
  return false;
}
