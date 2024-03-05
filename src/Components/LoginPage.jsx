import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import IMG1 from "../assets/IMG1.jpg";
import "../index.css";

const LoginPage = () => {
  const [visible, setVisible] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [emailHasContent, setEmailHasContent] = useState(false);
  const [passwordHasContent, setPasswordHasContent] = useState(false);
  const [errors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const fieldName = event.target.id;
    switch (fieldName) {
      case "email":
        setEmailHasContent(event.target.value !== "");
        setValidationErrors({});
        break;
      case "password":
        setPasswordHasContent(event.target.value !== "");
        setPassword(event.target.value);
        setValidationErrors({});
        break;
      default:
        break;
    }
  };

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setSubmit(true);
      const email = event.target.email.value;
      const password = event.target.password.value;
      const data = { email, password };
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await fetch("http://localhost:3000/login-token", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          setSubmit(false);
          navigate("/");
          return;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        setSubmit(false);
        navigate("/");
      } else {
        console.error("Authentication failed");
        setSubmit(false);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="flex justify-center w-full h-full min-h-screen poppins-regular bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800">
      <div className="lg:px-80 md:px-40 max-sm:px-4 w-full z-10  my-auto py-8">
        <div className="py-4 gap-2 relative rounded-[20px] overflow-hidden border-4 filter  ">
          <img
            src={IMG1}
            alt="logo"
            width="150"
            height="150"
            className="absolute -z-10 object-cover w-full h-full top-0 left-0"
          />

          <div className="pl-12 py-4">
            <p className="ml-8 text-gray-300 poppins-medium text-xl ">
              Welcome back!
            </p>
            <h1 className="text-[50px] max-lg:text-[30px] max-sm:text-lg text-white text poppins-medium -mt-4">
              Login to your account
            </h1>
            <p className="ml-8 text-gray-300 poppins-medium">
              Don&apos;t have an account?{" "}
              <Link to="/signup">
                <span className="text-cyan-400">Sign up here</span>
              </Link>
            </p>
            <form
              className="flex flex-col items-center md:ml-14 md:items-start gap-2 mr-12 "
              onSubmit={handleSubmit}
            >
              <span className="flex rounded-[15px] bg-slate-700 relative h-12 px-6 ">
                <label
                  htmlFor="email"
                  className={`absolute top-4 left-6   text-slate-400 transition-transform cursor-text ${
                    emailHasContent ? "-translate-y-3 text-xs" : ""
                  }`}
                >
                  Email
                </label>
                <input
                  id="email"
                  className=" bg-slate-700 focus:outline-none  text-white  poppins-medium "
                  type="email"
                  onChange={handleInputChange}
                />
                <MdOutlineMail className=" text-white my-auto" size="1.8rem" />
              </span>
              <span className="text-red-600">
                {errors.email && `*${errors.confirm.message}`}
              </span>
              <span className="flex rounded-[15px] bg-slate-700 relative h-12 px-6">
                <label
                  htmlFor="password"
                  className={`absolute top-4 left-6  text-slate-400 transition-transform cursor-text ${
                    passwordHasContent ? "-translate-y-3 text-xs" : ""
                  }`}
                >
                  Password
                </label>
                <input
                  id="password"
                  className=" bg-slate-700 focus:outline-none  text-white mt-2 poppins-medium "
                  type={visible ? "text" : "password"}
                  onChange={handleInputChange}
                />
                {visible ? (
                  <IoMdEye
                    className=" text-white my-auto"
                    size="1.8rem"
                    onClick={handleVisibility}
                  />
                ) : (
                  <IoMdEyeOff
                    className=" text-white my-auto"
                    size="1.8rem"
                    onClick={handleVisibility}
                  />
                )}
              </span>
              <span className="text-red-600">
                {errors.password && `*${errors.confirm.message}`}
              </span>
              <button
                disabled={submit}
                type="submit"
                className={`bg-cyan-400 px-3 text-sm  p-4 rounded-full  shadow-xl text-white mt-6 ${
                  submit === true ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {submit ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
