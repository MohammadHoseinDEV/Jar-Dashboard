import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { use } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../API/api';

const BASE_API = `${API_HOST}:5257/api/Role`;

const useGetRoles = () => {
  const { token } = useSelector((state) => state.auth);

  const getRoles = useQuery({
    queryKey: ['roles', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getRoles;
};

// assign-role-to-user
const useCreateRole = () => {
  const { token } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const createRole = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/assign-role-to-user`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('نقش با موفقیت اختصاص داده شد.');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'خطا در اختصاص نقش به کاربر');
    },
  });
  return createRole;
};
// ------------------------------------------

// remove Role from User

const useRemoveFromRoleUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const removeRoleFromUser = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/remove-role-from-user`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('نقش با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'خطا در حذف نقش از کاربر');
    },
  });
  return removeRoleFromUser;
};

const useAssignRoleToUserInCompany = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createRoleToCompany = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${BASE_API}/assign-role-to-user-in-company`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('اختصاص نقش به کاربر در شرکت با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['users', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'عملیات با خطا مواجه شد');
    },
  });
  return createRoleToCompany;
};

const useRemoveRoleToUserInCompany = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteCompany = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${BASE_API}/remove-role-from-user-in-company`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'عملیات با خطا مواجه شد');
    },
  });
  return deleteCompany;
};

const useRemoveRoleToUserInUnit = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const removeUnit = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${BASE_API}/remove-role-from-user-in-unit`,
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
      toast.error(e?.response?.data?.message || 'خطا در انجام عملیات');
    },
  });
  return removeUnit;
};

export {
  useGetRoles,
  useCreateRole,
  useRemoveFromRoleUser,
  useAssignRoleToUserInCompany,
  useRemoveRoleToUserInCompany,
  useRemoveRoleToUserInUnit,
};
