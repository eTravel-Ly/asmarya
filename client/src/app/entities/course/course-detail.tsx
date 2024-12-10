import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './course.reducer';

export const CourseDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    dispatch(getEntity(id));
    // Fetch course videos with courseId as query parameter
    axios.get(`/api/course-videos?courseId=${id}`).then(response => {
      setVideos(response.data);
    });
  }, [id]);

  const courseEntity = useAppSelector(state => state.course.entity);

  const handleDelete = videoId => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      axios.delete(`/api/course-videos/${videoId}`).then(() => {
        setVideos(videos.filter(video => video.id !== videoId));
      });
    }
  };

  return (
    <Row>
      <Col md="8">
        <h2 data-cy="courseDetailsHeading">Course</h2>
        {/* Course Details Table */}
        <table className="table table-bordered table-hover table-custom">
          <tbody>
            <tr>
              <th scope="row">رقم ت.</th>
              <td colSpan={3}>{courseEntity.id}</td>
            </tr>
            <tr>
              <th scope="row">العنوان</th>
              <td colSpan={3}>{courseEntity.title}</td>
            </tr>
            <tr>
              <th scope="row">الوصف</th>
              <td colSpan={3}>{courseEntity.description}</td>
            </tr>
            <tr>
              <th scope="row">اللغة</th>
              <td colSpan={3}>{courseEntity.language}</td>
            </tr>
            <tr>
              <th scope="row">السعر</th>
              <td colSpan={3}>{courseEntity.price}</td>
            </tr>
            <tr>
              <th scope="row">سعر الطلاب</th>
              <td colSpan={3}>{courseEntity.studentsPrice}</td>
            </tr>
            <tr>
              <th scope="row">الكلمات الدالة</th>
              <td colSpan={3}>{courseEntity.keywords}</td>
            </tr>
            <tr>
              <th>الفئات</th>
              <td colSpan={3}>
                {courseEntity.categories
                  ? courseEntity.categories.map((category, index) => (
                      <span key={index}>
                        {category.nameAr}
                        {index !== courseEntity.categories.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : null}
              </td>
            </tr>
          </tbody>
        </table>
        <Link
          to={`/course-video/new?courseId=${courseEntity.id}`}
          className="btn btn-primary jh-create-entity"
          id="jh-create-entity"
          data-cy="entityCreateButton"
        >
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create a new Course Video
        </Link>
        {/* Videos Table */}
        <h3>Videos</h3>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Details</th>
              <th>Order</th>
              <th>Video</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{video.title}</td>
                <td>{video.details}</td>
                <td>{video.videoOrder}</td>
                <td>
                  {video.fileUrl ? (
                    <video controls width="250">
                      <source src={`api/uploads/file/download/${video.fileUrl}`} type={video.fileContentType} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    'No video available'
                  )}
                </td>
                <td className="text-end">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`/course-video/${video.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                      <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
                    </Button>
                    <Button color="danger" size="sm" data-cy="entityDeleteButton" onClick={() => handleDelete(video.id)}>
                      <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">حذف</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
        <Button tag={Link} to="/course" replace data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline"></span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/course/${courseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">تعديل</span>
        </Button>
      </Col>
      <Col md="4">
        <br />
        <br />
        <br />
        <img src={`/api/uploads/file/download/${courseEntity.coverImageUrl}`} alt={courseEntity.title} className="img-fluid" />
      </Col>
    </Row>
  );
};

export default CourseDetail;
