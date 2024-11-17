import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-10 w-full"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
          aria-label="Search"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
