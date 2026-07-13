import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import App from './App.jsx';
import Store from './app/Store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
    mutations: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          theme="dark"
          rtl
          transition={Zoom}
          toastStyle={{
            fontFamily: 'SamimBold, Vazir, sans-serif',
            fontSize: '16px',
          }}
        />
        <App />
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);
