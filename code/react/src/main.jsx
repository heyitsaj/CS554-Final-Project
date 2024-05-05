import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import { createUploadLink } from 'apollo-upload-client'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

const apolloCache = new InMemoryCache()

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000', // Apollo Server is served from port 4000
  headers: {
    "keep-alive": "true",
    'Apollo-Require-Preflight': 'true'
  }
})

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)
