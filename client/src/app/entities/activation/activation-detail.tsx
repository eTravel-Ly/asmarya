import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './activation.reducer';

export const ActivationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const activationEntity = useAppSelector(state => state.activation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="activationDetailsHeading">Activation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{activationEntity.id}</dd>
          <dt>
            <span id="mobileNo">Mobile No</span>
          </dt>
          <dd>{activationEntity.mobileNo}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{activationEntity.email}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{activationEntity.code}</dd>
          <dt>
            <span id="sentOn">Sent On</span>
          </dt>
          <dd>{activationEntity.sentOn ? <TextFormat value={activationEntity.sentOn} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="validUntil">Valid Until</span>
          </dt>
          <dd>
            {activationEntity.validUntil ? <TextFormat value={activationEntity.validUntil} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="isUsed">Is Used</span>
          </dt>
          <dd>{activationEntity.isUsed ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/activation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/activation/${activationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ActivationDetail;
