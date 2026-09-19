import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `${API_HOST}:5274/api/BatchFormulationChangeReport`;

export const useGetBachFormulation = ({
  search,
  page,
  pageSize,
  companyId,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['formulation', token, search, page, pageSize, companyId],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize, companyId },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateBachfourmulation = () => {
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
      toast.success('فرم با موفقیت اضافه شد');
      queryclient.invalidateQueries({ queryKey: ['formulation', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد فرم');
    },
  });
  return createReport;
};

export const useUpdateFourmolation = () => {
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
      queryClient.invalidateQueries({ queryKey: ['formulation', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد فرم');
    },
  });
  return updateReport;
};

export const useDeleteFormulation = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deletereport = useMutation({
    mutationFn: async ({ id }) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('فرم با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['formulation', token] });
    },
    onError: (e) => {
      toast.error(e.repose.data.message || 'خطا در حذف فرم');
    },
  });
  return deletereport;
};

// signature

export const createSignFurnaceSupervisor = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/furnace-supervisor`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء سرپرست کوره با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['formulation', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSign;
};

export const useCreateSignProductionManager = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/production-manager`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء مدیر تولید با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['formulation', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSign;
};

export const useCreateSignProductionEngineering = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/production-engineering`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء مهندسی تولید با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['formulation', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSign;
};

export const usecreateSignManagment = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/management`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء مدیریت با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['formulation', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSign;
};
