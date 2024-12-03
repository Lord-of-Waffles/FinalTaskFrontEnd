import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './components/Home';
import Customers from './components/Customers';
import Training from './components/Training';
import Calendar from './components/Calendar';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customers",
        element: <Customers />
      },
      {
        path: "training",
        element: <Training />
      },
      {
        path: "calendar",
        element: <Calendar />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);