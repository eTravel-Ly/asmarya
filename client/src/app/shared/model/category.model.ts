export interface ICategory {
  id?: number;
  nameAr?: string | null;
  nameEn?: string | null;
  menuOrder?: number | null;
  imageFileUrl?: string | null;
  imageFileContentType?: string | null;
  imageFile?: string | null;
  notes?: string | null;
  isActive?: boolean | null;
}

export const defaultValue: Readonly<ICategory> = {
  isActive: false,
};
