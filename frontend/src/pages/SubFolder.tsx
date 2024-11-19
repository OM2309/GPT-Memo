import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SubFolderComponent from "../components/SubFolder";
import { getApi } from "@/utils/api";
import SubFolderAddButton from "@/components/SubFolderAddButton";

const SubFolder = () => {
  const { folderSlug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["getSubFolder", folderSlug, searchTerm],
    queryFn: () =>
      getApi(
        `/sub-folder/get-subfolders-by-folder/${folderSlug}?searchTerm=${searchTerm}`
      ),
  });

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    refetch();
  };

  return (
    <div className="m-4 space-y-4">
      <div>
        <SearchBar
          onSearch={handleSearch}
          placeholderName={"Search Sub Folder"}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 p-4">
        <SubFolderComponent SubFolderData={data} />
      </div>
      <div>
        <SubFolderAddButton refetch={refetch} buttonName={"Add Sub Folder"} />
      </div>
    </div>
  );
};

export default SubFolder;
