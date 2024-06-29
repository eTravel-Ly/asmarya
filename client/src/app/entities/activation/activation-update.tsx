import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IActivation } from 'app/shared/model/activation.model';
import { getEntity, updateEntity, createEntity, reset } from './activation.reducer';

export const ActivationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const activationEntity = useAppSelector(state => state.activation.entity);
  const loading = useAppSelector(state => state.activation.loading);
  const updating = useAppSelector(state => state.activation.updating);
  const updateSuccess = useAppSelector(state => state.activation.updateSuccess);

  const handleClose = () => {
    navigate('/activation' + location.search);
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
    values.sentOn = convertDateTimeToServer(values.sentOn);
    values.validUntil = convertDateTimeToServer(values.validUntil);

    const entity = {
      ...activationEntity,
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
      ? {
          sentOn: displayDefaultDateTime(),
          validUntil: displayDefaultDateTime(),
        }
      : {
          ...activationEntity,
          sentOn: convertDateTimeFromServer(activationEntity.sentOn),
          validUntil: convertDateTimeFromServer(activationEntity.validUntil),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.activation.home.createOrEditLabel" data-cy="ActivationCreateUpdateHeading">
            Create or edit a Activation
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="activation-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Mobile No" id="activation-mobileNo" name="mobileNo" data-cy="mobileNo" type="text" />
              <ValidatedField label="Email" id="activation-email" name="email" data-cy="email" type="text" />
              <ValidatedField label="Code" id="activation-code" name="code" data-cy="code" type="text" />
              <ValidatedField
                label="Sent On"
                id="activation-sentOn"
                name="sentOn"
                data-cy="sentOn"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Valid Until"
                id="activation-validUntil"
                name="validUntil"
                data-cy="validUntil"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Is Used" id="activation-isUsed" name="isUsed" data-cy="isUsed" check type="checkbox" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/activation" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ActivationUpdate;
