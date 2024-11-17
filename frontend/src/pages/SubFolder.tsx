import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SubFolderComponent from "../components/SubFolder";
import AddButton from "../components/AddButton";
import { getApi } from "@/utils/api";

const SubFolder = () => {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["getSubFolder", slug, searchTerm],
    queryFn: () =>
      getApi(
        `/sub-folder/get-subfolders-by-folder/${slug}?searchTerm=${searchTerm}`
      ),
  });

  console.log(data);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    refetch();
  };

  return (
    <div className="m-4 space-y-4">
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 p-4">
        <SubFolderComponent SubFolderData={data} />
      </div>
      <div>
        <AddButton refetch={refetch} />
      </div>
    </div>
  );
};

export default SubFolder;
