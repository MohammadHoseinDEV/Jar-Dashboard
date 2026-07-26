import React, { useMemo, useState } from 'react';
import { FaClipboardList, FaDownload, FaFilter } from 'react-icons/fa';
import { FiBell, FiCalendar } from 'react-icons/fi';
import { MdNoteAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import HeaderPage from '../../components/moldDarwing/template/HeaderPage';
import { useGetAllMoldDarwing, useGetMoldDarwing } from '../../Api/moldDarwing';
import TableMoldDarwing from '../../components/moldDarwing/template/TableMoldDarwing';
import { HashLoader } from 'react-spinners';
import MobileMoldDarwing from '../../components/moldDarwing/template/MobileMoldDarwing';
import { useGetProfile } from '../../../../hooks/profile/profile';
import Pagination from '../../../../pagination/Pagination';
import CreateMoldDarwing from '../../components/moldDarwing/module/CreateMoldDarwing';
import EditMoldDarwing from '../../components/moldDarwing/module/EditMoldDarwing';
import DeleteMoldDarwing from '../../components/moldDarwing/module/DeleteMoldDarwing';
import FormMoldDarwing from '../../components/moldDarwing/module/FormMoldDarwing';
import { toast } from 'react-toastify';

function MoldDarwingForm() {
  const { menus: userMenus } = useSelector((s) => s.auth);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedMoldDarwing, setSelectedMoldDarwing] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);

  const perm = useMemo(
    () => getPerm(userMenus, 'mold-drawing-verification-form'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedMoldDarwing(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedMoldDarwing(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedMoldDarwing(e);
  };

  const { data: profile } = useGetProfile();

  const isDesignManager = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e'
  );

  const isSuperAdmin = profile?.data?.identityRoles?.some(
    (p) => p.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  const {
    data: darwing,
    isLoading,
    isError,
  } = useGetMoldDarwing({ search, page, pageSize });
  const { data: darwingAll } = useGetAllMoldDarwing();
  const allReport = darwing?.data?.totalCount;

  const allConfirmed = darwingAll?.data?.filter(
    (d) => d.isFactoryManagerSigned === true
  ).length;

  const allPendingDesigner = darwingAll?.data?.filter(
    (d) => d.isDesignerSigned === false
  ).length;

  const allFactoryManager = darwingAll?.data?.filter(
    (d) => d.isFactoryManagerSigned === false && d.isDesignerSigned === true
  ).length;

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return darwing?.data?.items;

    return darwingAll?.data?.filter((e) => {
      if (filterStatus === 'confirmed')
        return e.isFactoryManagerSigned === true;
      if (filterStatus === 'pendingDesigner')
        return e.isDesignerSigned === false;

      if (filterStatus === 'factoryManager')
        return (
          e.isFactoryManagerSigned === false && e.isDesignerSigned === true
        );
      return true;
    });
  }, [filterStatus, darwing, darwingAll]);

  const countReport = darwing?.data?.items?.length;
  const totalPages = darwing?.data?.totalPages ?? 1;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPage
          setSearch={setSearch}
          openCreate={openCreate}
          setFilterStatus={setFilterStatus}
          setOpenFilterMobile={setOpenFilterMobile}
          search={search}
          canCreate={canCreate}
          allReport={allReport}
          countReport={countReport}
          allConfirmed={allConfirmed}
          filterStatus={filterStatus}
          openFilterMobile={openFilterMobile}
          allFactoryManager={allFactoryManager}
          allPendingDesigner={allPendingDesigner}
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
              <TableMoldDarwing
                filteredData={filteredData}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedMoldDarwing={setSelectedMoldDarwing}
              />
            </div>

            <MobileMoldDarwing
              filteredData={filteredData}
              openEdit={openEdit}
              canEdit={canEdit}
              setOpenEditModal={setOpenEditModal}
              profile={profile}
              isDesignManager={isDesignManager}
              isSuperAdmin={isSuperAdmin}
              setSelectedMoldDarwing={setSelectedMoldDarwing}
              askDelete={askDelete}
              canDelete={canDelete}
              setOpenForm={setOpenForm}
            />
          </div>
        )}
        <div
          className={`w-full shrink-0 ${filterStatus === 'confirmed' || filterStatus === 'pending' || filterStatus === 'pendingDesigner' || filterStatus === 'factoryManager' ? 'opacity-0' : ''}`}
        >
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <CreateMoldDarwing
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <EditMoldDarwing
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedMoldDarwing={selectedMoldDarwing}
        setSelectedMoldDarwing={setSelectedMoldDarwing}
      />
      <DeleteMoldDarwing
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedMoldDarwing={selectedMoldDarwing}
        setSelectedMoldDarwing={setSelectedMoldDarwing}
      />
      <FormMoldDarwing
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedMoldDarwing={selectedMoldDarwing}
        setSelectedMoldDarwing={setSelectedMoldDarwing}
      />
    </div>
  );
}

export default MoldDarwingForm;
