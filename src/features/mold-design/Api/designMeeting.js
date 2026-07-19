import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
