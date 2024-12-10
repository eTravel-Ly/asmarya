import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Row, Col, Table } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { getUser } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { login } = useParams<'login'>();

  useEffect(() => {
    dispatch(getUser(login));
  }, [dispatch, login]);

  const user = useAppSelector(state => state.userManagement.user);

  // Prepare data to be displayed in the table
  const data = [
    { label: 'اسم الدخول', value: user.login },
    {
      label: 'الحالة',
      value: user.activated ? <Badge color="success">مفعل</Badge> : <Badge color="danger">غير مفعل</Badge>,
    },
    { label: 'الاسم الأول', value: user.firstName },
    { label: 'الاسم الأخير', value: user.lastName },
    { label: 'البريد الإلكتروني', value: user.email },
    { label: 'المنشئ', value: user.createdBy },
    {
      label: 'تاريخ الإنشاء',
      value: user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null,
    },
    { label: 'المعدل', value: user.lastModifiedBy },
    {
      label: 'تاريخ التعديل',
      value: user.lastModifiedDate ? (
        <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
      ) : null,
    },
    {
      label: 'الصلاحيات',
      value: (
        <ul className="list-unstyled">
          {user.authorities
            ? user.authorities.map((authority, i) => (
                <li key={`user-auth-${i}`}>
                  <Badge>{authority}</Badge>
                </li>
              ))
            : null}
        </ul>
      ),
    },
  ];

  return (
    <div>
      <h2>
        المستخدم [<strong>{user.login}</strong>]
      </h2>
      <Row>
        <Col md="12">
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
      </Row>
      <Button tag={Link} to="/admin/user-management" replace>
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
      </Button>
    </div>
  );
};

export default UserManagementDetail;
