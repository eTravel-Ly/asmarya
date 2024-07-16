import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './category.reducer';

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
        <h2 data-cy="categoryDetailsHeading">Category</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{categoryEntity.id}</dd>
          <dt>
            <span id="nameAr">Name Ar</span>
          </dt>
          <dd>{categoryEntity.nameAr}</dd>
          <dt>
            <span id="nameEn">Name En</span>
          </dt>
          <dd>{categoryEntity.nameEn}</dd>
          <dt>
            <span id="menuOrder">Menu Order</span>
          </dt>
          <dd>{categoryEntity.menuOrder}</dd>
          <dt>
            <span id="imageFileUrl">Image File Url</span>
          </dt>
          <dd>{categoryEntity.imageFileUrl}</dd>
          <dt>
            <span id="imageFile">Image File</span>
          </dt>
          <dd>
            {categoryEntity.imageFile ? (
              <div>
                {categoryEntity.imageFileContentType ? (
                  <a onClick={openFile(categoryEntity.imageFileContentType, categoryEntity.imageFile)}>
                    <img
                      src={`data:${categoryEntity.imageFileContentType};base64,${categoryEntity.imageFile}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {categoryEntity.imageFileContentType}, {byteSize(categoryEntity.imageFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{categoryEntity.notes}</dd>
          <dt>
            <span id="isActive">Is Active</span>
          </dt>
          <dd>{categoryEntity.isActive ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/category" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/category/${categoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CategoryDetail;
