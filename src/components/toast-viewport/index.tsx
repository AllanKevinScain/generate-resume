import {
  dismissNotification,
  getNotifications,
  subscribeToNotifications,
  type Notification,
} from '@/services/notifications';
import { useSyncExternalStore } from 'react';
import { Toast, ToastRegion } from 'safira-ui/react';

function getNotificationTitle(notification: Notification) {
  if (notification.tone === 'success') return 'Sucesso';
  if (notification.tone === 'danger') return 'Erro';
  if (notification.tone === 'warning') return 'Atenção';
  return 'Informação';
}

export function ToastViewport() {
  const notifications = useSyncExternalStore(
    subscribeToNotifications,
    getNotifications,
    getNotifications,
  );

  return (
    <ToastRegion position="top-end" aria-label="Notificações">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          tone={notification.tone}
          title={getNotificationTitle(notification)}
          onDismiss={() => dismissNotification(notification.id)}
        >
          {notification.message}
        </Toast>
      ))}
    </ToastRegion>
  );
}
