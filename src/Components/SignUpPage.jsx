import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import IMG1 from "../assets/IMG1.jpg";
import IMG2 from "../assets/placeholder.jpg";
import "../index.css";
import { validationSchema } from "../lib/validations";

const SignUpPage = () => {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstHasContent, setFirstHasContent] = useState(false);
  const [emailHasContent, setEmailHasContent] = useState(false);
  const [passwordHasContent, setPasswordHasContent] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [errors, setValidationErrors] = useState({});
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [matchPassword, setMatchPassword] = useState(true);

  const handleInputChange = (event) => {
    const fieldName = event.target.id;
    switch (fieldName) {
      case "first-name":
        setFirstHasContent(event.target.value !== "");
        setValidationErrors({});
        break;
      case "email":
        setEmailHasContent(event.target.value !== "");
        setValidationErrors({});
        break;
      case "password":
        setPasswordHasContent(event.target.value !== "");
        setMatchPassword(true);
        setPassword(event.target.value);
        setValidationErrors({});
        break;
      case "confirm":
        setConfirmPassword(event.target.value !== "");
        setMatchPassword(true);
        setConfirm(event.target.value);
        setValidationErrors({});
        break;
      case "termsAndConditions":
        setTermsAndConditions(event.target.checked);
        break;
      default:
        break;
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleProfilePictureRemove = () => {
    setProfilePicture(null);
  };

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const handleVisibility2 = () => {
    setConfirmVisible(!confirmVisible);
  };

  const handleSubmit = (event) => {
    setSubmit(true);
    event.preventDefault();
    if (password !== confirm) {
      setMatchPassword(false);
      setSubmit(false);
    } else {
      const fecthData = async (event) => {
        try {
          const formData = validationSchema.parse({
            name: event.target[1].value,
            email: event.target[2].value,
            password: event.target[3].value,
            confirm: event.target[4].value,
            termsAndConditions: event.target[5].checked,
          });

          const response = await fetch(" http://localhost:3000/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profilePicture: profilePicture,
              name: formData.name,
              email: formData.email,
              password: formData.password,
            }),
          });
          setSubmit(false);

          if (response) {
            const url = new URL(response.url);
            const path = url.pathname;
            const query = url.search;

            if (path == "/login") {
              setTimeout(() => {
                alert("User already exist, please login");
                navigate(path);
              }, 500);
            } else {
              if (query) {
                localStorage.setItem("token", query);
              }
              navigate(path);
            }
          }
        } catch (error) {
          setSubmit(false);
          const validationErrors = error.errors;
          const errorMessages = {
            name: validationErrors.find((error) => error.path[0] === "name"),
            email: validationErrors.find((error) => error.path[0] === "email"),
            password: validationErrors.find(
              (error) => error.path[0] === "password"
            ),
            confirm: validationErrors.find(
              (error) => error.path[0] === "confirm"
            ),
          };
          setValidationErrors(errorMessages);
        }
      };
      fecthData(event);
    }
  };

  return (
    <div className="flex justify-center w-full h-full min-h-screen poppins-regular bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800">
      <div className=" lg:px-80 md:px-40 max-sm:px-4 w-full z-10  my-auto py-8">
        <div className="py-4 gap-2 relative rounded-[20px] overflow-hidden border-4 filter  ">
          <img
            src={IMG1}
            alt="logo"
            width="150"
            height="150"
            className="absolute -z-10 object-cover w-full h-full top-0 left-0"
          />

          <div className="pl-12 py-4">
            <p className="ml-8  text-gray-300 poppins-medium text-xl ">
              Welcome!
            </p>
            <h1 className="text-[50px] max-lg:text-[30px] max-sm:text-lg text-white text poppins-medium -mt-4">
              Create new account
            </h1>
            <p className="ml-8  text-gray-300 poppins-medium">
              or{" "}
              <Link to="/login">
                <span className="text-cyan-400">log in</span>
              </Link>{" "}
              if you already have an account
            </p>
            <form
              className="flex flex-col items-center md:ml-14 md:items-start gap-2 mr-12 "
              onSubmit={handleSubmit}
            >
              <div className="mt-8 flex flex-col w-[270px] items-center mb-4">
                <label htmlFor="profile-picture">
                  <img
                    className="h-20 w-20 rounded-full object-cover cursor-pointer border-2"
                    src={profilePicture ? profilePicture : IMG2}
                    alt="Profile"
                  />

                  <input
                    type="file"
                    id="profile-picture"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                </label>
                <p
                  className="text-slate-800 cursor-pointer mt-2 poppins-medium"
                  onClick={handleProfilePictureRemove}
                >
                  {profilePicture === null ? " " : "Remove"}
                </p>
              </div>
              <span className="flex rounded-[15px] bg-slate-700 relative h-12 px-6 ">
                <label
                  htmlFor="first-name"
                  className={`absolute top-4  left-6  max-sm:text-sm text-slate-400 transition-transform cursor-text ${
                    firstHasContent ? "-translate-y-3 text-xs " : ""
                  }`}
                >
                  Name
                </label>
                <input
                  id="first-name"
                  className=" bg-slate-700 focus:outline-none  text-white  poppins-medium "
                  type="text"
                  onChange={handleInputChange}
                />
                <AiOutlineUser
                  className=" text-white  my-auto "
                  size="1.8rem "
                />
              </span>
              <span className="text-red-600 ">
                {errors.name && `*${errors.confirm.message}`}
              </span>

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
                  onChange={(event) => {
                    handleInputChange(event);
                  }}
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
              <span className="text-red-600">
                {matchPassword ? " " : "*Password doesn't match"}
              </span>
              <span className="flex rounded-[15px] bg-slate-700 relative h-12 px-6">
                <label
                  htmlFor="confirm"
                  className={`absolute top-4 left-6  text-slate-400 transition-transform cursor-text ${
                    confirmPassword ? "-translate-y-3 text-xs" : ""
                  }`}
                >
                  Confirm Password
                </label>
                <input
                  id="confirm"
                  className=" bg-slate-700 focus:outline-none  text-white mt-2 poppins-medium "
                  type={confirmVisible ? "text" : "password"}
                  onChange={handleInputChange}
                />
                {confirmVisible ? (
                  <IoMdEye
                    className=" text-white my-auto"
                    size="1.8rem"
                    onClick={handleVisibility2}
                  />
                ) : (
                  <IoMdEyeOff
                    className=" text-white my-auto"
                    size="1.8rem"
                    onClick={handleVisibility2}
                  />
                )}
              </span>
              <span className="text-red-600">
                {errors.confirm && `*${errors.confirm.message}`}
              </span>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="termsAndConditions"
                  onChange={handleInputChange}
                />
                <label htmlFor="termsAndConditions" className="ml-2 text-white">
                  I accept the{" "}
                  <Link to={"#"} className="text-cyan-800">
                    terms & conditions
                  </Link>
                </label>
              </div>

              {termsAndConditions ? (
                <button
                  disabled={submit}
                  type="submit"
                  className={` px-3 text-sm  p-4 rounded-full  shadow-xl text-white mt-6 bg-cyan-400 ${
                    submit === true ? "cursor-not-allowed" : "cursor-pointer"
                  } `}
                >
                  {submit ? "Creating account..." : "Create account"}
                </button>
              ) : (
                <button
                  disabled={true}
                  type="submit"
                  className=" px-3 text-sm  p-4 rounded-full  shadow-xl text-white mt-6 bg-slate-400 "
                >
                  Create account
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
