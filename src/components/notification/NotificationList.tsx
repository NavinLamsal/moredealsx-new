"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "@/lib/redux/store";
import NotificationCard from "../cards/notificationCard";
import { fetchNextPage, markAllAsReadApi } from "@/lib/action/notification";
import { debounce } from "lodash";

const NotificationList: React.FC = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      debounce((entries) => {
        if (entries[0].isIntersecting && notification.hasNextPage && !notification.isLoading) {
          dispatch(fetchNextPage(notification.currentPage));
        }
      }, 300),
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [notification.hasNextPage, notification.currentPage, notification.isLoading, dispatch]);

  const handleReadAll = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(markAllAsReadApi());
  };

  if (notification.isLoading && notification.notifications.length === 0) {
    return <p className="text-gray-500 text-center py-4">Loading notifications...</p>;
  }

  if (notification.error) {
    return <p className="text-red-500 text-center">{notification.error}</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-50 rounded-lg shadow">
      <div className="flex justify-between items-center pb-2">
        {notification.unreadCount > 0 && (
          <>
            <span className="text-sm text-gray-700">Unread: {notification.unreadCount}</span>
            <button
              onClick={handleReadAll}
              className="text-sm text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          </>
        )}
      </div>

      <div className="space-y-4">
        {notification.notifications.map((notif : any, index: number) => (
          <NotificationCard
            key={notif.id}
            ref={index === notification.notifications.length - 1 ? bottomRef : null} // Ref inside the last card
            notification={{
              id: notif.id,
              title: notif.title,
              message: notif.message,
              time: notif.created,
              isUnread: !notif.is_read,
            }}
          />
        ))}
      </div>

      {notification.isLoading && <p className="text-center text-gray-500 py-2">Loading more...</p>}
    </div>
  );
};

export default NotificationList;
