import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/activation">
        Activation
      </MenuItem>
      <MenuItem icon="asterisk" to="/app-setting">
        App Setting
      </MenuItem>
      <MenuItem icon="asterisk" to="/book">
        Book
      </MenuItem>
      <MenuItem icon="asterisk" to="/book-borrow-request">
        Book Borrow Request
      </MenuItem>
      <MenuItem icon="asterisk" to="/cart-item">
        Cart Item
      </MenuItem>
      <MenuItem icon="asterisk" to="/category">
        Category
      </MenuItem>
      <MenuItem icon="asterisk" to="/comment">
        Comment
      </MenuItem>
      <MenuItem icon="asterisk" to="/course">
        Course
      </MenuItem>
      <MenuItem icon="asterisk" to="/course-video">
        Course Video
      </MenuItem>
      <MenuItem icon="asterisk" to="/favorite">
        Favorite
      </MenuItem>
      <MenuItem icon="asterisk" to="/learner">
        Learner
      </MenuItem>
      <MenuItem icon="asterisk" to="/notification">
        Notification
      </MenuItem>
      <MenuItem icon="asterisk" to="/order">
        Order
      </MenuItem>
      <MenuItem icon="asterisk" to="/order-item">
        Order Item
      </MenuItem>
      <MenuItem icon="asterisk" to="/payment-method">
        Payment Method
      </MenuItem>
      <MenuItem icon="asterisk" to="/slider">
        Slider
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
