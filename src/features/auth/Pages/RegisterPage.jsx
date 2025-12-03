import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { logout, registerUser } from "../Slice/authSlice";

import jalaali from "jalaali-js";

import RegisterPageJsx from "../components/RegisterPageJsx";
import { validationInputsRegisterPage } from "../../../utils/helper";
import { toast } from "react-toastify";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    insuranceCode: "",
    birthDate: "",
    personnelCode: "",
    password: "",
    repeatPassword: "",
    mobileNumber: "",
  });

  const convertToShamsi = (shamsiDateObject) => {
    if (!shamsiDateObject) return null;

    const jy = shamsiDateObject.year;
    const jm = shamsiDateObject.month.number;
    const jd = shamsiDateObject.day;

    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
    const date = new Date(gy, gm - 1, gd);
    return date.toISOString();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const submitHandler = (event) => {
    event.preventDefault();

    const Regex = validationInputsRegisterPage(formData);

    if (!Regex) return null;

    const hireISO = new Date().toISOString();

    const isoBirthDate = convertToShamsi(formData.birthDate);

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      insuranceCode: formData.insuranceCode,
      birthDate: isoBirthDate,
      personnelCode: formData.personnelCode,
      password: formData.password,
      mobileNumber: formData.mobileNumber,
      faceCode: "",
      hireDate: hireISO,
      homePhoneNumber: "",
    };

    const result = dispatch(registerUser(data));
  };
  useEffect(() => {
    if (token) navigate("/dashboard");
    toast.success("با موفقیت وارد شدید");
  }, [token, navigate]);

  return (
    <RegisterPageJsx
      submitHandler={submitHandler}
      formData={formData}
      setFormData={setFormData}
    />
  );
}

export default RegisterPage;
