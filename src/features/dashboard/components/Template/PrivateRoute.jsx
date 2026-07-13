import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchUserPermissions } from '../../../auth/Slice/authSlice';

export default function PrivateRoute() {
  const dispatch = useDispatch();
  const { token, permissions, menus, loading } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token && !loading && (!permissions || !menus?.length)) {
      dispatch(fetchUserPermissions(token));
    }
  }, [token, permissions, menus, loading, dispatch]);

  if (!token) return <Navigate to="/login" replace />;

  if (loading) return <div className="p-6 text-white">در حال بارگذاری...</div>;

  return <Outlet />;
}
