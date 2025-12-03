import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Slice/authSlice";
import LoginPageJsx from "../components/LoginPageJsx";
import { validationInputsLoginPage } from "../../../utils/helper";

function LoginPage() {
  const [personnelCode, setPersonnelCode] = useState("");
  const [password, setPassword] = useState("");

  const { loading, token, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    const Regex = validationInputsLoginPage({ password, personnelCode });

    if (!Regex) return;

    dispatch(loginUser({ personnelCode, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
      toast.success("با موفقیت وارد شدید");
    }
  }, [navigate, token]);
  return (
    <LoginPageJsx
      submitHandler={submitHandler}
      personnelCode={personnelCode}
      password={password}
      setPersonnelCode={setPersonnelCode}
      setPassword={setPassword}
    />
  );
}

export default LoginPage;
