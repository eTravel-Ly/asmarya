import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs';

import React, { useEffect } from 'react';
import { Card, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, NavLink as Link } from 'react-router-dom';
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
            <Nav vertical>
              <NavItem>
                <NavLink tag={Link} to="/" className="d-flex align-items-center">
                  <Brand />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/activation" className="d-flex align-items-center">
                  Activation
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/app-setting" className="d-flex align-items-center">
                  App Setting
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/book" className="d-flex align-items-center">
                  Book
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/book-borrow-request" className="d-flex align-items-center">
                  Book Borrow Request
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/cart-item" className="d-flex align-items-center">
                  Cart Item
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/category" className="d-flex align-items-center">
                  Category
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/comment" className="d-flex align-items-center">
                  Comment
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/course" className="d-flex align-items-center">
                  Course
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/course-video" className="d-flex align-items-center">
                  Course Video
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/favorite" className="d-flex align-items-center">
                  Favorite
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/learner" className="d-flex align-items-center">
                  Learner
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/notification" className="d-flex align-items-center">
                  Notification
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/order" className="d-flex align-items-center">
                  Order
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/order-item" className="d-flex align-items-center">
                  Order Item
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/payment-method" className="d-flex align-items-center">
                  Payment Method
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/slider" className="d-flex align-items-center">
                  Slider
                </NavLink>
              </NavItem>
            </Nav>
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
