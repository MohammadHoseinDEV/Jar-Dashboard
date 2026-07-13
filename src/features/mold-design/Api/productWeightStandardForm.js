import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `${API_HOST}:5271/api/ProductWeightStandardForm`;

export const useGetProductWeightStandard = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['standard', token, search, page, pageSize],
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

export const useGetAllProductWeightStandard = () => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['standard', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateProductionWeightStandard = () => {
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
      queryClient.invalidateQueries({ queryKey: ['standard', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد فرم');
    },
  });
  return createReport;
};

export const useUpdateProductionWeightStandard = () => {
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
      queryClient.invalidateQueries({ queryKey: ['standard', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش فرم');
    },
  });
  return updateReport;
};

export const useDeleteProductionWeightStandard = () => {
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
      queryClient.invalidateQueries({ queryKey: ['standard', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف فرم');
    },
  });
  return deleteReport;
};

export const useCreateSignProductionManager = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/production-supervisor`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء مدیر تولید با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['standard', token] });
    },
    onError: (e) => {
      toast.error(e.respoonse.data.message || 'خطا در ثبت امضاء مدیر تولید');
    },
  });
  return createSign;
};

export const useCreateSignProductionPlanning = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/production-planner`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء سرپرست برنامه ریزی با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['standard', token] });
    },
    onError: (e) => {
      toast.error(
        e.respoonse.data.message || 'خطا در ثبت امضاء سرپرست برنامه ریزی'
      );
    },
  });
  return createSign;
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
      queryClient.invalidateQueries({ queryKey: ['standard', token] });
    },
    onError: (e) => {
      toast.error(e.respoonse.data.message || 'خطا در ثبت امضاء مسئول طراحی');
    },
  });
  return createSign;
};

export const useCreateSignFactoryManager = () => {
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
      toast.success('امضاء مدیر کارخانه با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['standard', token] });
    },
    onError: (e) => {
      toast.error(e.respoonse.data.message || 'خطا در ثبت امضاء مدیر کارخانه');
    },
  });
  return createSign;
};
