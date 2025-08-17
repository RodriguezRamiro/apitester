// src/components/Notification.jsx


import React, { useEffect } from "react";
import "./Notification.css";

export default function Notification({ notification, clearNotification }) {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => clearNotification(), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
}
