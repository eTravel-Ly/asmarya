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
import { IBook } from 'app/shared/model/book.model';
import { BookGenre } from 'app/shared/model/enumerations/book-genre.model';
import { Language } from 'app/shared/model/enumerations/language.model';
import { BookAvailability } from 'app/shared/model/enumerations/book-availability.model';
import { getEntity, updateEntity, createEntity, reset } from './book.reducer';

export const BookUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categories = useAppSelector(state => state.category.entities);
  const bookEntity = useAppSelector(state => state.book.entity);
  const loading = useAppSelector(state => state.book.loading);
  const updating = useAppSelector(state => state.book.updating);
  const updateSuccess = useAppSelector(state => state.book.updateSuccess);
  const bookGenreValues = Object.keys(BookGenre);
  const languageValues = Object.keys(Language);
  const bookAvailabilityValues = Object.keys(BookAvailability);

  const handleClose = () => {
    navigate('/book' + location.search);
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
    if (values.pageCount !== undefined && typeof values.pageCount !== 'number') {
      values.pageCount = Number(values.pageCount);
    }
    if (values.price !== undefined && typeof values.price !== 'number') {
      values.price = Number(values.price);
    }
    if (values.studentsPrice !== undefined && typeof values.studentsPrice !== 'number') {
      values.studentsPrice = Number(values.studentsPrice);
    }
    if (values.numberOfBooksAvailable !== undefined && typeof values.numberOfBooksAvailable !== 'number') {
      values.numberOfBooksAvailable = Number(values.numberOfBooksAvailable);
    }

    const entity = {
      ...bookEntity,
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
          genre: 'BIOGRAPHY',
          language: 'ARABIC',
          bookAvailability: 'AVAILABLE_BOTH',
          ...bookEntity,
          categories: bookEntity?.categories?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.book.home.createOrEditLabel" data-cy="BookCreateUpdateHeading">
            Create or edit a Book
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="book-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Title"
                id="book-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Author"
                id="book-author"
                name="author"
                data-cy="author"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Publication Date"
                id="book-publicationDate"
                name="publicationDate"
                data-cy="publicationDate"
                type="date"
              />
              <ValidatedField label="Isbn" id="book-isbn" name="isbn" data-cy="isbn" type="text" />
              <ValidatedField label="Description" id="book-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="Genre" id="book-genre" name="genre" data-cy="genre" type="select">
                {bookGenreValues.map(bookGenre => (
                  <option value={bookGenre} key={bookGenre}>
                    {bookGenre}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Publisher" id="book-publisher" name="publisher" data-cy="publisher" type="text" />
              <ValidatedField label="Page Count" id="book-pageCount" name="pageCount" data-cy="pageCount" type="text" />
              <ValidatedField label="Language" id="book-language" name="language" data-cy="language" type="select">
                {languageValues.map(language => (
                  <option value={language} key={language}>
                    {language}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label="Cover Image File"
                id="book-coverImageFile"
                name="coverImageFile"
                data-cy="coverImageFile"
                isImage
                accept="image/*"
              />
              <ValidatedField label="Cover Image Url" id="book-coverImageUrl" name="coverImageUrl" data-cy="coverImageUrl" type="text" />
              <ValidatedBlobField label="Book File" id="book-bookFile" name="bookFile" data-cy="bookFile" isImage accept="image/*" />
              <ValidatedField label="Book Url" id="book-bookUrl" name="bookUrl" data-cy="bookUrl" type="text" />
              <ValidatedField label="Price" id="book-price" name="price" data-cy="price" type="text" />
              <ValidatedField label="Students Price" id="book-studentsPrice" name="studentsPrice" data-cy="studentsPrice" type="text" />
              <ValidatedField
                label="Number Of Books Available"
                id="book-numberOfBooksAvailable"
                name="numberOfBooksAvailable"
                data-cy="numberOfBooksAvailable"
                type="text"
              />
              <ValidatedField label="Keywords" id="book-keywords" name="keywords" data-cy="keywords" type="text" />
              <ValidatedField
                label="Book Availability"
                id="book-bookAvailability"
                name="bookAvailability"
                data-cy="bookAvailability"
                type="select"
              >
                {bookAvailabilityValues.map(bookAvailability => (
                  <option value={bookAvailability} key={bookAvailability}>
                    {bookAvailability}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Categories" id="book-categories" data-cy="categories" type="select" multiple name="categories">
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/book" replace color="info">
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

export default BookUpdate;
