import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_API = `${API_HOST}:5258/api/Reports`;

export const useGetReportProducts = ({ search }) => {
  const { token } = useSelector((state) => state.auth);

  const getProducts = useQuery({
    queryKey: ['product', token, search],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/inventory/current`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search },
      });
      return res.data;
    },
    enabled: !!token,
  });
  return getProducts;
};
