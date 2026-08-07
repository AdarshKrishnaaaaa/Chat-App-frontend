import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full Name is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      toast.error("Valid email is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character",
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center px-4">
        <div className="p-8 rounded-2xl w-full max-w-md space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <img
              src="./logo.png" // Replace with the actual path to your logo
              alt="Logo"
              className="w-8 h-8" // You can adjust the width and height as needed
            />
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <h1 className="text-2xl font-bold">Create Account</h1>
          </div>
          <p className="text-base-content/50 text-center text-sm">
            Get started with your free account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-10">
            {/* Full Name */}
            <div className="relative mb-5">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content" />
              <input
                type="text"
                placeholder="Full Name"
                className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="relative mb-5">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content" />
              <input
                type="email"
                placeholder="Email"
                className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="relative mb-5">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 pr-10 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-base-content"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-accent py-2 rounded-xl hover:bg-base-content hover:text-accent transition"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-base-content">
            Already have an account?{" "}
            <Link to={"/login"} className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
