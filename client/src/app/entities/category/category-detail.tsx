import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './category.reducer';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export const CategoryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const categoryEntity = useAppSelector(state => state.category.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="categoryDetailsHeading">التصنيف</h2>
        <br />
        <table className="table table-bordered table-hover table-custom">
          <tbody>
            <tr>
              <th scope="row">رقم ت.</th>
              <td>{categoryEntity.id}</td>
            </tr>
            <tr>
              <th scope="row">الاسم عربي</th>
              <td>{categoryEntity.nameAr}</td>
            </tr>
            <tr>
              <th scope="row">الاسم انجليزي</th>
              <td>{categoryEntity.nameEn}</td>
            </tr>
            <tr>
              <th scope="row">الترتيب</th>
              <td>{categoryEntity.menuOrder}</td>
            </tr>
            <tr>
              <th scope="row">الملاحظات</th>
              <td>{categoryEntity.notes}</td>
            </tr>
            <tr>
              <th scope="row">الحالة</th>
              <td>
                {categoryEntity.isActive ? (
                  <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <Button tag={Link} to="/category" replace data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline"></span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/category/${categoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
      <Col md="4">
        <img src={`/api/uploads/file/download/${categoryEntity.imageFileUrl}`} alt={categoryEntity.nameEn} className="img-fluid" />
      </Col>
    </Row>
  );
};

export default CategoryDetail;
