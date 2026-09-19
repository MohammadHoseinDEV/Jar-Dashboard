import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API_HOST from '../../../../API/api';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `${API_HOST}:5258/api/Customers`;

export const useGetCustomers = ({ search, page, pageSize } = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getCustomer = useQuery({
    queryKey: ['customer', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
  return getCustomer;
};

export const useCreateCustomer = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const creatCustomer = useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(`${BASE_API}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('مشتری جدید با موفقیت اضافه شد');
      queryclient.invalidateQueries({ queryKey: ['customer', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد مشتری جدید');
    },
  });
  return creatCustomer;
};

export const useUpdateCustomer = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const updateCustomer = useMutation({
    mutationFn: async ({ id, form }) => {
      const res = await axios.put(`${BASE_API}/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('ویرایش مشتری با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['customer', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش مشتری');
    },
  });
  return updateCustomer;
};

export const useInactiveCustomer = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const inactiveCustomer = useMutation({
    mutationFn: async (id) => {
      const res = await axios.post(
        `${BASE_API}/${id}/activate`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('مشتری با موفقیت غیرفعال شد');
      queryClient.invalidateQueries({ queryKey: ['customer', token] });
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || 'خطا در غیرفعال کردن مشتری');
    },
  });
  return inactiveCustomer;
};
