"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

type Notification = {
  id: string;
  type: "testimonial" | "contact" | "booking";
  message: string;
  createdAt: Date;
  read: boolean;
};

type ContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAllAsRead: () => void;
};

const NotificationContext = createContext<ContextType | null>(null);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000"
    );

    socket.on("new_testimonial", (data) => {
      const newNotification: Notification = {
        id: crypto.randomUUID(),
        type: "testimonial",
        message: `New testimonial from ${data.name}`,
        createdAt: new Date(),
        read: false,
      };

      setNotifications((prev) =>
        [newNotification, ...prev] as Notification[]
      );
    });

    socket.on("new_contact", (data) => {
      const newNotification: Notification = {
        id: crypto.randomUUID(),
        type: "contact",
        message: `New contact from ${data.name}`,
        createdAt: new Date(),
        read: false,
      };

      setNotifications((prev) =>
        [newNotification, ...prev] as Notification[]
      );
    });

    socket.on("new_booking", (data) => {
      const newNotification: Notification = {
        id: crypto.randomUUID(),
        type: "booking",
        message: `New booking from ${data.fullName}`,
        createdAt: new Date(),
        read: false,
      };

      setNotifications((prev) =>
        [newNotification, ...prev] as Notification[]
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used inside Provider");
  }
  return context;
};
