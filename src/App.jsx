import Home from "./Components/Home";
import SignUpPage from "./Components/SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <SignUpPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
