export interface ISlider {
  id?: number;
  detailsAr?: string | null;
  detailsEn?: string | null;
  menuOrder?: number | null;
  imageFileUrl?: string | null;
  imageFileContentType?: string | null;
  imageFile?: string | null;
  link?: string | null;
  notes?: string | null;
}

export const defaultValue: Readonly<ISlider> = {};
