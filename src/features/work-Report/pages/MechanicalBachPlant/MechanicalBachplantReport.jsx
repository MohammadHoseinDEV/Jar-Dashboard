import { lazy, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetBachReports } from '../../Api/MechanicalBachPlant/mechanicalBachPlant';
import { useGetProfile } from '../../../../hooks/profile/profile';

import { can, getPerm } from '../../../../utils/rbac';
import { toShamsi } from '../../../../Time/date';

import { HashLoader } from 'react-spinners';
import plus from '../../../../assets/images/plus.png';
import edit from '../../../../assets/images/edit.png';
import deleteIcon from '../../../../assets/images/delete.png';
import form from '../../../../assets/images/form.png';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

const CreateReport = lazy(
  () => import('../../components/MechanicalBachPlant/CreateReport')
);
const EditReport = lazy(
  () => import('../../components/MechanicalBachPlant/EditReport')
);
const DeleteReport = lazy(
  () => import('../../components/MechanicalBachPlant/DeleteReport')
);
const FormReport = lazy(
  () => import('../../components/MechanicalBachPlant/FormReport')
);
import Pagination from '../../../../pagination/Pagination';

function MechanicalBachplantReport() {
  const { menus: userMenus } = useSelector((s) => s.auth);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedBach, setSelectedBach] = useState(null);

  const {
    data: Bach,
    isLoading,
    isError,
  } = useGetBachReports({ search, page, pageSize });

  const totalPages = Bach?.data?.totalPages ?? 1;

  const perm = useMemo(
    () => getPerm(userMenus, 'mecanicalBachplant-report'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = () => {
    if (!canCreate) return toast.error('دسترسی ایجاد گزارش ندارید');

    setOpenCreateModal(true);
  };

  const openEdit = (b) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedBach(b);
  };

  const askDelete = (b) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedBach(b);
  };

  const { data: profile } = useGetProfile();

  const isSuperAdmin = profile?.data?.identityRoles?.some(
    (p) => p.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  const isSupervisor = profile?.data?.companyRoles?.some(
    (p) => p.roleId === '18783471-a9eb-4328-8d98-8fccbb6cab46'
  );

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 p-6 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-[#0F090C]/40 p-6 text-white print:hidden!">
        <div className="flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-white/50 bg-[#0F090c]/30 p-3">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="جستجو..."
            className="w-[300px] rounded-xl bg-white/10 p-3 font-[SamimBold] text-white outline-none placeholder:text-white focus:bg-white/70 focus:text-black focus:placeholder:text-black"
          />
          <h1 className="font-[SamimBold] text-xl">
            فرم گزارش روزانه مکانیک بچ پلانت
          </h1>
          <button
            onClick={openCreate}
            className={`group flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-[Samim] ${
              canCreate
                ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                : 'cursor-not-allowed bg-white/5 opacity-50'
            }`}
          >
            <span className="relative cursor-pointer transition-all delay-150 duration-200 ease-in-out after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-white/50 after:transition-all after:duration-700 after:ease-out hover:scale-105 hover:after:w-full">
              افزودن گزارش
            </span>
            <span className="transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360">
              <img src={plus} alt="plus" width={30} />
            </span>
          </button>
        </div>
        <div className="flex shrink-0 justify-between pt-3">
          <p className="space-x-1">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProMedium]">F0532</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">شماره بازنگری :</span>
            <span className="font-[AvenirLTProMedium]">00</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">تاریخ بازنگری :</span>
            <span className="font-[AvenirLTProMedium]">1402/04/20</span>
          </p>
        </div>
        {isLoading ? (
          <div className="flex min-h-0 flex-col items-center justify-center space-y-5 py-40 max-2xl:py-15">
            <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />

            <p className="pt-10 text-[20px]">لطفا منتظر بمانید😎</p>
          </div>
        ) : isError ? (
          <div className="flex min-h-0 flex-col items-center justify-center space-y-5 py-50 text-[30px] max-2xl:py-15">
            خطا در دریافت اطلاعات 😟
          </div>
        ) : (
          <div className="no-scrollbar min-h-0 overflow-x-hidden overflow-y-auto rounded-2xl border border-white/70 max-2xl:max-h-[50vh]">
            <table className="w-full border-separate border-spacing-y-2 px-5 py-2 max-2xl:px-1 max-2xl:py-2">
              <thead>
                <tr className="text-center text-white/70">
                  <th className="px-3 font-[SamimBold] max-2xl:text-[14px]">
                    ردیف
                  </th>
                  <th className="px-3 font-[SamimBold] max-2xl:text-[14px]">
                    نام و نام خانوادگی
                  </th>
                  <th className="px-3 font-[SamimBold] max-2xl:text-[14px]">
                    تاریخ ثبت گزارش
                  </th>
                  <th className="px-3 font-[SamimBold] max-2xl:text-[14px]">
                    تاریخ ویرایش گزارش
                  </th>
                  <th>تاریخ امضاء گزارش</th>
                  <th className="px-3 font-[SamimBold] max-2xl:text-[14px]">
                    شماره گزارش
                  </th>
                  <th className="px-3 font-[SamimBold] max-2xl:text-[14px]">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {Bach?.data?.items?.map((b, index) => (
                  <tr key={b.id} className="bg-white/5 text-center">
                    <td className="px-3 py-2 font-[AvenirLTProMedium] text-[18px] max-2xl:text-[14px]">
                      {index + 1}
                    </td>
                    <td className="font-[Samim] text-[18px]">
                      {b?.personnelName}
                    </td>
                    <td className="px-3 py-2 font-[AvenirLTProMedium] text-[18px] max-2xl:text-[14px]">
                      {toShamsi(b?.createdAt)}
                    </td>
                    <td className="px-3 py-2 font-[AvenirLTProMedium] text-[18px] max-2xl:text-[14px]">
                      {toShamsi(b?.updatedAt)}
                    </td>
                    <td className="px-3 py-2 font-[AvenirLTProMedium] text-[18px] max-2xl:text-[14px]">
                      {toShamsi(b?.signedAt)}
                    </td>
                    <td className="px-3 py-2 font-[AvenirLTProMedium] text-[18px] max-2xl:text-[14px]">
                      {b.reportNumber}
                    </td>
                    <td className="space-x-2 py-2 text-center max-2xl:text-[14px]">
                      <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={'فرم ویرایش'}
                        onClick={() => openEdit(b)}
                        className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] max-xl:p-1 ${
                          (canEdit && profile?.data?.id === b?.createdBy) ||
                          (canEdit && isSupervisor) ||
                          isSuperAdmin
                            ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                            : 'hidden bg-white/5 opacity-50'
                        }`}
                      >
                        <img src={edit} alt="form" width={25} />
                      </button>
                      <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={'حذف گزارش'}
                        onClick={() => askDelete(b)}
                        className={`mb-2 cursor-pointer rounded-[10px] p-2 font-[Samim] ${
                          canDelete
                            ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                            : 'hidden bg-white/5 opacity-50'
                        }`}
                      >
                        <img src={deleteIcon} alt="form" width={25} />
                      </button>
                      <button
                        onClick={() => {
                          setOpenForm(true);
                          setSelectedBach(b);
                        }}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={'فرم گزارش'}
                        className="mb-2 cursor-pointer rounded-[10px] bg-linear-to-bl from-white/30 to-white/70 p-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-106"
                      >
                        <img src={form} alt="form" width={25} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Tooltip
              id="my-tooltip"
              delayShow={100}
              place="top"
              className="rounded-[10px] bg-[#1f2937] font-[SamimBold] text-[15px]"
            />
          </div>
        )}
        <div className="shrink-0">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>

      <CreateReport
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />

      <EditReport
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedBach={selectedBach}
        setSelectedBach={setSelectedBach}
      />

      <DeleteReport
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedBach={selectedBach}
      />

      <FormReport
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedBach={selectedBach}
        setSelectedBach={setSelectedBach}
      />
    </div>
  );
}

export default MechanicalBachplantReport;
