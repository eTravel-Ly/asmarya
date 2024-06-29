import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CourseVideo from './course-video';
import CourseVideoDetail from './course-video-detail';
import CourseVideoUpdate from './course-video-update';
import CourseVideoDeleteDialog from './course-video-delete-dialog';

const CourseVideoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CourseVideo />} />
    <Route path="new" element={<CourseVideoUpdate />} />
    <Route path=":id">
      <Route index element={<CourseVideoDetail />} />
      <Route path="edit" element={<CourseVideoUpdate />} />
      <Route path="delete" element={<CourseVideoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CourseVideoRoutes;
