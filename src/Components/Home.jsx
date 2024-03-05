// Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/IMG1.jpg"; // Replace with your actual image

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("/check-login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setLoading(false);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <section
            className="text-center bg-cover bg-center h-96 w-full"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="bg-black bg-opacity-50 p-8">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to Advisoropedia
              </h1>
              <p className="text-lg mb-8">
                Your trusted source for expert advice and knowledge. Explore a
                world of insights and learning.
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }} 
                className="bg-cyan-400 px-6 py-3 rounded-full text-lg font-semibold hover:bg-cyan-500 transition duration-300"
              >
                Logout
              </button>
            </div>
          </section>
          <section className="text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">Featured Content</h2>
            <p className="text-lg mb-8">
              Discover our curated collection of articles, tutorials, and more.
            </p>
            {/* Add dummy content or showcase featured items */}
          </section>
          {/* Additional content or sections can be added here */}
        </div>
      )}
    </div>
  );
};

export default Home;
