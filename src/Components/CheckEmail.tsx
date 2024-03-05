// After successful signup, redirect to this component
import React from "react";
import { Link } from "react-router-dom";

const VerifyEmailPage = () => {
  return (
    <div className="flex justify-center w-full h-full min-h-screen poppins-regular bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800">
      <div className="lg:px-80 md:px-40 max-sm:px-4 w-full z-10 my-auto py-8">
        <div className="py-4 gap-2 relative rounded-[20px] overflow-hidden border-4 filter ">
          <div className="pl-12 py-4">
            <p className="ml-8 text-gray-300 poppins-medium text-xl">
              Email Verification
            </p>
            <p className="ml-8 text-gray-300 poppins-medium">
              Please check your email for a verification link.
            </p>
            <Link to="/">
              <p className="ml-8 text-cyan-400 poppins-medium">
                Return to Home
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
