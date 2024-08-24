import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedBlobField, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { EventType } from 'app/shared/model/enumerations/event-type.model';
import { ParticipationType } from 'app/shared/model/enumerations/participation-type.model';
import { createEntity, getEntity, reset, updateEntity } from './event.reducer';

export const EventUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const eventEntity = useAppSelector(state => state.event.entity);
  const loading = useAppSelector(state => state.event.loading);
  const updating = useAppSelector(state => state.event.updating);
  const updateSuccess = useAppSelector(state => state.event.updateSuccess);
  const eventTypeValues = Object.keys(EventType);
  const participationTypeValues = Object.keys(ParticipationType);

  const handleClose = () => {
    navigate('/event' + location.search);
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

    const entity = {
      ...eventEntity,
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
          eventType: 'CONFERENCE',
          participationType: 'WRITING',
          ...eventEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.event.home.createOrEditLabel" data-cy="EventCreateUpdateHeading">
            إنشاء أو تعديل حدث
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>جاري التحميل...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="event-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="العنوان"
                id="event-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'هذا الحقل مطلوب.' },
                }}
              />
              <ValidatedField label="المنظم" id="event-organizer" name="organizer" data-cy="organizer" type="text" />
              <ValidatedField label="العنوان" id="event-address" name="address" data-cy="address" type="text" />
              <ValidatedField label="الوصف" id="event-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="نوع الحدث" id="event-eventType" name="eventType" data-cy="eventType" type="select">
                {eventTypeValues.map(eventType => (
                  <option value={eventType} key={eventType}>
                    {eventType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="نوع المشاركة"
                id="event-participationType"
                name="participationType"
                data-cy="participationType"
                type="select"
              >
                {participationTypeValues.map(participationType => (
                  <option value={participationType} key={participationType}>
                    {participationType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="تاريخ بدء الحدث"
                id="event-eventStartDate"
                name="eventStartDate"
                data-cy="eventStartDate"
                type="date"
              />
              <ValidatedField label="تاريخ نهاية الحدث" id="event-eventEndDate" name="eventEndDate" data-cy="eventEndDate" type="date" />
              <ValidatedField
                label="تاريخ بدء التقديم"
                id="event-applyStartDate"
                name="applyStartDate"
                data-cy="applyStartDate"
                type="date"
              />
              <ValidatedField label="تاريخ انتهاء التقديم" id="event-applyEndDate" name="applyEndDate" data-cy="applyEndDate" type="date" />
              <ValidatedField
                label="تاريخ انتهاء تقديم الملخص"
                id="event-abstractApplyEndDate"
                name="abstractApplyEndDate"
                data-cy="abstractApplyEndDate"
                type="date"
              />
              <ValidatedField
                label="تاريخ إعادة تقديم الأوراق"
                id="event-papersReplayDate"
                name="papersReplayDate"
                data-cy="papersReplayDate"
                type="date"
              />
              <ValidatedField
                label="تاريخ انتهاء التسجيل"
                id="event-enrollmentEndDate"
                name="enrollmentEndDate"
                data-cy="enrollmentEndDate"
                type="date"
              />
              <ValidatedField label="هاتف الاتصال" id="event-contactMobile" name="contactMobile" data-cy="contactMobile" type="text" />
              <ValidatedField
                label="واتس آب الاتصال"
                id="event-contactWhatsApp"
                name="contactWhatsApp"
                data-cy="contactWhatsApp"
                type="text"
              />
              <ValidatedField label="موقع الاتصال" id="event-contactWebsite" name="contactWebsite" data-cy="contactWebsite" type="text" />
              <ValidatedField
                label="بريد الاتصال الإلكتروني"
                id="event-contactEmail"
                name="contactEmail"
                data-cy="contactEmail"
                type="text"
              />
              <ValidatedField label="الشروط" id="event-conditions" name="conditions" data-cy="conditions" type="text" />
              <ValidatedField label="الملاحظات" id="event-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedBlobField
                label="ملف صورة الغلاف"
                id="event-coverImageFile"
                name="coverImageFile"
                data-cy="coverImageFile"
                isImage
                accept="image/*"
              />
              <ValidatedField label="رابط صورة الغلاف" id="event-coverImageUrl" name="coverImageUrl" data-cy="coverImageUrl" type="text" />
              <ValidatedField label="مفعل" id="event-isActive" name="isActive" data-cy="isActive" check type="checkbox" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/event" replace color="info">
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

export default EventUpdate;
