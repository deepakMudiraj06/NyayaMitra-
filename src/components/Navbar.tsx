import { Link } from "react-router-dom";
import { Scale, LogIn, MessageSquare } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <Scale size={30} />
          NyayaMitra AI
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-gray-600 transition">
            Home
          </Link>

          <Link to="/about" className="hover:text-gray-600 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-gray-600 transition">
            Contact
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100 transition"
          >
            <LogIn size={18} />
            Login
          </Link>

          <Link
            to="/chat"
            className="flex items-center gap-2 bg-black text-white rounded-lg px-5 py-2 hover:bg-gray-800 transition"
          >
            <MessageSquare size={18} />
            Start Chat
          </Link>

        </div>

      </nav>
    </header>
  );
}

export default Navbar;