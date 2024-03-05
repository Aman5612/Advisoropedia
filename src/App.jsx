import Home from "./Components/Home";
import SignUpPage from "./Components/SignUpPage";
import CheckEmail from "./Components/CheckEmail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import VerificationPage from "./Components/Verification";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/check-email", element: <CheckEmail /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/verify/:token", element: <VerificationPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
