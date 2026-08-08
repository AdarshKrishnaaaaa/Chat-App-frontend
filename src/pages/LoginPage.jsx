import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!formData.email) {
      toast.error("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate password
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }

    login(formData);
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
            <h1 className="text-2xl font-bold text-base-content">
              Welcome Back
            </h1>
          </div>
          <p className="text-base-content/50 text-center text-sm">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-10">
            {/* Email */}
            <div className="relative mb-5">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content" />
              <input
                type="email"
                placeholder="Email"
                className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-base-content"
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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-base-content">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-accent hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;
