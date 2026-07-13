import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import edit from '../../../../../assets/images/edit.png';
import delet from '../../../../../assets/images/delete.png';
import plus from '../../../../../assets/images/plus.png';
import close from '../../../../../assets/images/close.png';

import { can, getPerm } from '../../../../../utils/rbac';
import Pagination from '../../../../../pagination/Pagination';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { HashLoader } from 'react-spinners';
import API_HOST from '../../../../../../API/api';

function AdminJobPosition() {
  const queryClient = useQueryClient();

  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [mobile, setMobile] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize] = useState(100);
  const [search, setSearch] = useState('');

  const [searchJob, setSearchJob] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({
    title: '',
    code: '',
    description: '',
    level: 0,
    parentPositionId: '',
    isActive: false,
  });

  const perm = useMemo(
    () => getPerm(userMenus, 'admin-job-position'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const resetForm = () => {
    setEditing(null);
    setForm({
      title: '',
      code: '',
      description: '',
      level: 0,
      parentPositionId: '',
      isActive: false,
    });
  };

  const openCreate = () => {
    if (!canCreate) return toast.error('دسترسی ایجاد جایگاه شغلی  ندارید');
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (j) => {
    if (!canEdit) return toast.error('دسترسی ویرایش جایگاه شغلی ندارید');

    setEditing(j);
    setForm({
      title: j.title,
      code: j.code,
      description: j.description,
      level: j.level,
      parentPositionId: j.parentPositionId || '',
      isActive: j.isActive,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const askDelete = (job) => {
    if (!canDelete) return toast.error('دسترسی حذف جایگاه شغلی مورد را ندارید');

    setDeleteTarget(job);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setDeleteTarget(null);
  };

  const validate = () => {
    if (!form.title.trim()) return 'نام جایگاه شغلی الزامی است';
  };

  //  get pixel
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // ------------------------------------------

  // get jop-position
  const {
    data: jobPosition,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`jobPosition`, token, page, pageSize, search],
    queryFn: async () => {
      const response = await axios.get(`${API_HOST}:5257/api/JobPosition`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize, search },
      });
      return response.data;
    },
  });

  const totalPages = jobPosition?.totalPages ?? 1;

  // --------------------------------
  // post jop-position
  const createMutation = useMutation({
    mutationFn: async (form) => {
      const response = await axios.post(
        `${API_HOST}:5257/api/JobPosition`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('جایگاه شغلی جدید با موفقیت اضافه شد');
      queryClient.invalidateQueries({ queryKey: ['jobPosition'] });
    },
    onError: (error) => {
      toast.error(
        error.response.data.message || 'خطا در ایجاد کردن جایگاه شغلی جدید'
      );
    },
  });
  // ------------------------------------

  // edit job-position
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      return axios.put(`${API_HOST}:5257/api/JobPosition/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success('جایگاه شغلی با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['jobPosition'] });
    },
    onError: (error) => {
      toast.error(
        error.response.data.message || 'خطا در انجام ویرایش جایگاه شغلی'
      );
    },
  });
  // ----------------------------

  // delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`${API_HOST}:5257/api/JobPosition${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success(' جایگاه شغلی با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['jobPosition'] });
      setIsDeleteOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'خطا در حذف  جایگاه شغلی');
    },
  });
  // ---------------------------

  const data = {
    title: form.title,
    code: form.code,
    description: form.description,
    level: form.level,
    parentPositionId: form.parentPositionId || null,
    isActive: form.isActive,
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    if (editing) {
      updateMutation.mutate({ id: editing.id, data });
    } else {
      createMutation.mutate(data);
    }

    closeModal();
  };

  const getJob = useMemo(() => {
    const none = { id: '', name: 'انتخاب جایگاه شغلی والد', isActive: true };

    return [
      none,
      ...(jobPosition?.items ?? []).map((j) => ({
        id: j.id,
        name: j.title,
        isActive: j.isActive,
      })),
    ];
  }, [jobPosition]);

  const filterJob = useMemo(() => {
    const q = searchJob.trim().toLowerCase();
    if (!q) return getJob;

    return getJob.filter((s) => (s?.name || '').toLowerCase().includes(q));
  }, [searchJob, getJob]);

  const selectedJob = useMemo(() => {
    return (
      getJob.find((s) => s.id === (form.parentPositionId || '')) || getJob[0]
    );
  }, [getJob, form.parentPositionId]);

  return (
    <div className="rounded-[15px] bg-[#0F090C]/35 p-6 text-white">
      {mobile ? (
        <div>
          <div className="flex flex-col items-center justify-center rounded-2xl py-3">
            <h1 className="pb-2 text-center font-[SamimBold] text-[30px]">
              مدیریت جایگاه شغلی
            </h1>

            <input
              type="text"
              placeholder="جستجو..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
            />
            <button
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
              className="mt-5 flex w-full cursor-pointer items-center justify-center rounded-xl bg-white/10 px-4 py-2 font-[Samim] hover:bg-white/15"
            >
              افزودن جایگاه شغلی +
            </button>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-5 py-35">
              <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
              <p className="pt-8 text-[20px]">لطفا منتظر بمانید😎</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center space-y-5 py-50 text-[25px]">
              خطا در دریافت اطلاعات 😟
            </div>
          ) : (
            <div className="no-scrollbar max-h-100 overflow-y-auto">
              {jobPosition?.items.map((job) => (
                <div key={job.id}>
                  <div className="my-2 rounded-2xl border border-white/50 bg-black/40 pr-2">
                    <p className="space-x-1 pt-3 text-[20px]">
                      <span>عنوان: </span>
                      <span>{job.title}</span>
                    </p>
                    <p className="space-x-1 pt-3 text-[20px]">
                      <span>کد: </span>
                      <span>{job.code}</span>
                    </p>
                    <p className="space-x-1 pt-3 text-[20px]">
                      <span>توضیحات: </span>
                      <span>{job.description}</span>
                    </p>
                    <p className="space-x-1 pt-3 text-[20px]">
                      <span>سطح: </span>
                      <span>{job.level}</span>
                    </p>
                    <p className="space-x-1 pt-3 text-[20px]">
                      <span>جایگاه شغلی والد: </span>
                      <span>{job.parentPositionTitle ?? '___'}</span>
                    </p>
                    <p className="space-x-1 pt-3 text-[20px]">
                      <span>وضعیت: </span>
                      <span>{job.isActive ? 'فعال' : 'غیر فعال'}</span>
                    </p>
                    <p className="space-x-2 pt-4 text-center">
                      <button
                        disabled={!canEdit}
                        onClick={() => openEdit(job)}
                        className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                          canEdit
                            ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                            : 'bg-white/5 opacity-50'
                        }`}
                      >
                        <img src={edit} alt="edit" width={25} />
                      </button>
                      <button
                        disabled={!canDelete}
                        onClick={() => askDelete(job)}
                        className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                          canDelete
                            ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                            : 'bg-white/5 opacity-50'
                        }`}
                      >
                        <img src={delet} alt="delete" width={25} />
                      </button>
                    </p>
                  </div>
                </div>
              ))}
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        // search & title & button
        <div className="rounded-2xl bg-[#0F090C]/50 p-5">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/50 p-5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو..."
              className="w-[300px] rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
            />
            <h1 className="font-[SamimBold] text-xl">جایگاه شغلی</h1>
            <button
              disabled={!canCreate}
              onClick={openCreate}
              className={`group flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-[Samim] ${
                canCreate
                  ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                  : 'cursor-not-allowed bg-white/5 opacity-50'
              }`}
            >
              <span className="relative cursor-pointer transition-all delay-150 duration-200 ease-in-out after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-white/50 after:transition-all after:duration-700 after:ease-out hover:scale-105 hover:after:w-full">
                افزودن جایگاه شغلی
              </span>
              <span className="transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360">
                <img src={plus} alt="plus" width={30} />
              </span>
            </button>
          </div>
          <div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-5 py-50">
                <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
                <p className="pt-8 text-[20px]">لطفا منتظر بمانید😎</p>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center space-y-5 py-50 text-[25px]">
                خطا در دریافت اطلاعات 😟
              </div>
            ) : (
              <div className="no-scrollbar mt-6 max-h-130 overflow-x-auto rounded-2xl border border-white/70">
                <table className="w-full border-separate border-spacing-y-2 px-5 pt-3">
                  <thead>
                    <tr className="text-right text-white/70">
                      <th className="px-3 font-[SamimBold] text-[20px]">کد</th>
                      <th className="px-3 font-[SamimBold] text-[20px]">
                        عنوان
                      </th>
                      <th className="px-3 font-[SamimBold] text-[20px]">
                        توضیحات
                      </th>
                      <th className="px-3 font-[SamimBold] text-[20px]">سطح</th>
                      <th className="px-3 font-[SamimBold] text-[20px]">
                        جایگاه شغلی والد
                      </th>
                      <th className="px-3 font-[SamimBold] text-[20px]">
                        وضعیت
                      </th>
                      <th className="px-3 font-[SamimBold] text-[20px]">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobPosition.items.map((job) => (
                      <React.Fragment key={job.id}>
                        <tr className="bg-white/5">
                          <td className="px-3 py-6 font-[AvenirLTProMedium]">
                            {job.code}
                          </td>
                          <td className="px-3 py-6 font-[Samim]">
                            {job.title}
                          </td>
                          <td className="px-3 py-6 font-[Samim]">
                            {job.description}
                          </td>
                          <td className="px-3 py-6 font-[AvenirLTProMedium]">
                            {job.level}
                          </td>
                          <td className="px-3 py-6 font-[Samim]">
                            {job.parentPositionTitle ?? '___'}
                          </td>
                          <td className="px-3 py-6 font-[Samim]">
                            {job.isActive ? 'فعال' : 'غیرفعال'}
                          </td>
                          <td className="space-x-3 px-3 py-3">
                            <button
                              disabled={!canEdit}
                              onClick={() => openEdit(job)}
                              className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                canEdit
                                  ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                  : 'bg-white/5 opacity-50'
                              }`}
                            >
                              <img src={edit} alt="edit" width={20} />
                            </button>
                            <button
                              disabled={!canDelete}
                              onClick={() => askDelete(job)}
                              className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                canDelete
                                  ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                  : 'bg-white/5 opacity-50'
                              }`}
                            >
                              <img src={delet} alt="delete" width={20} />
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </div>
        // -----------------------------------
      )}

      {/* create modal */}

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isModalOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div
          className={`relative w-[550px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            isModalOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <h1 className="font-[SamimBold] text-lg">
              {editing ? 'ویرایش جایگاه شغلی' : 'ایجاد جایگاه شغلی'}
            </h1>
            <button
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
            >
              <img
                src={close}
                alt="close"
                width={20}
                className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
              />
            </button>
          </div>
          <form className="space-y-3" onSubmit={submitHandler}>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(event) => {
                setForm({
                  ...form,
                  [event.target.name]: event.target.value,
                });
              }}
              placeholder="عنوان"
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={(event) => {
                setForm({
                  ...form,
                  [event.target.name]: event.target.value,
                });
              }}
              placeholder="کد"
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />

            <input
              type="number"
              name="level"
              value={form.level}
              onChange={(event) => {
                setForm({
                  ...form,
                  [event.target.name]: event.target.value,
                });
              }}
              placeholder="سطح"
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={(event) => {
                setForm({
                  ...form,
                  [event.target.name]: event.target.value,
                });
              }}
              placeholder="توضیحات در مورد  جایگاه شغلی"
              className="w-full rounded-2xl bg-white/10 p-3 font-[Samim] text-white outline-none"
            ></textarea>

            <Combobox
              value={selectedJob}
              onChange={(value) =>
                setForm((p) => ({ ...p, parentPositionId: value?.id || '' }))
              }
            >
              {({ open }) => (
                <div className="relative">
                  <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                    <span
                      className={
                        selectedJob?.id ? 'text-white' : 'text-white/70'
                      }
                    >
                      {selectedJob?.name || 'انتخاب جایگاه شغلی والد...'}
                    </span>
                    <span className="text-white/70">{open ? '▴' : '▾'}</span>
                  </ComboboxButton>
                  <div
                    className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                      open ? '' : 'hidden '
                    }`}
                  >
                    <div className="border-b border-white/10 p-2">
                      <ComboboxInput
                        value={searchJob}
                        onChange={(e) => setSearchJob(e.target.value)}
                        placeholder="جستجو..."
                        className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                      />
                    </div>
                    <ComboboxOptions className="no-scrollbar max-h-50 overflow-auto">
                      {filterJob.length === 0 ? (
                        <div className="p-3 text-white/70">موردی پیدا نشد</div>
                      ) : (
                        filterJob
                          ?.filter((j) => j.isActive === true)
                          ?.map((j) => (
                            <ComboboxOption
                              key={j.id || 'null'}
                              value={j}
                              className={({ activ, selected }) =>
                                `cursor-pointer rounded-lg p-3 text-white ${
                                  activ ? 'bg-black' : ''
                                } ${selected ? 'bg-black' : ''}`
                              }
                            >
                              {j.name}
                            </ComboboxOption>
                          ))
                      )}
                    </ComboboxOptions>
                  </div>
                </div>
              )}
            </Combobox>

            <label className="flex items-center pt-3 pr-2 text-[18px]">
              فعال باشد
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={(event) => {
                  setForm({
                    ...form,
                    isActive: event.target.checked,
                  });
                }}
                className="mr-2 size-4"
              />
            </label>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
              >
                {editing ? 'ذخیره' : 'ایجاد'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ---------------------------- */}
      {/* Delete Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isDeleteOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div
          className={`relative w-[550px] transform rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            isDeleteOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-[SamimBold] text-lg">حذف مدرک تحصیلی</h2>
            <span
              onClick={() => {
                setIsDeleteOpen(false);
              }}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
            >
              <img
                src={close}
                alt="close"
                width={20}
                className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
              />
            </span>
          </div>
          <p className="mt-4 font-[Samim] text-white/80">
            آیا از حذف مدرک تحصیلی زیر مطمئن هستید؟
          </p>
          <div className="mt-3 rounded-xl bg-white/5 p-3 font-[Samim] text-white/90">
            <div>عنوان: {deleteTarget?.title}</div>
            <div className="mt-1 text-white/70">کد: {deleteTarget?.code}</div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => {
                deleteMutation.mutate(deleteTarget?.id);
              }}
              disabled={deleteMutation.isPending}
              className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminJobPosition;
