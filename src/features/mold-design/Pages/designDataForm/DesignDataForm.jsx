import React, { lazy, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  FaCheck,
  FaClipboardList,
  FaDownload,
  FaExclamationCircle,
  FaFilter,
  FaPlus,
} from 'react-icons/fa';
import { FiBell, FiCalendar, FiClock, FiSearch } from 'react-icons/fi';
import { MdNoteAdd, MdNumbers, MdOutlineElectricBolt } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';
import { TbReport } from 'react-icons/tb';
import { SiAltiumdesigner } from 'react-icons/si';
import { HashLoader } from 'react-spinners';

import { can, getPerm } from '../../../../utils/rbac';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { toShamsi } from '../../../../Time/date';
import { useGetAllDesignData, useGetDesignData } from '../../Api/designData';

const DeleteDesignData = lazy(
  () => import('../../components/designDataForm/module/DeleteDesignData')
);
const EditDesignData = lazy(
  () => import('../../components/designDataForm/module/EditDesignData')
);

const CreateDesignData = lazy(
  () => import('../../components/designDataForm/module/CreateDesignData')
);
const FormDesignData = lazy(
  () => import('../../components/designDataForm/module/FormDesignData')
);

const Pagination = lazy(() => import('../../../../pagination/Pagination'));

const TableDesignData = lazy(
  () => import('../../components/designDataForm/template/TableDesignData')
);

const HeaderDesktop = lazy(
  () => import('../../components/designDataForm/template/HeaderPage')
);
const ReportAction = lazy(
  () => import('../../components/designDataForm/module/ReportAction')
);
const MobileDesignData = lazy(
  () => import('../../components/designDataForm/template/MobileDesignData')
);

function DesignDataForm() {
  const { menus: userMenus } = useSelector((s) => s.auth);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  const perm = useMemo(
    () => getPerm(userMenus, 'design-data-and-drawing-verification-form'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedDesign(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedDesign(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedDesign(e);
  };

  const { data: profile } = useGetProfile();
  const isSuperAdmin = profile?.data?.identityRoles?.some(
    (p) => p.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  const isDesignManager = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e'
  );

  const {
    data: design,
    isLoading,
    isError,
  } = useGetDesignData({ search, page, pageSize });
  const { data: designAll } = useGetAllDesignData();

  const allReport = design?.data?.totalCount;
  const allConfirmed = designAll?.data?.filter(
    (d) => d.isFactoryManagerSigned === true
  ).length;
  const allPendingDesigner = designAll?.data?.filter(
    (d) => d.isDesignerSigned === false
  ).length;
  const allProductionManager = designAll?.data?.filter(
    (d) => d.isProductionManagerSigned === false && d.isDesignerSigned === true
  ).length;
  const allFactoryManager = designAll?.data?.filter(
    (d) =>
      d.isFactoryManagerSigned === false &&
      d.isProductionManagerSigned === true &&
      d.isDesignerSigned === true
  ).length;

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return design?.data?.items;

    return designAll?.data?.filter((e) => {
      if (filterStatus === 'confirmed')
        return e.isFactoryManagerSigned === true;
      if (filterStatus === 'pendingDesigner')
        return e.isDesignerSigned === false;
      if (filterStatus === 'productionManager')
        return (
          e.isProductionManagerSigned === false && e.isDesignerSigned === true
        );
      if (filterStatus === 'factoryManager')
        return (
          e.isFactoryManagerSigned === false &&
          e.isProductionManagerSigned === true &&
          e.isDesignerSigned === true
        );
      return true;
    });
  }, [filterStatus, design, designAll]);

  const countReport = design?.data?.items?.length;
  const totalPages = design?.data?.totalPages ?? 1;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderDesktop
          openCreate={openCreate}
          canCreate={canCreate}
          allReport={allReport}
          allConfirmed={allConfirmed}
          allPendingDesigner={allPendingDesigner}
          allProductionManager={allProductionManager}
          allFactoryManager={allFactoryManager}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          search={search}
          setSearch={setSearch}
          countReport={countReport}
          openFilterMobile={openFilterMobile}
          setOpenFilterMobile={setOpenFilterMobile}
        />

        {isLoading ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5">
            <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
            <p className="pt-10 text-[20px]">لطفا منتظر بمانید😎</p>
          </div>
        ) : isError ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5 text-[30px]">
            خطا در دریافت اطلاعات 😟
          </div>
        ) : (
          <div className="no-scrollbar 5xl:mt-5 flex min-h-0 w-full overflow-x-hidden overflow-y-auto">
            <div className="mx-3 w-full max-md:hidden">
              <TableDesignData
                filteredData={filteredData}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedReport={setSelectedDesign}
              />
            </div>

            <MobileDesignData
              filteredData={filteredData}
              openEdit={openEdit}
              canEdit={canEdit}
              setOpenEditModal={setOpenEditModal}
              profile={profile}
              isDesignManager={isDesignManager}
              isSuperAdmin={isSuperAdmin}
              canDelete={canDelete}
              askDelete={askDelete}
              setSelectedDesign={setSelectedDesign}
              setOpenForm={setOpenForm}
            />
          </div>
        )}
        <div
          className={`w-full shrink-0 ${filterStatus === 'confirmed' || filterStatus === 'pending' || filterStatus === 'pendingDesigner' || filterStatus === 'productionManager' || filterStatus === 'factoryManager' ? 'opacity-0' : ''}`}
        >
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <CreateDesignData
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <EditDesignData
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedDesign={selectedDesign}
        setSelectedDesign={setSelectedDesign}
      />
      <DeleteDesignData
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedDesign={selectedDesign}
      />
      <FormDesignData
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedDesign={selectedDesign}
        setSelectedDesign={setSelectedDesign}
      />
    </div>
  );
}

export default DesignDataForm;
