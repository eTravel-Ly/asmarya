import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { byteSize, openFile, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './event.reducer';

export const EventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const eventEntity = useAppSelector(state => state.event.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventDetailsHeading">الحدث</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{eventEntity.id}</dd>
          <dt>
            <span id="title">العنوان</span>
          </dt>
          <dd>{eventEntity.title}</dd>
          <dt>
            <span id="organizer">المنظم</span>
          </dt>
          <dd>{eventEntity.organizer}</dd>
          <dt>
            <span id="address">العنوان</span>
          </dt>
          <dd>{eventEntity.address}</dd>
          <dt>
            <span id="description">الوصف</span>
          </dt>
          <dd>{eventEntity.description}</dd>
          <dt>
            <span id="eventType">نوع الحدث</span>
          </dt>
          <dd>{eventEntity.eventType}</dd>
          <dt>
            <span id="participationType">نوع المشاركة</span>
          </dt>
          <dd>{eventEntity.participationType}</dd>
          <dt>
            <span id="eventStartDate">تاريخ بدء الحدث</span>
          </dt>
          <dd>
            {eventEntity.eventStartDate ? (
              <TextFormat value={eventEntity.eventStartDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="eventEndDate">تاريخ نهاية الحدث</span>
          </dt>
          <dd>
            {eventEntity.eventEndDate ? <TextFormat value={eventEntity.eventEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="applyStartDate">تاريخ بدء التقديم</span>
          </dt>
          <dd>
            {eventEntity.applyStartDate ? (
              <TextFormat value={eventEntity.applyStartDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="applyEndDate">تاريخ انتهاء التقديم</span>
          </dt>
          <dd>
            {eventEntity.applyEndDate ? <TextFormat value={eventEntity.applyEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="abstractApplyEndDate">تاريخ انتهاء تقديم الملخص</span>
          </dt>
          <dd>
            {eventEntity.abstractApplyEndDate ? (
              <TextFormat value={eventEntity.abstractApplyEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="papersReplayDate">تاريخ إعادة تقديم الأوراق</span>
          </dt>
          <dd>
            {eventEntity.papersReplayDate ? (
              <TextFormat value={eventEntity.papersReplayDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="enrollmentEndDate">تاريخ انتهاء التسجيل</span>
          </dt>
          <dd>
            {eventEntity.enrollmentEndDate ? (
              <TextFormat value={eventEntity.enrollmentEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="contactMobile">هاتف الاتصال</span>
          </dt>
          <dd>{eventEntity.contactMobile}</dd>
          <dt>
            <span id="contactWhatsApp">واتس آب الاتصال</span>
          </dt>
          <dd>{eventEntity.contactWhatsApp}</dd>
          <dt>
            <span id="contactWebsite">موقع الاتصال</span>
          </dt>
          <dd>{eventEntity.contactWebsite}</dd>
          <dt>
            <span id="contactEmail">بريد الاتصال الإلكتروني</span>
          </dt>
          <dd>{eventEntity.contactEmail}</dd>
          <dt>
            <span id="conditions">الشروط</span>
          </dt>
          <dd>{eventEntity.conditions}</dd>
          <dt>
            <span id="notes">الملاحظات</span>
          </dt>
          <dd>{eventEntity.notes}</dd>
          <dt>
            <span id="coverImageFile">ملف صورة الغلاف</span>
          </dt>
          <dd>
            {eventEntity.coverImageFile ? (
              <div>
                {eventEntity.coverImageFileContentType ? (
                  <a onClick={openFile(eventEntity.coverImageFileContentType, eventEntity.coverImageFile)}>
                    <img
                      src={`data:${eventEntity.coverImageFileContentType};base64,${eventEntity.coverImageFile}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {eventEntity.coverImageFileContentType}, {byteSize(eventEntity.coverImageFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="coverImageUrl">رابط صورة الغلاف</span>
          </dt>
          <dd>{eventEntity.coverImageUrl}</dd>
          <dt>
            <span id="isActive">مفعل</span>
          </dt>
          <dd>{eventEntity.isActive ? 'صحيح' : 'خطأ'}</dd>
        </dl>
        <Button tag={Link} to="/event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event/${eventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EventDetail;
