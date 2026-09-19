import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `${API_HOST}:5258/api/SalesTransfers`;

export const useGetSalesTransfer = ({ search, page, pageSize } = {}) => {
  const { token } = useSelector((state) => state.auth);
  const getTransfer = useQuery({
    queryKey: ['sales', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
  return getTransfer;
};

export const useCreateSalesTransfer = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createTransfer = useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(`${BASE_API}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('حواله با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['sales', token] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در ثبت حواله');
    },
  });
  return createTransfer;
};
