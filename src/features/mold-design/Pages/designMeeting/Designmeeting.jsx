import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import { toast } from 'react-toastify';
import { useGetDesignMeeting } from '../../Api/designMeeting';
import HeaderPage from '../../components/designMeeting/template/HeaderPage';
import { HashLoader } from 'react-spinners';
import TableDesignMeeting from '../../components/designMeeting/template/TableDesignMeeting';
import MobileDesignMeeting from '../../components/designMeeting/template/MobileDesignMeeting';
import Pagination from '../../../../pagination/Pagination';
import FormDesignMeeting from '../../components/designMeeting/module/FormDesignMeeting';
import DeletedesignMeeting from '../../components/designMeeting/module/DeletedesignMeeting';
import CreateDesignMeeting from '../../components/designMeeting/module/CreateDesignMeeting';
import EditdesignMeeting from '../../components/designMeeting/module/EditdesignMeeting';

function DesignMeeting() {
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
  const [selectedDesignMeeting, setSelectedDesignMeeting] = useState(null);

  const perm = useMemo(() => getPerm(userMenus, 'design-meeting'), [userMenus]);
  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedDesignMeeting(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedDesignMeeting(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedDesignMeeting(e);
  };

  const {
    data: meting,
    isLoading,
    isError,
  } = useGetDesignMeeting({ search, page, pageSize });
  const countReport = meting?.data?.items?.length;
  const totalPages = meting?.data?.totalPages ?? 1;
  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPage
          countReport={countReport}
          openCreate={openCreate}
          canCreate={canCreate}
          search={search}
          setSearch={setSearch}
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
              <TableDesignMeeting
                meting={meting}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedReport={setSelectedDesignMeeting}
              />
            </div>
            <MobileDesignMeeting
              meting={meting}
              canEdit={canEdit}
              canDelete={canDelete}
              openEdit={openEdit}
              askDelete={askDelete}
              setOpenFormReport={setOpenForm}
              setSelectedReport={setSelectedDesignMeeting}
            />
          </div>
        )}
        <div className={`w-full shrink-0`}>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <CreateDesignMeeting
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <EditdesignMeeting
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedDesignMeeting={selectedDesignMeeting}
        setSelectedDesignMeeting={setSelectedDesignMeeting}
      />
      <DeletedesignMeeting
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedDesignMeeting={selectedDesignMeeting}
      />
      <FormDesignMeeting
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedDesignMeeting={selectedDesignMeeting}
      />
    </div>
  );
}

export default DesignMeeting;
