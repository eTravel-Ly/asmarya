import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextFormat } from 'react-jhipster';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './order.reducer';

export const OrderDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const orderEntity = useAppSelector(state => state.order.entity);

  // Prepare data to be displayed in the table
  const data = [
    { label: 'رقم الطلب', value: orderEntity.orderNo },
    { label: 'المجموع', value: orderEntity.total },
    { label: 'الخصم', value: orderEntity.discount },
    { label: 'طريقة الدفع', value: orderEntity.paymentType },
    { label: 'حالة الطلب', value: orderEntity.orderStatus },
    {
      label: 'تاريخ الدفع',
      value: orderEntity.payedAt ? <TextFormat value={orderEntity.payedAt} type="date" format={APP_DATE_FORMAT} /> : null,
    },
    { label: 'ملاحظات', value: orderEntity.notes },
    { label: 'المتعلم', value: orderEntity.learner ? orderEntity.learner.firstName : '' },
  ];

  return (
    <Row dir="rtl">
      {' '}
      {/* لتحديد الاتجاه من اليمين لليسار */}
      <Col md="12">
        <h2 data-cy="orderDetailsHeading" className="text-right">
          تفاصيل الطلب
        </h2>
        <Table striped>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      <Col md="12">
        <Button tag={Link} to="/order" replace data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline"></span>
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
