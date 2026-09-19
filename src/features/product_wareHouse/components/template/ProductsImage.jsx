import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useImageProducts } from '../../Api/productsApi';

function ProductsImage({
  productsImage,
  handleOpenUpload,
  handleCloseUpload,
  selectedProductForImage,
  setSelectedProductForImage,
}) {
  const [form, setForm] = useState({
    id: '',
    ProductImage: null,
    CertificateImage: null,
  });

  useEffect(() => {
    if (!selectedProductForImage) return;

    setForm((p) => ({
      ...p,
      
      id: selectedProductForImage?.id,
    }));
  }, [selectedProductForImage, handleOpenUpload]);

  const uploadImages = useImageProducts();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', form.id);

    if (form.ProductImage) {
      formData.append('ProductImage', form.ProductImage);
    }
    if (form.CertificateImage) {
      formData.append('CertificateImage', form.CertificateImage);
    }

    uploadImages.mutate(
      { id: selectedProductForImage.id, formData },
      {
        onSuccess: () => {
          handleCloseUpload();
        },
        onError: (error) => {
          console.error('خطای آپلود:', error);
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center p-4 transition-opacity duration-300 ${
        productsImage
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={handleCloseUpload}
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] transform flex-col rounded-[15px] bg-linear-to-l from-[#242b5c] to-[#1f1f4a] p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-180 max-md:overflow-auto ${
          productsImage
            ? ' 5xl:scale-120 translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="pr-1.5 font-[SamimBold] text-[22px]">
            آپلود عکس محصول
          </h1>
          <p
            onClick={handleCloseUpload}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>

        <div>
          <form className="grid grid-cols-2 gap-3" onSubmit={submitHandler}>
            <label htmlFor="">
              عکس محصول
              <input
                type="file"
                name="ProductImage"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    ProductImage: e.target.files?.[0],
                  }));
                }}
                className="m-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="">
              عکس چیدمان محصول
              <input
                type="file"
                name="CertificateImage"
                onChange={(e) => {
                  setForm((p) => ({
                    ...p,
                    CertificateImage: e.target.files?.[0],
                  }));
                }}
                className="m-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <button
              type="submit"
              className="col-span-2 m-auto flex cursor-pointer items-center justify-center rounded-xl bg-green-500/50 px-8 py-2 font-[Samim] hover:bg-green-500/70 disabled:opacity-50"
            >
              آپلود
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductsImage;
