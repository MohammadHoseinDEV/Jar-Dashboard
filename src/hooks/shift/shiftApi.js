import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../API/api';

const BASE_API = `${API_HOST}:5257/api/Shift`;

const useGetShifts = () => {
  const { token } = useSelector((state) => state.auth);

  const getShifts = useQuery({
    queryKey: ['shifts', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getShifts;
};

const useShiftsAssignments = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const shiftAssignment = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/assignments`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['shifts', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام عملیات');
    },
  });
  return shiftAssignment;
};

const useUnAssignShift = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const useUnAssign = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/unassign`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('شیفت با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['users'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['shifts'], exact: false });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام عملیات');
    },
  });
  return useUnAssign;
};

const useShiftTransfer = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const shiftTransfer = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/transfer`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['shifts', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام عملیات');
    },
  });
  return shiftTransfer;
};

export {
  useGetShifts,
  useShiftsAssignments,
  useShiftTransfer,
  useUnAssignShift,
};
