import React, { lazy, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import { useGetProfile } from '../../../../hooks/profile/profile';
import {
  useGetAllInternalDesignPhasePlanning,
  useGetInternalDesignPhasePlanning,
} from '../../Api/internalDesignPhasePlanning';
import { HashLoader } from 'react-spinners';
import FormDesignIntenal from '../../components/internalDesignPhasePlanning/module/FormDesignIntenal';
import MobilePage from '../../components/internalDesignPhasePlanning/template/MobilePage';

const HeaderPage = lazy(
  () =>
    import('../../components/internalDesignPhasePlanning/template/HeaderPage')
);
const TableReports = lazy(
  () =>
    import('../../components/internalDesignPhasePlanning/template/TableReports')
);
const Pagination = lazy(() => import('../../../../pagination/Pagination'));

const CreateInternalDesign = lazy(
  () =>
    import('../../components/internalDesignPhasePlanning/module/CreateInternalDesign')
);
const EditInternalDesign = lazy(
  () =>
    import('../../components/internalDesignPhasePlanning/module/EditInternalDesign')
);
const DeleteInternalDesign = lazy(
  () =>
    import('../../components/internalDesignPhasePlanning/module/DeleteInternalDesign')
);

function InternalDesignPhasePlanning() {
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
  const [selectedInternal, setSelectedInternal] = useState(null);

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
    setSelectedInternal(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedInternal(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedInternal(e);
  };

  const { data: profile } = useGetProfile();
  const isSuperAdmin = profile?.data?.identityRoles?.some(
    (p) => p.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  const isDesignManager = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e'
  );

  const {
    data: internal,
    isLoading,
    isError,
  } = useGetInternalDesignPhasePlanning({ search, page, pageSize });
  const { data: internalAll } = useGetAllInternalDesignPhasePlanning();
  const countReport = internal?.data?.items?.length;
  const totalPages = internal?.data?.totalPages ?? 1;

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
              <TableReports
                internal={internal}
                openEdit={openEdit}
                canEdit={canEdit}
                canDelete={canDelete}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedReport={setSelectedInternal}
              />
            </div>
            <MobilePage
              internal={internal}
              openEdit={openEdit}
              canEdit={canEdit}
              canDelete={canDelete}
              askDelete={askDelete}
              setOpenForm={setOpenForm}
              setSelectedReport={setSelectedInternal}
            />
          </div>
        )}
        <div className={`w-full shrink-0`}>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <CreateInternalDesign
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <EditInternalDesign
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedInternal={selectedInternal}
        setSelectedInternal={setSelectedInternal}
      />
      <DeleteInternalDesign
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedInternal={selectedInternal}
      />
      <FormDesignIntenal
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedInternal={selectedInternal}
        setSelectedInternal={setSelectedInternal}
      />
    </div>
  );
}

export default InternalDesignPhasePlanning;
