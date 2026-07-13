import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_HOST from '../../../API/api';

const BASE_API = `${API_HOST}:5257/api/EducationDegree`;

const useEducationDegrees = () => {
  const { token } = useSelector((state) => state.auth);

  const getEducationDegrees = useQuery({
    queryKey: ['education', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getEducationDegrees;
};

export { useEducationDegrees };
