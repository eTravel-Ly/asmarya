import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './course.reducer';

export const CourseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const courseEntity = useAppSelector(state => state.course.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="courseDetailsHeading">Course</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{courseEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{courseEntity.title}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{courseEntity.description}</dd>
          <dt>
            <span id="language">Language</span>
          </dt>
          <dd>{courseEntity.language}</dd>
          <dt>
            <span id="coverImageFile">Cover Image File</span>
          </dt>
          <dd>
            {courseEntity.coverImageFile ? (
              <div>
                {courseEntity.coverImageFileContentType ? (
                  <a onClick={openFile(courseEntity.coverImageFileContentType, courseEntity.coverImageFile)}>
                    <img
                      src={`data:${courseEntity.coverImageFileContentType};base64,${courseEntity.coverImageFile}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {courseEntity.coverImageFileContentType}, {byteSize(courseEntity.coverImageFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="coverImageUrl">Cover Image Url</span>
          </dt>
          <dd>{courseEntity.coverImageUrl}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{courseEntity.price}</dd>
          <dt>
            <span id="studentsPrice">Students Price</span>
          </dt>
          <dd>{courseEntity.studentsPrice}</dd>
          <dt>
            <span id="keywords">Keywords</span>
          </dt>
          <dd>{courseEntity.keywords}</dd>
          <dt>Categories</dt>
          <dd>
            {courseEntity.categories
              ? courseEntity.categories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {courseEntity.categories && i === courseEntity.categories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/course" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/course/${courseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CourseDetail;
