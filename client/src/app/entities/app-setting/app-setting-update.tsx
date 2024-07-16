import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAppSetting } from 'app/shared/model/app-setting.model';
import { getEntity, updateEntity, createEntity, reset } from './app-setting.reducer';

export const AppSettingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appSettingEntity = useAppSelector(state => state.appSetting.entity);
  const loading = useAppSelector(state => state.appSetting.loading);
  const updating = useAppSelector(state => state.appSetting.updating);
  const updateSuccess = useAppSelector(state => state.appSetting.updateSuccess);

  const handleClose = () => {
    navigate('/app-setting' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...appSettingEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...appSettingEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.appSetting.home.createOrEditLabel" data-cy="AppSettingCreateUpdateHeading">
            Create or edit a App Setting
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="app-setting-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Name" id="app-setting-name" name="name" data-cy="name" type="text" />
              <ValidatedField label="Key" id="app-setting-key" name="key" data-cy="key" type="text" />
              <ValidatedField label="Type" id="app-setting-type" name="type" data-cy="type" type="text" />
              <ValidatedField label="Value" id="app-setting-value" name="value" data-cy="value" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/app-setting" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">رجوع</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; حفظ
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AppSettingUpdate;
