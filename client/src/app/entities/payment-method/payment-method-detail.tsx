import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
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
        <br />
        <table className="table table-bordered table-hover table-custom">
          <tbody>
            <tr>
              <th scope="row">رقم ت.</th>
              <td>{paymentMethodEntity.id}</td>
            </tr>
            <tr>
              <th scope="row">الاسم عربي</th>
              <td>{paymentMethodEntity.nameAr}</td>
            </tr>
            <tr>
              <th scope="row">الاسم انجليزي</th>
              <td>{paymentMethodEntity.nameEn}</td>
            </tr>
            <tr>
              <th scope="row">الترتيب</th>
              <td>{paymentMethodEntity.menuOrder}</td>
            </tr>
            <tr>
              <th scope="row">التفاصيل</th>
              <td>{paymentMethodEntity.details}</td>
            </tr>
            <tr>
              <th scope="row">نسبة الرسوم</th>
              <td>{paymentMethodEntity.feePercentage}</td>
            </tr>
            <tr>
              <th scope="row">نوع الدفع</th>
              <td>{paymentMethodEntity.paymentType}</td>
            </tr>
            <tr>
              <th scope="row">مفعل</th>
              <td>{paymentMethodEntity.isActive ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th scope="row">الملاحظات</th>
              <td>{paymentMethodEntity.notes}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <Button tag={Link} to="/payment-method" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-method/${paymentMethodEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
      <Col md="4" className="text-center">
        <br />
        <br />
        <img
          src={`/api/uploads/file/download/${paymentMethodEntity.imageFileUrl}`}
          alt={paymentMethodEntity.nameEn}
          className="img-thumbnail w-50"
        />
      </Col>
    </Row>
  );
};

export default PaymentMethodDetail;
