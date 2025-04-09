
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotifications = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      addNotification: (notification) => {
        const newNotification: Notification = {
          id: Date.now().toString(),
          ...notification,
          read: false,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
        
        // Auto-mark as read after 5 seconds if the app is in focus
        if (document.hasFocus()) {
          setTimeout(() => {
            get().markAsRead(newNotification.id);
          }, 5000);
        }
      },
      markAsRead: (id) => {
        set((state) => {
          const updatedNotifications = state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          );
          
          const unreadCount = updatedNotifications.filter((n) => !n.read).length;
          
          return {
            notifications: updatedNotifications,
            unreadCount,
          };
        });
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        }));
      },
      removeNotification: (id) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          const unreadChange = notification && !notification.read ? 1 : 0;
          
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: state.unreadCount - unreadChange,
          };
        });
      },
      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },
    }),
    {
      name: 'notifications-storage',
    }
  )
);

// Helper function to generate system notifications
export function createSystemNotification(
  module: 'inventory' | 'orders' | 'customers' | 'products' | 'employees' | 'system',
  action: 'created' | 'updated' | 'deleted' | 'alert' | 'info',
  entityName: string,
  details?: string
) {
  let title = '';
  let message = '';
  let type: NotificationType = 'info';
  
  switch (action) {
    case 'created':
      title = `New ${module} Created`;
      message = `${entityName} has been successfully created.`;
      type = 'success';
      break;
    case 'updated':
      title = `${module} Updated`;
      message = `${entityName} has been successfully updated.`;
      type = 'info';
      break;
    case 'deleted':
      title = `${module} Deleted`;
      message = `${entityName} has been successfully deleted.`;
      type = 'warning';
      break;
    case 'alert':
      title = `${module} Alert`;
      message = details || `There is an alert regarding ${entityName}.`;
      type = 'error';
      break;
    case 'info':
      title = `${module} Information`;
      message = details || `Information about ${entityName}.`;
      type = 'info';
      break;
  }
  
  return { title, message, type };
}
