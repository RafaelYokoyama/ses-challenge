import { IoIosSearch } from 'react-icons/io'

interface SearchProps {
  search: string
  setSearch: (search: string) => void
  setPage: (page: number) => void
  isSearching?: boolean
}

const Search: React.FC<SearchProps> = ({
  search,
  setSearch,
  setPage,
  isSearching = false,
}) => {
  return (
    <div className="relative mb-8" data-testid="search-container">
      <input
        type="text"
        placeholder="Procurar por nome ou username"
        className="w-full border-b-[2px] border-[#9E9E9E] bg-gray-100 py-2 pl-5 text-sm focus:outline-none"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
      />

      {!search.trim() && !isSearching && (
        <span className="absolute right-3 top-2 text-gray-600">
          <IoIosSearch className="size-6" />
        </span>
      )}

      {isSearching && (
        <div className="absolute right-3 top-2">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#7E50CE]"></div>
            <span className="text-xs">Buscando...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
