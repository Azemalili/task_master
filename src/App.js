import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Myday from './pages/Myday';
import Priority from './pages/Priority';
import Layout from './components/Layout';

function App() {



  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/Myday',
          element: <Myday />
        },
        {
          path: '/Priority',
          element: <Priority />
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
