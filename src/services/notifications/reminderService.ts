import {WorkoutReminder} from '../../types/fitness';

export interface NotificationAdapter {
  requestPermission?: () => Promise<boolean>;
  schedule: (request: {
    id: string;
    title: string;
    body: string;
    triggerDate: Date;
  }) => Promise<void>;
}

const nextReminderDate = (time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);
  if (next <= new Date()) {
    next.setDate(next.getDate() + 1);
  }
  return next;
};

export const scheduleWorkoutReminder = async (
  adapter: NotificationAdapter,
  reminder: WorkoutReminder,
) => {
  if (adapter.requestPermission) {
    const granted = await adapter.requestPermission();
    if (!granted) {
      return false;
    }
  }

  await adapter.schedule({
    id: reminder.id,
    title: reminder.title,
    body: `Time for ${reminder.title.toLowerCase()} — stay consistent today.`,
    triggerDate: nextReminderDate(reminder.time),
  });

  return true;
};