import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { byteSize, openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './event-subscription.reducer';

export const EventSubscriptionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const eventSubscriptionEntity = useAppSelector(state => state.eventSubscription.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventSubscriptionDetailsHeading">Event Subscription</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{eventSubscriptionEntity.id}</dd>
          <dt>
            <span id="fullName">Full Name</span>
          </dt>
          <dd>{eventSubscriptionEntity.fullName}</dd>
          <dt>
            <span id="gender">Gender</span>
          </dt>
          <dd>{eventSubscriptionEntity.gender}</dd>
          <dt>
            <span id="birthDate">Birth Date</span>
          </dt>
          <dd>{eventSubscriptionEntity.birthDate}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{eventSubscriptionEntity.email}</dd>
          <dt>
            <span id="mobileNo">Mobile No</span>
          </dt>
          <dd>{eventSubscriptionEntity.mobileNo}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{eventSubscriptionEntity.city}</dd>
          <dt>
            <span id="nationalityCode">Nationality Code</span>
          </dt>
          <dd>{eventSubscriptionEntity.nationalityCode}</dd>
          <dt>
            <span id="subscriptionStatus">Subscription Status</span>
          </dt>
          <dd>{eventSubscriptionEntity.subscriptionStatus}</dd>
          <dt>
            <span id="results">Results</span>
          </dt>
          <dd>{eventSubscriptionEntity.results}</dd>
          <dt>
            <span id="subscriberNotes">Subscriber Notes</span>
          </dt>
          <dd>{eventSubscriptionEntity.subscriberNotes}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{eventSubscriptionEntity.notes}</dd>
          <dt>
            <span id="subscriptionDate">Subscription Date</span>
          </dt>
          <dd>{eventSubscriptionEntity.subscriptionDate}</dd>
          <dt>
            <span id="attachmentUrl">Attachment Url</span>
          </dt>
          <dd>{eventSubscriptionEntity.attachmentUrl}</dd>
          <dt>
            <span id="attachmentFile">Attachment File</span>
          </dt>
          <dd>
            {eventSubscriptionEntity.attachmentFile ? (
              <div>
                {eventSubscriptionEntity.attachmentFileContentType ? (
                  <a onClick={openFile(eventSubscriptionEntity.attachmentFileContentType, eventSubscriptionEntity.attachmentFile)}>
                    <img
                      src={`data:${eventSubscriptionEntity.attachmentFileContentType};base64,${eventSubscriptionEntity.attachmentFile}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {eventSubscriptionEntity.attachmentFileContentType}, {byteSize(eventSubscriptionEntity.attachmentFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Event</dt>
          <dd>{eventSubscriptionEntity.event ? eventSubscriptionEntity.event.title : ''}</dd>
          <dt>Learner</dt>
          <dd>{eventSubscriptionEntity.learner ? eventSubscriptionEntity.learner.firstName : ''}</dd>
        </dl>
        <Button tag={Link} to="/event-subscription" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event-subscription/${eventSubscriptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EventSubscriptionDetail;
