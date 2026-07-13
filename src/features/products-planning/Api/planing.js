import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../../API/api';

const BASE_API = `${API_HOST}:5259/api/LineChangeAnnouncementForms`;

const useCreateLineChange = () => {
  const { token } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const createLine = useMutation({
    mutationFn: async (data) => {
      const res = axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['lineChange', token] });
    },
    onError: (e) => {
      toast.error(e.response.data || 'خطا در انجام عملیات');
    },
  });
  return createLine;
};


const useGetLineChange = () => {
  const { token } = useSelector((state) => state.auth);

  const getLineChange = useQuery({
    queryKey: ['lineChange', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getLineChange;
};

const useDeleteLineChange = () => {
  const { token } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const deleteLineChange = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('فرم با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['lineChange', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف فرم');
    },
  });
  return deleteLineChange;
};

export { useCreateLineChange, useGetLineChange, useDeleteLineChange };
