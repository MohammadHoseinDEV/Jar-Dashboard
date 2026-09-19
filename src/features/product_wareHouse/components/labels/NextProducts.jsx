import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useActiveProducts } from '../../Api/printLabel';

function NextProducts({ openNextproduct, setOpenNextProduct, selectedLine }) {
  const closeHandler = () => {
    setOpenNextProduct(false);
  };

  const updateProducts = useActiveProducts();

  const activeHandler = () => {
    updateProducts.mutate(
      { id: selectedLine?.formId, isActive: true },
      {
        onSuccess: () => {
          setOpenNextProduct(false);
        },
      }
    );
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openNextproduct
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative flex max-h-[90vh] min-h-0 max-w-[80vw] transform flex-col overflow-hidden rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-160 ${
          openNextproduct
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="pr-1.5 font-[SamimBold] text-[22px]">
            فعال سازی محصول جدید
          </h1>
          <p
            onClick={closeHandler}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>
        <div className="flex space-x-1 pt-10 text-[18px]">
          <p className="font-[SamimBold]">آیا از فعال کردن محصول</p>
          <p className="font-[AvenirLTProMedium]">
            {selectedLine?.nextProductName}
          </p>
          <p className="font-[SamimBold]">با کد محصول </p>
          <p className="font-[AvenirLTProMedium]">
            {selectedLine?.nextProductCode}
          </p>
          <p className="font-[SamimBold]">اطمینان دارید ؟</p>
        </div>
        <button
          onClick={activeHandler}
          className="m-auto mt-5 flex items-end rounded-[10px] bg-green-600 px-3 py-2"
        >
          تایید
        </button>
      </div>
    </div>
  );
}

export default NextProducts;
