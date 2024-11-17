"use client";

import { useState } from "react";
import { Folder, ChevronRight } from "lucide-react";

export default function FolderComponent({
  folderName = "Notes",
  color = "#4A5568",
}: {
  folderName?: string;
  color?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex items-center justify-start w-full max-w-[200px] h-10 cursor-pointer px-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Folder className="w-5 h-5 mr-2" style={{ color: color }} />
      <span className="text-sm font-medium text-gray-700 flex-grow truncate">
        {folderName}
      </span>
      <ChevronRight
        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
          isHovered ? "translate-x-1 opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
