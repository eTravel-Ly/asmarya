import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment-method.reducer';

export const PaymentMethodDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentMethodEntity = useAppSelector(state => state.paymentMethod.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentMethodDetailsHeading">Payment Method</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{paymentMethodEntity.id}</dd>
          <dt>
            <span id="nameAr">Name Ar</span>
          </dt>
          <dd>{paymentMethodEntity.nameAr}</dd>
          <dt>
            <span id="nameEn">Name En</span>
          </dt>
          <dd>{paymentMethodEntity.nameEn}</dd>
          <dt>
            <span id="menuOrder">Menu Order</span>
          </dt>
          <dd>{paymentMethodEntity.menuOrder}</dd>
          <dt>
            <span id="imageFileUrl">Image File Url</span>
          </dt>
          <dd>{paymentMethodEntity.imageFileUrl}</dd>
          <dt>
            <span id="imageFile">Image File</span>
          </dt>
          <dd>
            {paymentMethodEntity.imageFile ? (
              <div>
                {paymentMethodEntity.imageFileContentType ? (
                  <a onClick={openFile(paymentMethodEntity.imageFileContentType, paymentMethodEntity.imageFile)}>
                    <img
                      src={`data:${paymentMethodEntity.imageFileContentType};base64,${paymentMethodEntity.imageFile}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {paymentMethodEntity.imageFileContentType}, {byteSize(paymentMethodEntity.imageFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="details">Details</span>
          </dt>
          <dd>{paymentMethodEntity.details}</dd>
          <dt>
            <span id="feePercentage">Fee Percentage</span>
          </dt>
          <dd>{paymentMethodEntity.feePercentage}</dd>
          <dt>
            <span id="paymentType">Payment Type</span>
          </dt>
          <dd>{paymentMethodEntity.paymentType}</dd>
          <dt>
            <span id="isActive">Is Active</span>
          </dt>
          <dd>{paymentMethodEntity.isActive ? 'true' : 'false'}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{paymentMethodEntity.notes}</dd>
        </dl>
        <Button tag={Link} to="/payment-method" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-method/${paymentMethodEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentMethodDetail;
