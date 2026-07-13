import { useMemo, useState } from 'react';

import close from '../../../../../../assets/images/close.png';
import {
  useGetRoles,
  useRemoveRoleToUserInUnit,
} from '../../../../../../hooks/role/role';
import {
  useAssignRoleToUserInUnit,
  useGetUnit,
} from '../../../../../../hooks/unit/unitApi';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

function AssignRoleToUserInUnit({
  openUnitModal,
  setOpenUnitModal,
  selectedUser,
  setSelectedUser,
}) {
  const [form, setForm] = useState({
    roleId: '',
    unitId: '',
  });

  const [searchRole, setSearchRole] = useState('');
  const [searchUnit, setSearchUnit] = useState('');

  const { data: getRoles } = useGetRoles();

  const { data: unit } = useGetUnit();

  const createRoleForUnit = useAssignRoleToUserInUnit();

  const removeRoleFromUnit = useRemoveRoleToUserInUnit();

  const data = {
    personnelCode: selectedUser?.personnelCode,
    roleId: form.roleId,
    unitId: form.unitId,
  };

  const submitHandler = (e) => {
    e.preventDefault();

    createRoleForUnit.mutate(data, {
      onSuccess: () => {
        setOpenUnitModal(false);
      },
    });
  };

  const removeHandler = (roleId, unitId) => {
    if (!selectedUser?.personnelCode) return;

    removeRoleFromUnit.mutate(
      {
        personnelCode: selectedUser.personnelCode,
        roleId,
        unitId,
      },
      {
        onSuccess: () => {
          setOpenUnitModal(false);
        },
      }
    );
  };

  const getRole = useMemo(() => {
    const none = { id: '', name: 'انتخاب نقش' };

    return [
      none,
      ...(getRoles?.roles ?? []).map((role) => ({
        id: role.id,
        name: role.name,
      })),
    ];
  }, [getRoles]);

  const filterRoles = useMemo(() => {
    const q = searchRole.trim().toLowerCase();
    if (!q) return getRole;

    return getRole?.filter((r) => (r?.name || '').toLowerCase().includes(q));
  }, [searchRole, getRole]);

  const selectedRoles = useMemo(() => {
    return (
      getRole.find((role) => role.id === (form.roleId || '')) || getRole[0]
    );
  }, [getRole, form.roleId]);
  // -------------------------------

  // unit options

  const getUnit = useMemo(() => {
    const none = { id: '', name: 'انتخاب واحد', isActive: true };

    const flattenUnits = (unit, depth = 0) => {
      if (!unit) return [];

      const prefix = '-'.repeat(depth > 0 ? depth : 0);
      return unit.flatMap((u) => [
        {
          id: u.id,
          name: `${prefix ? prefix + ' ' : ''}${u.name}`,
          parentUnitId: u.parentUnitId,
          isActive: true,
        },
        ...flattenUnits(u.subUnits, depth + 1),
      ]);
    };

    const items = flattenUnits(unit?.units ?? []);
    return [none, ...items];
  }, [unit]);

  const filterUnit = useMemo(() => {
    const q = searchUnit.trim().toLowerCase();
    if (!q) return getUnit;

    return getUnit.filter((u) => (u?.name || '').toLowerCase().includes(q));
  }, [searchUnit, getUnit]);

  const selectedUnit = useMemo(() => {
    return getUnit.find((u) => u.id === (form.unitId || '')) || getUnit[0];
  }, [getUnit, form.unitId]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openUnitModal ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <div
        className={`relative w-[550px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openUnitModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between pb-2">
          <h2 className="font-[SamimBold] text-lg">
            اختصاص نقش به کاربر در واحد
          </h2>
          <button
            onClick={() => {
              setOpenUnitModal(false);
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
        <form className="grid grid-cols-1 gap-5" onSubmit={submitHandler}>
          <label htmlFor="personnelCode">
            کدپرسنلی
            <input
              type="text"
              name="personnelCode"
              value={selectedUser?.personnelCode || ''}
              onChange={(e) => {
                setSelectedUser({
                  ...selectedUser,
                  [e.target.name]: e.target.value,
                });
              }}
              className="mt-3 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
            />
          </label>
          <Combobox
            value={selectedRoles}
            onChange={(value) =>
              setForm((p) => ({ ...p, roleId: value?.id || '' }))
            }
          >
            {({ open }) => (
              <div className="relative">
                <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                  <span
                    className={
                      selectedRoles?.id ? 'text-white' : 'text-white/70'
                    }
                  >
                    {selectedRoles?.name || 'انتخاب مدرک...'}
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
                      value={searchRole}
                      onChange={(e) => setSearchRole(e.target.value)}
                      placeholder="جستجو..."
                      className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                    />
                  </div>
                  <ComboboxOptions className="no-scrollbar max-h-60 overflow-auto p-1">
                    {filterRoles.length === 0 ? (
                      <div className="p-3 text-white/70">موردی پیدا نشد</div>
                    ) : (
                      filterRoles?.map((role) => (
                        <ComboboxOption
                          key={role.id || 'null'}
                          value={role}
                          className={({ active, selected }) =>
                            `cursor-pointer rounded-lg p-3 text-white ${
                              active ? 'bg-black' : ''
                            } ${selected ? 'bg-black' : ''}`
                          }
                        >
                          {role.name}
                        </ComboboxOption>
                      ))
                    )}
                  </ComboboxOptions>
                </div>
              </div>
            )}
          </Combobox>
          <Combobox
            value={selectedUnit}
            onChange={(value) =>
              setForm((u) => ({ ...u, unitId: value?.id || '' }))
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
                    {selectedUnit?.name || 'انتخاب مدرک...'}
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

          <div className="col-span-1 flex justify-end space-x-5 pt-5">
            <button
              type="submit"
              className="hover: cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
            >
              تایید
            </button>
          </div>
        </form>
        {selectedUser?.units && selectedUser?.units.length > 0 ? (
          <div>
            <p className="border-white-50 border-b pt-5"></p>
            <h3 className="pt-5 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
              حذف نقش از کاربر در شرکت
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-white/70">
              <table className="w-full border-separate border-spacing-y-2 px-5 pt-3">
                <thead>
                  <tr className="text-right text-white/70">
                    <th className="px-3 font-[SamimBold] text-[20px]">
                      عنوان واحد
                    </th>
                    <th className="px-3 font-[SamimBold] text-[20px]">
                      عنوان نقش
                    </th>
                    <th className="px-3 font-[SamimBold] text-[20px]">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUser.units.map((u) => (
                    <tr key={u.unitId} className="bg-white/5">
                      <td className="px-3 py-6 font-[Samim]">{u.unitName}</td>
                      <td className="px-3 py-6 font-[Samim]">{u.roleName}</td>
                      <td className="space-x-3 px-3 py-3">
                        <button
                          type="button"
                          onClick={() => {
                            removeHandler(u.roleId, u.unitId);
                          }}
                          className="cursor-pointer rounded-xl bg-linear-to-bl from-red-500 to-red-800 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 hover:bg-red-500/60"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AssignRoleToUserInUnit;
