import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../../../API/api';

export const useCreateReports = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClinet = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${API_HOST}:5260/api/BatchPlantReport`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },

    onSuccess: () => {
      toast.success('گزارش با موفقیت ایجاد شد');
      queryClinet.invalidateQueries({ queryKey: ['bachPlant'], token });
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'ثبت گزارش با خطا مواجه شد');
    },
  });
  return createReport;
};

export const useGetBachReports = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getBachReports = useQuery({
    queryKey: ['bachPlant', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${API_HOST}:5260/api/BatchPlantReport`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
  return getBachReports;
};

export const useUpdateBachReport = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const updateReport = useMutation({
    mutationFn: async ({ id, form }) => {
      const res = await axios.put(
        `${API_HOST}:5260/api/BatchPlantReport/${id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['bachPlant', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش گزارش');
    },
  });
  return updateReport;
};

export const useDeleteBachReport = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const deleteReport = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${API_HOST}:5260/api/BatchPlantReport/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت حذف شد');
      queryclient.invalidateQueries({ queryKey: ['bachPlant', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'حطا در حذف گزارش');
    },
  });
  return deleteReport;
};

// -----------------------------------------------------
// signature-امضاء

export const useCreateSignatureBachPlantReports = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${API_HOST}:5260/api/BatchPlantReport/${id}/sign`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['bachPlant', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};
