"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"


const Search = () => {
  const [key, setKey] = useState("");
  const params = useSearchParams()
  const router = useRouter()

  const urlParams = new URLSearchParams(params.toString())

  useEffect(() => {
    if (key === "") {
      urlParams.set("search", "");
      urlParams.set("page", "1");
      router.replace(`?${urlParams.toString()}`, {scroll: false})
    }
  }, [key])


  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    urlParams.set("search", key!)
    urlParams.set("page", "1")
    const allParams = urlParams.toString()
    router.push(`?${allParams}`, { scroll: false })
  }
  return (
    <div>
        <form onSubmit={handleSubmit} className="bg-slate-500 px-[14px] py-3">
            <div className="flex gap-2 items-center">
                <label htmlFor="key">Search </label>
                <input
                    className="w-44 bg-slate-700 focus:outline-none focus:border-gray-400 focus:border-[1px] rounded-sm pl-2 py-[10px] box-border text-white"
                    type="search"
                    name="key"
                    value = {key}
                    onChange={(e) => setKey(e.target.value)}
                    id="key"
                    placeholder="write your keyword"
                />
                <button className="hover:opacity-70 w-10 h-[38px]" type="submit">🔎</button>
            </div>
        </form>
    </div>
  )
}

export default Search