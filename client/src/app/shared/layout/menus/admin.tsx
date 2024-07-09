import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavDropdown } from './menu-components';

const adminMenuItems = () => (
  <>
    <MenuItem icon="users" to="/admin/user-management">
      User management
    </MenuItem>
    {/*<MenuItem icon="book" to="/api/v2/api-docs/">*/}
    {/*  API*/}
    {/*</MenuItem>*/}
    <li>
      <a href="/api/v2/api-docs/" target="_blank" rel="noopener noreferrer">
        API
      </a>
    </li>

    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
  </>
);

const openAPIItem = () => (
  <MenuItem icon="book" to="/admin/docs">
    API
  </MenuItem>
);

export const AdminMenu = ({ showOpenAPI }) => (
  <NavDropdown icon="users-cog" name="Administration" id="admin-menu" data-cy="adminMenu">
    {adminMenuItems()}
    {showOpenAPI && openAPIItem()}
  </NavDropdown>
);

export default AdminMenu;
