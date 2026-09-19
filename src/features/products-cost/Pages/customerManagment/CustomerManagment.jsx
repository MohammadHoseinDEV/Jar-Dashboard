import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import { toast } from 'react-toastify';
import { useGetCustomers } from '../../Api/customerManagment';
import HeaderPageCustomer from '../../components/customerManagment/template/HeaderPageCustomer';
import { HashLoader } from 'react-spinners';
import TablePageCustomer from '../../components/customerManagment/template/TablePageCustomer';
import MobilePagecustomer from '../../components/customerManagment/template/MobilePageCustomer';
import CreateCustomer from '../../components/customerManagment/module/CreateCustomer';
import Editcustomer from '../../components/customerManagment/module/Editcustomer';

function CustomerManagment() {
  const { menus: userMenus } = useSelector((s) => s.auth);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const perm = useMemo(
    () => getPerm(userMenus, 'customer-management'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedCustomer(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedCustomer(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedCustomer(e);
  };

  const {
    data: customer,
    isLoading,
    isError,
  } = useGetCustomers({ search, page, pageSize });

  const allCustomer = customer?.length;
  const allCustomerActive = customer?.filter(
    (a) => a.isActive === true
  )?.length;
  const allcustomerInactive = customer?.filter(
    (a) => a.isActive === false
  )?.length;

  const filterData = useMemo(() => {
    if (filterStatus === 'all') return customer;
    return customer?.filter((c) => {
      if (filterStatus === 'active') return c.isActive === true;
      if (filterStatus === 'inactive') return c.isActive === false;
    });
  }, [customer, filterStatus]);

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPageCustomer
          openCreate={openCreate}
          canCreate={canCreate}
          allCustomer={allCustomer}
          allCustomerActive={allCustomerActive}
          allcustomerInactive={allcustomerInactive}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          search={search}
          setSearch={setSearch}
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
              <TablePageCustomer
                filterData={filterData}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
              />
            </div>
            <MobilePagecustomer
              filterData={filterData}
              canEdit={canEdit}
              canDelete={canDelete}
              askDelete={askDelete}
              openEdit={openEdit}
              setOpenForm={setOpenForm}
              setSelectedCustomer={setSelectedCustomer}
            />
          </div>
        )}
      </div>
      <CreateCustomer
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <Editcustomer
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />
    </div>
  );
}

export default CustomerManagment;
