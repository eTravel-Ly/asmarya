import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './book.reducer';

export const BookDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [id]);

  const bookEntity = useAppSelector(state => state.book.entity);

  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookDetailsHeading">Book</h2>
        <table className="table table-bordered table-hover table-custom">
          <tbody>
            <tr>
              <th scope="row">رقم ت.</th>
              <td colSpan={3}>{bookEntity.id}</td>
            </tr>
            <tr>
              <th scope="row">العنوان</th>
              <td colSpan={3}>{bookEntity.title}</td>
            </tr>
            <tr>
              <th scope="row">المؤلف</th>
              <td colSpan={3}>{bookEntity.author}</td>
            </tr>
            <tr>
              <th scope="row">تاريخ النشر</th>
              <td colSpan={3}>{bookEntity.publicationDate}</td>
            </tr>
            <tr>
              <th scope="row">رقم الـ ISBN</th>
              <td colSpan={3}>{bookEntity.isbn}</td>
            </tr>
            <tr>
              <th scope="row">الوصف</th>
              <td colSpan={3}>{bookEntity.description}</td>
            </tr>
            <tr>
              <th scope="row">النوع</th>
              <td colSpan={3}>{bookEntity.genre}</td>
            </tr>
            <tr>
              <th scope="row">الناشر</th>
              <td colSpan={3}>{bookEntity.publisher}</td>
            </tr>
            <tr>
              <th scope="row">عدد الصفحات</th>
              <td colSpan={3}>{bookEntity.pageCount}</td>
            </tr>
            <tr>
              <th scope="row">اللغة</th>
              <td colSpan={3}>{bookEntity.language}</td>
            </tr>
            <tr>
              <th scope="row">رابط صورة الغلاف</th>
              <td colSpan={3}>{bookEntity.coverImageUrl}</td>
            </tr>
            <tr>
              <th scope="row">رابط الكتاب</th>
              <td colSpan={3}>{bookEntity.bookUrl}</td>
            </tr>
            <tr>
              <th scope="row">السعر</th>
              <td colSpan={3}>{bookEntity.price}</td>
            </tr>
            <tr>
              <th scope="row">سعر الطلاب</th>
              <td colSpan={3}>{bookEntity.studentsPrice}</td>
            </tr>
            <tr>
              <th scope="row">عدد النسخ المتاحة</th>
              <td colSpan={3}>{bookEntity.numberOfBooksAvailable}</td>
            </tr>
            <tr>
              <th scope="row">الكلمات الدالة</th>
              <td colSpan={3}>{bookEntity.keywords}</td>
            </tr>
            <tr>
              <th scope="row">توافر الكتاب</th>
              <td colSpan={3}>{bookEntity.bookAvailability}</td>
            </tr>
            <tr>
              <th>الفئات</th>
              <td colSpan={3}>
                {bookEntity.categories
                  ? bookEntity.categories.map((category, index) => (
                      <span key={index}>
                        {category.nameAr}
                        {index !== bookEntity.categories.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : null}
              </td>
            </tr>
          </tbody>
        </table>
        <Button tag={Link} to="/book" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book/${bookEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
      <Col md="4">
        <br />
        <br />
        <img src={`/api/uploads/file/download/${bookEntity.coverImageUrl}`} alt={bookEntity.title} className="img-fluid" />
        <br />
        <br />
        {bookEntity.bookUrl ? (
          <iframe
            src={`/api/uploads/file/download/${bookEntity.bookUrl}`}
            title="PDF Viewer"
            width="100%"
            height="600px"
            style={{ border: 'none' }}
          />
        ) : (
          <p>No PDF available</p>
        )}
      </Col>
    </Row>
  );
};

export default BookDetail;
