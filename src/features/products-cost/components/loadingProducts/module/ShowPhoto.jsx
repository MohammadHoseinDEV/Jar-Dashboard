import React, { useEffect, useMemo, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { BASE_API } from '../../../Api/loadingProducts';
import { toShamsi } from '../../../../../Time/date';

const API_ORIGIN = new URL(BASE_API).origin;

const toFullUrl = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
};

const VEHICLE_IMAGES = [
  { key: 'vehicleFrontImageUrl', label: 'روبرو' },
  { key: 'vehicleRightImageUrl', label: 'سمت راست' },
  { key: 'vehicleLeftImageUrl', label: 'سمت چپ' },
];

function ShowPhoto({
  openForm,
  setOpenForm,
  selectedLoading,
  setSelectedLoading,
}) {
  const [lightbox, setLightbox] = useState(null);

  const closeHandler = () => {
    setOpenForm(false);
    setSelectedLoading(null);
    setLightbox(null);
  };

  useEffect(() => {
    if (!openForm) return undefined;

    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (lightbox) setLightbox(null);
      else closeHandler();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openForm, lightbox]);

  const vehicleImages = useMemo(
    () =>
      VEHICLE_IMAGES.map(({ key, label }) => ({
        label,
        src: toFullUrl(selectedLoading?.[key]),
      })).filter((item) => item.src),
    [selectedLoading]
  );

  const labelImages = useMemo(
    () =>
      (selectedLoading?.labelImageUrls || []).map(toFullUrl).filter(Boolean),
    [selectedLoading]
  );

  const hasAnyImage = vehicleImages.length > 0 || labelImages.length > 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openForm
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative flex max-h-[90vh] w-[1100px] max-w-[95vw] transform flex-col bg-black p-4 text-white shadow-2xl transition-all duration-300 max-md:p-2 print:max-h-none print:w-full print:scale-100! print:p-0 ${
          openForm
            ? 'translate-y-0 scale-100 opacity-100 max-2xl:scale-95 print:shadow-none'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-3">
          <div className="flex flex-col gap-1">
            <h1 className="5xl:text-[35px] pr-1.5 font-[SamimBold] text-[22px]">
              نمایش عکس‌های بارگیری
            </h1>
            {selectedLoading && (
              <p className="pr-1.5 font-[Samim] text-[14px] text-white/60">
                {selectedLoading.productName?.trim()} — خروجی{' '}
                {selectedLoading.outputNumber} — پلاک{' '}
                {selectedLoading.vehicleNumber} —{' '}
                {toShamsi(selectedLoading.loadingDate)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <p
              onClick={closeHandler}
              className="5xl:size-12 5xl:text-[35px] flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#343457] text-[20px] transition-all delay-75 duration-100 hover:scale-110"
            >
              <span>
                <IoCloseSharp />
              </span>
            </p>
          </div>
        </div>

        <div className="no-scrollbar mt-4 min-h-0 flex-1 overflow-y-auto print:overflow-visible">
          {!hasAnyImage ? (
            <p className="py-10 text-center font-[Samim] text-[16px] text-white/60">
              برای این گزارش عکسی ثبت نشده است.
            </p>
          ) : (
            <>
              {vehicleImages.length > 0 && (
                <section className="mb-6">
                  <h2 className="mb-3 font-[SamimBold] text-[18px]">
                    عکس‌های وسیله نقلیه
                  </h2>
                  <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                    {vehicleImages.map(({ label, src }) => (
                      <figure key={label} className="flex flex-col gap-2">
                        <img
                          src={src}
                          alt={label}
                          loading="lazy"
                          onClick={() => setLightbox(src)}
                          className="h-56 w-full cursor-zoom-in rounded-xl bg-white/5 object-cover transition-all hover:opacity-90 print:h-auto print:cursor-default"
                        />
                        <figcaption className="text-center font-[Samim] text-[14px] text-white/70">
                          {label}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {labelImages.length > 0 && (
                <section>
                  <h2 className="mb-3 font-[SamimBold] text-[18px]">
                    عکس‌های لیبل ({labelImages.length})
                  </h2>
                  <div className="grid grid-cols-6 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2 print:grid-cols-4">
                    {labelImages.map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt={`لیبل ${i + 1}`}
                        loading="lazy"
                        onClick={() => setLightbox(src)}
                        className="h-28 w-full cursor-zoom-in rounded-lg bg-white/5 object-cover transition-all hover:opacity-90 print:h-auto print:cursor-default"
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-6 print:hidden"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="نمایش بزرگ"
            className="max-h-full max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-6 left-6 flex size-10 items-center justify-center rounded-full bg-white/10 text-[24px] transition-all hover:scale-110"
          >
            <IoCloseSharp />
          </button>
        </div>
      )}
    </div>
  );
}

export default ShowPhoto;
