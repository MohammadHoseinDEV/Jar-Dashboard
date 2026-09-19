import { Link } from 'react-router-dom';

import background from '../../../assets/images/background.jpg';
import Logo from '../../../assets/images/logoJar.png';
import { SyncLoader } from 'react-spinners';

import { HiArrowLeft } from 'react-icons/hi';

import { FiLock, FiUser } from 'react-icons/fi';

function ForgetPasswordJsx({ formData, setFormData, submitHandler, loading }) {
  return (
    <div className="relative flex h-screen w-screen max-sm:overflow-hidden">
      <div className="m-auto flex items-center justify-center">
        <img
          src={background}
          alt="Jar-Login"
          className="absolute h-screen w-screen object-cover max-sm:h-screen max-sm:w-screen"
        />
        <p className="absolute flex size-full bg-[#09090e]/80 max-md:bg-[#101017]/70"></p>
        <div className="max-17:scale-75 absolute grid w-[900px] grid-cols-2 rounded-[15px] border border-white/10 bg-[#f9f9f90e] shadow-2xl backdrop-blur-[5px] transition delay-150 duration-300 ease-in-out max-xl:scale-70 max-xl:hover:scale-72 max-sm:flex max-sm:w-[350px] max-sm:space-x-1 max-sm:pt-5">
          <div className="relative h-full w-full rounded-r-[15px] bg-linear-to-br from-[#12121d]/85 via-[#11111c]/85 to-[#12121e]/85 max-md:hidden">
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
            <div className="relative m-auto mt-10 size-70 rounded-full border border-[#5e3113]">
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
          <div className="z-10 rounded-l-[15px] border-r border-white/15 bg-[#0f0f18]/90">
            <form onSubmit={submitHandler}>
              <Link
                to={'/login'}
                className="flex items-center space-x-2 rounded-[10px] py-10 pr-8 font-[SamimBold] text-[18px] transition delay-100 duration-300 ease-in-out"
              >
                <p className="text-[13px] text-white/50">
                  <HiArrowLeft />
                </p>
                <p className="text-[13px] text-white/50">بازگشت به ورود</p>
              </Link>

              <div className="mr-8 mb-5 size-15 rounded-[18px] border border-[#e56113] bg-[#e56113]/15">
                <p className="mt-3 flex items-center justify-center text-[30px] text-[#e56113]">
                  <FiLock />
                </p>
              </div>
              <div className="mr-8 mb-5 space-y-2">
                <p className="font-[SamimBold] text-[25px] font-bold text-white">
                  بازیابی رمز عبور
                </p>
                <p className="text-[14px] text-white/30">
                  اطلاعات پرسنلی خود را برای تایید هویت وارد کنید
                </p>
              </div>
              <div className="flex flex-col items-center justify-center max-sm:space-y-5 max-sm:py-6">
                <label
                  htmlFor=""
                  className="flex flex-col font-[Samim] font-bold text-white/60"
                >
                  کد پرسنلی
                  <input
                    type="tel"
                    placeholder="کدپرسنلی خود را وارد کنید"
                    name="personnelCode"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    pattern="[0-9]*"
                    className="mt-2 h-[50px] w-[350px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[15px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[Samim] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                  />
                </label>
                <label
                  htmlFor=""
                  className="mt-5 flex flex-col font-[Samim] font-bold text-white/60"
                >
                  کدملی
                  <input
                    type="tel"
                    pattern="[0-9]*"
                    placeholder="10 رقمی"
                    dir="rtl"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    name="insuranceCode"
                    className="mt-2 h-[50px] w-[350px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[15px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[Samim] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                  />
                </label>
                <label
                  htmlFor=""
                  className="mt-5 flex flex-col font-[Samim] font-bold text-white/60"
                >
                  شماره تلفن همراه
                  <input
                    type="tel"
                    pattern="[0-9]*"
                    placeholder="09153456789"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    name="mobileNumber"
                    className="mt-2 h-[50px] w-[350px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[15px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[Samim] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-sm:w-[300px]"
                  />
                </label>
              </div>
              <div className="flex items-center justify-center">
                <button className="my-10 flex h-[45px] w-[350px] cursor-pointer items-center justify-center rounded-[15px] bg-[#e56113] bg-linear-to-r from-[#f16c15] to-[#c9470d] shadow-[#e56113] transition delay-150 duration-300 hover:scale-110 hover:bg-[#D9D9D9] max-sm:m-auto max-sm:my-10 max-sm:w-[300px]">
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
                    <p className="space-x-2 pr-[5px] font-[SamimBold] text-white">
                      بررسی اطلاعات
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

export default ForgetPasswordJsx;
