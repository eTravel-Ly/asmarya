import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedBlobField, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createEntity, getEntity, reset, updateEntity } from './slider.reducer';

export const SliderUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sliderEntity = useAppSelector(state => state.slider.entity);
  const loading = useAppSelector(state => state.slider.loading);
  const updating = useAppSelector(state => state.slider.updating);
  const updateSuccess = useAppSelector(state => state.slider.updateSuccess);

  const handleClose = () => {
    navigate('/slider' + location.search);
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
      ...sliderEntity,
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
          ...sliderEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.slider.home.createOrEditLabel" data-cy="SliderCreateUpdateHeading">
            إنشاء أو تعديل شريط التمرير
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>جاري التحميل...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="slider-id" label="الرقم التعريفي" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="التفاصيل بالعربية" id="slider-detailsAr" name="detailsAr" data-cy="detailsAr" type="text" />
              <ValidatedField label="التفاصيل بالإنجليزية" id="slider-detailsEn" name="detailsEn" data-cy="detailsEn" type="text" />
              <ValidatedField label="ترتيب القائمة" id="slider-menuOrder" name="menuOrder" data-cy="menuOrder" type="text" />
              <ValidatedField label="رابط صورة الملف" id="slider-imageFileUrl" name="imageFileUrl" data-cy="imageFileUrl" type="text" />
              <ValidatedBlobField label="صورة الملف" id="slider-imageFile" name="imageFile" data-cy="imageFile" isImage accept="image/*" />
              <ValidatedField label="الرابط" id="slider-link" name="link" data-cy="link" type="text" />
              <ValidatedField label="ملاحظات" id="slider-notes" name="notes" data-cy="notes" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/slider" replace>
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

export default SliderUpdate;
