import './home.scss';

import React from 'react';
import { Alert, Col, Row } from 'reactstrap';
import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h1 className="display-4">مجمع القران الكريم</h1>
        <p className="lead">الصفحة الرئيسية</p>
        {account?.login ? (
          <div>
            <Alert color="success"> لقد قمت بتسجيل الدخول بحساب &quot;{account.login}&quot;.</Alert>
          </div>
        ) : (
          <div></div>
        )}
      </Col>
    </Row>
  );
};

export default Home;
