import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import HeaderPage from '../../components/designWorkRequest/template/HeaderPage';
import { can, getPerm } from '../../../../utils/rbac';
import {
  useGetAllDesignWorkRequest,
  useGetDesignWorkRequest,
} from '../../Api/designWorkRequest';
import { HashLoader } from 'react-spinners';
import Table from '../../components/designWorkRequest/template/Table';
import MobileDesignWorkRequest from '../../components/designWorkRequest/template/MobileDesignWorkRequest';
import { useGetProfile } from '../../../../hooks/profile/profile';
import Pagination from '../../../../pagination/Pagination';
import CreateDesignWorkRequest from '../../components/designWorkRequest/module/CreateDesignWorkRequest';
import FormDesignWorkRequest from '../../components/designWorkRequest/module/Formdesignworkrequest';
import DeleteDesignWorkrequest from '../../components/designWorkRequest/module/DeleteDesignWorkrequest';
import { toast } from 'react-toastify';

function DesignWorkRequest() {
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
  const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);

  const { data: profile } = useGetProfile();
  const isSuperAdmin = profile?.data?.identityRoles?.some(
    (p) => p.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  const isDesignManager = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e'
  );

  const perm = useMemo(
    () => getPerm(userMenus, 'design-work-request-form'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedWorkRequest(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedWorkRequest(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedWorkRequest(e);
  };

  const {
    data: work,
    isLoading,
    isError,
  } = useGetDesignWorkRequest({ search, page, pageSize });
  const { data: workAll } = useGetAllDesignWorkRequest();

  const allReport = work?.data?.totalCount;
  const allConfirmed = workAll?.data?.filter(
    (d) =>
      d.isRequesterSigned === true &&
      d.isManagerSigned === true &&
      d.isDesignSupervisorSigned === true &&
      d.isReceiverSigned === true
  ).length;

  const allPendingRequerst = workAll?.data?.filter(
    (d) => d.isRequesterSigned === false
  ).length;

  const allPendingfactoryManager = workAll?.data?.filter(
    (d) => d.isManagerSigned === false && d.isRequesterSigned === true
  ).length;

  const allpendingDesigner = workAll?.data?.filter(
    (d) =>
      d.isManagerSigned === true &&
      d.isRequesterSigned === true &&
      d.isDesignSupervisorSigned === false
  ).length;

  const allPendingReceiver = workAll?.data?.filter(
    (d) =>
      d.isManagerSigned === true &&
      d.isRequesterSigned === true &&
      d.isDesignSupervisorSigned === true &&
      d.isReceiverSigned === false
  ).length;

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return work?.data?.items;

    return workAll?.data?.filter((e) => {
      if (filterStatus === 'confirmed')
        return (
          e.isRequesterSigned === true &&
          e.isManagerSigned === true &&
          e.isDesignSupervisorSigned === true &&
          e.isReceiverSigned === true
        );
      if (filterStatus === 'request') return e.isRequesterSigned === false;
      if (filterStatus === 'manager')
        return e.isManagerSigned === false && e.isRequesterSigned === true;
      if (filterStatus === 'designer')
        return (
          e.isRequesterSigned === true &&
          e.isManagerSigned === true &&
          e.isDesignSupervisorSigned === false
        );
      if (filterStatus === 'receiver')
        return (
          e.isRequesterSigned === true &&
          e.isManagerSigned === true &&
          e.isDesignSupervisorSigned === true &&
          e.isReceiverSigned === false
        );
      return true;
    });
  }, [filterStatus, work, workAll]);

  const countReport = work?.data?.items?.length;
  const totalPages = work?.data?.totalPages ?? 1;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPage
          canCreate={canCreate}
          openCreate={openCreate}
          allReport={allReport}
          allConfirmed={allConfirmed}
          allPendingRequerst={allPendingRequerst}
          allPendingfactoryManager={allPendingfactoryManager}
          allpendingDesigner={allpendingDesigner}
          allPendingReceiver={allPendingReceiver}
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
              <Table
                filteredData={filteredData}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedReport={setSelectedWorkRequest}
              />
            </div>
            <MobileDesignWorkRequest
              filteredData={filteredData}
              canEdit={canEdit}
              canDelete={canDelete}
              askDelete={askDelete}
              openEdit={openEdit}
              setOpenEditModal={setOpenEditModal}
              setOpenForm={setOpenForm}
              profile={profile}
              isSuperAdmin={isSuperAdmin}
              isDesignManager={isDesignManager}
              setSelectedWorkRequest={setSelectedWorkRequest}
            />
          </div>
        )}
        <div
          className={`w-full shrink-0 ${filterStatus === 'confirmed' || filterStatus === 'request' || filterStatus === 'manager' || filterStatus === 'designer' || filterStatus === 'receiver' ? 'opacity-0' : ''}`}
        >
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <CreateDesignWorkRequest
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />

      <FormDesignWorkRequest
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedWorkRequest={selectedWorkRequest}
      />
      <DeleteDesignWorkrequest
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedWorkRequest={selectedWorkRequest}
      />
    </div>
  );
}

export default DesignWorkRequest;
