import React, { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { isEmail, ValidatedField, ValidatedForm } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { reset, saveAccountSettings } from './settings.reducer';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      }),
    );
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            إعدادات المستخدم لـ [<strong>{account.login}</strong>]
          </h2>
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="firstName"
              label="الاسم الأول"
              id="firstName"
              placeholder="الاسم الأول"
              validate={{
                required: { value: true, message: 'الاسم الأول مطلوب.' },
                minLength: { value: 1, message: 'يجب أن يتكون الاسم الأول من حرف واحد على الأقل.' },
                maxLength: { value: 50, message: 'لا يمكن أن يتجاوز الاسم الأول 50 حرفًا.' },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="اسم العائلة"
              id="lastName"
              placeholder="اسم العائلة"
              validate={{
                required: { value: true, message: 'اسم العائلة مطلوب.' },
                minLength: { value: 1, message: 'يجب أن يتكون اسم العائلة من حرف واحد على الأقل.' },
                maxLength: { value: 50, message: 'لا يمكن أن يتجاوز اسم العائلة 50 حرفًا.' },
              }}
              data-cy="lastname"
            />
            <ValidatedField
              name="email"
              label="البريد الإلكتروني"
              placeholder="البريد الإلكتروني"
              type="email"
              validate={{
                required: { value: true, message: 'البريد الإلكتروني مطلوب.' },
                minLength: { value: 5, message: 'يجب أن يتكون البريد الإلكتروني من 5 أحرف على الأقل.' },
                maxLength: { value: 254, message: 'لا يمكن أن يتجاوز البريد الإلكتروني 50 حرفًا.' },
                validate: v => isEmail(v) || 'البريد الإلكتروني غير صالح.',
              }}
              data-cy="email"
            />
            <Button color="primary" type="submit" data-cy="submit">
              حفظ
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
