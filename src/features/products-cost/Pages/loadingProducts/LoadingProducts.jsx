import React, { lazy, useMemo, useState } from 'react';
import { can, getPerm } from '../../../../utils/rbac';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { useGetLoadingProducts } from '../../Api/loadingProducts';
import { HashLoader } from 'react-spinners';

const CreateLoading = lazy(
  () => import('../../components/loadingProducts/module/CreateLoading')
);
const HeaderPageLoading = lazy(
  () => import('../../components/loadingProducts/template/HeaderPageLoading')
);
const TablePageLoadingProduct = lazy(
  () =>
    import('../../components/loadingProducts/template/TablePageLoadingProduct')
);
const MobilePageLoading = lazy(
  () => import('../../components/loadingProducts/template/MobilePageLoading')
);

const EditLoading = lazy(
  () => import('../../components/loadingProducts/module/EditLoading')
);
const ShowPhoto = lazy(
  () => import('../../components/loadingProducts/module/ShowPhoto')
);

function LoadingProducts() {
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
  const [selectedLoading, setSelectedLoading] = useState(null);

  const [productsImage, setProductsImage] = useState(false);
  const [selectedProductForImage, setSelectedProductForImage] = useState(null);

  const perm = useMemo(
    () => getPerm(userMenus, 'loading-products'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedLoading(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedLoading(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedLoading(e);
  };

  const { data: profile } = useGetProfile();

  const findcompany = profile?.data?.companyRoles?.find(
    (c) => c.companyId
  )?.companyId;

  const { data: loading, isLoading, isError } = useGetLoadingProducts();
  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPageLoading openCreate={openCreate} canCreate={canCreate} />

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
              <TablePageLoadingProduct
                loading={loading}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedLoading={setSelectedLoading}
              />
            </div>
            <MobilePageLoading
              loading={loading}
              canEdit={canEdit}
              canDelete={canDelete}
              openEdit={openEdit}
              askDelete={askDelete}
              setOpenFormReport={setOpenForm}
              setSelectedLoading={setSelectedLoading}
            />
          </div>
        )}
      </div>

      <CreateLoading
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        profile={profile}
      />
      <EditLoading
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedLoading={selectedLoading}
        setSelectedLoading={setSelectedLoading}
      />
      <ShowPhoto
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedLoading={selectedLoading}
        setSelectedLoading={setSelectedLoading}
      />
    </div>
  );
}

export default LoadingProducts;
