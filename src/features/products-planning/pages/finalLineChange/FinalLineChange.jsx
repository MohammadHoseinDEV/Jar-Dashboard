import { lazy, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import { FloatingTree } from '@floating-ui/react';

import { useGetAllLineChange, useGetLineChange } from '../../Api/planing';
import { normalizeTime, toShamsi } from '../../../../Time/date';
import { can, getPerm } from '../../../../utils/rbac';
import { toast } from 'react-toastify';
import { FaClipboardList } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { FaDownload } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa';
import { MdNoteAdd, MdNumbers } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { TbReport } from 'react-icons/tb';

import plus from '../../../../assets/images/plus.png';
import close from '../../../../assets/images/close.png';
import edit from '../../../../assets/images/edit.png';
import delet from '../../../../assets/images/delete.png';
import form from '../../../../assets/images/form.png';

import ReportActionsPlanning from '../../components/finalLinechange/RepoertAction';
const CreateLineChange = lazy(
  () => import('../../components/finalLinechange/CreateLineChange')
);
const FormFinalLineChange = lazy(
  () => import('../../components/finalLinechange/FormFinalLineChange')
);
const DeleteLineChange = lazy(
  () => import('../../components/finalLinechange/DeleteLineChange')
);

import Pagination from '../../../../pagination/Pagination';
import EditLinechange from '../../components/finalLinechange/EditLinechange';

function FinalLineChange() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [createForm, setCreateForm] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedLineChangeDetails, setSelectedLineChangeDetails] =
    useState(null);

  const [filterStatus, setFilterStatus] = useState('all');

  // RBAC
  const { menus: userMenus } = useSelector((state) => state.auth);

  const perm = useMemo(
    () => getPerm(userMenus, 'final-notification-of-line-change'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = () => {
    if (!canCreate) return toast.error('دسترسی ایجاد گزارش را ندارید');
    setCreateForm(true);
  };

  const openIsEdit = (line) => {
    if (!canEdit) return toast.error('دسترسی ویرایش فرم را ندارید');
    setSelectedLine(line);
    setOpenEdit(true);
  };

  const askDelete = (line) => {
    if (!canDelete) return toast.error('دسترسی حذف فرم ندارید');
    setSelectedLine(line);
    setOpenDeleteModal(true);
  };
  const {
    data: lineChange,
    isLoading,
    isError,
  } = useGetLineChange({ search, page, pageSize });
  const { data: linechangeAll } = useGetAllLineChange();

  const allReport = lineChange?.data?.totalCount;

  const allConfirmed = linechangeAll?.data?.filter(
    (d) => d.isSignedByFactoryManager === true
  ).length;

  const allPending = linechangeAll?.data?.filter(
    (d) => d.isSignedByFactoryManager === false
  ).length;

  const allReject = linechangeAll?.data?.filter(
    (d) => d.isSignedByProductionPlanner === false
  ).length;

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return lineChange?.data?.items;

    return linechangeAll?.data?.filter((e) => {
      if (filterStatus === 'confirmed')
        return e.isSignedByFactoryManager === true;

      if (filterStatus === 'productionPlaning')
        return e.isSignedByProductionPlanner === false;

      if (filterStatus === 'factoryManager')
        return (
          e.isSignedByProductionPlanner === true &&
          e.isSignedByFactoryManager === false
        );
      return true;
    });
  }, [filterStatus, lineChange, linechangeAll]);

  return (
    <FloatingTree>
      <div className="-m-2 h-screen overflow-visible rounded-[15px] bg-black/30">
        <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
          <div className="rounded-[10px] p-[5px]">
            <div className="mx-2 mt-1 flex items-center justify-between border-b border-white/30 pb-3">
              <div className="flex items-center space-x-5 text-white">
                <p className="flex size-10 items-center justify-center rounded-[10px] bg-[#e54c00]">
                  <span className="text-[22px]">
                    <FaClipboardList />
                  </span>
                </p>
                <p className="font-[SamimBold] text-[20px]">
                  گزارش اعلان قطعی تعویض خط
                </p>
              </div>
              <div className="flex items-center space-x-5 pl-5 text-white">
                <p className="flex space-x-1 text-[12px]">
                  <span className="text-[17px] text-[#d84f15]">
                    <FiCalendar />
                  </span>
                  <span className="font-[SamimBold] text-[12px]">
                    تاریخ بازنگری :
                  </span>
                  <span className="font-[AvenirLTProMedium] text-[12px]">
                    1401/05/01
                  </span>
                </p>
                <p className="space-x-1 text-[12px]">
                  <span className="font-[SamimBold]">شماره بازنگری :</span>
                  <span className="font-[AvenirLTProMedium]">F1102</span>
                </p>
                <p className="space-x-1 text-[12px]">
                  <span className="font-[SamimBold]">کد سند :</span>
                  <span className="font-[AvenirLTProMedium]">00</span>
                </p>
              </div>
            </div>
            <div className="mx-2 mt-1 flex items-center justify-between max-md:hidden">
              <div className="flex items-center pt-2 text-white">
                <button
                  onClick={openCreate}
                  className={`group flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-[Samim] ${
                    canCreate
                      ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                      : 'cursor-not-allowed bg-white/5 opacity-50'
                  }`}
                >
                  <p className="relative cursor-pointer transition-all delay-150 duration-200 ease-in-out after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-white/50 after:transition-all after:duration-700 after:ease-out hover:scale-105 hover:after:w-full">
                    افزودن گزارش
                  </p>
                  <p className="text-[25px] text-[#d84f15] transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360">
                    <MdNoteAdd />
                  </p>
                </button>
              </div>
              {/* exel & report */}
              <div className="col-span-2 hidden items-center justify-end space-x-2 pt-2 pl-5">
                <button className="flex items-center justify-center rounded-[10px] bg-[#0e1117] px-4 py-2 text-[13px] text-white/70">
                  <FaDownload />
                  <span className="pr-2">خروجی اکسل</span>
                </button>
                <button className="flex items-center justify-center rounded-[10px] bg-[#f35714] px-4 py-2 text-[13px] text-white">
                  <FaFilter />
                  <span className="pr-2">فیلتر پیشرفته</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mx-2 mt-3 grid grid-cols-4 space-x-5">
            <div
              onClick={() => setFilterStatus('all')}
              className="col-span-1 flex cursor-pointer rounded-[10px] border border-[#be4615]/50"
            >
              <div className="p-5 text-[20px]">
                <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#be4615]/25 text-[#be4615]">
                  <MdNumbers />
                </p>
              </div>
              <p className="my-auto h-13 border-l-2 border-[#f35714]/70"></p>
              <div className="my-auto pr-5">
                <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
                  {allReport}
                </p>
                <p className="text-white/60">تعداد کل گزارشات</p>
              </div>
            </div>
            <div
              onClick={() => {
                setFilterStatus('confirmed');
              }}
              className="col-span-1 flex cursor-pointer rounded-[10px] border border-[#a6e3a1]/50"
            >
              <div className="p-5 text-[20px]">
                <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#1e2625]/25 text-[#a6e3a1]">
                  <FaCheck />
                </p>
              </div>
              <p className="my-auto h-13 border-l-2 border-[#a6e3a1]"></p>
              <div className="my-auto pr-5">
                <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
                  {allConfirmed}
                </p>
                <p className="text-white/60">تعداد گزارش های تایید شده </p>
              </div>
            </div>
            <div
              onClick={() => {
                setFilterStatus('factoryManager');
              }}
              className="col-span-1 flex cursor-pointer rounded-[10px] border border-[#f10033]/50"
            >
              <div className="p-5 text-[20px]">
                <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#262627]/25 text-[#f10033]">
                  <FaXmark />
                </p>
              </div>
              <p className="my-auto h-13 border-l-2 border-[#f10033]"></p>
              <div className="my-auto pr-5">
                <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
                  {allPending}
                </p>
                <p className="text-white/60">تعداد گزارش های تایید نشده</p>
              </div>
            </div>
            <div
              onClick={() => {
                setFilterStatus('productionPlaning');
              }}
              className="col-span-1 flex cursor-pointer rounded-[10px] border border-white"
            >
              <div className="p-5 text-[20px]">
                <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#251d26]/25 text-white">
                  <MdNumbers />
                </p>
              </div>
              <p className="my-auto h-13 border-l-2 border-white"></p>
              <div className="my-auto pr-5">
                <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
                  {allReject}
                </p>
                <p className="text-white/60">تعداد گزارش های بدون امضاء</p>
              </div>
            </div>
          </div>
          <div className="mx-2 mt-1 flex items-center justify-between">
            <div className="col-span-4 flex items-center space-x-1 pr-5">
              <p className="text-[30px] text-[#e54c00]">
                <TbReport />
              </p>
              <p className="font-[SamimBold] text-[20px] text-white">
                لیست گزارشات
              </p>
            </div>
            <div className="col-span-2 flex items-center space-x-3 py-3">
              <div className="flex items-center space-x-5 rounded-[10px] border border-white/20 bg-[#07090f] px-2 text-white/50">
                <p
                  onClick={() => setFilterStatus('all')}
                  className={`my-1 cursor-pointer rounded-[10px] px-3 py-1 transition-all duration-200 ease-out ${
                    filterStatus === 'all'
                      ? 'scale-108 bg-[#f35714] text-white'
                      : 'scale-100 hover:text-white'
                  } `}
                >
                  همه
                </p>

                <p
                  onClick={() => {
                    setFilterStatus('confirmed');
                  }}
                  className={`my-1 cursor-pointer rounded-[10px] px-3 py-1 transition-all duration-200 ease-out ${
                    filterStatus === 'confirmed'
                      ? 'scale-108 bg-[#f35714] text-white'
                      : 'scale-100 hover:text-white'
                  } `}
                >
                  امضاء شده
                </p>
                <p
                  onClick={() => {
                    setFilterStatus('factoryManager');
                  }}
                  className={`my-1 cursor-pointer rounded-[10px] px-3 py-1 transition-all duration-200 ease-out ${
                    filterStatus === 'factoryManager'
                      ? 'scale-108 bg-[#f35714] text-white'
                      : 'scale-100 hover:text-white'
                  } `}
                >
                  درانتظار
                </p>
                <p
                  onClick={() => {
                    setFilterStatus('productionPlaning');
                  }}
                  className={`my-1 cursor-pointer rounded-[10px] px-3 py-1 transition-all duration-200 ease-out ${
                    filterStatus === 'productionPlaning'
                      ? 'scale-108 bg-[#f35714] text-white'
                      : 'scale-100 hover:text-white'
                  } `}
                >
                  بدون امضاء
                </p>
              </div>
              <div>
                <input
                  type="text"
                  value={search}
                  placeholder="جستجو..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] py-2 text-white placeholder:pr-2 placeholder:text-white/50"
                />
              </div>
            </div>
          </div>

          <div className="no-scrollbar flex min-h-0 w-full flex-col overflow-x-hidden overflow-y-auto">
            {isLoading ? (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5">
                <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
                <p className="pt-10 text-[20px] text-white">
                  لطفا منتظر بمانید😎
                </p>
              </div>
            ) : isError ? (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5 py-20 text-[30px] text-white">
                خطا در دریافت اطلاعات 😟
              </div>
            ) : (
              <table className="mx-2 border-separate border-spacing-y-0">
                <thead className="rounded-2xl bg-[#0b0c12] text-white/70">
                  <tr>
                    <th className="border-t border-r border-b border-white/30 py-3 pr-5">
                      ردیف
                    </th>

                    <th className="border-t border-b border-white/30">
                      تاریخ ثبت گزارش
                    </th>

                    <th className="border-t border-b border-white/30">
                      تاریخ امضاء مدیریت
                    </th>
                    <th className="w-25 border-t border-b border-white/30">
                      وضعیت
                    </th>
                    <th className="border-t border-b border-l border-white/30">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((e, index) => (
                    <tr key={e.id} className="text-center">
                      <td className="size-5 border-b border-white/20">
                        <p className="my-3 mr-5 rounded-[10px] border border-white/10 bg-[#131720] py-1 font-[AvenirLTProMedium] text-white/70">
                          {index + 1}
                        </p>
                      </td>

                      <td className="border-b border-white/20">
                        <div className="flex items-center justify-center space-x-2">
                          <p className="text-[20px] text-[#863515]">
                            <FiCalendar />
                          </p>
                          <p className="font-[AvenirLTProBook] text-white">
                            {toShamsi(e?.createdDate)}
                          </p>
                        </div>
                      </td>
                      <td className="border-b border-white/20">
                        <div className="flex items-center justify-center space-x-2">
                          <p className="text-[20px] text-[#863515]">
                            <FiCalendar />
                          </p>
                          <p className="font-[AvenirLTProBook] text-white">
                            {toShamsi(e?.factoryManagerSignedAt)}
                          </p>
                        </div>
                      </td>
                      <td className="border-b border-white/20">
                        {(() => {
                          if (e?.isSignedByFactoryManager === true) {
                            return (
                              <p className="rounded-[10px] bg-[#1b4025]/50 py-1 text-[#3cbb30]">
                                تکمیل شده
                              </p>
                            );
                          }
                          if (e?.isSignedByProductionPlanner === false) {
                            return (
                              <p className="rounded-[10px] bg-[#f30437]/70 py-1 text-white">
                                بدون امضاء
                              </p>
                            );
                          }
                          if (e?.isSignedByFactoryManager === false) {
                            return (
                              <p className="rounded-[10px] bg-[#262627]/70 py-1 text-[#f9e2af]">
                                در انتظار
                              </p>
                            );
                          }
                        })()}
                      </td>
                      <td className="border-b border-white/20">
                        <ReportActionsPlanning
                          report={e}
                          canEdit={canEdit}
                          canDelete={canDelete}
                          openIsEdit={openIsEdit}
                          askDelete={askDelete}
                          setOpenForm={setOpenForm}
                          setSelectedLine={setSelectedLine}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <Pagination page={page} setPage={setPage} />
        </div>
        <CreateLineChange
          createForm={createForm}
          setCreateForm={setCreateForm}
        />
        <EditLinechange
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
        />
        <DeleteLineChange
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
        <FormFinalLineChange
          openForm={openForm}
          setOpenForm={setOpenForm}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
        />
      </div>
    </FloatingTree>
  );
}

export default FinalLineChange;
