"use client"

import Search from "@/app/_lib/Search"
import { useState } from "react"

const ToggleSearchBar = () => {

    const [ isOn, setIsOn ] = useState(false);

  return (
    <>
        <div className={`w-[75%] self-center ${isOn ? "block" : "hidden"}`} >
            <Search />
        </div>
        <span title={isOn ? "" : "search"} className={`bg-slate-900 absolute right-2 top-4 ${isOn ? 'text-[12px]' : 'text-[22px]'} p-[6px] rounded-[50%] cursor-pointer hover:opacity-80 text-white`} onClick={() => setIsOn(!isOn)}> {isOn ? "collapse" : "🔎"}</span>
    </>
  )
}

export default ToggleSearchBar