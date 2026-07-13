import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { HashLoader } from 'react-spinners';

const LoginPage = lazy(() => import('../features/auth/Pages/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/Pages/RegisterPage'));
const ForgetPassword = lazy(
  () => import('../features/auth/Pages/ForgetPassword')
);
const ResetPassword = lazy(
  () => import('../features/auth/Pages/ResetPassword')
);
const PageNotFound = lazy(() => import('../features/auth/Pages/PageNotFound'));

const Layout = lazy(() => import('../Layout/Layout'));
const PrivateRoute = lazy(
  () => import('../features/dashboard/components/Template/PrivateRoute')
);

const DashboardHome = lazy(
  () => import('../features/dashboard/pages/DashboardHome')
);
const DynamicPage = lazy(() => import('../daynamic/DynamicPage'));

const AdminMenus = lazy(
  () => import('../features/dashboard/pages/admin/menu/AdminMenus')
);
const AdminRoles = lazy(
  () => import('../features/dashboard/pages/admin/role/AdminRoles')
);
const AdminUsers = lazy(
  () => import('../features/dashboard/pages/admin/users/AdminUsers')
);
const AdminCompanies = lazy(
  () => import('../features/dashboard/pages/admin/company/AdminCompanies')
);
const AdminUnits = lazy(
  () => import('../features/dashboard/pages/admin/unit/AdminUnits')
);
const PermissionRoute = lazy(
  () => import('../features/dashboard/components/Template/PermissionRoute')
);
const NoAccess = lazy(() => import('../features/dashboard/pages/NoAccess'));

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#000000ec]">
          <HashLoader color="#fff" size={150} />
          <p className="font-[SamimBold] text-[50px] text-white">
            درحال بارگذاری ...
          </p>
        </div>
      }
    >
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Dashboard */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<DashboardHome />} />

            {/* Admin guarded by canView */}
            {/* <Route element={<PermissionRoute url="admin" />}>
            <Route path="admin" element={<AdminHome />} />
          </Route> */}

            <Route element={<PermissionRoute url="admin-menus" />}>
              <Route path="admin-menus" element={<AdminMenus />} />
            </Route>

            <Route element={<PermissionRoute url="admin-roles" />}>
              <Route path="admin-roles" element={<AdminRoles />} />
            </Route>

            <Route element={<PermissionRoute url="admin-users" />}>
              <Route path="admin-users" element={<AdminUsers />} />
            </Route>
            <Route element={<PermissionRoute url="admin-companies" />}>
              <Route path="admin-companies" element={<AdminCompanies />} />
            </Route>

            <Route element={<PermissionRoute url="admin-units" />}>
              <Route path="admin-units" element={<AdminUnits />} />
            </Route>

            {/* Dynamic */}
            <Route path=":page" element={<DynamicPage />} />
          </Route>
        </Route>

        <Route path="/no-access" element={<NoAccess />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
