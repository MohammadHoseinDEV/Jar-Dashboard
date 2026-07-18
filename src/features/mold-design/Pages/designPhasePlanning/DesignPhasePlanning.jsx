import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import HeaderPage from '../../components/designPhasePlanning/template/HeaderPage';
import { useGetDesignPhasePlanning } from '../../Api/designPhasePlanning';
import { HashLoader } from 'react-spinners';
import CreateDesignPhasePlanning from '../../components/designPhasePlanning/module/CreateDesignPhasePlanning';
import Pagination from '../../../../pagination/Pagination';
import EditDesignPhasePlanning from '../../components/designPhasePlanning/module/EditDesignPhasePlanning';
import TableReport from '../../components/designPhasePlanning/template/TableReport';
import DeleteDesignPhasePlanning from '../../components/designPhasePlanning/module/DeleteDesignPhasePlanning';
import FormdesignPhasePlanning from '../../components/designPhasePlanning/module/FormdesignPhasePlanning';

function DesignPhasePlanning() {
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
    () => getPerm(userMenus, 'internal-design-phase-planning'),
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

  const {
    data: phase,
    isLoading,
    isError,
  } = useGetDesignPhasePlanning({ search, page, pageSize });
  const countReport = phase?.data?.items?.length;
  const totalPages = phase?.data?.totalPages ?? 1;
  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPage
          openCreate={openCreate}
          canCreate={canCreate}
          search={search}
          setSearch={setSearch}
          countReport={countReport}
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
              <TableReport
                phase={phase}
                openEdit={openEdit}
                canEdit={canEdit}
                canDelete={canDelete}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedReport={setSelectedDesign}
              />
            </div>
          </div>
        )}
        <div className={`w-full shrink-0`}>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <CreateDesignPhasePlanning
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <EditDesignPhasePlanning
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedDesign={selectedDesign}
        setSelectedDesign={setSelectedDesign}
      />
      <DeleteDesignPhasePlanning
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedDesign={selectedDesign}
      />
      <FormdesignPhasePlanning
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedDesign={selectedDesign}
        setSelectedDesign={setSelectedDesign}
      />
    </div>
  );
}

export default DesignPhasePlanning;
