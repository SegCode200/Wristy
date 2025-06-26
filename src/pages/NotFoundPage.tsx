// src/pages/NotFoundPage.tsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-7xl font-bold text-[#605CFF] mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-2">Oops! Page not found.</p>
        <p className="text-gray-500 mb-6">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
