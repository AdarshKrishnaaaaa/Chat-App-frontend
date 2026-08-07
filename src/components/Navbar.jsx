import React, { useState } from 'react'
import { MessageSquare, Settings, User, LogOut, Menu } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="text-base-content px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center space-x-2">
            <img
              src="./logo.png"  // Replace with the actual path to your logo
              alt="Logo"
              className="w-8 h-8"  // You can adjust the width and height as needed
            />
            <span className="font-semibold text-lg">HelloWorld</span>
          </div>
        </Link>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/settings" className="flex items-center space-x-1 cursor-pointer hover:text-accent transition">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="flex items-center space-x-1 cursor-pointer hover:text-accent transition">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <button className='flex gap-2 items-center cursor-pointer hover:text-error transition' onClick={logout}>
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-6 h-6 text-base-content" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4">
          <Link to={"/settings"} className="hover:text-blue-400" onClick={() => setIsMobileMenuOpen(false)}>
            <Settings className="inline w-5 h-5 mr-2" /> Settings
          </Link>
          {authUser && (
            <>
              <Link to={"/profile"} className="hover:text-blue-400" onClick={() => setIsMobileMenuOpen(false)}>
                <User className="inline w-5 h-5 mr-2" /> Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-left hover:text-red-400 flex items-center"
              >
                <LogOut className="inline w-5 h-5 mr-2" /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar;
