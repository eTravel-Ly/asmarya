import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './course-video.reducer';

export const CourseVideoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const courseVideoEntity = useAppSelector(state => state.courseVideo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="courseVideoDetailsHeading">Course Video</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{courseVideoEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{courseVideoEntity.title}</dd>
          <dt>
            <span id="details">Details</span>
          </dt>
          <dd>{courseVideoEntity.details}</dd>
          <dt>
            <span id="file">File</span>
          </dt>
          <dd>
            {courseVideoEntity.file ? (
              <div>
                {courseVideoEntity.fileContentType ? (
                  <a onClick={openFile(courseVideoEntity.fileContentType, courseVideoEntity.file)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {courseVideoEntity.fileContentType}, {byteSize(courseVideoEntity.file)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="fileUrl">File Url</span>
          </dt>
          <dd>{courseVideoEntity.fileUrl}</dd>
          <dt>
            <span id="durationInSeconds">Duration In Seconds</span>
          </dt>
          <dd>{courseVideoEntity.durationInSeconds}</dd>
          <dt>Course</dt>
          <dd>{courseVideoEntity.course ? courseVideoEntity.course.title : ''}</dd>
        </dl>
        <Button tag={Link} to="/course-video" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">رجوع</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/course-video/${courseVideoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CourseVideoDetail;
