import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedBlobField, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { createEntity, getEntity, reset, updateEntity } from './course-video.reducer';

export const CourseVideoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const courses = useAppSelector(state => state.course.entities);
  const courseVideoEntity = useAppSelector(state => state.courseVideo.entity);
  const loading = useAppSelector(state => state.courseVideo.loading);
  const updating = useAppSelector(state => state.courseVideo.updating);
  const updateSuccess = useAppSelector(state => state.courseVideo.updateSuccess);

  // Extract courseId from query parameters
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('courseId');

  const handleClose = () => {
    navigate('/course-video' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCourses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...courseVideoEntity,
      ...values,
      course: courses.find(it => it.id.toString() === (courseId || values.course?.toString())),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? { course: courseId } // Preselect course if courseId is provided
      : {
          ...courseVideoEntity,
          course: courseVideoEntity?.course?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="asmaryaApp.courseVideo.home.createOrEditLabel" data-cy="CourseVideoCreateUpdateHeading">
            Create or edit a Course Video
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="course-video-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Title"
                id="course-video-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Details" id="course-video-details" name="details" data-cy="details" type="text" />
              <ValidatedBlobField label="File" id="course-video-file" name="file" data-cy="file" openActionLabel="Open" />
              <ValidatedField label="File Url" id="course-video-fileUrl" name="fileUrl" data-cy="fileUrl" type="text" />
              <ValidatedField
                label="Duration In Seconds"
                id="course-video-durationInSeconds"
                name="durationInSeconds"
                data-cy="durationInSeconds"
                type="text"
              />
              {/* Show the course field only if courseId is not preselected */}
              {!courseId && (
                <ValidatedField id="course-video-course" name="course" data-cy="course" label="Course" type="select">
                  <option value="" key="0" />
                  {courses
                    ? courses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </ValidatedField>
              )}
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/course-video" replace color="info">
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

export default CourseVideoUpdate;
