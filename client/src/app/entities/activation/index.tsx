import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Activation from './activation';
import ActivationDetail from './activation-detail';
import ActivationUpdate from './activation-update';
import ActivationDeleteDialog from './activation-delete-dialog';

const ActivationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Activation />} />
    <Route path="new" element={<ActivationUpdate />} />
    <Route path=":id">
      <Route index element={<ActivationDetail />} />
      <Route path="edit" element={<ActivationUpdate />} />
      <Route path="delete" element={<ActivationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ActivationRoutes;
