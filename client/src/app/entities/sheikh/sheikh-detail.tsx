import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './sheikh.reducer';

export const SheikhDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const sheikhEntity = useAppSelector(state => state.sheikh.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sheikhDetailsHeading">Sheikh</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{sheikhEntity.id}</dd>
          <dt>
            <span id="firstName">First Name</span>
          </dt>
          <dd>{sheikhEntity.firstName}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{sheikhEntity.lastName}</dd>
          <dt>
            <span id="birthDate">Birth Date</span>
          </dt>
          <dd>
            {sheikhEntity.birthDate ? <TextFormat value={sheikhEntity.birthDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="phoneNumber">Phone Number</span>
          </dt>
          <dd>{sheikhEntity.phoneNumber}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{sheikhEntity.email}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{sheikhEntity.notes}</dd>
          <dt>User</dt>
          <dd>{sheikhEntity.user ? sheikhEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/sheikh" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sheikh/${sheikhEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SheikhDetail;
