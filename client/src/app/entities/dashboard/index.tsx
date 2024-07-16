import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import Dashboard from 'app/entities/dashboard/dashboard';

const DashboardRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Dashboard />} />
  </ErrorBoundaryRoutes>
);

export default DashboardRoutes;
