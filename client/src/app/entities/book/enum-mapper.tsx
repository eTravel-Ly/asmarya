import React from 'react';
import { Badge } from 'reactstrap';

const genreTranslations = {
  BIOGRAPHY: 'سير ذاتية',
  CHILDREN: 'أطفال',
  FANTASY: 'خيال',
  FICTION: 'خيال',
  HISTORY: 'تاريخ',
  MYSTERY: 'غموض',
  NON_FICTION: 'غير خيالي',
  POETRY: 'شعر',
  RELIGIOUS: 'ديني',
  ROMANCE: 'رومانسي',
  SCIENCE_FICTION: 'خيال علمي',
  SELF_HELP: 'تطوير الذات',
  THRILLER: 'إثارة',
  YOUNG_ADULT: 'شباب',
};

const bookAvailabilityTranslations = {
  AVAILABLE_BOTH: 'متاح',
  AVAILABLE_LIBRARY_ONLY: 'متاح بالمكتبة',
  AVAILABLE_ONLINE_ONLY: 'متاح بالإنترنت',
  RESERVED: 'محجوز',
  UNAVAILABLE: 'غير متاح',
};

const bookAvailabilityColors = {
  AVAILABLE_BOTH: 'success',
  AVAILABLE_LIBRARY_ONLY: 'primary',
  AVAILABLE_ONLINE_ONLY: 'primary',
  RESERVED: 'warning',
  UNAVAILABLE: 'danger',
};

export const getGenreTranslation = genre => {
  return genreTranslations[genre];
};
const getBookAvailabilityDetails = status => {
  return {
    text: bookAvailabilityTranslations[status],
    color: bookAvailabilityColors[status],
  };
};

export const BookAvailabilityCell = ({ status }) => {
  const { text, color } = getBookAvailabilityDetails(status);

  return (
    <td>
      <Badge color={color} className="chip">
        {text}
      </Badge>
    </td>
  );
};
