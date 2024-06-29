export interface IAppSetting {
  id?: number;
  name?: string | null;
  key?: string | null;
  type?: string | null;
  value?: string | null;
}

export const defaultValue: Readonly<IAppSetting> = {};
