// VerificationPage.js

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerificationPage = () => {
  const { token } = useParams();
  const newToken = "Bearer " + token;
  const [verificationStatus, setVerificationStatus] = useState(null);
  const navigate = useNavigate();
  console.log(newToken);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/verify/${newToken}`
        );
        if (response) {
          console.log(response);
          const result = await response.json();
          setVerificationStatus(result.verificationStatus);

          localStorage.setItem("token", result.token);
        } else {
          console.log("erroe", response);
          setVerificationStatus("failed");
        }
      } catch (error) {
        console.error(error);
        setVerificationStatus("failed");
      }
    };

    verifyEmail();
  }, [token]);

  useEffect(() => {
    if (verificationStatus === "success") {
      navigate("/login");
    }
  }, [verificationStatus, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        {verificationStatus === "success" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-500">
              Email Verified!
            </h2>
            <p className="text-gray-400">
              Your email has been successfully verified. You can now login.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-500">
              Verification Failed!
            </h2>
            <p className="text-gray-400">
              Sorry, the verification link is invalid or expired.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
