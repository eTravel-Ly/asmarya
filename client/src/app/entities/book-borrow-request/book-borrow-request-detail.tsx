import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './book-borrow-request.reducer';

export const BookBorrowRequestDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bookBorrowRequestEntity = useAppSelector(state => state.bookBorrowRequest.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookBorrowRequestDetailsHeading">Book Borrow Request</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{bookBorrowRequestEntity.id}</dd>
          <dt>
            <span id="requestDate">Request Date</span>
          </dt>
          <dd>
            {bookBorrowRequestEntity.requestDate ? (
              <TextFormat value={bookBorrowRequestEntity.requestDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="collectDate">Collect Date</span>
          </dt>
          <dd>
            {bookBorrowRequestEntity.collectDate ? (
              <TextFormat value={bookBorrowRequestEntity.collectDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="returnDate">Return Date</span>
          </dt>
          <dd>
            {bookBorrowRequestEntity.returnDate ? (
              <TextFormat value={bookBorrowRequestEntity.returnDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="bookBorrowRequestStatus">Book Borrow Request Status</span>
          </dt>
          <dd>{bookBorrowRequestEntity.bookBorrowRequestStatus}</dd>
          <dt>Book</dt>
          <dd>{bookBorrowRequestEntity.book ? bookBorrowRequestEntity.book.title : ''}</dd>
          <dt>Learner</dt>
          <dd>{bookBorrowRequestEntity.learner ? bookBorrowRequestEntity.learner.firstName : ''}</dd>
        </dl>
        <Button tag={Link} to="/book-borrow-request" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book-borrow-request/${bookBorrowRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BookBorrowRequestDetail;
