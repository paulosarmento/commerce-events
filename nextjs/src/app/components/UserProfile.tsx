import Image from "next/image";
import React from "react";

export const UserProfile = () => (
  <div className="flex items-center space-x-4 text-sm font-light">
    <p className="hidden cursor-not-allowed lg:inline">Kids</p>
    <Image
      src="/profile.png"
      alt="profile"
      width={50}
      height={50}
      className="rounded cursor-pointer"
    />
  </div>
);
