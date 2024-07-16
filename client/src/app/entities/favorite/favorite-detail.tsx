import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './favorite.reducer';

export const FavoriteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const favoriteEntity = useAppSelector(state => state.favorite.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="favoriteDetailsHeading">Favorite</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{favoriteEntity.id}</dd>
          <dt>Learner</dt>
          <dd>{favoriteEntity.learner ? favoriteEntity.learner.firstName : ''}</dd>
          <dt>Book</dt>
          <dd>{favoriteEntity.book ? favoriteEntity.book.title : ''}</dd>
          <dt>Course</dt>
          <dd>{favoriteEntity.course ? favoriteEntity.course.title : ''}</dd>
        </dl>
        <Button tag={Link} to="/favorite" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/favorite/${favoriteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FavoriteDetail;
