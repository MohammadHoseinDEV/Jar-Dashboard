import { Link } from "react-router";

import background from "../../../assets/images/background.png";
import Logo from "../../../assets/images/logo.png";
import Back from "../../../assets/images/back-arrow.png";

function ForgetPasswordJsx({ formData, setFormData, submitHandler }) {
  return (
    <div className="relative w-screen h-screen flex  max-sm:overflow-hidden">
      <div className="flex justify-center items-center m-auto">
        <img
          src={background}
          alt="Jar-Login"
          className="absolute w-screen h-screen  object-cover max-sm:w-screen max-sm:h-screen"
        />
        <p className="absolute bg-[#00000026] size-full flex "></p>
        <div className="absolute  w-[550px] pt-[27px] bg-[#f9f9f90e] backdrop-blur-[5px] border border-[#f9f9f965] rounded-[50px] shadow-2xl flex flex-col  items-center transition delay-150 duration-300 ease-in-out hover:scale-102 max-sm:flex    max-sm:w-[350px]  ">
          <img
            src={Logo}
            alt="Logo"
            width={120}
            className="max-sm:size-[90px]"
          />
          <form onSubmit={submitHandler}>
            <div className="flex flex-col space-y-10 py-[60px] max-sm:space-y-5 max-sm:py-6">
              <input
                type="tel"
                placeholder="کدپرسنلی"
                name="personnelCode"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  });
                }}
                pattern="[0-9]*"
                className="w-[400px] h-[50px] text-right font-[Samim]  text-[19px]  bg-[#D9D9D9] rounded-[15px] pr-5 border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105 outline-none max-sm:w-[300px]  focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />
              <input
                type="tel"
                pattern="[0-9]*"
                placeholder="کدملی"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  });
                }}
                name="insuranceCode"
                className="w-[400px] h-[50px] text-right font-[Samim]  text-[19px]  bg-[#D9D9D9] rounded-[15px] pr-5 border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105   outline-none max-sm:w-[300px] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />

              <input
                type="tel"
                pattern="[0-9]*"
                placeholder="شماره تلفن همراه"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  });
                }}
                name="mobileNumber"
                className="w-[400px] h-[50px] text-right font-[Samim]  text-[19px]  bg-[#D9D9D9] rounded-[15px] pr-5 border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105  outline-none max-sm:w-[300px] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />
            </div>
            <button className="bg-[#FF6B00] w-[400px] h-[50px] font-[SamimBold] text-[20px] rounded-[15px] mb-[50px] border-2 border-transparent transition delay-100 duration-500 ease-in-out hover:scale-105  focus:border-[#FF6B00] outline-none  hover:bg-[#D9D9D9] max-sm:w-[300px]">
              بررسی اطلاعات
            </button>
          </form>

          <Link
            to={"/login"}
            className="flex justify-center items-center mb-10 bg-[#FF6B00] p-2 rounded-[10px] font-[SamimBold] text-[18px] transition delay-100 duration-300 ease-in-out hover:scale-108 hover:bg-[#D9D9D9]"
          >
            <img src={Back} alt="back" width={28} />
            <p>بازگشت</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordJsx;
