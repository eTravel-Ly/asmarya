import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextFormat } from 'react-jhipster';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './center.reducer';

export const CenterDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const centerEntity = useAppSelector(state => state.center.entity);

  // Prepare data to be displayed in the table
  // Prepare data to be displayed in the table
  const data = [
    { label: 'الرقم التعريفي', value: centerEntity.id },
    { label: 'الاسم', value: centerEntity.name },
    { label: 'العنوان', value: centerEntity.address },
    { label: 'رقم الهاتف', value: centerEntity.phoneNumber },
    { label: 'البريد الإلكتروني', value: centerEntity.email },
    { label: 'اسم المدير', value: centerEntity.managerName },
    { label: 'ساعات العمل', value: centerEntity.workingHours },
    { label: 'عدد الطلاب', value: centerEntity.numberOfStudents },
    { label: 'عدد المعلمين', value: centerEntity.numberOfTeachers },
    {
      label: 'تاريخ التأسيس',
      value: centerEntity.establishmentDate ? (
        <TextFormat value={centerEntity.establishmentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
      ) : null,
    },
    { label: 'الوصف', value: centerEntity.description },
    {
      label: 'الشيوخ',
      value: centerEntity.sheikhs
        ? centerEntity.sheikhs.map((val, i) => (
            <span key={val.id}>
              <a>{val.id}</a>
              {i === centerEntity.sheikhs.length - 1 ? '' : ', '}
            </span>
          ))
        : null,
    },
  ];

  return (
    <Row>
      <Col md="12">
        <h2 data-cy="centerDetailsHeading">Center Details</h2>
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
        <Button tag={Link} to="/center" replace data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline"></span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/center/${centerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CenterDetail;
