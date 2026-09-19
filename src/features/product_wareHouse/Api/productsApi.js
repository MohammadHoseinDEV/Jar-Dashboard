import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../../API/api';

const BASE_API = `${API_HOST}:5258/api/Products`;

// GET Products
const useGetProducts = ({ page, pageSize, search } = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getProducts = useQuery({
    queryKey: ['products', token, page, pageSize, search],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize, search },
      });
      return res.data;
    },
  });
  return getProducts;
};

// POST Products
const useCreateProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createProducts = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('شناسنامه محصول با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['products', token] });
    },
    onError: (e) => {
      toast.error(e.response.data || 'خطا در ایجاد شناسنامه محصول');
    },
  });
  return createProducts;
};

// Edit Products
const useEditProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BASE_API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('ویرایش با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['products', token] });
    },
    onError: (e) => {
      toast.error(
        e?.response?.data?.errors
          ? 'خطا در اعتبارسنجی اطلاعات'
          : e?.response?.data?.message ||
              e?.response?.data ||
              'خطا در انجام ویرایش'
      );
    },
  });
};

const useImageProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const postImage = useMutation({
    mutationFn: async ({ id, formData }) => {
      const res = await axios.put(`${BASE_API}/${id}/images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عکس با موفقیت آپلود شد');
      queryClient.invalidateQueries({ queryKey: ['products', token] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در آپلود عکس');
    },
  });

  return postImage;
};

const useDeleteProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteProducts = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('محصول با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['products', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف محصول');
    },
  });
  return deleteProducts;
};

const useShowSignutare = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const showSignuter = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${API_HOST}:5257/api/Signature/verify`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضا با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['signature', token] });
    },
    onError: (e) => {
      toast.error(e.response.data || 'خطا در ثبت امضاء');
    },
  });
  return showSignuter;
};

export {
  useCreateProducts,
  useGetProducts,
  useImageProducts,
  useDeleteProducts,
  useEditProducts,
  useShowSignutare,
};
