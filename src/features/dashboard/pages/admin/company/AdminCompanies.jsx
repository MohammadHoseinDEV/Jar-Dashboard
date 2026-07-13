import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { getPerm, can } from '../../../../../utils/rbac';
import { companyApi } from '../../../../../hooks/company/companiApi';

import edit from '../../../../../assets/images/edit.png';
import delet from '../../../../../assets/images/delete.png';
import plus from '../../../../../assets/images/plus.png';
import close from '../../../../../assets/images/close.png';
import { HashLoader } from 'react-spinners';

import Pagination from '../../../../../pagination/Pagination';

function normalizeCompanies(data) {
  if (Array.isArray(data)) return data;
  if (data?.companies && Array.isArray(data.companies)) return data.companies;
  if (data?.items && Array.isArray(data.items)) return data.items;
  return [];
}

export default function AdminCompanies() {
  const [mobile, setMobile] = useState(false);

  const queryClient = useQueryClient();
  // token & menu
  const { token, menus: userMenus } = useSelector((s) => s.auth);

  // get pixel
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // RBAC
  const perm = useMemo(
    () => getPerm(userMenus, 'admin-companies'),
    [userMenus]
  );
  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  // UI state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    name: '',
    code: '',
    isActive: true,
  });

  const resetForm = () => {
    setEditing(null);
    setForm({ name: '', code: '', isActive: true });
  };

  const openCreate = () => {
    if (!canCreate) return toast.error('دسترسی ایجاد شرکت ندارید');
    setIsModalOpen(true);
  };

  const openEdit = (c) => {
    if (!canEdit) return toast.error('دسترسی ویرایش شرکت ندارید');
    setEditing(c);
    setForm({
      name: c?.name || '',
      code: c?.code || '',
      isActive: c?.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const askDelete = (c) => {
    if (!canDelete) return toast.error('دسترسی حذف شرکت ندارید');
    setDeleteTarget(c);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setDeleteTarget(null);
  };

  const validate = () => {
    if (!form.name.trim()) return 'نام شرکت الزامی است';
    if (!String(form.code).trim()) return 'کد شرکت الزامی است';
    return null;
  };

  // Query: list
  const companiesQuery = useQuery({
    queryKey: ['companies', page, pageSize, search],
    enabled: !!token,
    queryFn: async () => {
      return companyApi.list({ token, page, pageSize, search });
    },
  });

  const companies = useMemo(
    () => normalizeCompanies(companiesQuery.data),
    [companiesQuery.data]
  );

  const totalPages =
    companiesQuery.data?.totalPages ?? companiesQuery.data?.totalPage ?? 1;

  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['companies'] });

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (dto) => companyApi.create({ token, dto }),
    onSuccess: () => {
      toast.success('شرکت ایجاد شد');
      closeModal();
      refetch();
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در ایجاد شرکت');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, dto }) => companyApi.update({ token, id, dto }),
    onSuccess: () => {
      toast.success('شرکت ویرایش شد');
      closeModal();
      refetch();
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در ویرایش شرکت');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => companyApi.remove({ token, id }),
    onSuccess: () => {
      toast.success('شرکت با موفقیت حذف شد');
      closeDelete();
      refetch();
    },
    onError: (e) => {
      toast.error(e?.response?.data || 'خطا در حذف شرکت');
    },
  });

  const onSubmit = () => {
    const msg = validate();
    if (msg) return toast.error(msg);

    const dto = {
      name: form.name.trim(),
      code: String(form.code).trim(),
      isActive: !!form.isActive,
    };

    if (editing?.id) {
      updateMutation.mutate({ id: editing.id, dto });
    } else {
      createMutation.mutate(dto);
    }
  };

  return (
    <div className="rounded-[15px] bg-[#0F090C]/30 p-6 text-white">
      {mobile ? (
        <div>
          <div className="flex flex-col items-center justify-center rounded-2xl">
            <h1 className="pb-2 text-center font-[SamimBold] text-[30px]">
              مدیریت شرکت ها
            </h1>
            <input
              type="text"
              placeholder="جستجو..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="mx-1 mb-5 rounded-2xl border border-white/70 py-2 pr-2 placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
            />
            <button
              disabled={!canCreate}
              onClick={openCreate}
              className={`rounded-xl px-4 py-2 font-[Samim] ${
                canCreate
                  ? 'bg-white/10 hover:bg-white/15'
                  : 'bg-white/5 opacity-50'
              }`}
            >
              <span className="relative cursor-pointer transition-all delay-150 duration-200 ease-in-out after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-white/50 after:transition-all after:duration-700 after:ease-out hover:scale-105 hover:after:w-full">
                افزودن شرکت
              </span>
            </button>
          </div>
          <div className="h-100 overflow-auto">
            {companiesQuery?.data?.companies.map((company) => (
              <div
                key={company.id}
                className="mb-2.5 rounded-2xl border border-white/50 bg-black/40"
              >
                <div className="space-y-2 rounded-2xl p-2 text-center">
                  <p className="space-x-1 text-[16px]">
                    <span>نام: </span>
                    <span>{company.name}</span>
                  </p>
                  <p className="space-x-1 text-[16px]">
                    <span>کد: </span>
                    <span>{company.code}</span>
                  </p>
                  <p className="space-x-1 text-[16px]">
                    <span>وضعیت: </span>
                    <span>{company.isActive ? 'فعال' : 'غیرفعال'}</span>
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2 pt-3">
                  <button
                    disabled={!canEdit}
                    onClick={() => openEdit(company)}
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
                    onClick={() => askDelete(company)}
                    className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                      canDelete
                        ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                        : 'bg-white/5 opacity-50'
                    }`}
                  >
                    <img src={delet} alt="delete" width={25} />
                  </button>
                </div>
              </div>
            ))}
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </div>
      ) : (
        // desktop

        <div className="rounded-2xl bg-[#0F090C]/50 p-5">
          <div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/50 p-5">
              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="جستجو..."
                className="w-[300px] rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white"
              />
              <h1 className="font-[SamimBold] text-xl">مدیریت شرکت‌ها</h1>

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
                  افزودن شرکت
                </span>
                <span className="transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360">
                  <img src={plus} alt="plus" width={30} />
                </span>
              </button>
            </div>

            {/* List */}
            <div className="mt-6 overflow-x-auto rounded-2xl border border-white/50 p-5">
              {companiesQuery.isLoading ? (
                <div className="flex flex-col items-center justify-center space-y-5 py-35">
                  <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
                  <p className="pt-8 text-[20px]">لطفا منتظر بمانید😎</p>
                </div>
              ) : companiesQuery.isError ? (
                <div className="flex flex-col items-center justify-center space-y-5 py-50 text-[25px]">
                  خطا در دریافت اطلاعات 😟
                </div>
              ) : (
                <table className="max-h-135 w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-right text-white/70">
                      <th className="px-3 font-[SamimBold] text-[20px]">نام</th>
                      <th className="px-3 font-[SamimBold] text-[20px]">کد</th>
                      <th className="px-3 font-[SamimBold] text-[20px]">
                        وضعیت
                      </th>
                      <th className="px-3 font-[SamimBold] text-[20px]">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c) => (
                      <tr key={c.id} className="rounded-xl bg-white/5">
                        <td className="px-3 py-3 font-[Samim]">{c.name}</td>
                        <td className="px-3 py-3 font-[AvenirLTProMedium] text-white/80">
                          {c.code ?? '—'}
                        </td>
                        <td className="px-3 py-3 font-[Samim] text-white/80">
                          {c.isActive ? 'فعال' : 'غیرفعال'}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              disabled={!canEdit}
                              onClick={() => openEdit(c)}
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
                              onClick={() => askDelete(c)}
                              className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                canDelete
                                  ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                  : 'bg-white/5 opacity-50'
                              }`}
                            >
                              <img src={delet} alt="delete" width={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {companies.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-3 py-6 text-center text-white/70"
                        >
                          شرکتی وجود ندارد
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}

      {/* Modal Create/Edit */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isModalOpen ? 'opacity-100 ' : 'pointer-events-none opacity-0'
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
            <h2 className="font-[SamimBold] text-lg">
              {editing ? 'ویرایش شرکت' : 'ایجاد شرکت'}
            </h2>
            <span
              onClick={closeModal}
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

          <div className="mt-4 grid gap-3">
            <input
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
              placeholder="نام شرکت"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
              placeholder="کد شرکت"
              value={form.code}
              onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
            />

            <label className="flex items-center gap-2 font-[Samim] text-white/80">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((p) => ({ ...p, isActive: e.target.checked }))
                }
              />
              فعال باشد
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
            >
              {editing ? 'ذخیره' : 'ایجاد'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Delete */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isDeleteOpen ? 'opacity-100 ' : 'pointer-events-none opacity-0'
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
            <h2 className="font-[SamimBold] text-lg">حذف شرکت</h2>
            <span
              onClick={closeDelete}
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
            آیا از حذف شرکت زیر مطمئن هستید؟
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
