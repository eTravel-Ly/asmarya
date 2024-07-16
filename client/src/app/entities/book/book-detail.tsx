import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './book.reducer';

export const BookDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bookEntity = useAppSelector(state => state.book.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookDetailsHeading">Book</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{bookEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{bookEntity.title}</dd>
          <dt>
            <span id="author">Author</span>
          </dt>
          <dd>{bookEntity.author}</dd>
          <dt>
            <span id="publicationDate">Publication Date</span>
          </dt>
          <dd>
            {bookEntity.publicationDate ? (
              <TextFormat value={bookEntity.publicationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="isbn">Isbn</span>
          </dt>
          <dd>{bookEntity.isbn}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{bookEntity.description}</dd>
          <dt>
            <span id="genre">Genre</span>
          </dt>
          <dd>{bookEntity.genre}</dd>
          <dt>
            <span id="publisher">Publisher</span>
          </dt>
          <dd>{bookEntity.publisher}</dd>
          <dt>
            <span id="pageCount">Page Count</span>
          </dt>
          <dd>{bookEntity.pageCount}</dd>
          <dt>
            <span id="language">Language</span>
          </dt>
          <dd>{bookEntity.language}</dd>
          <dt>
            <span id="coverImageFile">Cover Image File</span>
          </dt>
          <dd>
            {bookEntity.coverImageFile ? (
              <div>
                {bookEntity.coverImageFileContentType ? (
                  <a onClick={openFile(bookEntity.coverImageFileContentType, bookEntity.coverImageFile)}>
                    <img
                      src={`data:${bookEntity.coverImageFileContentType};base64,${bookEntity.coverImageFile}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {bookEntity.coverImageFileContentType}, {byteSize(bookEntity.coverImageFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="coverImageUrl">Cover Image Url</span>
          </dt>
          <dd>{bookEntity.coverImageUrl}</dd>
          <dt>
            <span id="bookFile">Book File</span>
          </dt>
          <dd>
            {bookEntity.bookFile ? (
              <div>
                {bookEntity.bookFileContentType ? (
                  <a onClick={openFile(bookEntity.bookFileContentType, bookEntity.bookFile)}>
                    <img src={`data:${bookEntity.bookFileContentType};base64,${bookEntity.bookFile}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {bookEntity.bookFileContentType}, {byteSize(bookEntity.bookFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="bookUrl">Book Url</span>
          </dt>
          <dd>{bookEntity.bookUrl}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{bookEntity.price}</dd>
          <dt>
            <span id="studentsPrice">Students Price</span>
          </dt>
          <dd>{bookEntity.studentsPrice}</dd>
          <dt>
            <span id="numberOfBooksAvailable">Number Of Books Available</span>
          </dt>
          <dd>{bookEntity.numberOfBooksAvailable}</dd>
          <dt>
            <span id="keywords">Keywords</span>
          </dt>
          <dd>{bookEntity.keywords}</dd>
          <dt>
            <span id="bookAvailability">Book Availability</span>
          </dt>
          <dd>{bookEntity.bookAvailability}</dd>
          <dt>Categories</dt>
          <dd>
            {bookEntity.categories
              ? bookEntity.categories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {bookEntity.categories && i === bookEntity.categories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/book" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book/${bookEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BookDetail;
