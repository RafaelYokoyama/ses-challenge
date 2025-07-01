import { IoIosSearch } from 'react-icons/io'

interface SearchProps {
  search: string
  setSearch: (search: string) => void
  setPage: (page: number) => void
}

const Search: React.FC<SearchProps> = ({ search, setSearch, setPage }) => {
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
      <span className="absolute right-3 top-2 text-gray-600">
        <IoIosSearch className="size-6 " />
      </span>
    </div>
  )
}
export default Search
