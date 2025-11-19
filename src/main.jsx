import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login.jsx";
import Signup from "./component/Signup.jsx";
import React from "react";
import Home from "./component/pages/Home.jsx";
import AuthLayout from "./component/AuthLayout.jsx";
import AllPosts from "./component/pages/AllPosts.jsx";
import AddPost from "./component/pages/AddPost.jsx";
import EditPost from "./component/pages/EditPost.jsx";
import Post from "./component/pages/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication={true}>
          
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication={true}>
   
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>

            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
);
