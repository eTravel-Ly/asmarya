export interface INotification {
  id?: number;
  title?: string | null;
  details?: string | null;
  isRead?: boolean | null;
  userId?: number | null;
}

export const defaultValue: Readonly<INotification> = {
  isRead: false,
};
