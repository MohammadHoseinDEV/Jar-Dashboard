import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../../../API/api';

const BASE_API = `${API_HOST}:5260/api/DailyProductionReport`;

export const useGetProductionReports = ({ page, pageSize, search }) => {
  const { token } = useSelector((state) => state.auth);
  const getReports = useQuery({
    queryKey: ['production', token, page, pageSize, search],
    queryFn: async () => {
      const res = await axios.get(
        `${API_HOST}:5260/api/DailyProductionReport`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page,
            pageSize,
            search,
          },
        }
      );
      return res.data;
    },
  });
  return getReports;
};


export const useGetAllProductionReport = () => {
  const { token } = useSelector((state) => state.auth);
  const getReport = useQuery({
    queryKey: ['production', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateProductionReport = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${API_HOST}:5260/api/DailyProductionReport`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['production', token] });
    },
    onError: (error) => {
      toast.error(error.resonse.data.message || 'خطا در ثبت گزارش');
    },
  });
  return createReport;
};

export const useUpdateProductionReport = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const putReport = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(
        `${API_HOST}:5260/api/DailyProductionReport/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['production', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش گزارش');
    },
  });
  return putReport;
};

export const useDeleteProductionReport = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteProduction = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${API_HOST}:5260/api/DailyProductionReport/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['production', token] });
    },
    onError: (e) => {
      toast.error(e.response.error.message || 'خطا در حذف گزارش');
    },
  });
  return deleteProduction;
};

export const useCreateSignatureProductionReports = (id) => {
  const { token } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${API_HOST}:5260/api/DailyProductionReport/${id}/sign`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },

    onSuccess: () => {
      toast.success('امضاء با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['production', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};
