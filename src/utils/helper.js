import {
  passwordCodeRegex,
  personnelCodeRegex,
  insuranceCodeRegex,
  persianNameRegex,
  phoneNumberRegex,
} from '../utils/regex';

import { toast } from 'react-toastify';

const validationInputsLoginPage = ({ password, personnelCode }) => {
  if (!password || !personnelCode) {
    toast.error('پرکردن تمامی فیلدها الزامی است');
    return false;
  }

  if (!personnelCode) {
    toast.warning('کد  پرسنلی خود را وارد کنید');
    return false;
  }

  if (!personnelCodeRegex.test(personnelCode)) {
    toast.warning('کد پرسنلی باید دارای 7 رقم باشد');
    return false;
  }
  if (!password) {
    toast.warning('رمز عبور خود را وارد کنید');
    return false;
  }

  if (!passwordCodeRegex.test(password)) {
    toast.warning(
      'رمزعبور باید شامل 8 کاراکترباشد(باید شامل یک حرف بزرگ و یک حرف کوچک انگلیسی و 6 عدد باشد) '
    );
    if (!persianNameRegex.test(formData.firstName)) {
      toast.warning('لطفا نام خود را به درستی وارد کنید');
      return false;
    }

    if (!persianNameRegex.test(formData.lastName)) {
      toast.warning('لطفا نام خانوادگی خود را به درستی وارد کنید');
      return false;
    }

    if (!insuranceCodeRegex.test(formData.insuranceCode)) {
      toast.warning('لطفا کدملی را به درستی وارد کنید');
      return false;
    }

    if (!personnelCodeRegex.test(formData.personnelCode)) {
      toast.warning('لطفا کد پرسنلی خود را به درستی وارد کنید');
      return false;
    }

    // if (!phoneNumberRegex.test(formData.mobileNumber)) {
    //   toast.warning('لطفا شماره همراه خود را به درستی وارد کنید');
    //   return false;
    // }

    if (!passwordCodeRegex.test(formData.password)) {
      toast.warning(
        'رمزعبور باید شامل 8 کاراکترباشد(باید شامل یک حرف بزرگ و یک حرف کوچک انگلیسی و 6 عدد باشد) '
      );
      return false;
    }
    if (formData.password !== formData.repeatPassword) {
      toast.error('لطفا تکرار رمز عبور را به درستی وارد کنید');
      return false;
    }
    return false;
  }
  return true;
};

const validationInputsRegisterPage = (formData) => {
  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.insuranceCode ||
    !formData.birthDate ||
    !formData.personnelCode ||
    !formData.mobileNumber ||
    !formData.password
  ) {
    toast.error('پرکردن تمامی فیلدها الزامی است');
    return false;
  }

  if (!formData.firstName) {
    toast.warning('لطفا نام خود را وارد کنید');
    return false;
  }

  if (!persianNameRegex.test(formData.firstName)) {
    toast.warning('لطفا نام خود را به درستی وارد کنید');
    return false;
  }

  if (!formData.lastName) {
    toast.warning('لطفا نام خانوادگی خود را وارد کنید');
    return false;
  }

  if (!persianNameRegex.test(formData.lastName)) {
    toast.warning('لطفا نام خانوادگی خود را به درستی وارد کنید');
    return false;
  }

  if (!formData.insuranceCode) {
    toast.warning('لطفا کد ملی خود را وارد کنید');
    return false;
  }

  if (!insuranceCodeRegex.test(formData.insuranceCode)) {
    toast.warning('لطفا کدملی را به درستی وارد کنید');
    return false;
  }

  if (!formData.birthDate) {
    toast.warning('لطفا تاریخ تولد خود را وارد کنید');
    return false;
  }

  if (!formData.personnelCode) {
    toast.warning('لطفا کد پرسنلی خود را وارد کنید');
    return false;
  }

  if (!personnelCodeRegex.test(formData.personnelCode)) {
    toast.warning('لطفا کد پرسنلی خود را به درستی وارد کنید');
    return false;
  }

  // if (!formData.mobileNumber) {
  //   toast.warning('لطفا شماره همراه خود را وارد کنید');
  //   return false;
  // }

  // if (!phoneNumberRegex.test(formData.mobileNumber)) {
  //   toast.warning('لطفا شماره همراه خود را به درستی وارد کنید');
  //   return false;
  // }

  if (!formData.password) {
    toast.warning('لطفا رمز عبور خود را وارد کنید');
    return false;
  }

  if (!passwordCodeRegex.test(formData.password)) {
    toast.warning(
      'رمزعبور باید شامل 8 کاراکترباشد(باید شامل یک حرف بزرگ و یک حرف کوچک انگلیسی و 6 عدد باشد) '
    );
    return false;
  }

  if (!formData.repeatPassword) {
    toast.warning('لطفا تکرار رمز عبور را وارد کنید');
    return false;
  }

  if (formData.password !== formData.repeatPassword) {
    toast.error('لطفا تکرار رمز عبور را به درستی وارد کنید');
    return false;
  }
  return true;
};

const validationInputsForgetPassword = (formData) => {
  if (
    !formData.personnelCode ||
    !formData.insuranceCode ||
    !formData.mobileNumber
  ) {
    toast.error('پر کردن تمامی فیلدها اجباری است');
    return false;
  }

  if (!formData.personnelCode) {
    toast.warning('لطفا کد پرسنلی خود را وارد کنید');
    return false;
  }

  if (!personnelCodeRegex.test(formData.personnelCode)) {
    toast.warning('لطفا کد پرسنلی خود را به درستی وارد کنید');
    return false;
  }

  if (!formData.insuranceCode) {
    toast.warning('لطفا کد ملی خود را وارد کنید');
    return false;
  }

  if (!insuranceCodeRegex.test(formData.insuranceCode)) {
    toast.warning('کد ملی باید شامل 10 عدد باشد');
    return false;
  }

  if (!formData.mobileNumber) {
    toast.warning('لطفا شماره همراه خود را وارد کنید');
    return false;
  }

  if (!phoneNumberRegex.test(formData.mobileNumber)) {
    toast.warning('لطفا شماره همراه خود را به درستی وارد کنید');
    return false;
  }
  return true;
};

const validationInputsResetPassword = (newPassword, confirm) => {
  if (!newPassword || !confirm) {
    toast.error('پرکردن تمام فیلدها اجباری است');
    return false;
  }

  if (!newPassword) {
    toast.warning('لطفا رمز عبور جدید را وارد کنید');
    return false;
  }

  if (!passwordCodeRegex.test(newPassword)) {
    toast.warning(
      'رمزعبور باید شامل 8 کاراکترباشد(باید شامل یک حرف بزرگ و یک حرف کوچک انگلیسی و 6 عدد باشد) '
    );
    return false;
  }

  if (newPassword !== confirm) {
    toast.warning('تکرار رمز عبور اشتباه می باشد');
    return false;
  }
  return true;
};

export {
  validationInputsRegisterPage,
  validationInputsForgetPassword,
  validationInputsLoginPage,
  validationInputsResetPassword,
};
