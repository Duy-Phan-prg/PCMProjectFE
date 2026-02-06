import { apiUtils } from "../api/axios";
import { NOTIFICATION_URL } from "../constants/apiEndPoints";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  Notification,
  NotificationListResponse,
  UnreadCountResponse,
  MarkAllReadResponse,
  NotificationQueryParams,
} from "../types/Notification";

/* ================= SUBSCRIPTION ================= */

export interface SubscriptionRequest {
  subscriptionId: string;
  deviceId?: string;
}

export interface SubscriptionResponse {
  registered: boolean;
}

/* ================= SERVICE ================= */

const notificationService = {

  /* ===== Register subscription ===== */
  async registerSubscription(
    data: SubscriptionRequest
  ): Promise<SubscriptionResponse> {
    const res = await apiUtils.post<ApiResponse<SubscriptionResponse>>(
      `${NOTIFICATION_URL}/subscriptions`,
      data
    );
    return res.data.payload!;
  },

  /* ===== Get notifications list ===== */
  async getNotifications(
    params?: NotificationQueryParams
  ): Promise<NotificationListResponse> {
    const res = await apiUtils.get<ApiResponse<NotificationListResponse>>(
      NOTIFICATION_URL,
      params
    );
    return res.data.payload!;
  },

  /* ===== Get unread count ===== */
  async getUnreadCount(): Promise<number> {
    const res = await apiUtils.get<ApiResponse<UnreadCountResponse>>(
      `${NOTIFICATION_URL}/unread-count`
    );
    return res.data.payload?.unreadCount ?? 0;
  },

  /* ===== Mark one as read ===== */
  async markAsRead(id: number): Promise<Notification> {
    const res = await apiUtils.patch<ApiResponse<Notification>>(
      `${NOTIFICATION_URL}/${id}/read`
    );
    return res.data.payload!;
  },

  /* ===== Mark all as read ===== */
  async markAllAsRead(): Promise<MarkAllReadResponse> {
    const res = await apiUtils.patch<ApiResponse<MarkAllReadResponse>>(
      `${NOTIFICATION_URL}/read-all`
    );
    return res.data.payload!;
  },
};

export default notificationService;
