import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './order.reducer';

export const OrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsHeading">Order</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{orderEntity.id}</dd>
          <dt>
            <span id="orderNo">Order No</span>
          </dt>
          <dd>{orderEntity.orderNo}</dd>
          <dt>
            <span id="total">Total</span>
          </dt>
          <dd>{orderEntity.total}</dd>
          <dt>
            <span id="discount">Discount</span>
          </dt>
          <dd>{orderEntity.discount}</dd>
          <dt>
            <span id="paymentType">Payment Type</span>
          </dt>
          <dd>{orderEntity.paymentType}</dd>
          <dt>
            <span id="orderStatus">Order Status</span>
          </dt>
          <dd>{orderEntity.orderStatus}</dd>
          <dt>
            <span id="payedAt">Payed At</span>
          </dt>
          <dd>{orderEntity.payedAt ? <TextFormat value={orderEntity.payedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{orderEntity.notes}</dd>
          <dt>Learner</dt>
          <dd>{orderEntity.learner ? orderEntity.learner.firstName : ''}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetail;
