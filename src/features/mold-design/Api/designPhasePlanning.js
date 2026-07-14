import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_API = `${API_HOST}:5271/api/DesignPhasePlanningForm`;

export const useGetDesignPhasePlanning = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['phase', token, search, page, pageSize],
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

export const useGetAllDesignPhasePlanning = () => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['phase', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReport;
};
