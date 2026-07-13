import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../../../API/api';

const BASE_API = `${API_HOST}:5260/api/PolishingWorkReport`;

// POST
export const useCreatePoloshingReport = () => {
  const { token } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['polishing', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت گزارش');
    },
  });
  return createReport;
};

// GET
export const useGetPolishingReports = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReports = useQuery({
    queryKey: ['polishing', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search,
          page,
          pageSize,
        },
      });
      return res.data;
    },
  });
  return getReports;
};

export const useGetAllPolishingReport = () => {
  const { token } = useSelector((state) => state.auth);

  const getReports = useQuery({
    queryKey: ['polishing', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReports;
};

export const useEditPolishingReport = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const editReport = useMutation({
    mutationFn: async ({ id, form }) => {
      const res = await axios.put(`${BASE_API}/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['polishing', token] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در ویرایش گزارش');
    },
  });
  return editReport;
};

export const useDeleteReport = () => {
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
      queryClient.invalidateQueries({ queryKey: ['polishing', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف گزارش');
    },
  });
  return deleteReport;
};

// -------------------------------------------------
// Signature
export const useCreateSignaturePolishingReports = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const canSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign`,
        {
          signaturePassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['polishing', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return canSignature;
};
