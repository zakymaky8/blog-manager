import Suggestions from "./_lib/Suggestions"
import { redirect } from "next/navigation"
import Pagination from "@/app/_lib/Pagination"
import { Metadata } from "next";
import { fetchAllSuggestions } from "@/actions/fetchsAction";


export  const metadata:Metadata = {
  title: "Suggestions"
}

const ManageSuggestionsPage = async ({searchParams}: { searchParams: Promise<{search: string, page: number, limit: number}> }) => {

  const { search, page, limit } = await searchParams;

  const { suggestions, success, redirectUrl, meta, users, message } = await fetchAllSuggestions(search, page, limit)

  if (!["", null].includes(redirectUrl) && !success) {
      redirect(redirectUrl!)
  }

  if (!success) {
    return <div className="text-center flex flex-col items-center p-10 text-black italic ">
              <p className="opacity-60">{message}!</p>
          </div>
  }

  return (
    <div className="self-center flex flex-col gap-6 mt-14">
      <h3 className="text-center text-2xl text-black">Manage Suggestions</h3>
      <Suggestions suggestions={suggestions} users={users} />
      <Pagination
          type="suggestion"
          currentPage={+meta.current_page}
          currentPageItems={+meta.current_page_items}
          itemsPerPage={+meta.items_per_page}
          totalPages={+meta.total_pages}
          totalItems={+meta.total_items}
          limit={limit? +limit : limit}
      />
    </div>
  )
}

export default ManageSuggestionsPage