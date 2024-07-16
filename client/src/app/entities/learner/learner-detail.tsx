import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './learner.reducer';

export const LearnerDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const learnerEntity = useAppSelector(state => state.learner.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="learnerDetailsHeading">Learner</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{learnerEntity.id}</dd>
          <dt>
            <span id="firstName">First Name</span>
          </dt>
          <dd>{learnerEntity.firstName}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{learnerEntity.lastName}</dd>
          <dt>
            <span id="birthYear">Birth Year</span>
          </dt>
          <dd>{learnerEntity.birthYear}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{learnerEntity.email}</dd>
          <dt>
            <span id="mobileNo">Mobile No</span>
          </dt>
          <dd>{learnerEntity.mobileNo}</dd>
          <dt>
            <span id="googleId">Google Id</span>
          </dt>
          <dd>{learnerEntity.googleId}</dd>
          <dt>
            <span id="facebookId">Facebook Id</span>
          </dt>
          <dd>{learnerEntity.facebookId}</dd>
          <dt>
            <span id="appleId">Apple Id</span>
          </dt>
          <dd>{learnerEntity.appleId}</dd>
          <dt>
            <span id="isBanned">Is Banned</span>
          </dt>
          <dd>{learnerEntity.isBanned ? 'true' : 'false'}</dd>
          <dt>
            <span id="verifiedByEmail">Verified By Email</span>
          </dt>
          <dd>{learnerEntity.verifiedByEmail ? 'true' : 'false'}</dd>
          <dt>
            <span id="verifiedByMobileNo">Verified By Mobile No</span>
          </dt>
          <dd>{learnerEntity.verifiedByMobileNo ? 'true' : 'false'}</dd>
          <dt>
            <span id="imageFile">Image File</span>
          </dt>
          <dd>
            {learnerEntity.imageFile ? (
              <div>
                {learnerEntity.imageFileContentType ? (
                  <a onClick={openFile(learnerEntity.imageFileContentType, learnerEntity.imageFile)}>
                    <img
                      src={`data:${learnerEntity.imageFileContentType};base64,${learnerEntity.imageFile}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {learnerEntity.imageFileContentType}, {byteSize(learnerEntity.imageFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="imageFileUrl">Image File Url</span>
          </dt>
          <dd>{learnerEntity.imageFileUrl}</dd>
          <dt>
            <span id="nationalityCode">Nationality Code</span>
          </dt>
          <dd>{learnerEntity.nationalityCode}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{learnerEntity.city}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{learnerEntity.address}</dd>
          <dt>
            <span id="learnerType">Learner Type</span>
          </dt>
          <dd>{learnerEntity.learnerType}</dd>
          <dt>
            <span id="studentId">Student Id</span>
          </dt>
          <dd>{learnerEntity.studentId}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{learnerEntity.notes}</dd>
          <dt>User</dt>
          <dd>{learnerEntity.user ? learnerEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/learner" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/learner/${learnerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LearnerDetail;
