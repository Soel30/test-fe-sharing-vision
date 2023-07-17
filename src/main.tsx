import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './assets/css/argon-dashboard-tailwind.min.css'
import './assets/css/perfect-scrollbar.css'
import {
  createBrowserRouter,
  Form,
  RouterProvider,
} from "react-router-dom";
import AddNew from './page/AddNew.tsx'
import EditPosts from './page/EdiPost.tsx'
import Home from './page/Home.tsx'
import ViewPost from './page/ViewPost.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/posts",
    element: <App />,
  },
  {
    path: "/posts/add-new",
    element: <AddNew />,
  }, {
    path: "/post/edit/:id",
    element: <EditPosts />,
  }, {
    path: "/post/:id",
    element: <ViewPost />,
  }
]);


// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('root')!;

document.body.classList.add('m-0', 'font-sans', 'text-base', 'antialiased', 'font-normal', 'leading-default', 'bg-gray-50', 'text-slate-500')
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
link.rel = 'stylesheet'
document.head.appendChild(link)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);