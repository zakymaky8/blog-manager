"use client"

import { useRouter, useSearchParams } from "next/navigation"
import IppSetting from "./IppSetting"

type TProps = {
  totalPages: number,
  totalItems: number,
  currentPageItems: number,
  currentPage: number,
  itemsPerPage: number,
  limit: number,
  type: string
}


const Pagination =
    ({
        totalPages,
        currentPage,
        currentPageItems,
        itemsPerPage,
        totalItems,
        limit,
        type
    }: TProps
    ) => {

      const params = useSearchParams()
      const urlParams = new URLSearchParams(params.toString())

      const router = useRouter()

      const handlePrevClick = () => {
          urlParams.set("page", `${currentPage > 1 ? currentPage - 1 : currentPage}`);
          const allParams = urlParams.toString()
          router.push(`?${allParams}`, { scroll: false })
      }

      const handleNextClick = () => {
          urlParams.set("page", `${currentPage < totalPages ? currentPage + 1 : currentPage}`);
          const allParams = urlParams.toString()
          router.push(`?${allParams}`, { scroll: false })
      }


  return (
    <div className="flex flex-col items-center gap-16 text-black mb-20">
      <div className="flex items-center gap-6">
        <button
          title="Previous Page"
          className={`${currentPage===1 ? "opacity-60 hover:opacity-60" : "opacity-100 hover:opacity-80"}`}
          disabled={currentPage===1}
          onClick={handlePrevClick}
            >👈
        </button>

        <div className="flex gap-5 items-center">

          {(currentPage === totalPages && currentPage-1 > 0) && <span className="font-extralight opacity-60 text-[13px]">{currentPage - 1}</span>}
          <span className="font-[1000] text-xl">{currentPage}</span>
          {currentPage < totalPages && <span className="font-extralight opacity-60 text-[13px]">{currentPage + 1}</span>}

        </div>
        <button
          title="Next page"
          className={`${(currentPage >= totalPages) ? "opacity-60 hover:opacity-60" : "opacity-100 hover:opacity-80"}`}
          disabled={currentPage>=totalPages}
          onClick={handleNextClick}
            >👉
        </button>
      </div>
      {/* { */}
          {/* type !== "post" && */}
          {/* <span className="text-[14px]">Total Pages:  {totalPages}</span> */}
      {/* } */}
      <IppSetting type={type} limit={limit} />
      {/* { */}
        {/* type === "post" && */}
      <div className="flex items-start gap-3 flex-wrap-reverse text-[12px]">
        <span>▶️ Total Items: { totalItems }</span>
        <span>▶️ Total Pages: { totalPages }</span>
        <span>▶️ Items Per Page: { itemsPerPage }</span>
        <span>▶️ Current Page Items: { currentPageItems }</span>
      </div>
      {/* } */}
    </div>
  )
}

export default Pagination