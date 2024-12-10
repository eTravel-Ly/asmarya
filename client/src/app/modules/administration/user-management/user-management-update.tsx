import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { isEmail, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { createUser, getRoles, getUser, reset, updateUser } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { login } = useParams<'login'>();
  const isNew = login === undefined;

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [login]);

  const handleClose = () => {
    navigate('/admin/user-management');
  };

  const saveUser = values => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>إنشاء أو تعديل مستخدم</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>جاري التحميل...</p>
          ) : (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              {user.id ? (
                <ValidatedField type="text" name="id" required readOnly label="الرقم التعريفي" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                type="text"
                name="login"
                label="اسم الدخول"
                validate={{
                  required: {
                    value: true,
                    message: 'اسم المستخدم مطلوب.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'اسم المستخدم غير صحيح.',
                  },
                  minLength: {
                    value: 1,
                    message: 'اسم المستخدم يجب أن يكون على الأقل 1 حرفًا.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'اسم المستخدم لا يمكن أن يتجاوز 50 حرفًا.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label="الاسم الأول"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'هذا الحقل لا يمكن أن يتجاوز 50 حرفًا.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="الاسم الأخير"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'هذا الحقل لا يمكن أن يتجاوز 50 حرفًا.',
                  },
                }}
              />
              {/*<FormText>هذا الحقل لا يمكن أن يتجاوز 50 حرفًا.</FormText>*/}
              <ValidatedField
                name="email"
                label="البريد الإلكتروني"
                placeholder="بريدك الإلكتروني"
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'البريد الإلكتروني مطلوب.',
                  },
                  minLength: {
                    value: 5,
                    message: 'البريد الإلكتروني يجب أن يكون على الأقل 5 أحرف.',
                  },
                  maxLength: {
                    value: 254,
                    message: 'البريد الإلكتروني لا يمكن أن يتجاوز 50 حرفًا.',
                  },
                  validate: v => isEmail(v) || 'البريد الإلكتروني غير صحيح.',
                }}
              />
              <ValidatedField type="checkbox" name="activated" check value={true} disabled={!user.id} label="مفعل" />
              <ValidatedField type="select" name="authorities" multiple label="الصلاحيات">
                {authorities.map(role => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} to="/admin/user-management" replace>
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline"></span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
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

export default UserManagementUpdate;
