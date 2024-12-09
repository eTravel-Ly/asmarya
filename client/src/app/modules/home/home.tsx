import './home.scss';

import React from 'react';
import { Alert } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <section className="home-section">
      <div className="container">
        <div className="left-section">
          {account?.login ? (
            <div className="login-alert">
              <Alert color="success">لقد قمت بتسجيل الدخول بحساب &quot;{account.login}&quot;.</Alert>
            </div>
          ) : (
            <div></div>
          )}
          <h2 className="section-title">نبذة عن مجمع القرآن الكريم</h2>
          <div className="info-container">
            <div className="info-item">
              <FontAwesomeIcon icon={faBook} className="icon" />
              <div>
                <h3 className="info-title">ماهو مجمع القرآن الكريم؟</h3>
                <p className="info-text">
                  هو مركز يختص بنشر القرآن الكريم وعلومه، ودعم الأعمال البحثية والعلمية التي لها علاقة بالقرآن الكريم وعلومه.
                </p>
              </div>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faBook} className="icon" />
              <div>
                <h3 className="info-title">ماذا يقدم مجمع القرآن الكريم؟</h3>
                <p className="info-text">
                  يقدم مجموعة من الكتب التي تخص ديننا الحبيب وهناك أيضًا مجموعة من الدورات التدريبية والمسابقات والندوات والمؤتمرات الدينية.
                </p>
              </div>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faBook} className="icon" />
              <div>
                <h3 className="info-title">مكان مجمع القرآن الكريم؟</h3>
                <p className="info-text">ليبيا، زاوية السبعة الفواتير., Zliten, Libya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
