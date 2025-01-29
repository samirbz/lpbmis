import React from "react";
import { fetchRoleNotifications } from "../apis/fetchRoleNotifications";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "../store/states";

function NotificationBoard() {
  const jwtToken = useRecoilValue(jwtTokenState);

  const { data: notifications } = useQuery({
    queryKey: ["notifications", jwtToken],
    queryFn: () => fetchRoleNotifications({ jwtToken }),
  });

  return (
    <section className="_notification-board w-full py-2">
      <header className="px-3">
        <span className="m3-title-large">Notifications</span>
      </header>
      <main className="px-3">
        {notifications && notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    {notification.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-800">{notification.message}</p>
                {notification.expiresAt && (
                  <p className="mt-1 text-xs text-gray-500">
                    Expires:{" "}
                    {new Date(notification.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No notifications available
          </div>
        )}
      </main>
    </section>
  );
}

export default NotificationBoard;
