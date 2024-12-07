import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs';

import React, { useEffect, useState } from 'react';
import { Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
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
import { faBook, faDashboard, faFileAlt, faImage, faList, faTable, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import { faBox } from '@fortawesome/free-solid-svg-icons/faBox';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

const App = () => {
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, [dispatch]);

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = true;
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
          {isAuthenticated && ( // Conditional rendering based on authentication status
            <nav className="sidebar">
              <Nav vertical>
                <NavItem>
                  <NavLink tag={Link} to="/" className="d-flex align-items-center">
                    <Brand />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/dashboard" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faDashboard} className="m-2" />
                    الرئيسية
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/book" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBook} className="m-2" />
                    الكتب
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/book-borrow-request" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBookOpen} className="m-2" />
                    طلبات استعارة الكتب
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/category" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faList} className="m-2" />
                    التصنيفات
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/course" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faVideo} className="m-2" />
                    الدورات التدريبة
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/learner" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="m-2" />
                    المتدربين
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/sheikhs" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUsers} className="m-2" />
                    المشايخ
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/order" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBox} className="m-2" />
                    الطلبات
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/payment-method" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faMoneyBill} className="m-2" />
                    طرق الدفع
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/event" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faTable} className="m-2" />
                    الانشطة
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/slider" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faImage} className="m-2" />
                    الشريط الدعائي
                  </NavLink>
                </NavItem>

                <Dropdown nav inNavbar isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle nav caret className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBook} className="m-2" />
                    اجزاء النظام
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link} to="/activation" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faFileAlt} className="m-2" />
                      رموز التفعيل
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/app-setting" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faFileAlt} className="m-2" />
                      اعدادات النظام
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/order-item" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBook} className="m-2" />
                      عناصر الطلبات
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/favorite" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBook} className="m-2" />
                      المفضلة
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/notification" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBook} className="m-2" />
                      الاشعارات
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/course-video" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBook} className="m-2" />
                      فيديوات الدوارات
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/comment" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBook} className="m-2" />
                      التعليقات
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/cart-item" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBook} className="m-2" />
                      السلة
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                {isAdmin && (
                  <>
                    <NavItem>
                      <NavLink tag={Link} to="/admin/user-management" className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faUsers} className="m-2" />
                        ادارة المستخدمين
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/api/v2/api-docs/" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCode} className="m-2" />
                        API
                      </NavLink>
                    </NavItem>
                    {/*<NavItem>*/}
                    {/*  <NavLink tag={Link} to="/api-docs" className="d-flex align-items-center">*/}
                    {/*    <FontAwesomeIcon icon={faBook} className="m-2"/>*/}
                    {/*    API Documentation*/}
                    {/*  </NavLink>*/}
                    {/*</NavItem>*/}
                  </>
                )}
              </Nav>
            </nav>
          )}

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
