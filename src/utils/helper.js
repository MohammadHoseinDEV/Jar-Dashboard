import {
  passwordCodeRegex,
  personnelCodeRegex,
  insuranceCodeRegex,
  persianNameRegex,
  phoneNumberRegex,
} from "../utils/regex";

import { toast } from "react-toastify";

const validationInputsLoginPage = ({ password, personnelCode, formData }) => {
  if (!personnelCode) {
    toast.warning("کد  پرسنلی خود را وارد کنید");
    return false;
  }

  if (!personnelCodeRegex.test(personnelCode)) {
    toast.warning("کد پرسنلی باید دارای 7 رقم باشد");
    return false;
  }
  if (!password) {
    toast.warning("رمز عبور خود را وارد کنید");
    return false;
  }

  if (!passwordCodeRegex.test(password)) {
    toast.warning(
      "پسورد باید شامل 8 کاراکترباشد(باید شامل یک حرف بزرگ و یک حرف کوچک انگلیسی و 6 عدد باشد) "
    );
    if (!persianNameRegex.test(formData.firstName)) {
      toast.warning("لطفا نام خود را به درستی وارد کنید");
      return false;
    }

    if (!persianNameRegex.test(formData.lastName)) {
      toast.warning("لطفا نام خانوادگی خود را به درستی وارد کنید");
      return false;
    }

    if (!insuranceCodeRegex.test(formData.insuranceCode)) {
      toast.warning("لطفا کدملی را به درستی وارد کنید");
      return false;
    }

    if (!personnelCodeRegex.test(formData.personnelCode)) {
      toast.warning("لطفا کد پرسنلی خود را به درستی وارد کنید");
      return false;
    }

    if (!phoneNumberRegex.test(formData.mobileNumber)) {
      toast.warning("لطفا شماره همراه خود را به درستی وارد کنید");
      return false;
    }

    if (!passwordCodeRegex.test(formData.password)) {
      toast.warning(
        "پسورد باید شامل 8 کاراکترباشد(باید شامل یک حرف بزرگ و یک حرف کوچک انگلیسی و 6 عدد باشد) "
      );
      return false;
    }
    if (formData.password !== formData.repeatPassword) {
      toast.error("لطفا تکرار رمز عبور را به درستی وارد کنید");
      return false;
    }
    return false;
  }
  return true;
};

const validationInputsRegisterPage = (formData) => {
  if (!formData.firstName) {
    toast.warning("لطفا نام خود را وارد کنید");
    return false;
  }

  if (!persianNameRegex.test(formData.firstName)) {
    toast.warning("لطفا نام خود را به درستی وارد کنید");
    return false;
  }

  if (!formData.lastName) {
    toast.warning("لطفا نام خانوادگی خود را وارد کنید");
    return false;
  }

  if (!persianNameRegex.test(formData.lastName)) {
    toast.warning("لطفا نام خانوادگی خود را به درستی وارد کنید");
    return false;
  }

  if (!formData.insuranceCode) {
    toast.warning("لطفا کد ملی خود را وارد کنید");
    return false;
  }

  if (!insuranceCodeRegex.test(formData.insuranceCode)) {
    toast.warning("لطفا کدملی را به درستی وارد کنید");
    return false;
  }

  if (!formData.birthDate) {
    toast.warning("لطفا تاریخ تولد خود را وارد کنید");
    return false;
  }

  if (!formData.personnelCode) {
    toast.warning("لطفا کد پرسنلی خود را وارد کنید");
    return false;
  }

  if (!personnelCodeRegex.test(formData.personnelCode)) {
    toast.warning("لطفا کد پرسنلی خود را به درستی وارد کنید");
    return false;
  }

  if (!formData.mobileNumber) {
    toast.warning("لطفا شماره همراه خود را وارد کنید");
    return false;
  }

  if (!phoneNumberRegex.test(formData.mobileNumber)) {
    toast.warning("لطفا شماره همراه خود را به درستی وارد کنید");
    return false;
  }

  if (!formData.password) {
    toast.warning("لطفا رمز عبور خود را وارد کنید");
    return false;
  }

  if (!passwordCodeRegex.test(formData.password)) {
    toast.warning(
      "پسورد باید شامل 8 کاراکترباشد(باید شامل یک حرف بزرگ و یک حرف کوچک انگلیسی و 6 عدد باشد) "
    );
    return false;
  }

  if (!formData.repeatPassword) {
    toast.warning("لطفا تکرار رمز عبور را وارد کنید");
    return false;
  }

  if (formData.password !== formData.repeatPassword) {
    toast.error("لطفا تکرار رمز عبور را به درستی وارد کنید");
    return false;
  }
  return true;
};

const validationInputsForgetPassword = (formData) => {
  if (!formData.personnelCode) {
    toast.warning("لطفا کد پرسنلی خود را وارد کنید");
    return false;
  }

  if (!personnelCodeRegex.test(formData.personnelCode)) {
    toast.warning("لطفا کد پرسنلی خود را به درستی وارد کنید");
    return false;
  }

  if (!formData.insuranceCode) {
    toast.warning("لطفا کد ملی خود را وارد کنید");
    return false;
  }

  if (!insuranceCodeRegex.test(formData.insuranceCode)) {
    toast.warning("کد ملی باید شامل 10 عدد باشد");
    return false;
  }

  if (!formData.mobileNumber) {
    toast.warning("لطفا شماره همراه خود را وارد کنید");
    return false;
  }

  if (!phoneNumberRegex.test(formData.mobileNumber)) {
    toast.warning("لطفا شماره همراه خود را به درستی وارد کنید");
    return false;
  }
  return true;
};

export {
  validationInputsRegisterPage,
  validationInputsForgetPassword,
  validationInputsLoginPage,
};
