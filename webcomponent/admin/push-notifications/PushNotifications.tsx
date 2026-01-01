import { Heading } from "@/webcomponent/reusable";
import { NotificationsHistory } from "./NotificationHistoryTable";
import { CreateNotificationTable } from "./CreateNotificationTable";

export const PushNotifications = () => {
  return (
    <div className="py-16 flex flex-col gap-6">
      <Heading
        title="Push Notifications"
        subtitle="Send notifications to your users"
      />
      <CreateNotificationTable />
      <div className=" flex flex-col gap-2.5">
        <span>Notification History (Last 1 month)</span>
        <NotificationsHistory />
      </div>
    </div>
  );
};
