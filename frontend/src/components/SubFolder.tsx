import { useState } from "react";
import { Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubFolder({ SubFolderData }: any) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleFolderClick = (slug: string) => {
    navigate(`${slug}`);
  };

  return (
    <>
      {SubFolderData?.data?.data?.map((SubFolderData: any, index: number) => (
        <div
          key={index}
          className="group relative w-32 h-32 cursor-pointer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleFolderClick(SubFolderData.slug)}
        >
          <div
            className={`absolute inset-0 bg-purple-600 rounded-lg transition-all duration-300 ease-in-out ${
              hoveredIndex === index
                ? "opacity-100 scale-105 blur-sm"
                : "opacity-70 scale-100 blur-none"
            }`}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-blue-500 rounded-lg opacity-75"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <Folder
              className={`w-12 h-12 text-white transition-all duration-300 ${
                hoveredIndex === index ? "scale-110" : "scale-100"
              }`}
            />
            <span className="mt-2 text-xs font-bold text-white text-center break-words w-full">
              {SubFolderData?.subfolderName}
            </span>
          </div>
          <div
            className={`absolute inset-0 border-2 border-white rounded-lg transition-all duration-300 ${
              hoveredIndex === index
                ? "opacity-100 scale-105"
                : "opacity-0 scale-100"
            }`}
          ></div>
        </div>
      ))}
    </>
  );
}
