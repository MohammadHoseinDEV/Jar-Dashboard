import { useMemo, useState } from 'react';
import {
  useCreateRole,
  useRemoveFromRoleUser,
} from '../../../../../../hooks/role/role';

import close from '../../../../../../assets/images/close.png';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

function AssignRoleToUser({
  openRoleModal,
  roles,
  setOpenRoleModal,
  selectedUser,
  setSelectedUser,
}) {
  const removeRole = useRemoveFromRoleUser();

  const [roleId, setRoleId] = useState('');

  const [searchRole, setSearchRole] = useState('');

  const crateRole = useCreateRole();

  const closeModal = () => {
    setOpenRoleModal(false);
    setSelectedUser(null);
    setRoleId('');
  };

  const roleHandler = (event) => {
    event.preventDefault();

    if (!selectedUser?.personnelCode) return;

    crateRole.mutate({ personnelCode: selectedUser.personnelCode, roleId });

    closeModal();
  };

  const removeHandler = (roleId) => {
    if (!selectedUser?.personnelCode) return;

    removeRole.mutate({
      personnelCode: selectedUser.personnelCode,
      roleId,
    });
    closeModal();
  };

  // role options

  // get Roles
  const getRoles = useMemo(() => {
    const none = { id: '', name: 'بدون نقش' };

    return [
      none,
      ...(roles?.roles ?? [])?.map((role) => ({
        id: role.id,
        name: role.name,
      })),
    ];
  }, [roles]);

  // filter Roles
  const filterRoles = useMemo(() => {
    const role = searchRole.trim().toLowerCase();
    if (!role) return getRoles;

    return getRoles?.filter((r) =>
      (r?.name || '').toLowerCase().includes(role)
    );
  }, [searchRole, getRoles]);

  // selected Roles

  const selectedRoles = useMemo(() => {
    return getRoles.find((role) => role.id === (roleId || '')) || getRoles[0];
  }, [getRoles, roleId]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openRoleModal ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <div
        className={`relative w-[550px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-10 text-white shadow-2xl transition-all duration-300 ${
          openRoleModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between pb-2">
          <h2 className="font-[SamimBold] text-lg">اختصاص نقش به کاربر</h2>
          <button
            onClick={() => {
              setOpenRoleModal(false);
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

        <form className="grid grid-cols-1 gap-5" onSubmit={roleHandler}>
          <label htmlFor="personnelCode" className="font-[SamimBold]">
            کد پرسنلی
            <input
              type="text"
              name="personnelCode"
              value={selectedUser?.personnelCode || ''}
              readOnly
              onChange={(event) => {
                setSelectedUser({
                  ...selectedUser,
                  personnelCode: event.target.value,
                });
              }}
              placeholder="کد پرسنلی را وارد کنید."
              className="mt-3 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProBook] text-[18px] text-white outline-none placeholder:font-[Samim]"
            />
          </label>

          <Combobox
            value={selectedRoles}
            onChange={(value) => {
              setRoleId(value?.id || '');
            }}
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
          <div className="col-span-1 flex justify-end space-x-5 pt-5">
            <button
              type="submit"
              className="hover: cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
            >
              اختصاص نقش
            </button>
          </div>
        </form>
        {selectedUser?.roles && selectedUser?.roles.length > 0 ? (
          <div>
            <p className="border-white-50 border-b pt-5"></p>
            <h3 className="pt-5 pr-1.5 pb-5 font-[SamimBold] text-[20px]">
              حذف نقش از کاربر
            </h3>
            <div>
              {selectedUser?.roles?.map((role) => (
                <div
                  key={role.roleId}
                  className="no-scrollbar mt-5 flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                >
                  <p>{role.roleName}</p>
                  <button
                    onClick={() => {
                      removeHandler(role.roleId);
                    }}
                    className="cursor-pointer rounded-xl bg-red-500/80 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-red-500/60"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AssignRoleToUser;
