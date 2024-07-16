import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { handlePasswordResetFinish, reset } from '../password-reset.reducer';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PasswordResetFinishPage = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');

  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({ newPassword }) => dispatch(handlePasswordResetFinish({ key, newPassword }));

  const updatePassword = event => setPassword(event.target.value);

  const getResetForm = () => {
    return (
      <ValidatedForm onSubmit={handleValidSubmit}>
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
          data-cy="resetPassword"
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
          data-cy="confirmResetPassword"
        />
        <Button color="success" type="submit" data-cy="submit">
          تأكيد كلمة المرور الجديدة
        </Button>
      </ValidatedForm>
    );
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
        <Col md="4">
          <h1>إعادة تعيين كلمة المرور</h1>
          <div>{key ? getResetForm() : null}</div>
        </Col>
      </Row>
    </div>
  );
};

export default PasswordResetFinishPage;
