import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './sheikh.reducer';

export const SheikhDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const sheikhEntity = useAppSelector(state => state.sheikh.entity);

  // Prepare data to be displayed in the table
  const data = [
    { label: 'ID', value: sheikhEntity.id },
    { label: 'الاسم الاول', value: sheikhEntity.firstName },
    { label: 'الاسم الاخير', value: sheikhEntity.lastName },
    { label: 'تاريخ الميلاد', value: sheikhEntity.birthDate },
    { label: 'رقم الهاتف', value: sheikhEntity.phoneNumber },
    { label: 'البريد الالكتروني', value: sheikhEntity.email },
    { label: 'ملاحظات', value: sheikhEntity.notes },
    { label: 'المستخدم', value: sheikhEntity.user ? sheikhEntity.user.id : '' },
  ];

  return (
    <Row>
      <Col md="12">
        <h2 data-cy="sheikhDetailsHeading"> بيانات الشيخ</h2>
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
        <Button tag={Link} to="/sheikh" replace data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline"></span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sheikh/${sheikhEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SheikhDetail;
