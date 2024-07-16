import './header.scss';

import React, { useState } from 'react';

import { Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home } from './header-components';
import { EntitiesMenu } from '../menus';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Collapse isOpen={menuOpen} navbar>
          <Nav className="ms-auto" navbar>
            <Home />
            {props.isAuthenticated && <EntitiesMenu />}
          </Nav>
          <Nav navbar className="me-auto">
            <NavDropdown icon="user" name="حسابي" id="account-menu" data-cy="accountMenu">
              {props.isAuthenticated && (
                <>
                  <MenuItem icon="wrench" to="/account/settings" data-cy="settings">
                    اعدادات
                  </MenuItem>
                  <MenuItem icon="lock" to="/account/password" data-cy="passwordItem">
                    كلمة المرور
                  </MenuItem>
                  <MenuItem icon="sign-out-alt" to="/logout" data-cy="logout">
                    تسجيل خروج
                  </MenuItem>
                </>
              )}
              {!props.isAuthenticated && (
                <>
                  <MenuItem id="login-item" icon="sign-in-alt" to="/login" data-cy="login">
                    تسجيل دخول
                  </MenuItem>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
