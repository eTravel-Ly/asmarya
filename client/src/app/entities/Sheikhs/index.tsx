import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Sheikhs from './Sheikhs';
import SheikhsDetail from './Sheikhs-detail';
import SheikhsUpdate from './Sheikhs-update';
import SheikhsDeleteDialog from './Sheikhs-delete-dialog';

const SheikhsRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Sheikhs />} />
    <Route path="new" element={<SheikhsUpdate />} />
    <Route path=":id">
      <Route index element={<SheikhsDetail />} />
      <Route path="edit" element={<SheikhsUpdate />} />
      <Route path="delete" element={<SheikhsDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SheikhsRoutes;
