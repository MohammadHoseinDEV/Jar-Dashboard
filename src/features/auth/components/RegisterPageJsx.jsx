import background from "../../../assets/images/background.png";
import Logo from "../../../assets/images/logo.png";
import Login from "../../../assets/images/login.png";
import Add from "../../../assets/images/add.png";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Link } from "react-router";

function RegisterPageJsx({ submitHandler, formData, setFormData }) {
  return (
    <div className="relative w-screen h-screen flex  max-sm:overflow-hidden">
      <div className="flex justify-center items-center m-auto">
        <img
          src={background}
          alt="Jar-Login"
          className="absolute w-screen h-screen  object-cover max-sm:w-screen max-sm:h-screen"
        />
        <p className="absolute bg-[#00000026] size-full flex "></p>
        <div className="absolute p-[30px]  bg-[#f9f9f90e] backdrop-blur-[5px] border border-[#f9f9f965] rounded-[50px] shadow-2xl flex flex-col  items-center transition delay-150 duration-300 ease-in-out hover:scale-102 max-sm:h-[650px] max-sm:w-[350px] max-sm:pt-2  ">
          <img src={Logo} alt="Logo" width={120} className="max-sm:size-20" />
          <div>
            <div className="flex space-x-7 justify-center items-center pt-[45px] max-sm:pt-2">
              <Link to={"/login"}>
                <button className="w-40 h-[50px] bg-[#F3EFEF] cursor-pointer flex justify-center items-center rounded-[15px] transition delay-150 duration-300 ease-in-out hover:scale-110 max-sm:w-30 max-sm:h-10  ">
                  <img src={Login} alt="login" width={30} />
                  <p className="text-[23px] mr-2 font-[SamimBold]">ورود</p>
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="w-40 h-[50px] cursor-pointer bg-[#FF6B00]   flex justify-center items-center rounded-[15px] transition delay-150 duration-300 ease-in-out hover:scale-110 max-sm:w-30 max-sm:h-10 ">
                  <img src={Add} alt="register" width={30} />
                  <p className="text-[19px] mr-2 font-[SamimBold]">ثبت نام</p>
                </button>
              </Link>
            </div>
            <form
              onSubmit={submitHandler}
              className="grid grid-cols-2 gap-[22px] py-10 max-sm:flex max-sm:flex-col max-sm:gap-5 "
            >
              <input
                type="text"
                placeholder="نام"
                name="firstName"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="w-[320px] h-[55px] bg-[#D9D9D9] rounded-[15px] text-center font-[Samim] text-[20px] border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105   outline-none max-sm:w-[300px]  max-sm:h-10  focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />
              <input
                type="text"
                placeholder="نام خانوادگی"
                name="lastName"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="w-[320px] h-[55px] bg-[#D9D9D9] rounded-[15px] text-center font-[Samim] text-[20px] border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105   outline-none max-sm:w-[300px]  max-sm:h-10  focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />
              <input
                type="tel"
                pattern="[0-9]*"
                placeholder="کدملی"
                name="insuranceCode"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="w-[320px] h-[55px] bg-[#D9D9D9] rounded-[15px] text-center font-[Samim] text-[20px] border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105   outline-none max-sm:w-[300px]  max-sm:h-10   focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />
              <DatePicker
                value={formData.birthDate}
                onChange={(date) => {
                  setFormData({ ...formData, birthDate: date });
                }}
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ تولد"
                format="YYYY/MM/DD"
                name="birthDate"
                calendarPosition="bottom-center"
                inputClass="w-[320px] h-[55px]  bg-[#D9D9D9] text-center font-[Samim]  text-[20px] rounded-[15px] px-[20px] border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105   outline-none max-sm:w-[300px] hover:placeholder:text-[#000] max-sm:h-10  focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />
              <input
                type="tel"
                pattern="[0-9]*"
                placeholder="کدپرسنلی"
                name="personnelCode"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="w-[320px] h-[55px] bg-[#D9D9D9] rounded-[15px] text-center font-[Samim] text-[20px] border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105   outline-none max-sm:w-[300px]  max-sm:h-10  focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />

              <input
                type="tel"
                pattern="[0-9]*"
                placeholder="تلفن همراه"
                name="mobileNumber"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="w-[320px] h-[55px] bg-[#D9D9D9] rounded-[15px] text-center font-[Samim] text-[20px] border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105   outline-none max-sm:w-[300px]  max-sm:h-10  focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />

              <input
                type="text"
                placeholder="کلمه عبور"
                name="password"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="w-[320px] h-[55px]   bg-[#D9D9D9] rounded-[15px] text-center font-[Samim] text-[20px] border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105   outline-none max-sm:w-[300px]  max-sm:h-10  focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />
              <input
                type="text"
                placeholder="تکرار کلمه عبور"
                name="repeatPassword"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="w-[320px] h-[55px] bg-[#D9D9D9] rounded-[15px] text-center font-[Samim] text-[20px] border-2 border-transparent transition delay-150 duration-300 ease-in-out hover:scale-105   outline-none max-sm:w-[300px]  max-sm:h-10  focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] placeholder:text-black hover:placeholder:text-[#ff6a00b9]"
              />
              <button className="col-span-2 bg-[#FF6B00] w-40 h-[50px] m-auto cursor-pointer rounded-[15px] font-[SamimBold] transition delay-150 duration-300 ease-in-out hover:scale-110 hover:bg-[#D9D9D9] text-[23px] max-sm:h-10">
                ثبت نام
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPageJsx;
