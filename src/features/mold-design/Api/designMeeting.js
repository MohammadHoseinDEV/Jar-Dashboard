import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `${API_HOST}:5271/api/DesignMeetingMinutesForm`;

export const useGetDesignMeeting = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['meeting', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateDesignMeeting = () => {
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
      queryClient.invalidateQueries({ queryKey: ['meeting', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد فرم');
    },
  });
  return createReport;
};

export const useUpdateDesignMeeting = () => {
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
      queryClient.invalidateQueries({ queryKey: ['meeting', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش فرم');
    },
  });
  return updateReport;
};

export const useDeleteDesignMeeting = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const deleteReport = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('فرم با موفقیت حذف شد');
      queryclient.invalidateQueries({ queryKey: ['meeting', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف فرم');
    },
  });
  return deleteReport;
};
