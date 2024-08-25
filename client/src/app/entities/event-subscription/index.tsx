import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import EventSubscription from './event-subscription';
import EventSubscriptionDetail from './event-subscription-detail';
import EventSubscriptionUpdate from './event-subscription-update';
import EventSubscriptionDeleteDialog from './event-subscription-delete-dialog';

const EventSubscriptionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<EventSubscription />} />
    <Route path="new" element={<EventSubscriptionUpdate />} />
    <Route path=":id">
      <Route index element={<EventSubscriptionDetail />} />
      <Route path="edit" element={<EventSubscriptionUpdate />} />
      <Route path="delete" element={<EventSubscriptionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EventSubscriptionRoutes;
