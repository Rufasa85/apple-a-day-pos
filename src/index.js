import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import './css/index.css'
import App from './App'

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
)
