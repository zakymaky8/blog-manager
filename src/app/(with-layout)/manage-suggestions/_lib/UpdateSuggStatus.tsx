"use client"

import { updateSuggestionStatus } from "@/actions/updateSuggestion"
import { TSuggestions } from "@/app/_lib/type"
import { useRouter } from "next/navigation"
import { ChangeEvent, Dispatch, SetStateAction } from "react"

const UpdateSuggStatus = ({suggestion, statuss, setStatuss}: {suggestion: TSuggestions, statuss: "PENDING" | "ADDRESSED" | "DENIED", setStatuss: Dispatch<SetStateAction<"PENDING" | "ADDRESSED" | "DENIED">> }) => {
  const router = useRouter()

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setStatuss(e.target.value as (typeof statuss))
    if (suggestion.postsToSugg.length === 0 && e.target.value === "ADDRESSED") {
      return alert("There is no post associated with this suggestion!");
    }
    const { message, success, redirectUrl } = await updateSuggestionStatus(suggestion.suggns_id, e.target.value);
    if (success) {
      return router.refresh()
    }
    else if (!success && redirectUrl) {
      return router.replace(redirectUrl)
    }
    alert(message)
  }
  return (
    <div className="text-[14px] flex gap-2 items-center flex-wrap justify-center">
      <label htmlFor="">Mark As</label>
      <select name="" id="" className={`rounded py-[2px] ${suggestion.status === "ADDRESSED" ? "bg-green-500" : suggestion.status === "PENDING" ? "bg-yellow-500" : "bg-red-500"}`} value={statuss} onChange={handleChange}>
        <option value="PENDING" className="text-yellow-800">Pending</option>
        <option value="ADDRESSED" className="text-green-800">Addressed</option>
        <option value="DENIED" className="text-red-800">Denied</option>
      </select>
    </div>
  )
}

export default UpdateSuggStatus