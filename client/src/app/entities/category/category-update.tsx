import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import { getEntity, updateEntity, createEntity, reset } from './category.reducer';

export const CategoryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categoryEntity = useAppSelector(state => state.category.entity);
  const loading = useAppSelector(state => state.category.loading);
  const updating = useAppSelector(state => state.category.updating);
  const updateSuccess = useAppSelector(state => state.category.updateSuccess);

  const handleClose = () => {
    navigate('/category' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
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
    if (values.menuOrder !== undefined && typeof values.menuOrder !== 'number') {
      values.menuOrder = Number(values.menuOrder);
    }

    const entity = {
      ...categoryEntity,
      ...values,
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
          ...categoryEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.category.home.createOrEditLabel" data-cy="CategoryCreateUpdateHeading">
            اضافة او تعديل فئة
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="category-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="الاسم بالعربية" id="category-nameAr" name="nameAr" data-cy="nameAr" type="text" />
              <ValidatedField label="الاسم بالإنجليزية" id="category-nameEn" name="nameEn" data-cy="nameEn" type="text" />
              <ValidatedField label="ترتيب القائمة" id="category-menuOrder" name="menuOrder" data-cy="menuOrder" type="text" />
              <ValidatedField label="رابط صورة الملف" id="category-imageFileUrl" name="imageFileUrl" data-cy="imageFileUrl" type="text" />
              <ValidatedBlobField
                label="صورة الملف"
                id="category-imageFile"
                name="imageFile"
                data-cy="imageFile"
                isImage
                accept="image/*"
              />
              <ValidatedField label="ملاحظات" id="category-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedField label="هل مفعل" id="category-isActive" name="isActive" data-cy="isActive" check type="checkbox" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/category" replace>
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

export default CategoryUpdate;
