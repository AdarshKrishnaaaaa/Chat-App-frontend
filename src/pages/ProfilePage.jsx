import React, { useState } from "react";
import { BadgeCheck, CalendarDays, Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    setIsUploading(true);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen text-white px-6 py-12 flex justify-center items-start">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold text-base-content">Profile</h1>
        <p className="text-base-content/60">Your profile information</p>

        <div className="relative w-40 h-40 mx-auto">
          <img
            src={selectedImg || authUser?.profilePic || "/default-img.png"}
            alt="Profile"
            className="rounded-full w-full h-full object-cover border-4 border-accent shadow-md"
          />

          {/* Upload Button */}
          <label
            htmlFor="profileUpload"
            className={`absolute bottom-2 right-2 bg-accent p-2 rounded-full cursor-pointer transition-all duration-300 ${
              isUploading || isUpdatingProfile
                ? "animate-pulse"
                : "hover:scale-110"
            }`}
          >
            <Camera className="w-5 h-5 text-base" />
            <input
              id="profileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploading || isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-sm text-base-content/60">
          {isUploading
            ? "Uploading..."
            : "Click the camera icon to update your photo"}
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 gap-1 text-base-content">
            <User className="w-5 h-5 text-base-content" />
            Full Name
          </div>
          <p className="text-base-content px-4 py-2.5 rounded-lg border text-left border-accent-content">
            {authUser?.fullName}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 gap-1 text-base-content">
            <Mail className="w-5 h-5 text-base-content" />
            Email
          </div>
          <p className="text-base-content px-4 py-2.5 rounded-lg border text-left border-accent-content">
            {authUser?.email}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-start text-lg font-semibold text-base-content">
            Account Information
          </p>

          {/* Member Since */}
          <div className="flex items-center gap-2 text-warning">
            <CalendarDays className="w-5 h-5 text-warning" />
            <span>
              Member since {new Date(authUser.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Account Status */}
          <div className="flex items-center gap-2 text-success font-medium">
            <BadgeCheck className="w-5 h-5 text-success" />
            <span>Account Status: Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
