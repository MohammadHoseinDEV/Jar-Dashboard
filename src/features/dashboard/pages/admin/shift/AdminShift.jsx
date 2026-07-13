import { useEffect, useMemo, useState } from 'react';

import close from '../../../../../assets/images/close.png';
import edit from '../../../../../assets/images/edit.png';
import delet from '../../../../../assets/images/delete.png';
import inforamation from '../../../../../assets/images/information.png';
import plus from '../../../../../assets/images/plus.png';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import TimePickerInput from '../../../../../Time/TimePickerInput';
import { can, getPerm } from '../../../../../utils/rbac';
import { HashLoader } from 'react-spinners';
import Pagination from '../../../../../pagination/Pagination';
import API_HOST from '../../../../../../API/api';

function toHHmmss(hhmm) {
  if (!hhmm) return null;
  if (/^\d{2}:\d{2}$/.test(hhmm)) return `${hhmm}:00`;
  if (/^\d{2}:\d{2}:\d{2}$/.test(hhmm)) return hhmm;
  return hhmm;
}
function shortTime(t) {
  if (!t) return '-';
  return String(t).slice(0, 5);
}

function AdminShift() {
  const { token, menus: userMenus } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [mobile, setMobile] = useState(false);

  // Create
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Details
  const [openShiftModal, setOpenShiftModal] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);

  // Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    pattern: 3,
    color: '#2196F3',
    cycles: [
      {
        workDayType: 1,
        durationDays: 1,
        startTime: '',
        endTime: '',
        breakMinutes: '',
      },
    ],
  });

  const perm = useMemo(() => getPerm(userMenus, 'admin-shift'), [userMenus]);
  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const pattern = Number(form.pattern);

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      pattern: 3,
      color: '#2196F3',
      cycles: [
        {
          workDayType: 1,
          durationDays: 1,
          startTime: '',
          endTime: '',
          breakMinutes: '',
        },
      ],
    });
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditId(null);
    resetForm();
  };

  const openCreate = () => {
    if (!canCreate) return toast.error('دسترسی ایجاد کاربر ندارید');
    resetForm();
    setIsModalOpen(true);
  };

  const askDelete = (shift) => {
    if (!canDelete) return toast.error('شما دسترسی حذف را ندارید');
    setDeleteTarget(shift);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setDeleteTarget(null);
  };

  const updateCycle = (index, field, value) => {
    setForm((prev) => {
      const cycles = prev.cycles.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      );

      // اگر تعطیل شد => زمان‌ها خالی
      if (field === 'workDayType' && Number(value) === 0) {
        cycles[index] = {
          ...cycles[index],
          workDayType: 0,
          startTime: '',
          endTime: '',
          breakMinutes: '',
        };
      }

      return { ...prev, cycles };
    });
  };

  const addCycle = () => {
    setForm((prev) => ({
      ...prev,
      cycles: [
        ...(prev.cycles || []),
        {
          workDayType: 1,
          durationDays: 1,
          startTime: '',
          endTime: '',
          breakMinutes: '',
        },
      ],
    }));
  };

  const removeCycle = (index) => {
    setForm((prev) => {
      const next = [...(prev.cycles || [])];
      next.splice(index, 1);
      //نگه داشتن حداقل یکی
      if (next.length === 0) {
        next.push({
          workDayType: 1,
          durationDays: 1,
          startTime: '',
          endTime: '',
          breakMinutes: '',
        });
      }
      return { ...prev, cycles: next };
    });
  };

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ===== list shifts =====
  const {
    data: shiftsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['shifts', token, search, page, pageSize],
    enabled: !!token,
    queryFn: async () => {
      const response = await axios.get(`${API_HOST}:5257/api/Shift`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return response.data;
    },
  });

  const totalPages = shiftsData?.totalPages ?? 1;

  // ===== shift details by id =====
  const {
    data: shiftDetails,
    isLoading: isShiftLoading,
    isError: isShiftError,
  } = useQuery({
    queryKey: ['shift', selectedShiftId, token],
    enabled: !!selectedShiftId && !!token,
    queryFn: async () => {
      const res = await axios.get(
        `${API_HOST}:5257/api/Shift/${selectedShiftId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });

  // ===== create =====
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await axios.post(`${API_HOST}:5257/api/Shift`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('شیفت با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      closeCreateModal();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.title ||
          'خطا در ایجاد کردن شیفت'
      );
    },
  });

  // ===== update (EDIT) =====
  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const response = await axios.put(
        `${API_HOST}:5257/api/Shift/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('شیفت با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      closeEditModal();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.title ||
          'خطا در ویرایش شیفت'
      );
    },
  });

  // ===== delete =====
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${API_HOST}:5257/api/Shift/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('شیفت با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      closeDelete();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'خطا در حذف شیفت');
    },
  });

  const buildPayloadFromForm = () => {
    const p = Number(form.pattern);

    if (![0, 2].includes(p)) {
      toast.error('نوع شیفت را درست انتخاب کنید.');
      return null;
    }
    if (!form.name.trim()) {
      toast.error('نام شیفت الزامی است.');
      return null;
    }
    if (!Array.isArray(form.cycles) || form.cycles.length === 0) {
      toast.error('حداقل یک چرخه (cycle) لازم است.');
      return null;
    }

    for (const c of form.cycles) {
      const isOff = Number(c.workDayType) === 0;
      if (!isOff && (!c.startTime || !c.endTime)) {
        toast.error('زمان شروع/پایان برای روزهای کاری الزامی است.');
        return null;
      }
    }

    return {
      name: form.name.trim(),
      description: form.description?.trim() || null,
      pattern: p,
      color: form.color || null,
      cycles: form.cycles.map((c) => {
        const isOff = Number(c.workDayType) === 0;
        return {
          workDayType: Number(c.workDayType),
          durationDays: Number(c.durationDays),
          startTime: isOff ? null : toHHmmss(c.startTime),
          endTime: isOff ? null : toHHmmss(c.endTime),
          breakMinutes: isOff
            ? null
            : c.breakMinutes === ''
              ? 0
              : Number(c.breakMinutes),
        };
      }),
    };
  };

  const createHandler = (event) => {
    event.preventDefault();
    if (!canCreate) return toast.error('شما دسترسی ایجاد را ندارید');

    const payload = buildPayloadFromForm();
    if (!payload) return;

    createMutation.mutate(payload);
  };

  const editHandler = (event) => {
    event.preventDefault();
    if (!canEdit) return toast.error('شما دسترسی ویرایش را ندارید');
    if (!editId) return toast.error('شناسه شیفت نامعتبر است');

    const payload = buildPayloadFromForm();
    if (!payload) return;

    updateMutation.mutate({ id: editId, payload });
  };

  const clickHandler = (shiftItem) => {
    setSelectedShiftId(shiftItem.id);
    setOpenShiftModal(true);
  };

  const openEdit = async (item) => {
    if (!canEdit) return toast.error('شما دسترسی ویرایش را ندارید');

    try {
      setIsEditOpen(true);
      setEditId(item.id);

      const res = await axios.get(`${API_HOST}:5257/api/Shift/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const d = res.data.data;

      setForm({
        name: d.name || '',
        description: d.description || '',
        pattern: d.pattern ?? 3,
        color: d.color || '#2196F3',
        cycles: (d.cycles || []).length
          ? d.cycles.map((c) => ({
              workDayType: c.workDayType ?? 1,
              durationDays: c.durationDays ?? 1,
              startTime: c.startTime ? shortTime(c.startTime) : '',
              endTime: c.endTime ? shortTime(c.endTime) : '',
              breakMinutes: c.breakMinutes ?? '',
            }))
          : [
              {
                workDayType: 1,
                durationDays: 1,
                startTime: '',
                endTime: '',
                breakMinutes: '',
              },
            ],
      });
    } catch (e) {
      toast.error('خطا در دریافت اطلاعات برای ویرایش');
      setIsEditOpen(false);
      setEditId(null);
    }
  };

  const openInfo = (shiftItem) => {
    if (!canCreate)
      return toast.error('شما دسترسی دیدن جزئیات کاربر را ندارید');
    setSelectedShiftId(shiftItem.id);
    setOpenShiftModal(true);
  };

  const renderShiftForm = ({ onSubmit, submitText, submitting, onCancel }) => (
    <form
      className="no-scrollbar grid max-h-145 grid-cols-2 gap-2 overflow-auto pr-1.5"
      onSubmit={onSubmit}
    >
      <label>
        نام شیفت
        <input
          type="text"
          name="name"
          value={form.name}
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder=" عنوان شیفت را وارد کنید."
          className="w-full rounded-xl bg-white/10 px-3 py-2 font-[Samim] text-[18px] text-white outline-none placeholder:text-[15px]"
        />
      </label>

      <label>
        توضیحات
        <input
          type="text"
          name="description"
          value={form.description}
          autoComplete="off"
          spellCheck={false}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="توضیحات را وارد کنید"
          className="w-full rounded-xl bg-white/10 px-3 py-2 font-[Samim] text-[18px] text-white outline-none placeholder:text-[15px]"
        />
      </label>

      <label className="col-span-1">
        رنگ
        <input
          type="color"
          value={form.color || '#2196F3'}
          onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
          className="mt-2 h-11 w-full cursor-pointer rounded-xl bg-white/10 p-2"
        />
      </label>

      <label className="col-span-1">
        نوع شیفت
        <select
          name="pattern"
          value={form.pattern}
          onChange={(e) => setForm((p) => ({ ...p, pattern: e.target.value }))}
          className="mt-2 w-full rounded-xl bg-white/10 px-3 py-2 font-[Samim] text-[18px] text-white outline-none"
        >
          <option value={3} className="bg-black/95 text-[15px] text-white">
            انتخاب شیفت
          </option>
          <option value={0} className="bg-black/95 text-[15px] text-white">
            شیفت ثابت (روزانه)
          </option>
          <option value={2} className="bg-black/95 text-[15px] text-white">
            شیفت چرخشی
          </option>
        </select>
      </label>

      {(pattern === 0 || pattern === 2) && (
        <div className="no-scrollbar col-span-2 h-90 overflow-y-auto">
          <div className="no-scrollbar mt-2 overflow-y-auto rounded-2xl border border-white/20 p-4">
            <div className="no-scrollbar mb-3 flex items-center justify-between overflow-y-auto">
              <p className="font-[SamimBold] text-white/80">چرخش ها</p>

              {pattern === 2 && (
                <button
                  type="button"
                  onClick={addCycle}
                  className="rounded-xl bg-white/10 px-3 py-2 font-[Samim] hover:bg-white/15"
                >
                  افزودن چرخش +
                </button>
              )}
            </div>

            <div className="space-y-4">
              {form.cycles.map((c, idx) => {
                const isOff = Number(c.workDayType) === 0;

                return (
                  <div key={idx} className="rounded-xl bg-white/5 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <label>
                        نوع روز
                        <select
                          value={c.workDayType}
                          onChange={(e) =>
                            updateCycle(idx, 'workDayType', e.target.value)
                          }
                          className="mt-2 w-full rounded-xl bg-white/10 px-3 py-2 font-[Samim] text-white outline-none"
                        >
                          <option value={1} className="bg-black/95 text-white">
                            صبح
                          </option>
                          <option value={3} className="bg-black/95 text-white">
                            شب
                          </option>
                          <option value={0} className="bg-black/95 text-white">
                            تعطیل
                          </option>
                        </select>
                      </label>

                      <label>
                        تعداد روز
                        <input
                          type="number"
                          value={c.durationDays}
                          onChange={(e) =>
                            updateCycle(idx, 'durationDays', e.target.value)
                          }
                          className="mt-2 w-full rounded-xl bg-white/10 px-3 py-2 font-[Samim] text-white outline-none"
                        />
                      </label>

                      <TimePickerInput
                        label="زمان شروع"
                        name={`start_${idx}`}
                        value={c.startTime}
                        minuteStep={1}
                        onChange={(_, v) => updateCycle(idx, 'startTime', v)}
                      />

                      <TimePickerInput
                        label="زمان پایان"
                        name={`end_${idx}`}
                        value={c.endTime}
                        minuteStep={1}
                        onChange={(_, v) => updateCycle(idx, 'endTime', v)}
                      />

                      <label className="col-span-2">
                        استراحت (دقیقه)
                        <input
                          type="number"
                          value={c.breakMinutes}
                          disabled={isOff}
                          onChange={(e) =>
                            updateCycle(idx, 'breakMinutes', e.target.value)
                          }
                          placeholder={
                            isOff ? 'برای تعطیل، خالی می‌ماند' : 'مثلاً 30'
                          }
                          className="mt-2 w-full rounded-xl bg-white/10 px-3 py-2 font-[Samim] text-white outline-none disabled:opacity-50"
                        />
                      </label>
                    </div>

                    {pattern === 2 && form.cycles.length > 1 && (
                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeCycle(idx)}
                          className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
                        >
                          حذف این چرخه
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="col-span-2 flex justify-end space-x-3">
        <button
          type="submit"
          disabled={submitting}
          className="ml-3 cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
        >
          {submitting ? 'در حال ذخیره...' : submitText}
        </button>
      </div>
    </form>
  );

  return (
    <div className="rounded-[15px] bg-[#0F090C]/30 p-6 text-white">
      {mobile ? (
        <div>
          <div className="overflow-hidden">
            <h1 className="pb-2 text-center font-[SamimBold] text-[30px]">
              شیفت ها
            </h1>
            <p className="flex flex-col">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو..."
                className="w-full rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
              />
              <button
                disabled={!canCreate}
                onClick={openCreate}
                className={`mt-3 rounded-xl px-4 py-2 font-[Samim] ${
                  canCreate
                    ? 'bg-white/10 hover:bg-white/15'
                    : 'cursor-not-allowed bg-white/5 opacity-50'
                }`}
              >
                افزودن شیفت جدید +
              </button>
            </p>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-5 py-50">
              <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
              <p className="pt-10 text-[20px]">لطفا منتظر بمانید😎</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center space-y-5 py-50 text-[30px]">
              خطا در دریافت اطلاعات 😟
            </div>
          ) : (
            <div className="mt-3 max-h-105 overflow-auto">
              {shiftsData?.data?.map((item) => (
                <div
                  key={item.id}
                  className="mb-2.5 rounded-2xl border border-white/50 bg-black/40"
                >
                  <div className="space-y-2 rounded-2xl p-2 text-right">
                    <p className="space-x-1 text-[16px]">
                      <span>عنوان : </span>
                      <span>{item.name}</span>
                    </p>
                    <p className="space-x-1 text-[16px]">
                      <span>کد : </span>
                      <span>{item.pattern}</span>
                    </p>
                    <p className="space-x-1 text-[16px]">
                      <span>توضیحات : </span>
                      <span>{item.description}</span>
                    </p>
                    <p className="space-x-1 text-[16px]">
                      <span>بازه زمانی : </span>
                      <span>{item.totalCycleDays}</span>
                    </p>
                    <p className="space-x-1 text-[16px]">
                      <span>کاربران شیفت : </span>
                      <span>{item.assignedUsersCount}</span>
                    </p>
                    <p className="space-x-1 text-[16px]">
                      <span>وضعیت : </span>
                      <span>{item.isActive ? 'فعال' : 'غیرفعال'}</span>
                    </p>
                    <p className="flex items-center justify-center space-x-2">
                      <button
                        disabled={!canEdit}
                        onClick={() => {
                          openEdit(item);
                        }}
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
                        onClick={() => {
                          askDelete(item);
                        }}
                        className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                          canDelete
                            ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                            : 'bg-white/5 opacity-50'
                        }`}
                      >
                        <img src={delet} alt="delete" width={25} />
                      </button>
                      <button
                        disabled={!canCreate}
                        onClick={() => {
                          openInfo(item);
                        }}
                        className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                          canCreate
                            ? ' cursor-pointer bg-linear-to-bl from-blue-500 to-blue-800 transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                            : ' cursor-not-allowed opacity-50'
                        }`}
                      >
                        <img src={inforamation} alt="information" width={25} />
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
        // desktop
        <div className="rounded-2xl bg-[#0F090C]/50 p-5">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/50 p-5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو..."
              className="w-[300px] rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
            />
            <h1 className="font-[SamimBold] text-xl">شیفت ها</h1>

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
                افزودن شیفت
              </span>
              <span className="transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360">
                <img src={plus} alt="plus" width={30} />
              </span>
            </button>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/70">
            <table className="w-full border-separate border-spacing-y-2 px-5 pt-3">
              <thead>
                <tr className="text-center text-white/70">
                  <th></th>
                  <th className="px-3 font-[SamimBold] text-[20px]">عنوان</th>
                  <th className="px-3 font-[SamimBold] text-[20px]">کد</th>
                  <th className="px-3 font-[SamimBold] text-[20px]">توضیحات</th>
                  <th className="px-3 font-[SamimBold] text-[20px]">
                    بازه زمانی
                  </th>
                  <th className="px-3 font-[SamimBold] text-[20px]">
                    کاربران شیفت
                  </th>
                  <th className="px-3 font-[SamimBold] text-[20px]">وضعیت</th>
                  <th className="px-3 font-[SamimBold] text-[20px]">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {shiftsData?.data?.map((item) => (
                  <tr key={item.id} className="bg-white/5 text-center">
                    <td className="pr-3">
                      <span
                        className="inline-block h-6 w-6 rounded-md border border-white/20"
                        style={{ backgroundColor: item.color }}
                      />
                    </td>

                    <td className="px-3 py-6 font-[Samim]">{item.name}</td>
                    <td className="px-3 py-6 font-[AvenirLTProMedium]">
                      {item.pattern}
                    </td>
                    <td className="px-3 py-6 font-[Samim]">
                      {item.description}
                    </td>
                    <td className="space-x-1 px-3 py-6">
                      <span className="font-[AvenirLTProMedium]">
                        {item.totalCycleDays}
                      </span>
                      <span className="font-[VazirLight]">روز</span>
                    </td>
                    <td className="px-3 py-6 font-[AvenirLTProMedium]">
                      {item.assignedUsersCount}
                    </td>
                    <td className="px-3 py-6 font-[Samim]">
                      {item.isActive ? 'فعال' : 'غیرفعال'}
                    </td>

                    <td className="flex items-center justify-center space-x-3 px-3 py-6 text-center">
                      <button
                        disabled={!canEdit}
                        onClick={() => openEdit(item)}
                        className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                          canEdit
                            ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                            : 'bg-white/5 opacity-50'
                        }`}
                        type="button"
                      >
                        <img src={edit} alt="edit" width={25} />
                      </button>

                      <button
                        disabled={!canDelete}
                        onClick={() => askDelete(item)}
                        className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                          canDelete
                            ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                            : 'bg-white/5 opacity-50'
                        }`}
                        type="button"
                      >
                        <img src={delet} alt="delete" width={25} />
                      </button>

                      <button onClick={() => clickHandler(item)} type="button">
                        <img
                          src={inforamation}
                          alt="info"
                          width={40}
                          className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                            canCreate
                              ? ' cursor-pointer bg-linear-to-bl from-blue-500 to-blue-800 transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                              : ' cursor-not-allowed opacity-50'
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* {!isLoading && shiftsData?.data?.length === 0 && (
                  <tr>
                    <td
                      className="flex flex-col items-center justify-center space-y-5 py-35"
                      colSpan={8}
                    >
                      <HashLoader
                        color="#ffffff"
                        size={80}
                        speedMultiplier={1.5}
                      />
                      لطفا منتظر بمانید😎
                    </td>
                  </tr>
                )} */}
              </tbody>
            </table>

            {isLoading && (
              <div className="flex flex-col items-center justify-center space-y-5 py-35 pr-30">
                <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
                <p className="pt-8 text-[20px]">لطفا منتظر بمانید😎</p>
              </div>
            )}
            {isError && (
              <div className="flex flex-col items-center justify-center space-y-5 py-50 text-[25px]">
                خطا در دریافت اطلاعات 😟
              </div>
            )}
          </div>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}

      {/*  CREATE MODAL  */}

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isModalOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div
          className={`relative transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 text-white shadow-2xl transition-all duration-300 ${
            isModalOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex w-full flex-col rounded-[15px] p-6">
            <div className="flex items-center justify-between">
              <h1 className="pr-1.5 pb-5 font-[SamimBold] text-[20px]">
                ایجاد شیفت
              </h1>
              <button
                onClick={() => {
                  setIsModalOpen(false);
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
            {renderShiftForm({
              onSubmit: createHandler,
              submitText: 'ایجاد',
              submitting: createMutation.isPending,
              onCancel: closeCreateModal,
            })}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isEditOpen ? 'opacity-100 ' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div
          className={`relative transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 text-white shadow-2xl transition-all duration-300 ${
            isEditOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="to-gray-600] flex w-full flex-col rounded-[15px] bg-linear-to-tl from-black p-3">
            <div className="flex items-center justify-between pb-1">
              <h1 className="pr-1.5 font-[SamimBold] text-[20px]">
                ویرایش شیفت
              </h1>
              <button
                type="button"
                onClick={closeEditModal}
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
            {renderShiftForm({
              onSubmit: editHandler,
              submitText: 'ذخیره',
              submitting: updateMutation.isPending,
              onCancel: closeEditModal,
            })}
          </div>
        </div>
      </div>

      {/*  DETAILS MODAL  */}
      <>
        {mobile ? (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
              openShiftModal ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            <div
              className={`relative w-[550px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 px-3 py-5 text-white shadow-2xl transition-all duration-300 ${
                openShiftModal
                  ? 'translate-y-0 scale-100 opacity-100'
                  : '-translate-y-10 scale-95 opacity-0'
              }`}
            >
              <div className="flex items-center justify-between pb-5">
                <h2 className="pr-1.5 font-[SamimBold] text-[20px]">
                  عنوان شیفت: {shiftDetails?.data?.name}
                </h2>
                <button
                  onClick={() => {
                    setOpenShiftModal(false);
                    setSelectedShiftId(null);
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
              <p className="mb-2 text-right">
                <span className="font-[SamimBold]">توضیحات: </span>
                <span className="font-[Samim] text-white/80">
                  {shiftDetails?.data?.description}
                </span>
              </p>

              <p className="mb-4 text-right">
                <span className="font-[SamimBold]">نوع: </span>
                <span className="font-[Samim] text-white/80">
                  {shiftDetails?.data?.patternName}
                </span>
              </p>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-white/70">
                <table className="w-full border-separate border-spacing-y-2 px-4 pt-3">
                  <thead>
                    <tr>
                      <th className="px-3 font-[SamimBold] text-[14px]">نوع</th>
                      <th className="px-3 font-[SamimBold] text-[14px]">
                        شروع
                      </th>
                      <th className="px-3 font-[SamimBold] text-[14px]">
                        پایان
                      </th>
                      <th className="px-3 font-[SamimBold] text-[14px]">
                        استراحت
                      </th>
                      <th className="px-3 font-[SamimBold] text-[14px]">
                        تعداد روز
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shiftDetails?.data?.cycles?.map((cycle) => (
                      <tr key={cycle.id} className="bg-white/5 text-center">
                        <td className="py-5 font-[Samim]">
                          {cycle.workDayTypeName}
                        </td>
                        <td className="font-[Samim]">
                          {shortTime(cycle.startTime)}
                        </td>
                        <td className="font-[Samim]">
                          {shortTime(cycle.endTime)}
                        </td>
                        <td className="font-[Samim]">
                          {cycle.breakMinutes ?? '-'}
                        </td>
                        <td className="font-[Samim]">{cycle.durationDays}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          // desktop
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
              openShiftModal ? 'opacity-100 ' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

            <div
              className={`relative transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 px-10 py-5 text-white shadow-2xl transition-all duration-300 ${
                openShiftModal
                  ? 'translate-y-0 scale-100 opacity-100'
                  : '-translate-y-10 scale-95 opacity-0'
              }`}
            >
              {isShiftLoading && (
                <div className="flex flex-col items-center justify-center space-y-5 py-35">
                  <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
                  <p className="pt-8 text-[20px]">لطفا منتظر بمانید😎</p>
                </div>
              )}
              {isShiftError && (
                <div className="flex flex-col items-center justify-center space-y-5 py-50 text-[25px]">
                  خطا در دریافت اطلاعات 😟
                </div>
              )}

              {!isShiftLoading && !isShiftError && shiftDetails?.data && (
                <>
                  <div className="flex items-center justify-between pb-5">
                    <h1 className="mb-4 text-center font-[SamimBold] text-2xl text-white">
                      عنوان شیفت: {shiftDetails.data.name}
                    </h1>
                    <button
                      onClick={() => {
                        setOpenShiftModal(false);
                        setSelectedShiftId(null);
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

                  <p className="mb-2 text-right">
                    <span className="font-[SamimBold]">توضیحات: </span>
                    <span className="font-[Samim] text-white/80">
                      {shiftDetails.data.description}
                    </span>
                  </p>

                  <p className="mb-4 text-right">
                    <span className="font-[SamimBold]">نوع: </span>
                    <span className="font-[Samim] text-white/80">
                      {shiftDetails.data.patternName}
                    </span>
                  </p>

                  <div className="mt-6 overflow-x-auto rounded-2xl border border-white/70">
                    <table className="w-full border-separate border-spacing-y-2 px-5 pt-3">
                      <thead>
                        <tr className="text-center text-white/70">
                          <th className="px-3 font-[SamimBold] text-[16px]">
                            نوع
                          </th>
                          <th className="px-3 font-[SamimBold] text-[16px]">
                            شروع
                          </th>
                          <th className="px-3 font-[SamimBold] text-[16px]">
                            پایان
                          </th>
                          <th className="px-3 font-[SamimBold] text-[16px]">
                            استراحت
                          </th>
                          <th className="px-3 font-[SamimBold] text-[16px]">
                            تعداد روز
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shiftDetails.data.cycles?.map((cycle) => (
                          <tr key={cycle.id} className="bg-white/5 text-center">
                            <td className="py-5 font-[Samim]">
                              {cycle.workDayTypeName}
                            </td>
                            <td className="font-[Samim]">
                              {shortTime(cycle.startTime)}
                            </td>
                            <td className="font-[Samim]">
                              {shortTime(cycle.endTime)}
                            </td>
                            <td className="font-[Samim]">
                              {cycle.breakMinutes ?? '-'}
                            </td>
                            <td className="font-[Samim]">
                              {cycle.durationDays}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </>

      {/*  DELETE MODAL  */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isDeleteOpen ? 'opacity-100 ' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div
          className={`relative transform rounded-[15px] bg-linear-to-bl from-black to-gray-600 p-3 px-5 text-white shadow-2xl transition-all duration-300 ${
            isDeleteOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <h2 className="pr-1.5 font-[SamimBold] text-[20px]">حذف شیفت</h2>
            <span
              onClick={closeDelete}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
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
            آیا از حذف شیفت زیر مطمئن هستید؟
          </p>

          <div className="mt-3 rounded-xl bg-white/5 p-3 font-[Samim] text-white/90">
            <div>نام: {deleteTarget?.name}</div>
            <div className="mt-1 space-x-1 text-white/70">
              <span>کد:</span>
              <span className="font-[AvenirLTProMedium]">
                {deleteTarget?.pattern}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => deleteMutation.mutate(deleteTarget?.id)}
              disabled={deleteMutation.isPending}
              className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
            >
              {deleteMutation.isPending ? 'در حال حذف...' : 'حذف'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminShift;
