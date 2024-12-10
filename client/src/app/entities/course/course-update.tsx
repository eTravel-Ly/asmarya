import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { Language } from 'app/shared/model/enumerations/language.model';
import { getEntity, updateEntity, createEntity, reset } from './course.reducer';

export const CourseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categories = useAppSelector(state => state.category.entities);
  const courseEntity = useAppSelector(state => state.course.entity);
  const loading = useAppSelector(state => state.course.loading);
  const updating = useAppSelector(state => state.course.updating);
  const updateSuccess = useAppSelector(state => state.course.updateSuccess);
  const languageValues = Object.keys(Language);

  const handleClose = () => {
    navigate('/course' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCategories({}));
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
    if (values.price !== undefined && typeof values.price !== 'number') {
      values.price = Number(values.price);
    }
    if (values.studentsPrice !== undefined && typeof values.studentsPrice !== 'number') {
      values.studentsPrice = Number(values.studentsPrice);
    }

    const entity = {
      ...courseEntity,
      ...values,
      categories: mapIdList(values.categories),
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
          language: 'ARABIC',
          ...courseEntity,
          categories: courseEntity?.categories?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.course.home.createOrEditLabel" data-cy="CourseCreateUpdateHeading">
            إنشاء أو تعديل دورة
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>جاري التحميل...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="course-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="العنوان"
                id="course-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'هذا الحقل مطلوب.' },
                }}
              />
              <ValidatedField label="الوصف" id="course-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="اللغة" id="course-language" name="language" data-cy="language" type="select">
                {languageValues.map(language => (
                  <option value={language} key={language}>
                    {language}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label="صورة الغلاف"
                id="course-coverImageFile"
                name="coverImageFile"
                data-cy="coverImageFile"
                isImage
                accept="image/*"
              />
              {/* <ValidatedField label="رابط صورة الغلاف" id="course-coverImageUrl" name="coverImageUrl" data-cy="coverImageUrl" type="text" /> */}
              <ValidatedField label="السعر" id="course-price" name="price" data-cy="price" type="text" />
              <ValidatedField label="سعر الطلاب" id="course-studentsPrice" name="studentsPrice" data-cy="studentsPrice" type="text" />
              <ValidatedField label="الكلمات الرئيسية" id="course-keywords" name="keywords" data-cy="keywords" type="text" />
              <ValidatedField label="الفئات" id="course-categories" data-cy="categories" type="select" multiple name="categories">
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nameAr}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/course" replace>
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

export default CourseUpdate;
