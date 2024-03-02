import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import IMG1 from "../assets/IMG1.jpg";
import "../index.css";

const SignUpPage = () => {
  const [visible, setVisible] = useState(false);

  const [firstHasContent, setFirstHasContent] = useState(false);
  const [lastHasContent, setLastHasContent] = useState(false);
  const [emailHasContent, setEmailHasContent] = useState(false);
  const [passwordHasContent, setPasswordHasContent] = useState(false);

  const handleInputChange = (event) => {
    const fieldName = event.target.id;
    switch (fieldName) {
      case "first-name":
        setFirstHasContent(event.target.value !== "");
        break;
      case "last-name":
        setLastHasContent(event.target.value !== "");
        break;
      case "email":
        setEmailHasContent(event.target.value !== "");
        break;
      case "password":
        setPasswordHasContent(event.target.value !== "");
        break;
      default:
        break;
    }
  };

  const handleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen poppins-regular bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800">
      <div className="py-5 lg:px-80 md:px-40 w-full z-10 ">
        <div className="py-4 gap-2 relative rounded-[20px] overflow-hidden border-4 filter  ">
          <img
            src={IMG1}
            alt="logo"
            width="150"
            height="150"
            className="absolute -z-10 object-cover w-full h-full top-0 left-0"
          />

          <div className="pl-12 py-4">
            <p className="ml-8  text-slate-800 poppins-medium md:text-sm lg:text-xl">
              Welcome!
            </p>
            <h1 className="text-[50px]  text-white text poppins-medium">
              Create new account
            </h1>
            <p className="ml-8  text-slate-800 poppins-medium">
              or{" "}
              <Link to="/">
                <span className="text-cyan-400">log in</span>
              </Link>{" "}
              if you already have an account
            </p>
            <section className="flex flex-col gap-5 ml-8 mt-6 w-[400px]">
              <form className="flex flex-col gap-2">
                <div className="flex gap-4 h-12 w-[400px]">
                  <div className="flex rounded-[20px] bg-slate-700 p-2 relative px-6 w-[200px]">
                    <label
                      htmlFor="first-name"
                      className={`absolute top-4 left-6  text-slate-400 w-[110px] transition-transform cursor-text ${
                        firstHasContent ? "-translate-y-3 text-xs" : ""
                      }`}
                    >
                      First Name
                    </label>
                    <input
                      id="first-name"
                      className=" bg-slate-700 focus:outline-none  text-white mt-2 poppins-medium w-[130px]"
                      type="text"
                      onChange={handleInputChange}
                    />
                    <AiOutlineUser
                      className=" text-white my-auto"
                      size="1.8rem"
                    />
                  </div>
                  <div className="flex rounded-[15px] bg-slate-700 p-2 relative px-6 w-[200px]">
                    <label
                      htmlFor="last-name"
                      className={`absolute top-4 left-6  text-slate-400 w-[110px] transition-transform cursor-text ${
                        lastHasContent ? "-translate-y-3 text-xs" : ""
                      }`}
                    >
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      className=" bg-slate-700 focus:outline-none  text-white mt-2 poppins-medium w-[130px]"
                      type="text"
                      onChange={handleInputChange}
                    />
                    <AiOutlineUser
                      className=" text-white my-auto"
                      size="1.8rem"
                    />
                  </div>
                </div>
                <span className="flex  rounded-[15px] bg-slate-700 p-2 pb-1 relative px-6  h-12 w-[420px]">
                  <label
                    htmlFor="email"
                    className={`absolute top-4 left-6  text-slate-400 transition-transform cursor-text ${
                      emailHasContent ? "-translate-y-3 text-xs" : ""
                    }`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className=" bg-slate-700 focus:outline-none  text-white mt-2 poppins-medium w-[400px]"
                    type="email"
                    onChange={handleInputChange}
                  />
                  <MdOutlineMail
                    className=" text-white my-auto"
                    size="1.8rem"
                  />
                </span>
                <span className="flex  rounded-[15px] bg-slate-700 p-2 pb-1 relative px-6 h-12 w-[420px]">
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
                    className=" bg-slate-700 focus:outline-none  text-white mt-2 poppins-medium w-[400px]"
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
                <button
                  type="submit"
                  className="bg-cyan-400 px-3 text-sm  p-4 rounded-full w-[150px] shadow-xxl text-white mt-4"
                >
                  Create account
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
