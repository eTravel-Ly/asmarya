import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs';

import React, { useEffect } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Brand } from 'app/shared/layout/header/header-components';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, [dispatch]);

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = true;
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  return (
    <BrowserRouter basename={baseHref}>
      <div className="app-container">
        <ToastContainer position="top-left" className="toastify-container" toastClassName="toastify-toast" />
        <ErrorBoundary>
          <Header
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            ribbonEnv={ribbonEnv}
            isInProduction={isInProduction}
            isOpenAPIEnabled={isOpenAPIEnabled}
          />
        </ErrorBoundary>
        <div className="view-container">
          <nav className="sidebar">
            <ul className="nav flex-column">
              <div className="brand-logo">
                <Brand />
              </div>
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
            </ul>
          </nav>
          <div className="content">
            <Card className="jh-card">
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
