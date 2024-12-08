import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Sheikh from './sheikh';
import SheikhDetail from './sheikh-detail';
import SheikhUpdate from './sheikh-update';
import SheikhDeleteDialog from './sheikh-delete-dialog';

const SheikhRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Sheikh />} />
    <Route path="new" element={<SheikhUpdate />} />
    <Route path=":id">
      <Route index element={<SheikhDetail />} />
      <Route path="edit" element={<SheikhUpdate />} />
      <Route path="delete" element={<SheikhDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SheikhRoutes;
