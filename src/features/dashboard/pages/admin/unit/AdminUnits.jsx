import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Pagination from '../../../../../pagination/Pagination';

import edit from '../../../../../assets/images/edit.png';
import delet from '../../../../../assets/images/delete.png';
import plus from '../../../../../assets/images/plus.png';
import close from '../../../../../assets/images/close.png';

import { can, getPerm } from '../../../../../utils/rbac';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { HashLoader } from 'react-spinners';
import API_HOST from '../../../../../../API/api';

function AdminUnits() {
  const queryClient = useQueryClient();
  // get tokens & menu
  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [mobile, setMobile] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [searchCompany, setSearchCompany] = useState('');
  const [searchUnit, setSearchUnit] = useState('');

  const [form, setForm] = useState({
    name: '',
    code: '',
    company: '' || null,
    unit: '',
    isActive: false,
  });

  const perm = useMemo(() => getPerm(userMenus, 'admin-units'), [userMenus]);

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const resetForm = () => {
    setEditing(null);
    setForm({
      name: '',
      code: '',
      company: '' || null,
      unit: '',
      isActive: true,
    });
  };

  const openCreate = () => {
    if (!canCreate) return toast.error('دسترسی ایجاد واحد ندارید');
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (c) => {
    if (!canEdit) return toast.error('دسترسی ویرایش واحد ندارید');

    setEditing(c);
    setForm({
      name: c.name,
      code: c.code,
      company: c.companyId || '',
      unit: c.parentUnitId || '',
      isActive: c.isActive,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const askDelete = (unit) => {
    if (!canDelete) return toast.error('دسترسی حذف واحد ندارید');

    setDeleteTarget(unit);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setDeleteTarget(null);
  };

  const validate = () => {
    if (!form.name.trim()) return 'نام واحد الزامی است';
    if (!String(form.code).trim()) return 'کد واحد الزامی است';
    return null;
  };

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // get company
  const { data: company, isPending } = useQuery({
    queryKey: ['company', token],
    queryFn: async () => {
      const response = await axios.get(`${API_HOST}:5257/api/Company`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  const isNumeric = (value) => /^\d+$/.test(value);

  // get units
  const {
    data: units,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['units', token, search, page, pageSize],
    queryFn: async () => {
      const params = {
        includeSubUnits: true,
        page,
        pageSize,
      };

      if (search) {
        if (isNumeric(search)) {
          params.code = search;
        } else {
          params.search = search;
        }
      }

      const response = await axios.get(`${API_HOST}:5257/api/Unit`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      return response.data;
    },
  });

  const totalPages = units?.totalPages ?? 1;

  // post units
  const mutation = useMutation({
    mutationFn: (form) => {
      return axios.post(`${API_HOST}:5257/api/Unit`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success('واحد با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
    onError: (error) => {
      toast.error('خطا در ایجاد کردن واحد', error.response?.data.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      return axios.put(`${API_HOST}:5257/api/Unit/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success('ویرایش با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'خطا در انجام ویرایش');
    },
  });

  // delete unit
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${API_HOST}:5257/api/Unit/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('واحد با موفقیت حذف شد');
      setIsDeleteOpen(false);
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data || 'خطا در حذف واحد');
    },
  });

  const data = {
    name: form.name,
    code: form.code,
    companyId: form.company || null,
    parentUnitId: form.unit || null,
    isActive: form.isActive,
  };

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
      mutation.mutate(data);
    }

    closeModal();
  };

  // company
  const getCompany = useMemo(() => {
    const none = { id: '', name: 'انتخاب شرکت', isActive: true };

    return [
      none,
      ...(company?.companies ?? []).map((c) => ({
        id: c.id,
        name: c.name,
        isActive: c.isActive,
      })),
    ];
  }, [company]);

  const filterCompany = useMemo(() => {
    const q = searchCompany.trim().toLowerCase();
    if (!q) return getCompany;

    return getCompany.filter((c) => (c?.name || '').toLowerCase().includes(q));
  }, [searchCompany, getCompany]);

  const selectedCompany = useMemo(() => {
    return (
      getCompany.find((c) => c.id === (form.company || '')) || getCompany[0]
    );
  }, [getCompany, form.company]);
  // ------------------------------------

  // unit
  const getUnit = useMemo(() => {
    const none = { id: '', name: 'انتخاب واحد', isActive: true };

    const flattenUnits = (units, depth = 0) => {
      if (!units) return [];

      const prefix = '-'.repeat(depth > 0 ? depth : 0);
      return units.flatMap((u) => [
        {
          id: u.id,
          name: `${prefix ? prefix + ' ' : ''}${u.name}`,
          parentUnitId: u.parentUnitId,
          isActive: true,
        },
        ...flattenUnits(u.subUnits, depth + 1),
      ]);
    };
    

    const items = flattenUnits(units?.units ?? []);
    return [none, ...items];
  }, [units]);

  const filterUnit = useMemo(() => {
    const q = searchUnit.trim().toLowerCase();
    if (!q) return getUnit;

    return getUnit.filter((u) => (u?.name || '').toLowerCase().includes(q));
  }, [searchUnit, getUnit]);

  const selectedUnit = useMemo(() => {
    return getUnit.find((u) => u.id === (form.unit || '')) || getUnit[0];
  }, [getUnit, form.unit]);
  // ----------------
  return (
    <div className="rounded-[15px] bg-[#0F090C]/30 p-6 text-white">
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
          <div className="m-auto flex items-center justify-between pb-5">
            <h2 className="font-[SamimBold] text-[20px]">
              {editing ? 'ویرایش واحد' : 'ایجاد واحد'}
            </h2>
            <span
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
            </span>
          </div>
          <form onSubmit={submitHandler} className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="نام واحد"
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
            <input
              type="text"
              placeholder="کد واحد"
              value={form.code}
              name="code"
              onChange={(event) => {
                setForm({
                  ...form,
                  [event.target.name]: event.target.value,
                });
              }}
              className="w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
            />

            <Combobox
              value={selectedCompany}
              onChange={(value) =>
                setForm((p) => ({
                  ...p,
                  company: value?.id || '',
                }))
              }
            >
              {({ open }) => (
                <div className="relative">
                  <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                    <span
                      className={
                        selectedCompany?.id ? 'text-white' : 'text-white/70'
                      }
                    >
                      {selectedCompany?.name || 'انتخاب شرکت...'}
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
                        value={searchCompany}
                        onChange={(e) => setSearchCompany(e.target.value)}
                        placeholder="جستجو..."
                        className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                      />
                    </div>
                    <ComboboxOptions className="no-scrollbar max-h-60 overflow-auto p-1">
                      {filterCompany
                        ?.filter((c) => c.isActive === true)
                        ?.map((c) => (
                          <ComboboxOption
                            key={c.id || 'null'}
                            value={c}
                            className={({ activ, selected }) =>
                              `cursor-pointer rounded-lg p-3 text-white ${
                                activ ? 'bg-black' : ''
                              } ${selected ? 'bg-black' : ''}`
                            }
                          >
                            {c.name}
                          </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                  </div>
                </div>
              )}
            </Combobox>

            <Combobox
              value={selectedUnit}
              onChange={(value) =>
                setForm((p) => ({
                  ...p,
                  unit: value?.id,
                }))
              }
            >
              {({ open }) => (
                <div className="relative">
                  <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                    <span
                      className={
                        selectedUnit?.id ? 'text-white' : 'text-white/70'
                      }
                    >
                      {selectedUnit?.name || 'انتخاب واحد...'}
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
                        value={searchUnit}
                        onChange={(e) => setSearchUnit(e.target.value)}
                        placeholder="جستجو..."
                        className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                      />
                    </div>
                    <ComboboxOptions className="no-scrollbar max-h-60 overflow-auto p-1">
                      {filterUnit.length === 0 ? (
                        <div className="p-3 text-white/70">موردی پیدا نشد</div>
                      ) : (
                        filterUnit
                          ?.filter((u) => u.isActive === true)
                          ?.map((u) => (
                            <ComboboxOption
                              key={u.id || 'null'}
                              value={u}
                              className={({ activ, selected }) =>
                                `cursor-pointer rounded-lg p-3 text-white ${
                                  activ ? 'bg-black' : ''
                                } ${selected ? 'bg-black' : ''}`
                              }
                            >
                              {u.name}
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
                checked={form.isActive}
                name="isActive"
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
              />
            </label>
            <div className="flex justify-end space-x-5">
              <button
                type="submit"
                disabled={mutation.isPending || updateMutation.isPending}
                className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
              >
                {editing ? 'ذخیره' : 'ایجاد'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {mobile ? (
        // mobile
        <div>
          <div className="flex flex-col items-center justify-center rounded-2xl py-3">
            <h1 className="pb-2 text-center font-[SamimBold] text-[30px]">
              مدیریت واحدها
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
              disabled={!canCreate}
              onClick={openCreate}
              className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 font-[Samim] ${
                canCreate
                  ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                  : 'cursor-not-allowed bg-white/5 opacity-50'
              }`}
            >
              افزودن واحد +
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
            <div className="no-scrollbar h-100 overflow-y-auto">
              {units &&
                units?.units.map((unit) => (
                  <div key={unit.id}>
                    <div className="my-2 rounded-2xl border border-white/50 bg-black/40 pr-2">
                      <p className="space-x-1 pt-3 text-[20px]">
                        <span className="font-[SamimBold]">کد واحد: </span>
                        <span className="font-[VazirLight]">{unit.code}</span>
                      </p>
                      <p className="space-x-1 pt-3 text-[20px]">
                        <span className="font-[SamimBold]">نام واحد: </span>
                        <span className="font-[VazirLight]">{unit.name}</span>
                      </p>
                      <p className="space-x-1 pt-3 text-[20px]">
                        <span className="font-[SamimBold]">نام شرکت: </span>
                        <span className="font-[VazirLight]">
                          {unit.company ?? '___'}
                        </span>
                      </p>
                      <p className="space-x-1 pt-3 text-[20px]">
                        <span className="font-[SamimBold]">نام واحد والد:</span>
                        <span className="font-[VazirLight]">
                          {unit.parentUnitName ?? 'فاقد والد'}
                        </span>
                      </p>
                      <p className="space-x-1 pt-3 text-[20px]">
                        <span className="font-[SamimBold]">وضعیت: </span>
                        <span className="font-[VazirLight]">
                          {unit.isActive ? 'فعال' : 'غیر فعال'}
                        </span>
                      </p>
                      <p className="space-x-2 pt-4 text-center">
                        <button
                          disabled={!canEdit}
                          onClick={() => openEdit(unit)}
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
                          onClick={() => askDelete(unit)}
                          className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                            canDelete
                              ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                              : 'bg-white/5 opacity-50'
                          }`}
                        >
                          <img src={delet} alt="delet" width={25} />
                        </button>
                      </p>
                    </div>
                    <div>
                      {unit.subUnits.map((sub) => (
                        <div key={sub.id} className="flex">
                          <p className="pt-4 pl-3">↳</p>
                          <div className="my-2 w-full space-y-2 rounded-2xl border border-white/50 bg-black/40 pr-2">
                            <p className="space-x-1 pt-3 text-[20px]">
                              <span className="font-[SamimBold]">کد واحد:</span>
                              <span className="font-[Samim]">{sub.code}</span>
                            </p>
                            <p className="space-x-1 pt-3 text-[20px]">
                              <span className="font-[SamimBold]">
                                نام واحد:
                              </span>
                              <span className="font-[Samim]">{sub.name}</span>
                            </p>
                            <p className="space-x-1 pt-3 text-[20px]">
                              <span className="font-[SamimBold]">
                                نام شرکت:
                              </span>
                              <span className="font-[Samim]">
                                {sub.companyName}
                              </span>
                            </p>
                            <p className="space-x-1 pt-3 text-[20px]">
                              <span className="font-[SamimBold]">
                                نام واحد والد:
                              </span>
                              <span className="font-[Samim]">
                                {sub.parentUnitName}
                              </span>
                            </p>
                            <p className="space-x-1 pt-3 text-[20px]">
                              <span className="font-[SamimBold]">وضعیت: </span>
                              <span className="font-[Samim]">
                                {sub.isActive ? 'فعال' : 'غیرفعال'}
                              </span>
                            </p>
                            <p className="space-x-2 pt-4 text-center text-[20px]">
                              <button
                                disabled={!canEdit}
                                onClick={() => openEdit(sub)}
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
                                onClick={() => askDelete(sub)}
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
        <div className="rounded-2xl bg-[#0F090C]/40 p-5">
          <div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/50 bg-[#0F090C]/40 p-3">
              <input
                placeholder="جستجو..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-[300px] rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
              />
              <h1 className="font-[SamimBold] text-xl">مدیریت واحدها</h1>

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
                  افزودن واحد
                </span>
                <span className="transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360">
                  <img src={plus} alt="plus" width={30} />
                </span>
              </button>
            </div>

            {/* List */}
            <div className="mt-6 overflow-x-auto rounded-2xl p-5">
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
                <div className="no-scrollbar mt-6 h-130 overflow-x-auto rounded-2xl border border-white/70">
                  <table className="w-full border-separate border-spacing-y-2 px-5 pt-3">
                    <thead>
                      <tr className="text-right text-white/70">
                        <th className="px-3 font-[SamimBold] text-[20px]">
                          کد واحد
                        </th>
                        <th className="px-3 font-[SamimBold] text-[20px]">
                          نام واحد
                        </th>
                        <th className="px-3 font-[SamimBold] text-[20px]">
                          نام شرکت
                        </th>
                        <th className="px-3 font-[SamimBold] text-[20px]">
                          نام واحد والد
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
                      {units?.units.map((unit) => (
                        <React.Fragment key={unit.id}>
                          {/* ردیف اصلی */}
                          <tr>
                            <td className="px-3 py-6 font-[AvenirLTProMedium]">
                              {unit.code}
                            </td>
                            <td className="px-3 py-3 font-[Samim]">
                              {unit.name}
                            </td>
                            <td className="px-3 py-3 font-[Samim]">
                              {unit.companyName}
                            </td>
                            <td className="px-3 py-3 font-[Samim]">
                              {unit.parentUnitName ?? 'فاقد والد'}
                            </td>
                            <td className="px-3 py-3 font-[Samim]">
                              {unit.isActive ? 'فعال' : 'غیرفعال'}
                            </td>
                            <td className="space-x-3 px-3 py-3">
                              <button
                                disabled={!canEdit}
                                onClick={() => openEdit(unit)}
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
                                onClick={() => askDelete(unit)}
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

                          {/* ساب یونیت‌ها */}
                          {unit.subUnits?.map((sub) => (
                            <React.Fragment key={sub.id}>
                              <tr className="bg-white/5">
                                <td className="px-3 py-3 pr-3 font-[AvenirLTProMedium]">
                                  ↳ {sub.code}
                                </td>
                                <td className="px-3 py-3 font-[Samim]">
                                  {sub.name}
                                </td>
                                <td className="px-3 py-3 font-[Samim]">
                                  {sub.companyName}
                                </td>
                                <td className="px-3 py-3 font-[Samim]">
                                  {sub.parentUnitName ?? '—'}
                                </td>
                                <td className="px-3 py-3 font-[Samim]">
                                  {sub.isActive ? 'فعال' : 'غیرفعال'}
                                </td>
                                <td className="space-x-3 px-3 py-3">
                                  <button
                                    disabled={!canEdit}
                                    onClick={() => openEdit(sub)}
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
                                    onClick={() => askDelete(sub)}
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
                              {sub?.subUnits?.map((s) => (
                                <React.Fragment key={s.id}>
                                  <tr className="bg-white/5">
                                    <td className="px-3 py-3 pr-6 font-[AvenirLTProMedium]">
                                      ↳ {s.code}
                                    </td>
                                    <td className="px-3 py-3 font-[Samim]">
                                      {s.name}
                                    </td>
                                    <td className="px-3 py-3 font-[Samim]">
                                      {s.companyName}
                                    </td>
                                    <td className="px-3 py-3 font-[Samim]">
                                      {s.parentUnitName ?? '—'}
                                    </td>
                                    <td className="px-3 py-3 font-[Samim]">
                                      {s.isActive ? 'فعال' : 'غیرفعال'}
                                    </td>
                                    <td className="space-x-3 px-3 py-3">
                                      <button
                                        disabled={!canEdit}
                                        onClick={() => openEdit(s)}
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
                                        onClick={() => askDelete(s)}
                                        className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                          canDelete
                                            ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                            : 'bg-white/5 opacity-50'
                                        }`}
                                      >
                                        <img
                                          src={delet}
                                          alt="delete"
                                          width={20}
                                        />
                                      </button>
                                    </td>
                                  </tr>
                                  {s?.subUnits?.map((sab) => (
                                    <React.Fragment key={sab.id}>
                                      <tr className="bg-white/5">
                                        <td className="px-3 py-3 pr-9 font-[AvenirLTProMedium]">
                                          ↳ {sab.code}
                                        </td>
                                        <td className="px-3 py-3 font-[Samim]">
                                          {sab.name}
                                        </td>
                                        <td className="px-3 py-3 font-[Samim]">
                                          {sab.companyName}
                                        </td>
                                        <td className="px-3 py-3 font-[Samim]">
                                          {sab.parentUnitName ?? '—'}
                                        </td>
                                        <td className="px-3 py-3 font-[Samim]">
                                          {sab.isActive ? 'فعال' : 'غیرفعال'}
                                        </td>
                                        <td className="space-x-3 px-3 py-3">
                                          <button
                                            disabled={!canEdit}
                                            onClick={() => openEdit(sab)}
                                            className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                              canEdit
                                                ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                                : 'bg-white/5 opacity-50'
                                            }`}
                                          >
                                            <img
                                              src={edit}
                                              alt="edit"
                                              width={20}
                                            />
                                          </button>
                                          <button
                                            disabled={!canDelete}
                                            onClick={() => askDelete(sab)}
                                            className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                              canDelete
                                                ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                                : 'bg-white/5 opacity-50'
                                            }`}
                                          >
                                            <img
                                              src={delet}
                                              alt="delete"
                                              width={20}
                                            />
                                          </button>
                                        </td>
                                      </tr>
                                      {sab?.subUnits?.map((seb) => (
                                        <React.Fragment key={seb.id}>
                                          <tr className="bg-white/5">
                                            <td className="px-3 py-3 pr-12 font-[AvenirLTProMedium]">
                                              ↳ {seb.code}
                                            </td>
                                            <td className="px-3 py-3 font-[Samim]">
                                              {seb.name}
                                            </td>
                                            <td className="px-3 py-3 font-[Samim]">
                                              {seb.companyName}
                                            </td>
                                            <td className="px-3 py-3 font-[Samim]">
                                              {seb.parentUnitName ?? '—'}
                                            </td>
                                            <td className="px-3 py-3 font-[Samim]">
                                              {seb.isActive
                                                ? 'فعال'
                                                : 'غیرفعال'}
                                            </td>
                                            <td className="space-x-3 px-3 py-3">
                                              <button
                                                disabled={!canEdit}
                                                onClick={() => openEdit(seb)}
                                                className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                                  canEdit
                                                    ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                                    : 'bg-white/5 opacity-50'
                                                }`}
                                              >
                                                <img
                                                  src={edit}
                                                  alt="edit"
                                                  width={20}
                                                />
                                              </button>
                                              <button
                                                disabled={!canDelete}
                                                onClick={() => askDelete(seb)}
                                                className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                                  canDelete
                                                    ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                                    : 'bg-white/5 opacity-50'
                                                }`}
                                              >
                                                <img
                                                  src={delet}
                                                  alt="delete"
                                                  width={20}
                                                />
                                              </button>
                                            </td>
                                          </tr>
                                          {seb?.subUnits?.map((saab) => (
                                            <React.Fragment key={saab.id}>
                                              <tr className="bg-white/5">
                                                <td className="px-3 py-3 pr-15 font-[AvenirLTProMedium]">
                                                  ↳ {saab.code}
                                                </td>
                                                <td className="px-3 py-3 font-[Samim]">
                                                  {saab.name}
                                                </td>
                                                <td className="px-3 py-3 font-[Samim]">
                                                  {saab.companyName}
                                                </td>
                                                <td className="px-3 py-3 font-[Samim]">
                                                  {saab.parentUnitName}
                                                </td>
                                                <td className="px-3 py-3 font-[Samim]">
                                                  {saab.isActive
                                                    ? 'فعال'
                                                    : 'غیرفعال'}
                                                </td>
                                                <td className="space-x-3 px-3 py-3">
                                                  <button
                                                    disabled={!canEdit}
                                                    onClick={() =>
                                                      openEdit(saab)
                                                    }
                                                    className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                                      canEdit
                                                        ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                                        : 'bg-white/5 opacity-50'
                                                    }`}
                                                  >
                                                    <img
                                                      src={edit}
                                                      alt="edit"
                                                      width={20}
                                                    />
                                                  </button>
                                                  <button
                                                    disabled={!canDelete}
                                                    onClick={() =>
                                                      askDelete(saab)
                                                    }
                                                    className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                                      canDelete
                                                        ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                                        : 'bg-white/5 opacity-50'
                                                    }`}
                                                  >
                                                    <img
                                                      src={delet}
                                                      alt="delete"
                                                      width={20}
                                                    />
                                                  </button>
                                                </td>
                                              </tr>
                                              {saab?.subUnits?.map((saaab) => (
                                                <tr
                                                  key={saaab.id}
                                                  className="bg-white/5"
                                                >
                                                  <td className="px-3 py-3 pr-18 font-[AvenirLTProMedium]">
                                                    ↳ {saaab.code}
                                                  </td>
                                                  <td className="px-3 py-3 font-[Samim]">
                                                    {saaab.name}
                                                  </td>
                                                  <td className="px-3 py-3 font-[Samim]">
                                                    {saaab.companyName}
                                                  </td>
                                                  <td className="px-3 py-3 font-[Samim]">
                                                    {saaab.parentUnitName}
                                                  </td>
                                                  <td className="px-3 py-3 font-[Samim]">
                                                    {saaab.isActive
                                                      ? 'فعال'
                                                      : 'غیرفعال'}
                                                  </td>
                                                  <td className="space-x-3 px-3 py-3">
                                                    <button
                                                      disabled={!canEdit}
                                                      onClick={() =>
                                                        openEdit(saaab)
                                                      }
                                                      className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                                        canEdit
                                                          ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                                          : 'bg-white/5 opacity-50'
                                                      }`}
                                                    >
                                                      <img
                                                        src={edit}
                                                        alt="edit"
                                                        width={20}
                                                      />
                                                    </button>
                                                    <button
                                                      disabled={!canDelete}
                                                      onClick={() =>
                                                        askDelete(saaab)
                                                      }
                                                      className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                                                        canDelete
                                                          ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                                          : 'bg-white/5 opacity-50'
                                                      }`}
                                                    >
                                                      <img
                                                        src={delet}
                                                        alt="delete"
                                                        width={20}
                                                      />
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                            </React.Fragment>
                                          ))}
                                        </React.Fragment>
                                      ))}
                                    </React.Fragment>
                                  ))}
                                </React.Fragment>
                              ))}
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}

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
          <div className="m-auto flex items-center justify-between pb-5">
            <h2 className="font-[SamimBold] text-lg">حذف واحد</h2>
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

export default AdminUnits;
