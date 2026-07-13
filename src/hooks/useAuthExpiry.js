import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  logout,
  selectTokenExpiration,
} from '../features/auth/Slice/authSlice';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuthExpiry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const expTimestamp = useSelector(selectTokenExpiration);

  useEffect(() => {
    const check = () => {
      const token = Cookies.get('token');

      if (!token) {
        dispatch(logout());
        navigate('/login');
        return;
      }

      if (expTimestamp && expTimestamp - Date.now() <= 0) {
        dispatch(logout());
        navigate('/login');
      }
    };

    check();
    const interval = setInterval(check, 10_000);
    return () => clearInterval(interval);
  }, [expTimestamp]);
}
