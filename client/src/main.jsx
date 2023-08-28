import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Oneword from './oneword_ans/oneword.jsx';
import Correct_ans from './correct_ans/Correct_ans.jsx';
import axios from "axios";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "oneword",
    element: <Oneword/>,
  },
  {
    path: "correctans",
    element: <Correct_ans/>
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <RouterProvider router={router} />
);
