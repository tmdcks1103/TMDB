import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}> 
        <App/>
        {/* 페이지 내 고정 패널 형태로 Devtools 사용 */}
        {/* <div style={{ position: 'flex', bottom: 0, right: 0, width: '400px', height: '300px', zIndex: 1000 }}>
          <ReactQueryDevtoolsPanel />
        </div> */}
      </QueryClientProvider>
    </StrictMode>,
  )