import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export const BASE_API = `${API_HOST}:5277/api/loading-product-controls`;

export const useGetLoadingProducts = () => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['loading'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateLoadingProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(`${BASE_API}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('فرم با موفقیت ایجاد شد');
      queryclient.invalidateQueries({ queryKey: ['loading'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت فرم');
    },
  });
  return createReport;
};

export const useUpdateloadingProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const quereyClient = useQueryClient();

  const updateReport = useMutation({
    mutationFn: async ({ id, form }) => {
      const res = await axios.put(`${BASE_API}/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ویرایش شد');
      quereyClient.invalidateQueries({ queryKey: ['loading'] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در ویرایش گزارش');
    },
  });
  return updateReport;
};
