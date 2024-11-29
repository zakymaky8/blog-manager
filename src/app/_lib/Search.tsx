const Search = () => {
  return (
    <div>
        <form action="/somewhere" method="POST">
            <div className="flex gap-1 items-center">
                <label htmlFor="key">Search: </label>
                <input
                    className="w-32 bg-slate-400 rounded-lg p-1 box-border"
                    type="search"
                    name="key"
                    id="key"
                    placeholder="search in blog"
                />
                <button type="submit">🔎</button>
            </div>
        </form>
    </div>
  )
}

export default Search