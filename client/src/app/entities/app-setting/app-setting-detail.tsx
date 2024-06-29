import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './app-setting.reducer';

export const AppSettingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const appSettingEntity = useAppSelector(state => state.appSetting.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="appSettingDetailsHeading">App Setting</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{appSettingEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{appSettingEntity.name}</dd>
          <dt>
            <span id="key">Key</span>
          </dt>
          <dd>{appSettingEntity.key}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{appSettingEntity.type}</dd>
          <dt>
            <span id="value">Value</span>
          </dt>
          <dd>{appSettingEntity.value}</dd>
        </dl>
        <Button tag={Link} to="/app-setting" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/app-setting/${appSettingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AppSettingDetail;
