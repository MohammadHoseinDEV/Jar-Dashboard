import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../API/api';

const API_BASE = `${API_HOST}:5257/api`;

export const unitApi = {
  list: async ({ token, page = 1, pageSize = 20, search, companyId }) => {
    const res = await axios.get(`${API_BASE}/unit`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
        pageSize,
        search: search?.trim() || undefined,
        companyId: companyId || undefined, // فیلتر
      },
    });
    return res.data;
  },

  create: async ({ token, dto }) => {
    const res = await axios.post(`${API_BASE}/unit`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  update: async ({ token, id, dto }) => {
    const res = await axios.put(`${API_BASE}/unit/${id}`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  remove: async ({ token, id }) => {
    const res = await axios.delete(`${API_BASE}/unit/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

const useGetUnit = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const getUnits = useQuery({
    queryKey: ['unit', token],
    queryFn: async () => {
      const res = await axios.get(`${API_HOST}:5257/api/Unit`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getUnits;
};

const useAssignRoleToUserInUnit = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const postUnits = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${API_BASE}/Role/assign-role-to-user-in-unit`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['users', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام عملیات');
    },
  });
  return postUnits;
};

export { useGetUnit, useAssignRoleToUserInUnit };
