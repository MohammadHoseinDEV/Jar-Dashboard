import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import HeaderPage from '../../components/designPhasePlanning/template/HeaderPage';
import { useGetDesignPhasePlanning } from '../../Api/designPhasePlanning';

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
      </div>
    </div>
  );
}

export default DesignPhasePlanning;
