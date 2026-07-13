import { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPageJsx = lazy(() => import('../components/LoginPageJsx'));

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPermissions, loginUser } from '../Slice/authSlice';
import { validationInputsLoginPage } from '../../../utils/helper';
import { toast } from 'react-toastify';

function LoginPage() {
  const [personnelCode, setPersonnelCode] = useState('');
  const [password, setPassword] = useState('');

  const { loading, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    const isValid = validationInputsLoginPage({ password, personnelCode });
    if (!isValid) {
      toast.error('لطفا ورودی ها را به درستی پر کنید');
      return;
    }

    dispatch(loginUser({ personnelCode, password }));
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserPermissions(token));
      navigate('/dashboard');
    }
  }, [token, dispatch, navigate]);

  return (
    <LoginPageJsx
      submitHandler={submitHandler}
      personnelCode={personnelCode}
      password={password}
      setPersonnelCode={setPersonnelCode}
      setPassword={setPassword}
      loading={loading}
    />
  );
}

export default LoginPage;
