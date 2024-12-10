import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, openFile, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './event.reducer';
import { getEntities as getEventSubscribers } from '../event-subscription/event-subscription.reducer';
import { IEventSubscription } from 'app/shared/model/event-subscription.model';

export const EventDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  const [subscribers, setSubscribers] = useState([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    fetchEventSubscribers(id);
  }, [id]);

  const fetchEventSubscribers = async (eventId: string) => {
    setLoadingSubscribers(true);
    try {
      const response = await dispatch(
        getEventSubscribers({
          page: 0, // Set appropriate pagination if needed
          size: 20, // Set the size of the page or any default value
          sort: 'id,asc', // Optional sorting
          filters: { 'event.id': eventId }, // Pass the eventId as a filter
        }),
      );

      // Cast response.payload to the expected type
      const { data } = response.payload as { data: IEventSubscription[] };
      setSubscribers(data); // Set the subscribers from the API response
    } catch (error) {
      console.error('Failed to fetch subscribers', error);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  const eventEntity = useAppSelector(state => state.event.entity);

  return (
    <Row>
      <Col md="6">
        {/* Event Details */}
        <h2 data-cy="eventDetailsHeading">تفاصيل الحدث</h2>
        <Table responsive>
          <tbody>
            <tr>
              <th>الرقم التعريفي</th>
              <td>{eventEntity.id}</td>
            </tr>
            <tr>
              <th>العنوان</th>
              <td>{eventEntity.title}</td>
            </tr>
            <tr>
              <th>المنظم</th>
              <td>{eventEntity.organizer}</td>
            </tr>
            <tr>
              <th>العنوان</th>
              <td>{eventEntity.address}</td>
            </tr>
            <tr>
              <th>الوصف</th>
              <td>{eventEntity.description}</td>
            </tr>
            <tr>
              <th>نوع الحدث</th>
              <td>{eventEntity.eventType}</td>
            </tr>
            <tr>
              <th>نوع المشاركة</th>
              <td>{eventEntity.participationType}</td>
            </tr>
            <tr>
              <th>تاريخ بدء الحدث</th>
              <td>
                {eventEntity.eventStartDate ? (
                  <TextFormat value={eventEntity.eventStartDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th>تاريخ نهاية الحدث</th>
              <td>
                {eventEntity.eventEndDate ? (
                  <TextFormat value={eventEntity.eventEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th>تاريخ بدء التقديم</th>
              <td>
                {eventEntity.applyStartDate ? (
                  <TextFormat value={eventEntity.applyStartDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th>تاريخ انتهاء التقديم</th>
              <td>
                {eventEntity.applyEndDate ? (
                  <TextFormat value={eventEntity.applyEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th>تاريخ انتهاء تقديم الملخص</th>
              <td>
                {eventEntity.abstractApplyEndDate ? (
                  <TextFormat value={eventEntity.abstractApplyEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th>تاريخ إعادة تقديم الأوراق</th>
              <td>
                {eventEntity.papersReplayDate ? (
                  <TextFormat value={eventEntity.papersReplayDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th>تاريخ انتهاء التسجيل</th>
              <td>
                {eventEntity.enrollmentEndDate ? (
                  <TextFormat value={eventEntity.enrollmentEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th>هاتف الاتصال</th>
              <td>{eventEntity.contactMobile}</td>
            </tr>
            <tr>
              <th>واتس آب الاتصال</th>
              <td>{eventEntity.contactWhatsApp}</td>
            </tr>
            <tr>
              <th>موقع الاتصال</th>
              <td>{eventEntity.contactWebsite}</td>
            </tr>
            <tr>
              <th>بريد الاتصال الإلكتروني</th>
              <td>{eventEntity.contactEmail}</td>
            </tr>
            <tr>
              <th>الشروط</th>
              <td>{eventEntity.conditions}</td>
            </tr>
            <tr>
              <th>الملاحظات</th>
              <td>{eventEntity.notes}</td>
            </tr>
            <tr>
              <th>ملف صورة الغلاف</th>
              <td>
                <div>
                  <img src={`/api/uploads/file/download/${eventEntity.coverImageFile}`} style={{ maxHeight: '30px' }} />
                </div>
              </td>
            </tr>
            <tr>
              <th>رابط صورة الغلاف</th>
              <td>{eventEntity.coverImageUrl}</td>
            </tr>
            <tr>
              <th>مفعل</th>
              <td>{eventEntity.isActive ? 'صحيح' : 'خطأ'}</td>
            </tr>
          </tbody>
        </Table>
        <Button tag={Link} to="/event" replace data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline"></span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event/${eventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>

      <Col md="6">
        {/* Subscribers List */}
        <h3>مشتركون في الحدث</h3>
        {loadingSubscribers ? (
          <p>تحميل المشتركين...</p>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th>ID </th>
                <th>الاسم الكامل</th>
                <th>الجنس</th>
                <th>تاريخ الميلاد</th>
                <th>البريد الإلكتروني</th>
                <th>رقم الهاتف </th>
                <th>المدينة</th>
                <th>رمز الجنسية</th>
                <th>حالة </th>
                <th>تاريخ </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, i) => (
                <tr key={`subscriber-${i}`}>
                  <td>{subscriber.id}</td>
                  <td>{subscriber.fullName}</td>
                  <td>{subscriber.gender}</td>
                  <td>{subscriber.birthDate}</td>
                  <td>{subscriber.email}</td>
                  <td>{subscriber.mobileNo}</td>
                  <td>{subscriber.city}</td>
                  <td>{subscriber.nationalityCode}</td>
                  <td>{subscriber.subscriptionStatus}</td>
                  <td>{subscriber.subscriptionDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default EventDetail;
