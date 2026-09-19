import React, { useEffect, useRef, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  useUpdateloadingProducts,
  BASE_API,
} from '../../../Api/loadingProducts';

const MAX_LABEL_IMAGES = 26;
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.75;

// دقیقاً مثل ShowPhoto — برای نمایش <img> نیازی به proxy نیست
const API_ORIGIN = new URL(BASE_API).origin;

const SINGLE_IMAGE_FIELDS = [
  {
    key: 'VehicleFrontImage',
    urlKey: 'VehicleFrontImageUrl',
    label: 'عکس از روبرو',
  },
  {
    key: 'VehicleRightImage',
    urlKey: 'VehicleRightImageUrl',
    label: 'عکس از سمت راست',
  },
  {
    key: 'VehicleLeftImage',
    urlKey: 'VehicleLeftImageUrl',
    label: 'عکس از سمت چپ',
  },
];

const emptyImages = {
  VehicleFrontImage: null,
  VehicleRightImage: null,
  VehicleLeftImage: null,
  LabelImages: [],
};

const emptyExisting = {
  VehicleFrontImage: null,
  VehicleRightImage: null,
  VehicleLeftImage: null,
  LabelImages: [],
};

const pick = (obj, key) => {
  if (!obj) return undefined;
  const camel = key.charAt(0).toLowerCase() + key.slice(1);
  return obj[key] ?? obj[camel];
};

const toDate = (v) => (v ? String(v).split('T')[0] : '');
const toHHmmss = (v) => {
  if (!v) return '';
  const s = String(v);
  return s.split(':').length === 2 ? `${s}:00` : s;
};

// برای نمایش با <img> — آدرس کامل، درست مثل ShowPhoto (نیازی به CORS نداره)
const resolveDisplayUrl = (relativeUrl) => {
  if (!relativeUrl) return null;
  if (/^https?:\/\//i.test(relativeUrl)) return relativeUrl;
  return `${API_ORIGIN}${relativeUrl.startsWith('/') ? '' : '/'}${relativeUrl}`;
};

// برای دانلود واقعی با axios (نیاز به CORS داره، پس از مسیر proxy‌شده‌ی نسبی رد می‌شه)
const resolveFetchUrl = (relativeUrl) => {
  if (!relativeUrl) return null;
  if (/^https?:\/\//i.test(relativeUrl)) return relativeUrl;
  return relativeUrl;
};

const filenameFromUrl = (url) => url.split('/').pop() || 'image.jpg';

// دانلود عکس قبلی از سرور و تبدیل به File (فقط لحظه‌ی submit صدا زده می‌شه)
const urlToFile = async (relativeUrl, token) => {
  const url = resolveFetchUrl(relativeUrl);

  try {
    const res = await axios.get(url, {
      responseType: 'blob',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    const blob = res.data;

    return new File([blob], filenameFromUrl(relativeUrl), {
      type: blob.type || 'image/jpeg',
    });
  } catch (err) {
    console.error('OLD IMAGE DOWNLOAD FAILED:', {
      url,
      status: err?.response?.status,
      message: err?.message,
      response: err?.response,
    });

    throw err;
  }
};

// فشرده‌سازی عکس جدید قبل از آپلود تا حجم کل کمتر بشه (کاهش ریسک قطعی اینترنت)
const compressImage = (file) =>
  new Promise((resolve) => {
    if (!file.type.startsWith('image/')) return resolve(file);

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);
          if (!blob) return resolve(file);
          resolve(
            new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
              type: 'image/jpeg',
            })
          );
        },
        'image/jpeg',
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // اگر فشرده‌سازی خطا داد، فایل اصلی رو بفرست
    };

    img.src = objectUrl;
  });

function LoadingProductImage({
  productsImage,
  selectedProductForImage,
  setSelectedProductForImage,
  setProductsImage,
}) {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [images, setImages] = useState(emptyImages); // فایل‌های جدید
  const [existing, setExisting] = useState(emptyExisting); // عکس‌های قبلی (URL) که نگه داشته می‌شن
  const [previews, setPreviews] = useState({ ...emptyImages });
  const [error, setError] = useState('');
  const [isPreparing, setIsPreparing] = useState(false);
  const [isRefreshingRow, setIsRefreshingRow] = useState(false);
  const labelInputRef = useRef(null);

  const updateReport = useUpdateloadingProducts();
  const isSubmitting = updateReport.isPending ?? updateReport.isLoading;
  const busy = isSubmitting || isPreparing || isRefreshingRow;

  useEffect(() => {
    setImages(emptyImages);
    setError('');

    if (!productsImage || !selectedProductForImage) {
      setExisting(emptyExisting);
      return;
    }

    const id = pick(selectedProductForImage, 'Id');
    setIsRefreshingRow(true);

    queryClient
      .refetchQueries({ queryKey: ['loading'] })
      .then(() => {
        const freshList = queryClient.getQueryData(['loading']);
        const freshRow =
          freshList?.data?.find((r) => pick(r, 'Id') === id) ??
          selectedProductForImage;

        setExisting({
          VehicleFrontImage: pick(freshRow, 'VehicleFrontImageUrl') ?? null,
          VehicleRightImage: pick(freshRow, 'VehicleRightImageUrl') ?? null,
          VehicleLeftImage: pick(freshRow, 'VehicleLeftImageUrl') ?? null,
          LabelImages: pick(freshRow, 'LabelImageUrls') ?? [],
        });
      })
      .catch(() => {
        setExisting({
          VehicleFrontImage:
            pick(selectedProductForImage, 'VehicleFrontImageUrl') ?? null,
          VehicleRightImage:
            pick(selectedProductForImage, 'VehicleRightImageUrl') ?? null,
          VehicleLeftImage:
            pick(selectedProductForImage, 'VehicleLeftImageUrl') ?? null,
          LabelImages: pick(selectedProductForImage, 'LabelImageUrls') ?? [],
        });
      })
      .finally(() => setIsRefreshingRow(false));
  }, [selectedProductForImage, productsImage]);

  useEffect(() => {
    const urls = {
      VehicleFrontImage: images.VehicleFrontImage
        ? URL.createObjectURL(images.VehicleFrontImage)
        : null,
      VehicleRightImage: images.VehicleRightImage
        ? URL.createObjectURL(images.VehicleRightImage)
        : null,
      VehicleLeftImage: images.VehicleLeftImage
        ? URL.createObjectURL(images.VehicleLeftImage)
        : null,
      LabelImages: images.LabelImages.map((f) => URL.createObjectURL(f)),
    };
    setPreviews(urls);
    return () => {
      SINGLE_IMAGE_FIELDS.forEach(({ key }) => {
        if (urls[key]) URL.revokeObjectURL(urls[key]);
      });
      urls.LabelImages.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [images]);

  const closeHandler = () => {
    setSelectedProductForImage(null);
    setProductsImage(false);
    setImages(emptyImages);
    setExisting(emptyExisting);
    setError('');
  };

  const handleSingleChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setImages((prev) => ({ ...prev, [name]: compressed }));
  };

  const handleLabelChange = async (e) => {
    const picked = Array.from(e.target.files || []);
    if (labelInputRef.current) labelInputRef.current.value = '';

    const currentTotal =
      existing.LabelImages.length + images.LabelImages.length;
    const space = MAX_LABEL_IMAGES - currentTotal;

    if (space <= 0) {
      setError(`حداکثر ${MAX_LABEL_IMAGES} عکس لیبل مجاز است.`);
      return;
    }

    const toAdd = picked.slice(0, space);
    if (picked.length > space) {
      setError(
        `فقط ${space} عکس دیگر می‌توانید اضافه کنید. مابقی نادیده گرفته شد.`
      );
    } else {
      setError('');
    }

    const compressed = await Promise.all(toAdd.map(compressImage));
    setImages((prev) => ({
      ...prev,
      LabelImages: [...prev.LabelImages, ...compressed],
    }));
  };

  const removeNewLabelImage = (index) => {
    setImages((prev) => ({
      ...prev,
      LabelImages: prev.LabelImages.filter((_, i) => i !== index),
    }));
    setError('');
  };

  const removeExistingLabelImage = (index) => {
    setExisting((prev) => ({
      ...prev,
      LabelImages: prev.LabelImages.filter((_, i) => i !== index),
    }));
  };

  const removeNewSingleImage = (key) => {
    setImages((prev) => ({ ...prev, [key]: null }));
  };

  const removeExistingSingleImage = (key) => {
    setExisting((prev) => ({ ...prev, [key]: null }));
  };

  const totalLabelCount =
    existing.LabelImages.length + images.LabelImages.length;

  const hasAnyImage =
    SINGLE_IMAGE_FIELDS.some(({ key }) => images[key] || existing[key]) ||
    totalLabelCount > 0;

  const buildBaseFields = (row) => ({
    OutputNumber: pick(row, 'OutputNumber') ?? 0,
    LoadingDate: toDate(pick(row, 'LoadingDate')),
    VehicleNumber: pick(row, 'VehicleNumber') ?? 0,
    LoadingStartTime: toHHmmss(pick(row, 'LoadingStartTime')),
    LoadingEndTime: toHHmmss(pick(row, 'LoadingEndTime')),
    ProductNotBroken: pick(row, 'ProductNotBroken') ?? true,
    LabelMatchesProduct: pick(row, 'LabelMatchesProduct') ?? true,
    PalletPlasticAndStrapsHealthy:
      pick(row, 'PalletPlasticAndStrapsHealthy') ?? true,
    VehicleCoverAvailable: pick(row, 'VehicleCoverAvailable') ?? true,
    ReferralCode: pick(row, 'ReferralCode') ?? 0,
    PalletCount: pick(row, 'PalletCount') ?? 0,
    ShiftName: pick(row, 'ShiftName') ?? '',
    ProductCode: pick(row, 'ProductCode') ?? '',
    ProductName: pick(row, 'ProductName') ?? '',
    UnitsPerPallet: pick(row, 'UnitsPerPallet') ?? 0,
    Destination: pick(row, 'Destination') ?? '',
  });

  const doSubmit = async () => {
    setError('');
    const row = selectedProductForImage;
    const id = pick(row, 'Id');

    if (!id) {
      setError('رکورد انتخاب نشده است.');
      return;
    }
    if (!hasAnyImage) {
      setError('حداقل یک عکس باید وجود داشته باشد.');
      return;
    }

    setIsPreparing(true);
    try {
      const singleFiles = {};
      const brokenFields = []; // 👈 جدید: عکس‌هایی که دانلودشون fail شد

      for (const { key, label } of SINGLE_IMAGE_FIELDS) {
        if (images[key] instanceof File) {
          singleFiles[key] = images[key];
        } else if (existing[key]) {
          try {
            singleFiles[key] = await urlToFile(existing[key], token);
          } catch (e) {
            brokenFields.push(label); // 👈 عکس مشخص رو ثبت کن
          }
        }
      }

      // لیبل‌ها: قدیمی‌های نگه‌داشته‌شده (دانلود+تبدیل) + جدیدها
      const keptExistingLabelFiles = [];
      let brokenLabelCount = 0;
      for (const url of existing.LabelImages) {
        try {
          keptExistingLabelFiles.push(await urlToFile(url, token));
        } catch (e) {
          brokenLabelCount += 1;
        }
      }

      if (brokenFields.length > 0 || brokenLabelCount > 0) {
        setIsPreparing(false);
        const parts = [];
        if (brokenFields.length > 0) {
          parts.push(`عکس‌های (${brokenFields.join('، ')}) روی سرور یافت نشد`);
        }
        if (brokenLabelCount > 0) {
          parts.push(`${brokenLabelCount} عکس لیبل قبلی روی سرور یافت نشد`);
        }
        setError(
          `${parts.join(' و ')}. لطفاً این عکس‌ها را دوباره به‌صورت دستی انتخاب کنید.`
        );
        return;
      }

      const finalLabelFiles = [
        ...keptExistingLabelFiles,
        ...images.LabelImages,
      ];

      setIsPreparing(false);

      const fd = new FormData();
      const base = buildBaseFields(row);
      Object.entries(base).forEach(([k, v]) => fd.append(k, v));

      SINGLE_IMAGE_FIELDS.forEach(({ key }) => {
        if (singleFiles[key] instanceof File) fd.append(key, singleFiles[key]);
      });
      finalLabelFiles.forEach((file) => fd.append('LabelImages', file));

      updateReport.mutate(
        { id, form: fd },
        {
          onSuccess: () => closeHandler(),
          onError: () => setError('آپلود با خطا مواجه شد. دوباره تلاش کنید.'),
        }
      );
    } catch (err) {
      console.error('IMAGE PREPARATION ERROR:', err);
      setIsPreparing(false);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'در آماده‌سازی عکس‌های قبلی خطایی رخ داد.'
      );
    }
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
        onClick={closeHandler}
      />
      <div
        className={`relative flex max-h-[90vh] w-[1000px] max-w-[95vw] transform flex-col rounded-[15px] bg-linear-to-l from-[#242b5c] to-[#1f1f4a] p-6 text-white shadow-2xl transition-all duration-300 max-2xl:scale-95 max-md:h-180 ${
          productsImage
            ? ' 5xl:scale-120 translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between">
          <h1 className="pr-1.5 font-[SamimBold] text-[22px]">
            آپلود عکس محصول
            {pick(selectedProductForImage, 'ProductName')
              ? ` — ${pick(selectedProductForImage, 'ProductName')}`
              : ''}
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

        <form
          id="loadingImagesForm"
          onSubmit={(e) => {
            e.preventDefault();
            doSubmit();
          }}
          className="no-scrollbar mt-4 flex min-h-0 flex-col gap-5 overflow-y-auto"
        >
          {isRefreshingRow && (
            <p className="font-[Samim] text-[13px] text-white/60">
              در حال بروزرسانی اطلاعات عکس‌ها...
            </p>
          )}

          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {SINGLE_IMAGE_FIELDS.map(({ key, label }) => {
              const newPreview = previews[key];
              const existingUrl = existing[key];
              const showUrl =
                newPreview ||
                (existingUrl ? resolveDisplayUrl(existingUrl) : null);
              return (
                <div key={key} className="flex flex-col gap-2">
                  <label htmlFor={key} className="font-[Samim] text-[16px]">
                    {label}
                  </label>
                  <input
                    type="file"
                    id={key}
                    name={key}
                    accept="image/*"
                    disabled={busy}
                    onChange={handleSingleChange}
                    className="w-full cursor-pointer rounded-xl bg-white/10 p-3 font-[Samim] text-[15px] text-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {showUrl && (
                    <div className="relative">
                      <img
                        src={showUrl}
                        alt={label}
                        className="h-40 w-full rounded-xl object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          newPreview
                            ? removeNewSingleImage(key)
                            : removeExistingSingleImage(key)
                        }
                        disabled={busy}
                        className="absolute top-2 left-2 flex size-7 items-center justify-center rounded-full bg-black/70 text-[16px]"
                      >
                        <IoCloseSharp />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="LabelImages" className="font-[Samim] text-[16px]">
              عکس لیبل ({totalLabelCount} از {MAX_LABEL_IMAGES})
            </label>
            <input
              ref={labelInputRef}
              type="file"
              id="LabelImages"
              name="LabelImages"
              accept="image/*"
              multiple
              disabled={totalLabelCount >= MAX_LABEL_IMAGES || busy}
              onChange={handleLabelChange}
              className="w-full cursor-pointer rounded-xl bg-white/10 p-3 font-[Samim] text-[15px] text-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {totalLabelCount > 0 && (
            <div className="grid grid-cols-6 gap-3 max-md:grid-cols-3">
              {existing.LabelImages.map((url, i) => (
                <div key={`existing-${url}`} className="relative">
                  <img
                    src={resolveDisplayUrl(url)}
                    alt={`لیبل قبلی ${i + 1}`}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingLabelImage(i)}
                    disabled={busy}
                    className="absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-[14px]"
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              ))}
              {previews.LabelImages.map((src, i) => (
                <div key={`new-${src}`} className="relative">
                  <img
                    src={src}
                    alt={`لیبل جدید ${i + 1}`}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewLabelImage(i)}
                    disabled={busy}
                    className="absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-[14px]"
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="font-[Samim] text-[15px] text-red-400">{error}</p>
          )}
        </form>

        <div className="mt-4 shrink-0 text-left">
          <button
            type="button"
            onClick={doSubmit}
            disabled={busy || !hasAnyImage}
            className="btn-submit disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRefreshingRow
              ? 'در حال بارگذاری...'
              : isPreparing
                ? 'در حال آماده‌سازی...'
                : isSubmitting
                  ? 'در حال آپلود...'
                  : 'آپلود عکس‌ها'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoadingProductImage;
