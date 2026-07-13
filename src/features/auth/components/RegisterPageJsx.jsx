import background from '../../../assets/images/background.jpg';
import Logo from '../../../assets/images/logoJar.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { FiUser } from 'react-icons/fi';

function RegisterPageJsx({ submitHandler, formData, setFormData, loading }) {
  return (
    <div className="relative flex h-screen w-screen max-sm:overflow-hidden">
      <div className="m-auto flex items-center justify-center">
        <img
          src={background}
          alt="Jar-Login"
          className="absolute h-screen w-screen object-cover max-sm:h-screen max-sm:w-screen"
        />
        <p className="absolute flex size-full bg-[#09090e]/80"></p>
        <div className="max-17:scale-75 h-lenovo:scale-60 h-lenovo:hover:scale-61 absolute grid w-[1100px] scale-85 grid-cols-2 rounded-[15px] border border-white/10 transition delay-75 duration-100 ease-in-out max-2xl:scale-75 max-xl:scale-70 max-xl:hover:scale-72 max-md:w-[350px] max-md:scale-95 max-md:hover:scale-95 max-sm:flex">
          <div className="relative h-full w-full rounded-r-[15px] bg-linear-to-br from-[#12121d]/85 via-[#11111c]/85 to-[#12121e]/85">
            <div className="absolute top-5 left-0 h-35 w-35 rounded-full bg-[#4e2b1f] blur-[60px]"></div>
            <div>
              <div className="flex items-center space-x-4">
                <img src={Logo} alt="" width={50} className="mr-8 pt-8" />
                <h1 className="pt-10 font-[SamimBold] text-[22px] font-bold text-white">
                  دپارتمان جار و بطری
                </h1>
              </div>
              <p className="mr-9 pt-4 text-white/50">
                سامانه یکپارچه کاویان جار ساچی
              </p>
            </div>
            <div className="relative m-auto mt-30 size-70 rounded-full border border-[#5e3113]">
              <span className="absolute -top-2 left-34 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-16 right-3 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-52 right-4 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-68 left-34 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-52 left-4 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-16 left-3 size-3 rounded-full bg-[#a85117]"></span>
              <div className="m-auto mt-10 size-50 rounded-full border border-dashed border-[#5e3113]">
                <div className="relative m-auto mt-11 size-25 rounded-[20px] border border-[#974b1f] bg-[#bf5b18]/30">
                  <div className="absolute -top-3 -left-5 h-35 w-35 rounded-full bg-[#4e2b1f]/50 blur-2xl"></div>

                  <p className="mt-5 flex items-center justify-center text-[50px] text-[#f86700]">
                    <FiUser />
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-15">
              <div className="space-y-2 pt-8 text-center">
                <h1 className="font-[SamimBold] text-[20px] font-bold text-white">
                  به سامانه کاویان جار ساچی خوش آمدید
                </h1>
                <span className="font-[VazirLight] text-[18px] text-white/30">
                  برای دسترسی به پنل پرسنلی، وارد شوید یا ثبت نام کنید
                </span>
              </div>
            </div>
            <div className="rigth-0 absolute bottom-5 h-35 w-35 rounded-full bg-[#4e2b1f] blur-[60px]"></div>
          </div>
          <div className="z-10 rounded-l-[15px] border-r bg-[#0f0f18]/90">
            <div className="mx-15 mt-15 grid grid-cols-2 rounded-[15px] border border-white/15 bg-[#181821] p-1 max-sm:flex max-sm:space-x-1 max-sm:pt-5">
              <Link to={'/login'}>
                <div className="col-span-1 flex items-center justify-center py-3.5">
                  <p className="flex cursor-pointer items-center justify-center font-[SamimBold] text-white/30 transition delay-150 duration-300 ease-in-out hover:scale-110 max-sm:w-30">
                    ورود
                  </p>
                </div>
              </Link>
              <Link to={'/register'}>
                <div className="col-span-1 flex items-center justify-center rounded-[15px] bg-[#42271d] py-3.5">
                  <button className="flex cursor-pointer items-center justify-center rounded-[15px] text-center font-[SamimBold] text-white transition delay-150 duration-300 ease-in-out hover:scale-110 max-sm:w-30">
                    ثبت نام
                  </button>
                </div>
              </Link>
            </div>

            <div className="mx-15 mt-8 space-y-2">
              <p className="font-[VazirLight] text-[25px] font-bold text-white">
                ایجاد حساب کاربری
              </p>
              <p className="font-[VazirLight] text-white/30">
                اطلاعات پرسنلی خود را کامل وارد کنید
              </p>
            </div>

            <form
              onSubmit={submitHandler}
              className="mx-15 grid grid-cols-2 gap-2.5 pt-5 max-sm:flex max-sm:flex-col max-sm:gap-5"
            >
              <label
                htmlFor="firstName"
                className="mt-5 flex flex-col text-white/60"
              >
                <span className="font-[VazirLight] font-extrabold">نام</span>
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
                  className="mt-2 h-[50px] w-[210px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                />
              </label>
              <label
                htmlFor="lastName"
                className="mt-5 flex flex-col text-white/60"
              >
                <span className="font-[VazirLight] font-extrabold">
                  نام خانوادگی
                </span>
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
                  className="mt-2 h-[50px] w-[210px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                />
              </label>
              <label
                htmlFor="insuranceCode"
                className="mt-3 flex flex-col text-white/60"
              >
                <span className="font-[VazirLight] font-extrabold">کد ملی</span>
                <input
                  type="tel"
                  pattern="[0-9]*"
                  placeholder="10 رقمی"
                  dir="rtl"
                  name="insuranceCode"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [event.target.name]: event.target.value,
                    })
                  }
                  className="mt-2 h-[50px] w-[210px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[Samim] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                />
              </label>
              <label
                htmlFor="birthDate"
                className="mt-3 flex flex-col text-white/60"
              >
                <span className="font-[VazirLight] font-extrabold">
                  تاریخ تولد
                </span>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  onChange={(value) =>
                    setFormData((p) => ({
                      ...p,
                      birthDate: value
                        ? value.toDate().toISOString().split('T')[0]
                        : '',
                    }))
                  }
                  placeholder="1360/01/01"
                  format="YYYY/MM/DD"
                  name="birthDate"
                  calendarPosition="bottom-center"
                  dir="ltr"
                  inputClass="mt-2 h-[50px] w-[210px]  text-white rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[AvenirLTProBook] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                />
              </label>
              <label
                htmlFor="personnelCode"
                className="mt-3 flex flex-col text-white/60"
              >
                <span className="font-[VazirLight] font-extrabold">
                  کد پرسنلی
                </span>
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
                  className="mt-2 h-[50px] w-[210px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[Samim] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                />
              </label>
              <label
                htmlFor="mobileNumber"
                className="mt-3 flex flex-col text-white/60"
              >
                <span className="font-[VazirLight] font-extrabold">
                  تلفن همراه
                </span>
                <input
                  type="tel"
                  pattern="[0-9]*"
                  placeholder="09153456789"
                  name="mobileNumber"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [event.target.name]: event.target.value,
                    })
                  }
                  className="mt-2 h-[50px] w-[210px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[AvenirLTProBook] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                />
              </label>
              <label
                htmlFor="password"
                className="mt-3 flex flex-col text-white/60"
              >
                <span className="font-[VazirLight] font-extrabold">
                  کلمه عبور
                </span>

                <input
                  type="text"
                  placeholder="حداقل 8 کاراکتر"
                  name="password"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [event.target.name]: event.target.value,
                    })
                  }
                  className="mt-2 h-[50px] w-[210px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[Samim] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                />
              </label>
              <label
                htmlFor="repeatPassword"
                className="mt-3 flex flex-col text-white/60"
              >
                <span className="font-[VazirLight] font-extrabold">
                  تکرار کلمه عبور
                </span>
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
                  className="mt-2 h-[50px] w-[210px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[Samim] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                />
              </label>
              <label htmlFor="" className="mt-3 flex flex-col text-white/60">
                <span className="font-[VazirLight] font-extrabold">جنسیت</span>
              </label>
              <div className="col-span-2 text-white">
                {/* Gender: Male */}
                <div className="grid grid-cols-2 gap-2.5">
                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all ${
                      formData.gender === 0
                        ? 'border-[#ff6b00] bg-[#2b1a10] text-[#ff6b00]'
                        : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                    } font-[SamimBold] text-[20px]`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={0}
                      checked={formData.gender === 0}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          gender: 0,
                        })
                      }
                      className="hidden"
                    />
                    آقا
                  </label>

                  {/* Gender: Female */}
                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all ${
                      formData.gender === 1
                        ? 'border-[#ff6b00] bg-[#2b1a10] text-[#ff6b00]'
                        : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                    } font-[SamimBold] text-[20px]`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={1}
                      checked={formData.gender === 1}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          gender: 1,
                        })
                      }
                      className="hidden"
                    />
                    خانم
                  </label>
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-center">
                <button className="my-10 flex h-[45px] w-[430px] cursor-pointer items-center justify-center rounded-[15px] bg-[#e56113] bg-linear-to-r from-[#f16c15] to-[#c9470d] shadow-[#e56113] transition delay-150 duration-300 hover:scale-110 hover:bg-[#D9D9D9] max-sm:m-auto max-sm:my-10 max-sm:w-[300px]">
                  {loading ? (
                    <SyncLoader
                      color="#000"
                      cssOverride={{}}
                      loading
                      margin={1}
                      size={15}
                      speedMultiplier={1}
                    />
                  ) : (
                    <p className="flex items-center justify-center space-x-2 pr-[5px] font-[SamimBold] text-white">
                      ثبت نام
                    </p>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPageJsx;
