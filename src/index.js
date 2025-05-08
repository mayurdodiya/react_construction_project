import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Login from "./components/Login";

// set router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ]
  },
  // {
  //   path: "/login",
  //   element: <Login/>,
  // },
  // {
  //   path: "/signin",
  //   element: <Login />,
  // },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
