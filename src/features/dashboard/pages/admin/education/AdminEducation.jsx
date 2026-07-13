import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import edit from '../../../../../assets/images/edit.png';
import delet from '../../../../../assets/images/delete.png';
import plus from '../../../../../assets/images/plus.png';
import close from '../../../../../assets/images/close.png';

import { can, getPerm } from '../../../../../utils/rbac';
import { HashLoader } from 'react-spinners';
import API_HOST from '../../../../../../API/api';

function AdminEducation() {
  const queryClient = useQueryClient();
  // --------------------------------------------
  // get Token
  const { token, menus: userMenus } = useSelector((state) => state.auth);
  // -------------------------------

  const [mobile, setMobile] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize] = useState(1);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    name: '',
    isActive: false,
  });

  const perm = useMemo(
    () => getPerm(userMenus, 'admin-educations'),
    [userMenus]
  );
  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const resetForm = () => {
    setEditing(null);
    setForm({
      name: '',
      isActive: true,
    });
  };

  const openCreate = () => {
    if (!canCreate) return toast.error('دسترسی ایجاد مدرک تحصیلی ندارید');
    resetForm();
    setIsModalOpen(!isModalOpen);
  };

  const openEdit = (item) => {
    if (!canEdit) return toast.error('دسترسی ویرایش مدرک تحصیلی ندارید');

    setEditing(item);
    setForm({
      name: item.name,
      isActive: item.isActive,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const askDelete = (item) => {
    if (!canDelete) return toast.error('دسترسی حذف مدرک تحصیلی ندارید');
    setDeleteTarget(item);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setDeleteTarget(null);
  };

  const validate = () => {
    if (!form.name.trim()) return 'نام مدرک تحصیلی الزامی است';
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

  // get Education
  const {
    data: education,
    isLoading,

    isError,
  } = useQuery({
    queryKey: ['education', token, search, page, pageSize],
    queryFn: async () => {
      const response = await axios.get(`${API_HOST}:5257/api/EducationDegree`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return response.data;
    },
  });

  // -----------------------------

  // post Education
  const createMutation = useMutation({
    mutationFn: (form) => {
      return axios.post(`${API_HOST}:5257/api/EducationDegree`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success('مدرک تحصیلی با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['education'] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message || 'خطا در ایجاد کردن  مدرک مورد نظر'
      );
    },
  });
  // ----------------------------------

  // update education
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      return axios.put(`${API_HOST}:5257/api/EducationDegree/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success('ویرایش با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['education'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'ویرایش با خطا مواجه شد');
    },
  });
  // ---------------------------------

  // delete education
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${API_HOST}:5257/api/EducationDegree/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('مدرک تحصیلی با موفقیت حذف شد');
      setIsDeleteOpen(false);
      queryClient.invalidateQueries({ queryKey: ['education'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'خطا در حذف واحد');
    },
  });
  // -------------------------

  const data = {
    name: form.name,
    isActive: form.isActive,
  };

  // submitHandler
  const submitHandler = (event) => {
    event.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    if (editing) {
      updateMutation.mutate({
        id: editing.id,
        data,
      });
    } else {
      createMutation.mutate(data);
    }

    setIsModalOpen(false);
  };
  // --------------------------

  return (
    <div className="rounded-[15px] bg-[#0F090C]/35 p-6 text-white">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isModalOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div
          className={`relative w-[450px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            isModalOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-0 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-2">
            <h1 className="font-[SamimBold] text-lg">
              {editing ? 'ویرایش مدارک تحصیلی' : 'ایجاد مدارک تحصیلی'}
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
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="مدرک تحصیلی"
              value={form.name}
              name="name"
              onChange={(event) => {
                setForm({
                  ...form,
                  [event.target.name]: event.target.value,
                });
              }}
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
            />
            <label className="flex items-center pt-5 pr-2 text-[18px]">
              فعال باشد
              <input
                type="checkbox"
                name="isActive"
                value={form.isActive}
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
      {mobile ? (
        <div>
          <div className="flex flex-col items-center justify-center rounded-2xl pt-3">
            <h1 className="pb-2 text-center font-[SamimBold] text-[30px]">
              مدیریت مدارک تحصیلی
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
              افزودن مدرک تحصیلی +
            </button>
          </div>
          <div className="no-scrollbar max-h-100 overflow-y-auto">
            {education?.map((item) => (
              <div key={item.id}>
                <div className="my-2 rounded-2xl border border-white/50 bg-black/40 pr-2">
                  <p className="space-x-1 pt-3 text-[20px]">
                    <span className="font-[SamimBold]">نام مدرک تحصیلی: </span>
                    <span className="font-[VazirLight]">{item.name}</span>
                  </p>
                  <p className="space-x-1 pt-3 text-[20px]">
                    <span className="font-[SamimBold]">وضعیت: </span>
                    <span className="font-[VazirLight]">
                      {item.isActive ? 'فعال' : 'غیر فعال'}
                    </span>
                  </p>
                  <p className="space-x-2 pt-4 text-center">
                    <button
                      disabled={!canEdit}
                      onClick={() => openEdit(item)}
                      className={`cursor-pointer rounded-[10px] px-3 py-2 font-[Samim] ${
                        canEdit
                          ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                          : 'bg-white/5 opacity-50'
                      }`}
                    >
                      <img src={edit} alt="edit" width={20} />
                    </button>
                    <button
                      disabled={!canDelete}
                      onClick={() => askDelete(item)}
                      className={`cursor-pointer rounded-[10px] px-3 py-2 font-[Samim]${
                        canDelete
                          ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                          : 'bg-white/5 opacity-50'
                      }`}
                    >
                      <img src={delet} alt="delete" width={20} />
                    </button>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // desktop
        <div>
          <div className="rounded-[15px] bg-[#0F090C]/50 p-6 text-white">
            {/* search & h1 & button */}

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 p-5">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جتسجو..."
                className="w-[300px] rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
              />
              <h1 className="font-[SamimBold] text-xl">مدارک تحصیلی</h1>

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
                  افزودن مدرک تحصیلی
                </span>

                <span className="transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360">
                  <img src={plus} alt="plus" width={30} />
                </span>
              </button>
            </div>
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
              <div className="rounded-2xl p-5">
                {/* List education */}
                <div className="rounded-2xl">
                  <div className="no-scrollbar h-150 overflow-auto rounded-2xl border border-white/70">
                    <table className="w-full border-separate border-spacing-y-2 overflow-auto px-5 pt-3">
                      <thead>
                        <tr className="text-center text-white/70">
                          <th className="px-3 font-[SamimBold] text-[20px]">
                            ردیف
                          </th>
                          <th className="px-3 font-[SamimBold] text-[20px]">
                            نام مدرک تحصیلی
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
                        {education?.map((item, index) => (
                          <tr key={item.id} className="bg-white/5 text-center">
                            <td className="px-3 py-6 font-[AvenirLTProMedium]">
                              {index + 1}
                            </td>
                            <td className="px-3 py-6 font-[Samim]">
                              {item.name}
                            </td>
                            <td className="px-3 py-6 font-[Samim]">
                              {item.isActive ? 'فعال' : 'غیرفعال'}
                            </td>
                            <td className="space-x-3 px-3 py-3">
                              <button
                                disabled={!canEdit}
                                onClick={() => openEdit(item)}
                                className={`cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                  canEdit
                                    ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                    : 'bg-white/5 opacity-50'
                                }`}
                              >
                                <img src={edit} alt="edit" width={20} />
                              </button>
                              <button
                                disabled={!canDelete}
                                onClick={() => askDelete(item)}
                                className={`cursor-pointer rounded-[10px] p-2 font-[Samim] max-sm:text-[9px] ${
                                  canDelete
                                    ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                    : 'bg-white/5 opacity-50'
                                }`}
                              >
                                <img src={delet} alt="delete" width={20} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Delete */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isDeleteOpen
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div
          className={`relative w-[500px] transform rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            isDeleteOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-[SamimBold] text-lg">حذف واحد</h2>
            <button
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
            </button>
          </div>

          <p className="mt-4 font-[Samim] text-white/80">
            آیا از حذف واحد زیر مطمئن هستید؟
          </p>

          <div className="mt-3 rounded-xl bg-white/5 p-3 font-[Samim] text-white/90">
            <div>نام: {deleteTarget?.name}</div>
            <div className="mt-1 text-white/70">کد: {deleteTarget?.code}</div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => deleteMutation.mutate(deleteTarget?.id)}
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

export default AdminEducation;
