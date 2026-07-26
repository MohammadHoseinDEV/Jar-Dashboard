import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../../../API/api';

const BASE_API = `${API_HOST}:5260/api/QualityControlPackagingReport`;

export const useCreateQualityReports = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createReports = useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(`${BASE_API}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['quality', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت گزارش');
    },
  });
  return createReports;
};

export const useGetQualityReports = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReports = useQuery({
    queryKey: ['quality', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
    enabled: !!token,
  });
  return getReports;
};

export const useGetAllQualityReports = () => {
  const { token } = useSelector((state) => state.auth);

  const getReports = useQuery({
    queryKey: ['quality', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReports;
};

export const useUpdateQualityReport = () => {
  const { token } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const updateReport = useMutation({
    mutationFn: async ({ id, form }) => {
      const res = await axios.put(`${BASE_API}/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['quality', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش گزارش');
    },
  });
  return updateReport;
};

export const useDeleteQualityReport = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteReport = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['quality', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف گزارش');
    },
  });
  return deleteReport;
};
// -----------------------------------------------------------
// signature-امضاء

export const useCreateSignatureHandover = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/hand-over`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء تحویل دهنده با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['quality', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};

export const useCreateSignatureReceiver = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/receiver`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء تحویل گیرنده شیفت با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['quality', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};
