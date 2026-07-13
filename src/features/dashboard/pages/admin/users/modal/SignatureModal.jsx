import { useEffect, useMemo, useState } from 'react';
import close from '../../../../../../assets/images/close.png';
import {
  getMenuSignatureName,
  useGetPermissionSignature,
  usePermissionSignature,
  useUpdatePermissionSignature,
} from '../../../../../../hooks/user/userApi';
import { useGetMenu } from '../../../../../../hooks/menu/menuApi';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useGetProfile } from '../../../../../../hooks/profile/profile';
import { useSelector } from 'react-redux';

function SignatureModal({
  openSignature,
  setOpenSignature,
  selectedUser,
  setSelectedUser,
}) {
  const [form, setForm] = useState({
    userId: '',
    menuId: '',
    canSignature: true,
  });
  const menusFlat = useSelector((state) => state.auth.menus) || [];

  const [selected, setSelected] = useState(null);

  const [accessDenied, setAccessDenied] = useState(false);

  const [accessType, setAccessType] = useState('');

  const handleOpenAccess = (m, type) => {
    setAccessDenied(true);
    setSelected(m);
    setAccessType(type);
  };

  useEffect(() => {
    if (!selectedUser) return;

    setForm((p) => ({
      ...p,
      userId: selectedUser?.id,
    }));
  }, [selectedUser]);

  const [searchMenu, setSearchMenu] = useState('');

  const permissionSignature = usePermissionSignature();
  const { data: profile } = useGetProfile();

  const { data: menus, isLoading, isError } = useGetMenu();

  const { data: signature } = useGetPermissionSignature(selectedUser?.id);

  const { data: menuSign } = getMenuSignatureName(selectedUser?.id);

  const findId = signature?.data?.map((m) => m.menuId);
  const findCanSign =
    signature?.data?.map((m) => ({
      canSignature: m.canSignature,
      menuId: m.menuId,
    })) || [];

  const findMenu =
    menusFlat.map((m) => ({
      menuId: m.id,
      title: m.title,
    })) || [];

  const merged = findMenu.map((m) => {
    const sign = findCanSign.find((s) => s.menuId === m.menuId);
    return {
      ...m,
      ...sign,
    };
  });

  const finalMerged = merged.filter(
    (item) => item.menuId !== undefined && item.canSignature !== undefined
  );

  const getMenu = useMemo(() => {
    const none = { id: '', name: 'انتخاب منو', isHeader: true };

    const items =
      menus?.menus?.flatMap((m) => {
        const parentItem = {
          id: m.id,
          name: m.title,
          isHeader: true,
        };

        const subs = (m.subMenus || []).map((s) => ({
          id: s.id,
          name: `— ${s.title}`,
          parentId: m.id,
          isHeader: false,
        }));

        return [parentItem, ...subs];
      }) ?? [];

    return [none, ...items];
  }, [menus]);

  const filterMenu = useMemo(() => {
    const q = searchMenu.trim().toLowerCase();
    if (!q) return getMenu;

    return getMenu?.filter((m) => (m?.name || '').toLowerCase().includes(q));
  }, [searchMenu, getMenu]);

  const selectedMenu = useMemo(() => {
    return (
      getMenu.find((menu) => menu.id === (form.menuId || '')) || getMenu[0]
    );
  }, [getMenu, form.menuId]);

  const closeModal = () => {
    setOpenSignature(false);
    setSelectedUser(null);
  };

  const submitHandler = () => {
    permissionSignature.mutate(form, {
      onSuccess: () => {
        setOpenSignature(false);
      },
    });
  };

  const dataFalse = {
    canSignature: false,
    menuId: selected?.menuId,
    userId: selectedUser?.id,
  };

  const dataTrue = {
    canSignature: true,
    menuId: selected?.menuId,
    userId: selectedUser?.id,
  };

  const updatePermission = useUpdatePermissionSignature();

  const updateHandler = () => {
    if (!selected) return;
    if (accessType === 'noAccess') {
      updatePermission.mutate(
        {
          canSignature: false,
          menuId: selected?.menuId,
          userId: selectedUser?.id,
        },
        {
          onSuccess: () => {
            setOpenSignature(false);
            setAccessDenied(false);
            setSelected(null);
          },
        }
      );
    }
    if (accessType === 'access') {
      updatePermission.mutate(
        {
          canSignature: true,
          menuId: selected?.menuId,
          userId: selectedUser?.id,
        },
        {
          onSuccess: () => {
            setOpenSignature(false);
            setAccessDenied(false);
            setSelected(null);
          },
        }
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openSignature ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeModal}
      />
      <div
        className={`relative w-[700px] transform rounded-[15px] bg-linear-to-tl from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
          openSignature
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between space-x-20 pb-5">
          <h2 className="font-[SamimBold] text-lg">
            {`دسترسی امضاء ${selectedUser?.gender === 0 ? 'جناب آقای' : 'سرکار خانم'} ${selectedUser?.fullName}`}
          </h2>
          <button
            onClick={() => {
              setOpenSignature(false);
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
        <Combobox
          value={selectedMenu}
          onChange={(value) =>
            setForm((m) => ({ ...m, menuId: value?.id || '' }))
          }
        >
          {({ open }) => (
            <div className="relative">
              <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                <span
                  className={selectedMenu?.id ? 'text-white' : 'text-white/70'}
                >
                  {selectedMenu?.name || 'انتخاب منو'}
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
                    value={searchMenu}
                    onChange={(e) => setSearchMenu(e.target.value)}
                    placeholder="جستجو..."
                    className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                  />
                </div>
                <ComboboxOptions className="no-scrollbar max-h-60 overflow-auto p-1">
                  {filterMenu.length === 0 ? (
                    <div className="p-3 text-white/70">موردی پیدا نشد</div>
                  ) : (
                    filterMenu?.map((menu) => (
                      <ComboboxOption
                        key={menu.id}
                        value={menu}
                        disabled={menu.isHeader && menu.id !== ''}
                        className={({ active }) =>
                          `cursor-pointer rounded-lg p-3 ${
                            menu.isHeader
                              ? 'cursor-default bg-gray-800/40 font-bold text-yellow-300'
                              : active
                                ? 'bg-black'
                                : 'text-white'
                          }`
                        }
                      >
                        {menu.name}
                      </ComboboxOption>
                    ))
                  )}
                </ComboboxOptions>
              </div>
            </div>
          )}
        </Combobox>
        <div className="flex items-center justify-around pb-5">
          <p className="flex items-center justify-center space-x-2 pt-5">
            <span>دسترسی امضاء</span>
            <input
              type="radio"
              name="canSignature"
              value="true"
              checked={form.canSignature === true}
              onChange={(e) =>
                setForm({
                  ...form,
                  [e.target.name]: e.target.value === 'true',
                })
              }
              className="size-6"
            />
          </p>
          <p className="flex items-center justify-center space-x-2 pt-5">
            <span>عدم دسترسی امضاء</span>
            <input
              type="radio"
              name="canSignature"
              value="false"
              checked={form.canSignature === false}
              onChange={(e) =>
                setForm({
                  ...form,
                  [e.target.name]: e.target.value === 'true',
                })
              }
              className="size-6"
            />
          </p>
        </div>

        <button
          onClick={submitHandler}
          className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105"
        >
          تایید
        </button>

        <div className="">
          <p className="py-2 font-[SamimBold] text-[18px]">دسترسی های منو</p>
          <p className="border-b border-white/50 pb-2"></p>
          <div className="no-scrollbar max-h-90 overflow-auto">
            {finalMerged.map((m, index) => (
              <div
                key={m.menuId}
                className="flex justify-between border-b border-white/50 pb-2"
              >
                <div className="flex space-x-1 pt-3">
                  <p>{index + 1}-</p>
                  <p>{m?.title}</p>
                </div>
                <div>
                  <p className="flex space-x-1 pt-3">
                    {m?.canSignature === false ? (
                      <span
                        onClick={() => handleOpenAccess(m, 'access')}
                        className="ml-2 cursor-pointer rounded-[10px] bg-green-600 p-1 transition-all delay-75 duration-100 ease-in-out hover:scale-105 hover:bg-green-700"
                      >
                        دسترسی امضاء
                      </span>
                    ) : (
                      <span
                        onClick={() => handleOpenAccess(m, 'noAccess')}
                        className="ml-2 cursor-pointer rounded-[10px] bg-red-600 p-1 transition-all delay-75 duration-100 ease-in-out hover:scale-105 hover:bg-red-700"
                      >
                        عدم دسترسی امضاء
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          accessDenied ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => {
            setAccessDenied(false);
          }}
        />
        <div
          className={`relative w-[400px] transform rounded-[15px] bg-linear-to-br from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            accessDenied
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <p>
              <span>لغو دسترسی منو </span>
              <span>{selected?.title}</span>
            </p>
            <span
              onClick={() => {
                setAccessDenied(false);
              }}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
            >
              <img src={close} alt="close" width={20} />
            </span>
          </div>
          <div className="">
            <button
              onClick={() => updateHandler(accessType)}
              className="float-left mt-2 mr-5 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-75 duration-100 hover:bg-green-700"
            >
              تایید
            </button>
            <button
              onClick={() => {
                setAccessDenied(false);
              }}
              className="float-left mt-2 cursor-pointer rounded-[10px] bg-red-500 p-2 transition-all delay-75 duration-100 hover:bg-red-700"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignatureModal;
