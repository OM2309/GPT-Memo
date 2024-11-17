import SearchBar from "../components/SearchBar";
import FolderComponent from "../components/Folder";
import AddButton from "../components/AddButton";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "@/utils/api";
import { useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["getAllFolder", searchTerm],
    queryFn: () => getApi(`/folder/get-all-folder?searchTerm=${searchTerm}`),
  });

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    refetch();
  };

  return (
    <div className="m-4 space-y-4">
      <div>
        <SearchBar onSearch={handleSearch} placeholderName={"Search Folder"} />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 p-4">
        <FolderComponent folderData={data} />
      </div>
      <div>
        <AddButton
          refetch={refetch}
          buttonName="Add Folder"
          apiEndPoint="/folder/create-folder"
        />
      </div>
    </div>
  );
};

export default Home;
