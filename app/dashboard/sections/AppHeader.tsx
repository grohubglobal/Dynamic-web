import type React from "react";
import Image from "next/image";

export const AppHeader = () => (
  <div className="bg-gradient-to-r from-[#2B0A75] via-[#4B1F9B] to-[#601EF2] py-8 px-4 shadow-lg">
    <div className="flex justify-center items-center">
      <div className="flex items-center space-x-4">
        <Image
          src="/grohub-logo.png"
          width={160}
          height={160}
          alt="Grohub Logo"
          className="w-40 h-40 sm:w-36 sm:h-32 drop-shadow-lg"
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Grohub.
        </h1>
      </div>
    </div>
  </div>
);
