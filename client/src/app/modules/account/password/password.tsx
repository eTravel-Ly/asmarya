import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Button, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { reset, savePassword } from './password.reducer';

export const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleValidSubmit = ({ currentPassword, newPassword }) => {
    dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.password.successMessage);
  const errorMessage = useAppSelector(state => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(reset());
  }, [successMessage, errorMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title">
            كلمة المرور للمستخدم [<strong>{account.login}</strong>]
          </h2>
          <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="currentPassword"
              label="كلمة المرور الحالية"
              placeholder="كلمة المرور الحالية"
              type="password"
              validate={{
                required: { value: true, message: 'كلمة المرور مطلوبة.' },
              }}
              data-cy="currentPassword"
            />
            <ValidatedField
              name="newPassword"
              label="كلمة المرور الجديدة"
              placeholder="كلمة المرور الجديدة"
              type="password"
              validate={{
                required: { value: true, message: 'كلمة المرور مطلوبة.' },
                minLength: { value: 4, message: 'يجب أن تتكون كلمة المرور من 4 أحرف على الأقل.' },
                maxLength: { value: 50, message: 'لا يمكن أن تتجاوز كلمة المرور 50 حرفًا.' },
              }}
              onChange={updatePassword}
              data-cy="newPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="confirmPassword"
              label="تأكيد كلمة المرور الجديدة"
              placeholder="تأكيد كلمة المرور الجديدة"
              type="password"
              validate={{
                required: { value: true, message: 'كلمة المرور للتأكيد مطلوبة.' },
                minLength: { value: 4, message: 'يجب أن تتكون كلمة المرور للتأكيد من 4 أحرف على الأقل.' },
                maxLength: { value: 50, message: 'لا يمكن أن تتجاوز كلمة المرور للتأكيد 50 حرفًا.' },
                validate: v => v === password || 'كلمة المرور وتأكيدها غير متطابقين!',
              }}
              data-cy="confirmPassword"
            />
            <Button color="success" type="submit" data-cy="submit">
              حفظ
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default PasswordPage;
