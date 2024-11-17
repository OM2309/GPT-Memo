"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import debounce from "lodash/debounce";

export default function SearchBar({ onSearch }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = debounce((term: string) => {
    console.log("Searching for:", term);
    onSearch(term);
  }, 500);

  // Handle the change in the input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form className="w-full max-w-md relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-muted-foreground w-4 h-4 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-10 w-full"
          value={searchTerm}
          onChange={handleInputChange} // Use the handleInputChange function here
          aria-label="Search"
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 h-7 w-7 px-0 text-muted-foreground hover:text-foreground"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
