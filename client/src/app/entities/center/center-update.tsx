import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISheikh } from 'app/shared/model/sheikh.model';
import { getEntities as getSheikhs } from 'app/entities/sheikh/sheikh.reducer';
import { ICenter } from 'app/shared/model/center.model';
import { getEntity, updateEntity, createEntity, reset } from './center.reducer';

export const CenterUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sheikhs = useAppSelector(state => state.sheikh.entities);
  const centerEntity = useAppSelector(state => state.center.entity);
  const loading = useAppSelector(state => state.center.loading);
  const updating = useAppSelector(state => state.center.updating);
  const updateSuccess = useAppSelector(state => state.center.updateSuccess);
  const handleClose = () => {
    navigate('/center' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSheikhs({}));
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
    if (values.numberOfStudents !== undefined && typeof values.numberOfStudents !== 'number') {
      values.numberOfStudents = Number(values.numberOfStudents);
    }
    if (values.numberOfTeachers !== undefined && typeof values.numberOfTeachers !== 'number') {
      values.numberOfTeachers = Number(values.numberOfTeachers);
    }

    const entity = {
      ...centerEntity,
      ...values,
      sheikhs: mapIdList(values.sheikhs),
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
          ...centerEntity,
          sheikhs: centerEntity?.sheikhs?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.center.home.createOrEditLabel" data-cy="CenterCreateUpdateHeading">
            انشاء او تعديل مركز تحفيظ
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="center-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="اسم مركز التحفيظ" id="center-name" name="name" data-cy="name" type="text" />
              <ValidatedField label="عنوان مركز التحفيظ" id="center-address" name="address" data-cy="address" type="text" />
              <ValidatedField label="رقم الهاتف " id="center-phoneNumber" name="phoneNumber" data-cy="phoneNumber" type="text" />
              <ValidatedField label="البريد الالكترونى" id="center-email" name="email" data-cy="email" type="text" />
              <ValidatedField label=" اسم مدير المركز" id="center-managerName" name="managerName" data-cy="managerName" type="text" />
              <ValidatedField label=" ساعات العمل" id="center-workingHours" name="workingHours" data-cy="workingHours" type="text" />
              <ValidatedField
                label="اعداد الطلبة"
                id="center-numberOfStudents"
                name="numberOfStudents"
                data-cy="numberOfStudents"
                type="text"
              />
              <ValidatedField
                label="اعداد المشابخ"
                id="center-numberOfTeachers"
                name="numberOfTeachers"
                data-cy="numberOfTeachers"
                type="text"
              />
              <ValidatedField
                label="تاريخ التأسيس"
                id="center-establishmentDate"
                name="establishmentDate"
                data-cy="establishmentDate"
                type="date"
              />
              {/* <ValidatedField
                label="Programs Offered"
                id="center-programsOffered"
                name="programsOffered"
                data-cy="programsOffered"
                type="text"
              /> */}
              <ValidatedField label="الوصف" id="center-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="الشيوخ" id="center-sheikhs" data-cy="sheikhs" type="select" multiple name="sheikhs">
                <option value="" key="0" />
                {sheikhs
                  ? sheikhs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.firstName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/center" replace>
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline"></span>
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

export default CenterUpdate;
