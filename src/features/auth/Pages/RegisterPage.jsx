import { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout, registerUser } from '../Slice/authSlice';

import jalaali from 'jalaali-js';

const RegisterPageJsx = lazy(() => import('../components/RegisterPageJsx'));
import { validationInputsRegisterPage } from '../../../utils/helper';

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    insuranceCode: '',
    birthDate: '',
    personnelCode: '',
    password: '',
    repeatPassword: '',
    mobileNumber: '',
    gender: 0,
  });

  const convertJalaliToDateOnly = (jalali) => {
    if (!jalali) return null;

    const { gy, gm, gd } = jalaali.toGregorian(
      jalali.year,
      jalali.month,
      jalali.day
    );

    return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const submitHandler = (event) => {
    event.preventDefault();

    const Regex = validationInputsRegisterPage(formData);
    if (!Regex) return null;

    const birthDate = convertJalaliToDateOnly(formData.birthDate);

    const hireDate = new Date().toISOString().split('T')[0];

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      insuranceCode: formData.insuranceCode,
      birthDate: formData.birthDate,
      personnelCode: formData.personnelCode,
      password: formData.password,
      mobileNumber: formData.mobileNumber,
      faceCode: '',
      hireDate: formData.hireDate,
      homePhoneNumber: '',
      gender: formData.gender,
    };

    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <RegisterPageJsx
      submitHandler={submitHandler}
      formData={formData}
      setFormData={setFormData}
      loading={loading}
    />
  );
}

export default RegisterPage;
