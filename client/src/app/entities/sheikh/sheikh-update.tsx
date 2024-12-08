import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ISheikh } from 'app/shared/model/sheikh.model';
import { getEntity, updateEntity, createEntity, reset } from './sheikh.reducer';

export const SheikhUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const sheikhEntity = useAppSelector(state => state.sheikh.entity);
  const loading = useAppSelector(state => state.sheikh.loading);
  const updating = useAppSelector(state => state.sheikh.updating);
  const updateSuccess = useAppSelector(state => state.sheikh.updateSuccess);

  const handleClose = () => {
    navigate('/sheikh' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...sheikhEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...sheikhEntity,
          user: sheikhEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.sheikh.home.createOrEditLabel" data-cy="SheikhCreateUpdateHeading">
            اضافة او تعديل شيخ
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="sheikh-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="الاسم اول" id="sheikh-firstName" name="firstName" data-cy="firstName" type="text" />
              <ValidatedField label="الاسم اخير" id="sheikh-lastName" name="lastName" data-cy="lastName" type="text" />
              <ValidatedField label="تاريخ الميلاد" id="sheikh-birthDate" name="birthDate" data-cy="birthDate" type="date" />
              <ValidatedField label="رقم الهاتف" id="sheikh-phoneNumber" name="phoneNumber" data-cy="phoneNumber" type="text" />
              <ValidatedField label="البريد الالكتروني" id="sheikh-email" name="email" data-cy="email" type="text" />
              <ValidatedField label="ملاحظات" id="sheikh-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedField id="sheikh-user" name="user" data-cy="user" label="المستخدم" type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/sheikh" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">رجوع</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
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

export default SheikhUpdate;
