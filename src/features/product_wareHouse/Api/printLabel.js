import { useSelector } from 'react-redux';
import API_HOST from '../../../../API/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `${API_HOST}:5259/api/LineChangeAnnouncementForms`;
const Base_Api = `${API_HOST}:5258/api`;

export const useActiveProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const updateProducts = useMutation({
    mutationFn: async ({ id, isActive }) => {
      const res = await axios.put(
        `${BASE_API}/${id}/is-active`,
        { isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('محصول جدید با موفقیت فعال شد');
      queryclient.invalidateQueries({ queryKey: ['lineChange', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در فعال سازی محصول جدید');
    },
  });
  return updateProducts;
};

export const usePrintNormalLabels = () => {
  const { token } = useSelector((state) => state.auth);

  const postReport = useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(`${Base_Api}/Labels/preview`, form, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      return res.data;
    },
    onSuccess: (blob) => {
      const fileURL = URL.createObjectURL(blob);

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = fileURL;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      };

      setTimeout(() => {
        document.body.removeChild(iframe);
        URL.revokeObjectURL(fileURL);
      }, 10000);

      toast.success('لیبل با موفقیت ارسال شد');
    },
    onError: () => {
      toast.error('خطا در چاپ لیبل');
    },
  });
  return postReport;
};
