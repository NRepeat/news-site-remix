import {Outlet} from '@remix-run/react';
import AdminPageLayout from '~/Layout/AdminPageLayout/AdminPageLayout';

export default function AdminPageLayoutRoute() {
  return (
    <AdminPageLayout>
      <Outlet />
    </AdminPageLayout>
  );
}
