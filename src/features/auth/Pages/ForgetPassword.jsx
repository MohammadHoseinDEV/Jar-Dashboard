import { lazy, useEffect, useState } from 'react';

const ForgetPasswordJsx = lazy(() => import('../components/ForgetPasswordJsx'));

import { validationInputsForgetPassword } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPasswordUser } from '../Slice/authSlice';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [formData, setFormData] = useState({
    personnelCode: '',
    insuranceCode: '',
    mobileNumber: '',
  });

  const dispatch = useDispatch();
  const { loading, error, userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const Regex = validationInputsForgetPassword(formData);

    if (!Regex) return null;

    const data = {
      personnelCode: formData.personnelCode,
      insuranceCode: formData.insuranceCode,
      mobileNumber: formData.mobileNumber,
    };

    const result = dispatch(forgetPasswordUser(data));
  };

  useEffect(() => {
    if (userId) {
      navigate('/resetpassword');
    }
  }, [userId, navigate]);

  return (
    <ForgetPasswordJsx
      formData={formData}
      setFormData={setFormData}
      submitHandler={submitHandler}
      loading={loading}
    />
  );
}

export default ForgetPassword;
