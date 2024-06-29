import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPaymentMethod } from 'app/shared/model/payment-method.model';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { getEntity, updateEntity, createEntity, reset } from './payment-method.reducer';

export const PaymentMethodUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentMethodEntity = useAppSelector(state => state.paymentMethod.entity);
  const loading = useAppSelector(state => state.paymentMethod.loading);
  const updating = useAppSelector(state => state.paymentMethod.updating);
  const updateSuccess = useAppSelector(state => state.paymentMethod.updateSuccess);
  const paymentTypeValues = Object.keys(PaymentType);

  const handleClose = () => {
    navigate('/payment-method' + location.search);
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
    if (values.menuOrder !== undefined && typeof values.menuOrder !== 'number') {
      values.menuOrder = Number(values.menuOrder);
    }
    if (values.feePercentage !== undefined && typeof values.feePercentage !== 'number') {
      values.feePercentage = Number(values.feePercentage);
    }

    const entity = {
      ...paymentMethodEntity,
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
          paymentType: 'ADFALI',
          ...paymentMethodEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.paymentMethod.home.createOrEditLabel" data-cy="PaymentMethodCreateUpdateHeading">
            Create or edit a Payment Method
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="payment-method-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Name Ar" id="payment-method-nameAr" name="nameAr" data-cy="nameAr" type="text" />
              <ValidatedField label="Name En" id="payment-method-nameEn" name="nameEn" data-cy="nameEn" type="text" />
              <ValidatedField label="Menu Order" id="payment-method-menuOrder" name="menuOrder" data-cy="menuOrder" type="text" />
              <ValidatedField
                label="Image File Url"
                id="payment-method-imageFileUrl"
                name="imageFileUrl"
                data-cy="imageFileUrl"
                type="text"
              />
              <ValidatedBlobField
                label="Image File"
                id="payment-method-imageFile"
                name="imageFile"
                data-cy="imageFile"
                isImage
                accept="image/*"
              />
              <ValidatedField label="Details" id="payment-method-details" name="details" data-cy="details" type="text" />
              <ValidatedField
                label="Fee Percentage"
                id="payment-method-feePercentage"
                name="feePercentage"
                data-cy="feePercentage"
                type="text"
              />
              <ValidatedField label="Payment Type" id="payment-method-paymentType" name="paymentType" data-cy="paymentType" type="select">
                {paymentTypeValues.map(paymentType => (
                  <option value={paymentType} key={paymentType}>
                    {paymentType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Is Active" id="payment-method-isActive" name="isActive" data-cy="isActive" check type="checkbox" />
              <ValidatedField label="Notes" id="payment-method-notes" name="notes" data-cy="notes" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment-method" replace color="info">
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

export default PaymentMethodUpdate;
