import type { FeedbackTone } from 'safira-ui/react';

export type Notification = {
  id: number;
  message: string;
  tone: FeedbackTone;
};

let nextNotificationId = 0;
let notifications: Notification[] = [];
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function notify(message: string, tone: FeedbackTone) {
  nextNotificationId += 1;
  notifications = [...notifications, { id: nextNotificationId, message, tone }];
  emitChange();
}

export function subscribeToNotifications(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getNotifications() {
  return notifications;
}

export function dismissNotification(id: number) {
  notifications = notifications.filter((notification) => notification.id !== id);
  emitChange();
}

export const toast = {
  success(message: string) {
    notify(message, 'success');
  },
  error(message: string) {
    notify(message, 'danger');
  },
  warning(message: string) {
    notify(message, 'warning');
  },
  info(message: string) {
    notify(message, 'info');
  },
};
