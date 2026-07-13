import { useEffect, useMemo, useState } from 'react';

import { useEducationDegrees } from '../../../../../hooks/education/education';
import { useJobPositions } from '../../../../../hooks/jobPosition/jobPosition';
import {
  getUser,
  useCreateUser,
  useDeleteUser,
} from '../../../../../hooks/user/userApi';

import CreateModal from './modal/CreateModal';

import { TbSignature } from 'react-icons/tb';
import { CgSync } from 'react-icons/cg';

import deleteIcon from '../../../../../assets/images/delete.png';
import edit from '../../../../../assets/images/edit.png';
import plus from '../../../../../assets/images/plus.png';
import details from '../../../../../assets/images/information.png';
import company from '../../../../../assets/images/factory.png';
import shift from '../../../../../assets/images/shift.png';
import role from '../../../../../assets/images/role.png';
import office from '../../../../../assets/images/office.png';

import { HashLoader } from 'react-spinners';
import { useGetRoles } from '../../../../../hooks/role/role';
import AssignRoleToUser from './modal/AssignRoleToUser';
import DeleteModal from './modal/DeleteModal';
import AssignRoleToUserInCompany from './modal/AssignRoleToUserInCompany';
import AssignRoleToUserInUnit from './modal/AssignRoleToUserInUnit';
import ShiftModal from './modal/ShiftModal';
import DetailsModal from './modal/DetailsModal';
import EditModal from './modal/EditModal';
import { can, getPerm } from '../../../../../utils/rbac';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Pagination from '../../../../../pagination/Pagination';
import SignatureModal from './modal/SignatureModal';
import ScheduleModal from './modal/scheduleModal';

function AdminUsers() {
  const { menus: userMenus } = useSelector((s) => s.auth);

  const [search, setSearch] = useState('');
  const [unitName, setUnitName] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [mobile, setMobile] = useState('');
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCompanyModal, setOpenCompanyModal] = useState(false);
  const [openUnitModal, setOpenUnitModal] = useState(false);
  const [openShiftModal, setOpenShiftModal] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [form, setForm] = useState({
    personnelCode: '',
    firstName: '',
    lastName: '',
    password: '',
    nationalCode: '',
    mobileNumber: '',
    email: '',
    gender: 0,
    birthDate: '',
    hireDate: '',
    educationDegreeId: '',
    jobPositionId: '',
    managerId: '',
  });

  useEffect(() => {
    setPage(1);
  }, [search, pageSize]);

  // get educationDegrees
  const { data: educationDegrees } = useEducationDegrees();
  // ------------------------------
  // get jobPosition
  const { data: jobPositions } = useJobPositions();
  // ------------------------------

  // get user data
  const {
    data: users,
    isLoading,
    isError,
  } = getUser({ page, pageSize, search, unitName });

  const totalPages = users?.totalPages ?? 1;

  // ---------------------------

  // create user
  const createUser = useCreateUser();
  // -------------------------------------------

  // delete user
  const deleteUser = useDeleteUser();

  // get roles
  const { data: roles } = useGetRoles();
  // ---------------------------

  // get pixel width screen
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // ---------------------------

  // RBAC
  const perm = useMemo(() => getPerm(userMenus, 'admin-user'), [userMenus]);

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = () => {
    if (!canCreate) return toast.error('دسترسی ایجاد کاربر ندارید');
    setOpenCreateModal(true);
  };

  const openEdit = (user) => {
    if (!canEdit) return toast.error('دسترسی ویرایش کاربر ندارید');

    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const askDelete = (user) => {
    if (!canDelete) return toast.error('دسترسی حذف کاربر ندارید');

    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const openInfo = (user) => {
    if (!canCreate)
      return toast.error('شما دسترسی دیدن جزئیات کاربر را ندارید');
    setSelectedUser(user);
    setOpenDetails(true);
  };

  const openRole = (user) => {
    if (!canCreate)
      return toast.error('شما دسترسی دادن نقش به کاربر را ندارید');
    setSelectedUser(user);
    setOpenRoleModal(true);
  };

  const openCompany = (user) => {
    if (!canCreate) return toast.error('شما دسترسی دادن نقش به شرکت را ندارید');

    setSelectedUser(user);
    setOpenCompanyModal(true);
  };

  const openUnit = (user) => {
    if (!canCreate) return toast.error('شما دسترسی دادن نقش به شرکت را ندارید');

    setSelectedUser(user);
    setOpenUnitModal(true);
  };

  const openShift = (user) => {
    if (!canCreate)
      return toast.error('شما دسترسی دادن شیفت به کاربر را ندارید');
    setSelectedUser(user);
    setOpenShiftModal(true);
  };

  // ----------------------------------

  const data = {
    personnelCode: form.personnelCode,
    firstName: form.firstName,
    lastName: form.lastName,
    password: form.password,
    nationalCode: form.nationalCode,
    mobileNumber: form.mobileNumber,
    email: form.email,
    gender: form.gender,
    birthDate: form.birthDate || null,
    hireDate: form.hireDate || null,
    educationDegreeId: form.educationDegreeId || null,
    jobPositionId: form.jobPositionId || null,
    managerId: form.managerId || null,
  };
  // -------------------------

  const submitHadler = (e) => {
    e.preventDefault();
    createUser.mutate(data, {
      onSuccess: () => {
        setOpenCreateModal(false);
      },
    });
  };

  const companyHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!users) return;
  }, [users]);

  return (
    <div className="rounded-[15px] bg-[#0F090C]/30 p-6 text-white">
      {/* header site */}

      {mobile ? (
        <div>
          <div className="overflow-hidden">
            <h1 className="pb-2 text-center font-[SamimBold] text-[30px]">
              مدیریت کاربران
            </h1>
            <p className="flex flex-col">
              <input
                type="text"
                value={search || unitName}
                onChange={(e) => {
                  setUnitName(e.target.value);
                  setSearch(e.target.value);
                }}
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
                افزودن کاربر جدید +
              </button>
            </p>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-5 py-50">
              <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
              <p className="pt-10 text-[20px]">لطفا منتظر بمانید😎</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center space-y-5 py-50 text-[25px]">
              خطا در دریافت اطلاعات 😟
            </div>
          ) : (
            <>
              <div className="mt-3 max-h-105 overflow-auto">
                {users?.data?.map((user) => (
                  <div
                    key={user.id}
                    className="mb-2.5 rounded-2xl border border-white/50 bg-black/40"
                  >
                    <div className="space-y-2 rounded-2xl p-2 text-right">
                      <p className="space-x-1 text-[16px]">
                        <span> کد پرسنلی : </span>
                        <span className="font-[AvenirLTProMedium]">
                          {user.personnelCode}
                        </span>
                      </p>
                      <p className="space-x-1 text-[16px]">
                        <span>نام خانوادگی :</span>
                        <span>{user.fullName}</span>
                      </p>
                      <p className="space-x-1 text-[16px]">
                        <span>نام واحد:</span>
                        <span>{user?.units.unitName}</span>
                      </p>
                      <p className="space-x-1 text-[16px]">
                        <span>وضعیت :</span>
                        <span>{user.isActive ? 'فعال' : 'غیرفعال'}</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <button
                          disabled={!canEdit}
                          onClick={() => {
                            openEdit(user);
                          }}
                          className={`y-2 mb-2 rounded-[10px] font-[Samim]${
                            canEdit
                              ? ' cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                              : ' cursor-not-allowed opacity-50'
                          }`}
                        >
                          <img src={edit} alt="edit" width={25} />
                        </button>
                        <button
                          disabled={!canDelete}
                          onClick={() => {
                            askDelete(user);
                          }}
                          className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                            canDelete
                              ? 'cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                              : ' cursor-not-allowed opacity-50'
                          }`}
                        >
                          <img src={deleteIcon} alt="delet" width={25} />
                        </button>
                        <button
                          disabled={!canCreate}
                          onClick={() => {
                            openInfo(user);
                          }}
                          className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                            canCreate
                              ? ' cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                              : ' cursor-not-allowed opacity-50'
                          }`}
                        >
                          <img src={details} alt="details" width={25} />
                        </button>
                        <button
                          disabled={!canCreate}
                          onClick={() => {
                            openRole(user);
                          }}
                          className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                            canCreate
                              ? 'cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                              : ' cursor-not-allowed opacity-50'
                          }`}
                        >
                          <img src={role} alt="role" width={25} />
                        </button>
                        <button
                          disabled={!canCreate}
                          onClick={() => {
                            openCompany(user);
                          }}
                          className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                            canCreate
                              ? ' cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                              : ' cursor-not-allowed opacity-50'
                          }`}
                        >
                          <img src={company} alt="company" width={25} />
                        </button>
                        <button
                          disabled={!canCreate}
                          onClick={() => {
                            openUnit(user);
                          }}
                          className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                            canCreate
                              ? 'cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                              : ' cursor-not-allowed opacity-50'
                          }`}
                        >
                          <img src={office} alt="office" width={25} />
                        </button>
                        <button
                          disabled={!canCreate}
                          onClick={() => {
                            openShift(user);
                          }}
                          className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                            canCreate
                              ? ' cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                              : ' cursor-not-allowed opacity-50'
                          }`}
                        >
                          <img src={shift} alt="shift" width={25} />
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
            </>
          )}
        </div>
      ) : (
        // desktop
        <div>
          <div className="rounded-[15px] bg-[#0F090C]/40 p-6 text-white">
            <div>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/50 bg-[#0F090c]/30 p-3">
                <div className="space-x-2">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="جستجو"
                    className="w-[150px] rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
                  />
                  <input
                    type="text"
                    value={unitName}
                    onChange={(e) => {
                      setUnitName(e.target.value);
                    }}
                    placeholder="جستجو واحد"
                    className="w-[150px] rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
                  />
                </div>

                <h1 className="font-[SamimBold] text-xl">مدیریت کاربران</h1>
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
                    افزودن کاربر جدید
                  </span>

                  <span className="transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360">
                    <img src={plus} alt="plus" width={30} />
                  </span>
                </button>
              </div>
              <div>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center space-y-5 py-50">
                    <HashLoader
                      color="#ffffff"
                      size={80}
                      speedMultiplier={1.5}
                    />
                    <p className="pt-10 text-[20px]">لطفا منتظر بمانید😎</p>
                  </div>
                ) : isError ? (
                  <div className="flex flex-col items-center justify-center space-y-5 py-50 text-[30px]">
                    خطا در دریافت اطلاعات 😟
                  </div>
                ) : (
                  <>
                    <div className="no-scrollbar mt-2 max-h-140 overflow-auto rounded-2xl border border-white/70">
                      <table className="w-full border-separate border-spacing-y-2 px-5 pt-3">
                        <thead>
                          <tr className="text-center text-white/70">
                            <th className="px-3 font-[SamimBold] text-[20px]">
                              کد پرسنلی
                            </th>
                            <th className="px-3 font-[SamimBold] text-[20px]">
                              نام و نام خانوادگی
                            </th>
                            <th className="px-3 font-[SamimBold] text-[20px]">
                              کدملی
                            </th>
                            <th className="px-3 font-[SamimBold] text-[20px]">
                              شماره همراه
                            </th>
                            <th className="px-3 font-[SamimBold] text-[20px]">
                              نام واحد
                            </th>
                            <th className="px-3 font-[SamimBold] text-[20px]">
                              جایگاه شغلی
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
                          {users?.data?.map((user) => (
                            <tr
                              key={user.id}
                              className="bg-white/5 text-center transition-all delay-75 duration-150 ease-in-out hover:scale-101"
                            >
                              <td className="px-3 py-6 font-[AvenirLTProMedium]">
                                {user.personnelCode}
                              </td>
                              <td className="px-3 py-6 font-[Samim]">
                                {user.fullName}
                              </td>
                              <td className="px-3 py-6 font-[AvenirLTProMedium]">
                                {user?.insuranceCode}
                              </td>
                              <td className="px-3 py-6 font-[AvenirLTProMedium]">
                                {user.mobileNumber}
                              </td>
                              <td className="px-3 py-6 font-[Samim]">
                                {user.units.length > 0
                                  ? user.units.map((unit) => (
                                      <p key={unit.unitId}>{unit.unitName}</p>
                                    ))
                                  : '--'}
                              </td>

                              <td className="px-3 py-6 font-[Samim]">
                                {user.jobPositionTitle}
                              </td>
                              <td className="px-3 py-6 font-[Samim]">
                                {user.isActive ? 'فعال' : 'غیرفعال'}
                              </td>
                              <td className="space-x-3 px-3 py-3">
                                <button
                                  disabled={!canEdit}
                                  onClick={() => {
                                    openEdit(user);
                                  }}
                                  className={`cursor-pointer rounded-[10px] font-[Samim]${
                                    canEdit
                                      ? 'cursor-pointer transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                      : ' cursor-not-allowed opacity-50'
                                  }`}
                                >
                                  <img
                                    src={edit}
                                    alt="ویرایش"
                                    width={30}
                                    title="ویرایش کاربر"
                                  />
                                </button>
                                <button
                                  disabled={!canDelete}
                                  onClick={() => {
                                    askDelete(user);
                                  }}
                                  className={`cursor-pointer rounded-[10px] font-[Samim] ${
                                    canDelete
                                      ? 'cursor-pointer transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                                      : ' cursor-not-allowed opacity-50'
                                  }`}
                                >
                                  <img
                                    src={deleteIcon}
                                    alt="حذف"
                                    width={30}
                                    title="حذف کاربر"
                                  />
                                </button>
                                <button
                                  disabled={!canCreate}
                                  onClick={() => {
                                    openInfo(user);
                                  }}
                                  className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                                    canCreate
                                      ? ' cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                                      : ' cursor-not-allowed opacity-50'
                                  }`}
                                >
                                  <img
                                    src={details}
                                    alt="جزئیات"
                                    width={30}
                                    title="نمایش جزئیات"
                                  />
                                </button>
                                <button
                                  disabled={!canCreate}
                                  onClick={() => {
                                    openRole(user);
                                  }}
                                  className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                                    canCreate
                                      ? 'cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                                      : ' cursor-not-allowed opacity-50'
                                  }`}
                                >
                                  <img
                                    src={role}
                                    alt="role"
                                    width={30}
                                    title="نقش"
                                  />
                                </button>
                                <button
                                  disabled={!canCreate}
                                  onClick={() => {
                                    openCompany(user);
                                  }}
                                  className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                                    canCreate
                                      ? ' cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                                      : ' cursor-not-allowed opacity-50'
                                  }`}
                                >
                                  <img
                                    src={company}
                                    alt="company"
                                    title="شرکت"
                                    width={30}
                                  />
                                </button>
                                <button
                                  disabled={!canCreate}
                                  onClick={() => {
                                    openUnit(user);
                                  }}
                                  className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                                    canCreate
                                      ? 'cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                                      : ' cursor-not-allowed opacity-50'
                                  }`}
                                >
                                  <img
                                    src={office}
                                    alt="office"
                                    width={30}
                                    title="واحد"
                                  />
                                </button>
                                <button
                                  disabled={!canCreate}
                                  onClick={() => {
                                    openShift(user);
                                  }}
                                  className={`mb-2 rounded-[10px] py-2 font-[Samim] ${
                                    canCreate
                                      ? ' cursor-pointer transition-all delay-75 duration-100 ease-in-out hover:scale-110'
                                      : ' cursor-not-allowed opacity-50'
                                  }`}
                                >
                                  <img
                                    src={shift}
                                    alt="shift"
                                    width={30}
                                    title="شیفت"
                                  />
                                </button>
                                <button
                                  onClick={() => {
                                    setOpenSignature(true);
                                    setSelectedUser(user);
                                  }}
                                  className="mb-2 cursor-pointer rounded-[10px] py-2 font-[Samim] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                                >
                                  <TbSignature size={32} />
                                </button>
                                <button
                                  onClick={() => {
                                    setOpenSchedule(true);
                                    setSelectedUser(user);
                                  }}
                                  className="mb-2 cursor-pointer  rounded-[10px] py-2 font-[Samim] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                                >
                                  <CgSync size={31} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      page={page}
                      setPage={setPage}
                      totalPages={totalPages}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modal create user */}
      <CreateModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        submitHadler={submitHadler}
        form={form}
        setForm={setForm}
        educationDegrees={educationDegrees}
        jobPositions={jobPositions}
        data={data}
      />

      {/* open role Modal */}
      <AssignRoleToUser
        openRoleModal={openRoleModal}
        roles={roles}
        setOpenRoleModal={setOpenRoleModal}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      {/* delete Modal for user */}
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedUser={selectedUser}
        deleteUser={deleteUser}
      />

      {/* company modal */}
      <AssignRoleToUserInCompany
        setOpenCompanyModal={setOpenCompanyModal}
        openCompanyModal={openCompanyModal}
        companyHandler={companyHandler}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <AssignRoleToUserInUnit
        openUnitModal={openUnitModal}
        setOpenUnitModal={setOpenUnitModal}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <ShiftModal
        openShiftModal={openShiftModal}
        setOpenShiftModal={setOpenShiftModal}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        mobile={mobile}
      />

      <DetailsModal
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        selectedUser={selectedUser}
        mobile={mobile}
      />

      <EditModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />

      <SignatureModal
        openSignature={openSignature}
        setOpenSignature={setOpenSignature}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <ScheduleModal
        openSchedule={openSchedule}
        setOpenSchedule={setOpenSchedule}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}

export default AdminUsers;
