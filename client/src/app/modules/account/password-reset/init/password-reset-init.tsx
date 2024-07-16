import React, { useEffect } from 'react';
import { isEmail, ValidatedField, ValidatedForm } from 'react-jhipster';
import { Alert, Button, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import { handlePasswordResetInit, reset } from '../password-reset.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PasswordResetInit = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({ email }) => {
    dispatch(handlePasswordResetInit(email));
  };

  const successMessage = useAppSelector(state => state.passwordReset.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>إعادة تعيين كلمة المرور</h1>
          <Alert color="warning">
            <p>الرجاء إدخال عنوان البريد الإلكتروني الذي استخدمته في التسجيل</p>
          </Alert>
          <ValidatedForm onSubmit={handleValidSubmit}>
            <ValidatedField
              name="email"
              label="البريد الإلكتروني"
              placeholder="البريد الإلكتروني الخاص بك"
              type="email"
              validate={{
                required: { value: true, message: 'البريد الإلكتروني مطلوب.' },
                minLength: { value: 5, message: 'يجب أن يكون البريد الإلكتروني على الأقل 5 أحرف.' },
                maxLength: { value: 254, message: 'البريد الإلكتروني لا يمكن أن يكون أطول من 50 حرفًا.' },
                validate: v => isEmail(v) || 'البريد الإلكتروني غير صالح.',
              }}
              data-cy="emailResetPassword"
            />
            <Button color="primary" type="submit" data-cy="submit">
              إعادة تعيين كلمة المرور
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default PasswordResetInit;
