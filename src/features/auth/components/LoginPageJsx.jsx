import background from "../../../assets/images/background.png";
import Logo from "../../../assets/images/logo.png";
import Login from "../../../assets/images/login.png";
import Add from "../../../assets/images/add.png";
import arrowLogin from "../../../assets/images/arrowLogin.png";
import { Link } from "react-router";

function LoginPageJsx({
  submitHandler,
  personnelCode,
  password,
  setPersonnelCode,
  setPassword,
}) {
  return (
    // loginPage
    <div className="relative w-screen h-screen flex  max-sm:overflow-hidden   ">
      {/* background */}
      <div className="flex justify-center items-center m-auto">
        <img
          src={background}
          alt="Jar-Login"
          className="absolute w-screen h-screen  object-cover max-sm:w-screen max-sm:h-screen"
        />
        {/* blur background */}
        <p className="absolute bg-[#00000026] size-full flex "></p>
        {/* login div */}
        <div className="absolute  w-[550px] pt-[27px] bg-[#f9f9f90e] backdrop-blur-[5px] border border-[#f9f9f965] rounded-[50px] shadow-2xl flex flex-col  items-center transition delay-150 duration-300 ease-in-out hover:scale-102 max-sm:flex   max-sm:w-[350px]  ">
          {/* logo jarsachi */}
          <img
            src={Logo}
            alt="Logo"
            width={120}
            className="max-sm:size-[90px]"
          />
          {/* login & register buttons */}
          <div className="flex space-x-7 justify-center items-center pt-[45px] max-sm:flex max-sm:space-x-1 max max-sm:pt-5">
            <Link to={"/login"}>
              <button className="w-40 h-[50px] bg-[#FF6B00] cursor-pointer flex justify-center items-center rounded-[15px] transition delay-150 duration-300 ease-in-out hover:scale-110 max-sm:w-30 ">
                <img src={Login} alt="login" width={30} />
                <p className="text-[23px] mr-2 font-[SamimBold]">ورود</p>
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="w-40 h-[50px] cursor-pointer bg-[#F3EFEF] flex justify-center items-center rounded-[15px] transition delay-150 duration-300 ease-in-out hover:scale-110 max-sm:w-30  ">
                <img src={Add} alt="register" width={30} />
                <p className="text-[19px] mr-2 font-[SamimBold]">ثبت نام</p>
              </button>
            </Link>
          </div>
          {/* login form */}
          <form className="pt-20 max-sm:pt-10" onSubmit={submitHandler}>
            <div className="flex flex-col space-y-[50px] pb-[50px] max-sm:items-center max-sm:space-y-3 max-sm:pb-2">
              <input
                type="tel"
                inputMode="numeric"
                value={personnelCode}
                onChange={(event) => setPersonnelCode(event.target.value)}
                placeholder="کد پرسنلی"
                className=" bg-[#D9D9D9] text-right w-[400px] h-[45px] rounded-[10px] pr-5 text-[19px] font-[Samim] transition delay-150 duration-300 border-2 border-transparent  outline-none hover:scale-105 max-sm:w-[300px] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black    hover:placeholder:text-[#ff6a00b9]"
              />
              <input
                type="text"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="رمز عبور"
                className="bg-[#D9D9D9]  w-[400px] h-[45px] rounded-[10px] pr-5 text-[19px] font-[Samim] transition delay-150 duration-300 border-2 border-transparent  outline-none hover:scale-105 focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9]  placeholder:text-black max-sm:w-[300px] hover:placeholder:text-[#ff6a00b9]"
              />
            </div>
            <Link to={"/forgetpassword"}>
              <div>
                <p className="flex justify-center items-center text-[25px] rounded-[10px] w-[400px] h-[45px]  text-white font-[BYekan] cursor-pointer transition delay-100 duration-150 hover:scale-110 hover:bg-[#D9D9D9]  hover:rounded-[10px] hover:text-black">
                  بازیابی رمز عبور
                </p>
              </div>
            </Link>
            <button className="flex justify-center items-center my-[90px] bg-[#FF6B00] w-[400px] h-[45px] rounded-[15px] cursor-pointer transition delay-150 duration-300 hover:scale-110 hover:bg-[#D9D9D9]  max-sm:w-[300px] max-sm:my-10 max-sm:m-auto">
              <img src={arrowLogin} alt="login" />
              <p className="font-[SamimBold] text-[22px] pr-[5px]">ورود</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPageJsx;
