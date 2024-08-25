import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedBlobField, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getEvents } from 'app/entities/event/event.reducer';
import { getEntities as getLearners } from 'app/entities/learner/learner.reducer';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { SubscriptionStatus } from 'app/shared/model/enumerations/subscription-status.model';
import { createEntity, getEntity, reset, updateEntity } from './event-subscription.reducer';

export const EventSubscriptionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const events = useAppSelector(state => state.event.entities);
  const learners = useAppSelector(state => state.learner.entities);
  const eventSubscriptionEntity = useAppSelector(state => state.eventSubscription.entity);
  const loading = useAppSelector(state => state.eventSubscription.loading);
  const updating = useAppSelector(state => state.eventSubscription.updating);
  const updateSuccess = useAppSelector(state => state.eventSubscription.updateSuccess);
  const genderValues = Object.keys(Gender);
  const subscriptionStatusValues = Object.keys(SubscriptionStatus);

  const handleClose = () => {
    navigate('/event-subscription' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getEvents({}));
    dispatch(getLearners({}));
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
      ...eventSubscriptionEntity,
      ...values,
      event: events.find(it => it.id.toString() === values.event?.toString()),
      learner: learners.find(it => it.id.toString() === values.learner?.toString()),
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
          gender: 'MALE',
          subscriptionStatus: 'PENDING',
          ...eventSubscriptionEntity,
          event: eventSubscriptionEntity?.event?.id,
          learner: eventSubscriptionEntity?.learner?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.eventSubscription.home.createOrEditLabel" data-cy="EventSubscriptionCreateUpdateHeading">
            Create or edit a Event Subscription
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="event-subscription-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Full Name" id="event-subscription-fullName" name="fullName" data-cy="fullName" type="text" />
              <ValidatedField label="Gender" id="event-subscription-gender" name="gender" data-cy="gender" type="select">
                {genderValues.map(gender => (
                  <option value={gender} key={gender}>
                    {gender}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Birth Date" id="event-subscription-birthDate" name="birthDate" data-cy="birthDate" type="text" />
              <ValidatedField label="Email" id="event-subscription-email" name="email" data-cy="email" type="text" />
              <ValidatedField label="Mobile No" id="event-subscription-mobileNo" name="mobileNo" data-cy="mobileNo" type="text" />
              <ValidatedField label="City" id="event-subscription-city" name="city" data-cy="city" type="text" />
              <ValidatedField
                label="Nationality Code"
                id="event-subscription-nationalityCode"
                name="nationalityCode"
                data-cy="nationalityCode"
                type="text"
              />
              <ValidatedField
                label="Subscription Status"
                id="event-subscription-subscriptionStatus"
                name="subscriptionStatus"
                data-cy="subscriptionStatus"
                type="select"
              >
                {subscriptionStatusValues.map(subscriptionStatus => (
                  <option value={subscriptionStatus} key={subscriptionStatus}>
                    {subscriptionStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Results" id="event-subscription-results" name="results" data-cy="results" type="text" />
              <ValidatedField
                label="Subscriber Notes"
                id="event-subscription-subscriberNotes"
                name="subscriberNotes"
                data-cy="subscriberNotes"
                type="text"
              />
              <ValidatedField label="Notes" id="event-subscription-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedField
                label="Subscription Date"
                id="event-subscription-subscriptionDate"
                name="subscriptionDate"
                data-cy="subscriptionDate"
                type="text"
              />
              <ValidatedField
                label="Attachment Url"
                id="event-subscription-attachmentUrl"
                name="attachmentUrl"
                data-cy="attachmentUrl"
                type="text"
              />
              <ValidatedBlobField
                label="Attachment File"
                id="event-subscription-attachmentFile"
                name="attachmentFile"
                data-cy="attachmentFile"
                isImage
                accept="image/*"
              />
              <ValidatedField id="event-subscription-event" name="event" data-cy="event" label="Event" type="select">
                <option value="" key="0" />
                {events
                  ? events.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.title}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="event-subscription-learner" name="learner" data-cy="learner" label="Learner" type="select">
                <option value="" key="0" />
                {learners
                  ? learners.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.firstName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/event-subscription" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EventSubscriptionUpdate;
