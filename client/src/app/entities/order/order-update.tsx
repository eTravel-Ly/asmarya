import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getLearners } from 'app/entities/learner/learner.reducer';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';
import { createEntity, getEntity, reset, updateEntity } from './order.reducer';

export const OrderUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const learners = useAppSelector(state => state.learner.entities);
  const orderEntity = useAppSelector(state => state.order.entity);
  const loading = useAppSelector(state => state.order.loading);
  const updating = useAppSelector(state => state.order.updating);
  const updateSuccess = useAppSelector(state => state.order.updateSuccess);
  const paymentTypeValues = Object.keys(PaymentType);
  const orderStatusValues = Object.keys(OrderStatus);

  const handleClose = () => {
    navigate('/order' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getLearners({}));
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
    if (values.total !== undefined && typeof values.total !== 'number') {
      values.total = Number(values.total);
    }
    if (values.discount !== undefined && typeof values.discount !== 'number') {
      values.discount = Number(values.discount);
    }
    values.payedAt = convertDateTimeToServer(values.payedAt);

    const entity = {
      ...orderEntity,
      ...values,
      learner: learners.find(it => it.id.toString() === values.learner?.toString()),
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
          payedAt: displayDefaultDateTime(),
        }
      : {
          paymentType: 'ADFALI',
          orderStatus: 'CANCELLED',
          ...orderEntity,
          payedAt: convertDateTimeFromServer(orderEntity.payedAt),
          learner: orderEntity?.learner?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.order.home.createOrEditLabel" data-cy="OrderCreateUpdateHeading">
            Create or edit a Order
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="order-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Order No" id="order-orderNo" name="orderNo" data-cy="orderNo" type="text" />
              <ValidatedField label="Total" id="order-total" name="total" data-cy="total" type="text" />
              <ValidatedField label="Discount" id="order-discount" name="discount" data-cy="discount" type="text" />
              <ValidatedField label="Payment Type" id="order-paymentType" name="paymentType" data-cy="paymentType" type="select">
                {paymentTypeValues.map(paymentType => (
                  <option value={paymentType} key={paymentType}>
                    {paymentType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Order Status" id="order-orderStatus" name="orderStatus" data-cy="orderStatus" type="select">
                {orderStatusValues.map(orderStatus => (
                  <option value={orderStatus} key={orderStatus}>
                    {orderStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Payed At"
                id="order-payedAt"
                name="payedAt"
                data-cy="payedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Notes" id="order-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedField id="order-learner" name="learner" data-cy="learner" label="Learner" type="select">
                <option value="" key="0" />
                {learners
                  ? learners.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.firstName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/order" replace color="info">
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

export default OrderUpdate;
