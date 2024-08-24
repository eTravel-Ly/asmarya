import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/book">
        الكتب
      </MenuItem>
      <MenuItem icon="asterisk" to="/book-borrow-request">
        طلبات الاستعارة
      </MenuItem>
      <MenuItem icon="asterisk" to="/category">
        التصنيفات
      </MenuItem>
      <MenuItem icon="asterisk" to="/course">
        الدورات التدريبية
      </MenuItem>
      <MenuItem icon="asterisk" to="/learner">
        المتدربين
      </MenuItem>
      <MenuItem icon="asterisk" to="/order">
        الطلبات
      </MenuItem>
      <MenuItem icon="asterisk" to="/payment-method">
        طرق الدفع
      </MenuItem>
      <MenuItem icon="asterisk" to="/slider">
        الشريط الدعائي
      </MenuItem>
      <MenuItem icon="asterisk" to="/event">
        الانشطة
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
