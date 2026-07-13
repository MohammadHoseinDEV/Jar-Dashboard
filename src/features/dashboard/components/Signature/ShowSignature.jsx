import close from '../../../../assets/images/close.png';

function ShowSignature({ openImage, setOpenImage, signatureSrc }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openImage ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <div
        className={`relative transform rounded-[15px] bg-[#0F090C] p-6 text-white shadow-2xl transition-all duration-300 ${
          openImage
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between pb-5">
          <h1 className="font-[SamimBold] text-lg">عکس امضاء</h1>
          <p
            onClick={() => {
              setOpenImage(false);
            }}
            className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
          >
            <img src={close} alt="close" width={20} />
          </p>
        </div>
        <img
          src={signatureSrc}
          alt="signatureSrc"
          width={500}
          className="bg-white"
        />
      </div>
    </div>
  );
}

export default ShowSignature;
