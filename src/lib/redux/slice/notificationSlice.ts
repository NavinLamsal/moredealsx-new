import { showToast } from "@/lib/utilities/toastService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
}

interface NotificationsState {
  isLoading: boolean;
  notifications: Notification[];
  unreadCount: number;
  error: string | null;
  hasNextPage: boolean;
  currentPage: number;
  checkForUpdate: boolean;
}

const initialState: NotificationsState = {
  isLoading: false,
  notifications: [],
  unreadCount: 0,
  error: null,
  hasNextPage: true,
  currentPage: 0,
  checkForUpdate: false,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) state.error = null;
    },
    fetchNotificationsSuccess: (
      state,
      action: PayloadAction<{ notifications: Notification[]; hasNextPage: boolean }>
    ) => {
      const uniqueNewNotifications = action.payload.notifications.filter(
        (newNotification) =>
          !state.notifications.some(
            (existingNotification) => existingNotification.id === newNotification.id
          )
      );

      state.notifications = [...uniqueNewNotifications, ...state.notifications];
      state.unreadCount = action.payload.notifications.filter((n) => !n.is_read).length;
      state.hasNextPage = action.payload.hasNextPage;
      state.currentPage = 1;
      state.checkForUpdate = true;
    },
    
    fetchNextPageSuccess: (
      state,
      action: PayloadAction<{ notifications: Notification[]; hasNextPage: boolean }>
    ) => {
      const uniqueNotifications = action.payload.notifications.filter(
        (newNotification) =>
          !state.notifications.some(
            (existingNotification) => existingNotification.id === newNotification.id
          )
      );
      state.notifications = [...state.notifications, ...uniqueNotifications];
      state.unreadCount = state.notifications.filter((n) => !n.is_read).length;
      state.hasNextPage = action.payload.hasNextPage;
      state.currentPage += 1;
    },

    addNewNotifications: (state, action: PayloadAction<{ notifications: Notification[] }>) => {
      const newNotifications = action.payload.notifications.filter(
        (newNotification) =>
          !state.notifications.some(
            (existingNotification) => existingNotification.id === newNotification.id
          )
      );


      state.notifications = [...newNotifications, ...state.notifications];
      state.unreadCount += newNotifications.filter((n) => !n.is_read).length;
      newNotifications.forEach((notif) => {
            showToast(`${notif.title}: ${notif.message}`, "success") ;
      });
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        is_read: true,
      }));
      state.unreadCount = 0;
    },
  },
});

export const {
  setLoading,
  fetchNotificationsSuccess,
  fetchNextPageSuccess,
  addNewNotifications,
  setError,
  markAllAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
