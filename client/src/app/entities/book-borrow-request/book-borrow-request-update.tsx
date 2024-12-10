import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBook } from 'app/shared/model/book.model';
import { getEntities as getBooks } from 'app/entities/book/book.reducer';
import { ILearner } from 'app/shared/model/learner.model';
import { getEntities as getLearners } from 'app/entities/learner/learner.reducer';
import { IBookBorrowRequest } from 'app/shared/model/book-borrow-request.model';
import { BookBorrowRequestStatus } from 'app/shared/model/enumerations/book-borrow-request-status.model';
import { getEntity, updateEntity, createEntity, reset } from './book-borrow-request.reducer';

export const BookBorrowRequestUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const books = useAppSelector(state => state.book.entities);
  const learners = useAppSelector(state => state.learner.entities);
  const bookBorrowRequestEntity = useAppSelector(state => state.bookBorrowRequest.entity);
  const loading = useAppSelector(state => state.bookBorrowRequest.loading);
  const updating = useAppSelector(state => state.bookBorrowRequest.updating);
  const updateSuccess = useAppSelector(state => state.bookBorrowRequest.updateSuccess);
  const bookBorrowRequestStatusValues = Object.keys(BookBorrowRequestStatus);

  const handleClose = () => {
    navigate('/book-borrow-request' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBooks({}));
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
    values.requestDate = convertDateTimeToServer(values.requestDate);
    values.collectDate = convertDateTimeToServer(values.collectDate);
    values.returnDate = convertDateTimeToServer(values.returnDate);

    const entity = {
      ...bookBorrowRequestEntity,
      ...values,
      book: books.find(it => it.id.toString() === values.book?.toString()),
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
      ? {
          requestDate: displayDefaultDateTime(),
          collectDate: displayDefaultDateTime(),
          returnDate: displayDefaultDateTime(),
        }
      : {
          bookBorrowRequestStatus: 'APPROVED',
          ...bookBorrowRequestEntity,
          requestDate: convertDateTimeFromServer(bookBorrowRequestEntity.requestDate),
          collectDate: convertDateTimeFromServer(bookBorrowRequestEntity.collectDate),
          returnDate: convertDateTimeFromServer(bookBorrowRequestEntity.returnDate),
          book: bookBorrowRequestEntity?.book?.id,
          learner: bookBorrowRequestEntity?.learner?.id,
        };

  return (
    <div>
      {/* <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.bookBorrowRequest.home.createOrEditLabel" data-cy="BookBorrowRequestCreateUpdateHeading">
            Create or edit a Book Borrow Request
          </h2>
        </Col>
      </Row> */}
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              <h2 className="text-center">طلب استعارة كتاب</h2> {/* إضافة العنوان بالعربية */}
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="book-borrow-request-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="تاريخ الطلب"
                id="book-borrow-request-requestDate"
                name="requestDate"
                data-cy="requestDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="تاريخ الاستلام"
                id="book-borrow-request-collectDate"
                name="collectDate"
                data-cy="collectDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="تاريخ العودة"
                id="book-borrow-request-returnDate"
                name="returnDate"
                data-cy="returnDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="حالة طلب استعارة الكتاب"
                id="book-borrow-request-bookBorrowRequestStatus"
                name="bookBorrowRequestStatus"
                data-cy="bookBorrowRequestStatus"
                type="select"
              >
                {bookBorrowRequestStatusValues.map(bookBorrowRequestStatus => (
                  <option value={bookBorrowRequestStatus} key={bookBorrowRequestStatus}>
                    {bookBorrowRequestStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="book-borrow-request-book" name="book" data-cy="book" label="الكتاب" type="select">
                <option value="" key="0" />
                {books
                  ? books.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.title}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="book-borrow-request-learner" name="learner" data-cy="learner" label="المتعلم" type="select">
                <option value="" key="0" />
                {learners
                  ? learners.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.firstName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/book-borrow-request" replace>
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

export default BookBorrowRequestUpdate;
