import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signin from "./pages/Signin.tsx";
import Home from "./pages/Home.tsx";
import Forgot from "./pages/Forgot.tsx";
import Profile from "./pages/Profile.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Resources from "./pages/Resources.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
