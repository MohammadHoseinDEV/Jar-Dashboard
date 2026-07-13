import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../../../API/api';

const BASE_API = `${API_HOST}:5260/api/MechanicalReport`;

export const useCreateMechanicalReports = () => {
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
      toast.success('گزارش با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['mechanical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد گزارش');
    },
  });
  return createReports;
};

export const useGetMechanicalReports = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReports = useQuery({
    queryKey: ['mechanical', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
  return getReports;
};

export const useGetAllMechanicalReports = () => {
  const { token } = useSelector((state) => state.auth);

  const getReports = useQuery({
    queryKey: ['mechanical', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReports;
};

export const useUpdateMechanicalReports = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const updateReports = useMutation({
    mutationFn: async ({ id, form }) => {
      const res = await axios.put(`${BASE_API}/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['mechanical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام ویرایش');
    },
  });
  return updateReports;
};

export const useDeleteMechanicalReports = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteReports = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['mechanical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف گزارش');
    },
  });
  return deleteReports;
};

// -----------------------------------------------------------
// signature-امضاء

export const useCreateSignatureHandover = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/shift-handover`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء تحویل دهنده شیفت با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['mechanical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSign;
};

export const useCreateSignatureReceiver = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/shift-receiver`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء تحویل گیرنده شیفت با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['mechanical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};

export const useCreateSignatureSupervisor = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/supervisor`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء سرپرست با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['mechanical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};
