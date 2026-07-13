import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPerm } from '../../../../utils/rbac';

export default function PermissionRoute({ url }) {
  const { token, menus } = useSelector((s) => s.auth);

  // auth
  if (!token) return <Navigate to="/login" replace />;

  // permission
  const perm = getPerm(menus, url);
  if (!perm?.canView) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
