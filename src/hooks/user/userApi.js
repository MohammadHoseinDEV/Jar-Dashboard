import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../API/api';

const BASE_API = `${API_HOST}:5257/api/User`;

const useCreateUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(`${BASE_API}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('کاربر با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'خطا در ایجاد کاربر جدید');
    },
  });
  return createUser;
};

const getUser = ({ page, pageSize, search, unitName } = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getUsers = useQuery({
    queryKey: ['users', token, page, pageSize, search, unitName],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize, search, unitName },
      });
      return res.data;
    },
  });
  return getUsers;
};

const useEditUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const editUser = useMutation({
    mutationFn: async (data, id) => {
      const res = await axios.put(`${BASE_API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('کاربر با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'خطا در ویرایش کاربر');
    },
  });
  return editUser;
};

const useDeleteUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteUser = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('کاربر با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'خطا در حذف کاربر');
    },
  });
  return deleteUser;
};

const useUpdateUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const putUser = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BASE_API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['users', token] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در انجام عملیات');
    },
  });
  return putUser;
};

export const useGetScheduleShift = ({ UserId, FromDate, ToDate }) => {
  const { token } = useSelector((state) => state.auth);

  const getShift = useQuery({
    queryKey: ['users', token, UserId, FromDate, ToDate],
    queryFn: async () => {
      const res = await axios.get(`${API_HOST}:5257/api/Shift/schedule`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { UserId, FromDate, ToDate },
      });
      return res.data;
    },
    enabled: !!UserId && !!FromDate && !!ToDate && !!token,
  });
  return getShift;
};

// ------------------------------------------------------------------

// امضاء

export const usePermissionSignature = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(
        `${API_HOST}:5257/api/User/permission-sign`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },

    onSuccess: (data, variables) => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({
        queryKey: ['permission-sign-menus', variables.userId, token],
      });
    },
  });
};

export const useUpdatePermissionSignature = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.put(
        `${API_HOST}:5257/api/User/permission-sign`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },

    onSuccess: (data, variables) => {
      toast.success('عدم دسترسی به منو با موفقیت انجام شد');
      queryClient.invalidateQueries({
        queryKey: ['permission-sign-menus', variables.userId, token],
      });
    },
  });
};

export const useGetPermissionSignature = (id) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['permission-sign', id, token],
    queryFn: async () => {
      const res = await axios.get(
        `${API_HOST}:5257/api/User/${id}/permission-signs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: !!id && !!token,
  });
};

export const getMenuSignatureName = (id) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['permission-sign-menus', id, token],
    queryFn: async () => {
      const res = await axios.get(
        `${API_HOST}:5257/api/User/${id}/permission-sign-menus`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: !!id && !!token,
  });
};

export { useCreateUser, getUser, useEditUser, useDeleteUser, useUpdateUser };
