import { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resetPasswordUser } from '../Slice/authSlice';
import { validationInputsResetPassword } from '../../../utils/helper';

const ResetPasswordJsx = lazy(() => import('../components/ResetPasswordJsx'));

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userId, resetSuccess } = useSelector(
    (state) => state.auth
  );

  const submitHandler = (event) => {
    event.preventDefault();

    const Regex = validationInputsResetPassword(newPassword, confirm);

    if (!Regex) return null;

    const result = dispatch(resetPasswordUser({ newPassword, userId }));
  };

  useEffect(() => {
    if (!userId) {
      navigate('/forgetpassword');
    }
  }, [userId]);

  useEffect(() => {
    if (resetSuccess) {
      navigate('/login');
    }
  }, [resetSuccess]);

  return (
    <ResetPasswordJsx
      submitHandler={submitHandler}
      setNewPassword={setNewPassword}
      setConfirm={setConfirm}
      loading={loading}
    />
  );
}

export default ResetPassword;
