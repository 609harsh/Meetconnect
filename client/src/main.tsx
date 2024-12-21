import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signin from "./pages/Signin.tsx";
import Forgot from "./pages/Forgot.tsx";
import Profile from "./pages/Profile.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Resources from "./pages/Resources.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import KanbanBoard from "./pages/Kanban/Kanban.tsx";
import Tracker from "./components/Tracker/Tracker.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

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
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/profile/:username",
    element: <Profile />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/tracker",
    element: (
      <PrivateRoute>
        <Tracker />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
        transition={Bounce}
      />
    </Provider>
  </StrictMode>
);
