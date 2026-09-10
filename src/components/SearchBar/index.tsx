import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "../../assets/Icons/searchIcon.svg?react";

import { Icon } from "../Icon";
import { InputText } from "../InputText";

interface SearchBarProps {
  className?: string;
  onSearch?: () => void;
}

export function SearchBar({ className = "", onSearch }: SearchBarProps) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  function handleSearch() {
    const value = search.trim();

    if (!value) {
      return;
    }

    navigate(`/produtos?search=${encodeURIComponent(value)}`);

    setSearch("");

    onSearch?.();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  }

  return (
    <div className={className}>
      <InputText
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
        className="h-12 w-full min-w-0"
        iconPosition="right"
        placeholder="Buscar produtos, categorias ou artigos"
        icon={
          <button
            type="button"
            onClick={handleSearch}
            aria-label="Pesquisar"
            className="flex items-center justify-center"
          >
            <Icon svg={SearchIcon} />
          </button>
        }
      />
    </div>
  );
}
