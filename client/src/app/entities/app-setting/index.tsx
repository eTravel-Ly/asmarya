import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AppSetting from './app-setting';
import AppSettingDetail from './app-setting-detail';
import AppSettingUpdate from './app-setting-update';
import AppSettingDeleteDialog from './app-setting-delete-dialog';

const AppSettingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AppSetting />} />
    <Route path="new" element={<AppSettingUpdate />} />
    <Route path=":id">
      <Route index element={<AppSettingDetail />} />
      <Route path="edit" element={<AppSettingUpdate />} />
      <Route path="delete" element={<AppSettingDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AppSettingRoutes;
