import React from 'react'
import './App.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Home from './page/Home'
import Users from './page/Users'
import User from './page/User'
import FetchPage from './page/FetchPage'
import FetchByQueryPage from './page/FetchByQueryPage'
import ReduxPage from './page/ReduxPage'

const queryClient = new QueryClient()
queryClient.setDefaultOptions({
  queries: {
    staleTime: Infinity, // 5*60*1000
    cacheTime: 2000, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  }
})

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/fetch">이전 방식 Fetch</Link></li>
                <li><Link to="/fetchquery">React Query 사용 Fetch</Link></li>
                <li><Link to="/redux-page">Redux Page</Link></li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/fetch" element={<FetchPage />} />
              <Route path="/fetchquery" element={<FetchByQueryPage />} />
              <Route path="/redux-page" element={<ReduxPage />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
  );
}

export default App
