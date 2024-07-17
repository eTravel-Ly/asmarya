import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
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
        <br />
        <table className="table table-bordered table-hover table-custom">
          <tbody>
            <tr>
              <th scope="row">رقم ت.</th>
              <td>{bookBorrowRequestEntity.id}</td>
            </tr>
            <tr>
              <th scope="row">تاريخ الطلب</th>
              <td>
                {bookBorrowRequestEntity.requestDate ? (
                  <TextFormat value={bookBorrowRequestEntity.requestDate} type="date" format={APP_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th scope="row">تاريخ الاستلام</th>
              <td>
                {bookBorrowRequestEntity.collectDate ? (
                  <TextFormat value={bookBorrowRequestEntity.collectDate} type="date" format={APP_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th scope="row">تاريخ الارجاع</th>
              <td>
                {bookBorrowRequestEntity.returnDate ? (
                  <TextFormat value={bookBorrowRequestEntity.returnDate} type="date" format={APP_DATE_FORMAT} />
                ) : null}
              </td>
            </tr>
            <tr>
              <th scope="row">الحالة</th>
              <td>{bookBorrowRequestEntity.bookBorrowRequestStatus}</td>
            </tr>
            <tr>
              <th scope="row">الكتاب</th>
              <td>{bookBorrowRequestEntity.book ? bookBorrowRequestEntity.book.title : ''}</td>
            </tr>
            <tr>
              <th scope="row">المتدرب</th>
              <td>{bookBorrowRequestEntity.learner ? bookBorrowRequestEntity.learner.firstName : ''}</td>
            </tr>
          </tbody>
        </table>
        <br />
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
