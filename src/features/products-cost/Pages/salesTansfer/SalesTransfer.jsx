import React, { lazy, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import { toast } from 'react-toastify';
import { useGetSalesTransfer } from '../../Api/salesTransfer';
import { HashLoader } from 'react-spinners';
import { useGetProfile } from '../../../../hooks/profile/profile';

const CreateTransfer = lazy(
  () => import('../../components/salesTransfer/module/CreateTransfer')
);
const HeaderPageTransfer = lazy(
  () => import('../../components/salesTransfer/template/HeaderPageTransfer')
);

const TablePageTransfer = lazy(
  () => import('../../components/salesTransfer/template/TablePageTransfer')
);

function SalesTransfer() {
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
  const [selectedTransfer, setSelectedTransfer] = useState(null);

  const { data: profile } = useGetProfile();

  const isSuperAdmin = profile?.data?.identityRoles?.some(
    (p) => p.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  const isSupervisor = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'f8c534a4-603b-43b1-9c07-754f26e23ac6'
  );

  const perm = useMemo(() => getPerm(userMenus, 'sales-transfer'), [userMenus]);
  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد حواله ندارید');
    setOpenCreateModal(true);
    setSelectedTransfer(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش حواله ندارید');

    setOpenEditModal(true);
    setSelectedTransfer(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف حواله ندارید');

    setOpenDeleteModal(true);
    setSelectedTransfer(e);
  };

  const {
    data: sales,
    isLoading,
    isError,
  } = useGetSalesTransfer({ search, page, pageSize });
  const { data: salesAll } = useGetSalesTransfer();

  const allReport = salesAll?.length;
  const allTransferExport = salesAll?.filter(
    (p) => p.transferType === '1'
  )?.length;

  const allTransferDomestic = salesAll?.filter(
    (p) => p.transferType === '0'
  )?.length;

  const withoutTransfer = salesAll?.filter((p) => !p.transferType)?.length;

  const filterData = useMemo(() => {
    if (filterStatus === 'all') return sales;

    return salesAll?.filter((s) => {
      if (filterStatus === 'export') return s.transferType === '1';

      if (filterStatus === 'domestic') return s.transferType === '0';
      if (!filterStatus) return !s.transferType;
    });
  }, [filterStatus, sales, salesAll]);

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPageTransfer
          openCreate={openCreate}
          canCreate={canCreate}
          allReport={allReport}
          allTransferExport={allTransferExport}
          allTransferDomestic={allTransferDomestic}
          withoutTransfer={withoutTransfer}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          search={search}
          setSearch={setSearch}
          countReport={allReport}
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
              <TablePageTransfer
                filterData={filterData}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedTransfer={setSelectedTransfer}
                isSuperAdmin={isSuperAdmin}
                isSupervisor={isSupervisor}
              />
            </div>
          </div>
        )}
      </div>
      <CreateTransfer
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
    </div>
  );
}

export default SalesTransfer;
