const SearchItem = ({ search, setSearch }) => {
  return (
    <form className="searchForm" onClick={(e) => e.preventDefault()}>
      <label htmlFor="searchItem">Search</label>
      <input
        type="text"
        id="searchItem"
        placeholder="Search Item"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
