"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type TProps = {
    type: string,
    limit: number
}

const IppSetting = ({type, limit}: TProps) => {
    const params = useSearchParams()
    const router = useRouter()

    const urlParams = new URLSearchParams(params.toString())

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        urlParams.set("limit", e.target.value)
        urlParams.set("page", "1")
        const allParams = urlParams.toString()
        router.push(`?${allParams}`, { scroll: false })
    }
    const posIpp = [2, 4, 6, 8, 12, 16, 20];

  return (
    <div className="flex flex-col gap-2 text-[14px]">
        <label htmlFor="ipp">Items Per Page</label>
        <select
            name="ipp"
            id="ipp"
            onChange={handleChange}
            className="bg-slate-700 text-white p-1 rounded cursor-pointer"
            defaultValue={limit ? `${limit}` : type==="post" ? "6" : type === "suggestion" ? "4" : "8"}
            >
            {posIpp.map((i) =><option key={i} value={i}>{i}</option>)}
        </select>
    </div>
  )
}

export default IppSetting