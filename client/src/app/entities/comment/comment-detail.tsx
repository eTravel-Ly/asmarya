import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './comment.reducer';

export const CommentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const commentEntity = useAppSelector(state => state.comment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="commentDetailsHeading">Comment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{commentEntity.id}</dd>
          <dt>
            <span id="details">Details</span>
          </dt>
          <dd>{commentEntity.details}</dd>
          <dt>
            <span id="likesCount">Likes Count</span>
          </dt>
          <dd>{commentEntity.likesCount}</dd>
          <dt>
            <span id="dislikesCount">Dislikes Count</span>
          </dt>
          <dd>{commentEntity.dislikesCount}</dd>
          <dt>Learner</dt>
          <dd>{commentEntity.learner ? commentEntity.learner.firstName : ''}</dd>
          <dt>Book</dt>
          <dd>{commentEntity.book ? commentEntity.book.title : ''}</dd>
          <dt>Course</dt>
          <dd>{commentEntity.course ? commentEntity.course.title : ''}</dd>
        </dl>
        <Button tag={Link} to="/comment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comment/${commentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CommentDetail;
