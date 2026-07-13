import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `${API_HOST}:5271/api/MoldDrawingVerificationForm`;

export const useGetMoldDarwing = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['darwing', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useGetAllMoldDarwing = () => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['darwing', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateMoldDarwing = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(`${BASE_API}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('فرم با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['darwing', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد فرم');
    },
  });
  return createReport;
};

export const useUpdateMoldDarwing = () => {
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
      toast.success('فرم با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['darwing', token] });
    },
    onError: () => {
      toast.error(e.response.data.message || 'خطا در ویرایش فرم');
    },
  });
  return updateReport;
};

export const useDeleteMoldDarwing = () => {
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
      toast.success('فرم با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['darwing', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف فرم');
    },
  });
  return deleteReport;
};

export const useCreateSignDesigner = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/designer`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء مسئول طراحی با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['darwing', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء مسئول طراحی');
    },
  });
  return createSign;
};

export const useCreatSignFactoryManager = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/factory-manager`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء مدیریت با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['darwing', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء مدیریت');
    },
  });
  return createSign;
};

export const useCreateSignDesignerS2 = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/designer-section2`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء مسئول طراحی با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['darwing', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء مسئول طراحی');
    },
  });
  return createSign;
};
