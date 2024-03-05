// Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/IMG1.jpg";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Simulating login check
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Simulating API call to check login status
        // In a real app, you would call your server here
        // and handle the response accordingly
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLoading(false);
        fetchPosts(1); // Initial fetch of posts for the first page
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const fetchPosts = async (page) => {
    try {
      // Simulating API call to fetch posts
      // In a real app, replace this with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy data for posts
      const dummyPosts = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        title: `Post ${index + 1}`,
        body: `This is the body of post ${index + 1}.`,
      }));

      setPosts(dummyPosts);
      setTotalPages(3); // Simulating 3 pages for demonstration
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchPosts(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <section
            className="text-center bg-cover bg-center h-96 w-full relative"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 p-8">
              <motion.h1
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Welcome to Advisoropedia
              </motion.h1>
              <motion.p
                className="text-lg mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Your trusted source for expert advice and knowledge. Explore a
                world of insights and learning.
              </motion.p>
              <button
                onClick={handleLogout}
                className="bg-cyan-400 px-6 py-3 rounded-full text-lg font-semibold hover:bg-cyan-500 transition duration-300"
              >
                Logout
              </button>
            </div>
          </section>
          <section className="text-center mt-12">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Featured Content
            </motion.h2>
            {/* Render posts */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {posts.map((post) => (
                <motion.li
                  key={post.id}
                  className="bg-gray-700 p-4 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-400">{post.body}</p>
                </motion.li>
              ))}
            </ul>
            {/* Pagination controls */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="bg-cyan-400 px-4 py-2 rounded-full text-lg font-semibold mr-4 hover:bg-cyan-500 transition duration-300"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-cyan-400 px-4 py-2 rounded-full text-lg font-semibold ml-4 hover:bg-cyan-500 transition duration-300"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
