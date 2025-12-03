import { useState } from "react";
import ForgetPasswordJsx from "../components/ForgetPasswordJsx";
import { validationInputsForgetPassword } from "../../../utils/helper";

function ForgetPassword() {
  const [formData, setFormData] = useState({
    personnelCode: "",
    insuranceCode: "",
    mobileNumber: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();

    const Regex = validationInputsForgetPassword(formData);

    if (!Regex) return null;

    const date = {
      personnelCode: formData.personnelCode,
      insuranceCode: formData.insuranceCode,
      mobileNumber: formData.mobileNumber,
    };
  };

  return (
    <ForgetPasswordJsx
      formData={formData}
      setFormData={setFormData}
      submitHandler={submitHandler}
    />
  );
}

export default ForgetPassword;
