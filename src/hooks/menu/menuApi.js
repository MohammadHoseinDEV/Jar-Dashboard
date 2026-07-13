import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_HOST from '../../../API/api';

export const useGetMenu = () => {
  const { token } = useSelector((state) => state.auth);

  const getMenu = useQuery({
    queryKey: ['menus', token],
    queryFn: async () => {
      const res = await axios.get(`${API_HOST}:5257/api/MyMenu`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getMenu;
};
