import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../../../API/api';

const BASE_API = `${API_HOST}:5260/api/MachiningWorkReport`;

export const useCreateMachiningReport = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createMachiningReport = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },

    onSuccess: () => {
      toast.success('گزارش با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['machining', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت گزارش');
    },
  });
  return createMachiningReport;
};

export const useGetMachiningReports = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getMachiningReports = useQuery({
    queryKey: ['machining', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${API_HOST}:5260/api/MachiningWorkReport`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search,
          page,
          pageSize,
        },
      });
      return res.data;
    },
    enabled: !!token,
  });
  return getMachiningReports;
};

export const useGetAllMachiningReport = () => {
  const { token } = useSelector((state) => state.auth);
  const getMachiningReports = useQuery({
    queryKey: ['machining', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getMachiningReports;
};

export const useEditMachiningReport = () => {
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
      queryClient.invalidateQueries({ queryKey: ['machining', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش گزارش');
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
      queryClient.invalidateQueries({ queryKey: ['machining', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف گزارش');
    },
  });
  return deleteReport;
};
// ----------------------------------------------------------
// S;

export const usecreateSignatureMachiningReport = (id) => {
  const { token, userInfo } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${API_HOST}:5260/api/MachiningWorkReport/${id}/sign`,
        { signaturePassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['machining', token] });
      queryClient.invalidateQueries({
        queryKey: ['signature', userInfo?.userId, token],
      }); // اضافه کن
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};

export const useGetSignatureForMachining = (userId) => {
  const { token } = useSelector((state) => state.auth);
  const getSignature = useQuery({
    queryKey: ['signature', userId, token],
    queryFn: async () => {
      const res = await axios.get(
        `${API_HOST}:5257/api/Signature/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: !!userId && !!token,
    refetchOnMount: 'always',
  });
  return getSignature;
};
