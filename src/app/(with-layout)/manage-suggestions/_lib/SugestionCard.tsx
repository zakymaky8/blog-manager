/* eslint-disable @next/next/no-img-element */

import { TAuthor, TSuggestions } from "@/app/_lib/type"
import { cap, decideWhichFormat } from "@/app/_lib/utils"
import Link from "next/link"

import pp from  "../../../../../public/person_icon.svg"
import RemoveSuggestion from "./RemoveSuggestion"
import { fetchPublishedPosts } from "@/actions/fetchsAction"
import StatusAddressWrap from "./StatusAddressWrap"

const SugestionCard = async ({suggestion, user}: {suggestion: TSuggestions, user: TAuthor}) => {
    const { message, posts, success } = await fetchPublishedPosts(1, 999114, "");
    if (!success) {
        return message
    }
    return (
        <div
            className={`gap-3 bg-[#c8daff] min-h-fit max-h-max text-[#111827] relative
                        rounded-md px-7 flex flex-col py-3 pb-4 max-w-[700px] mx-6
                        ${suggestion.priority === "HIGH" ? "border-green-500 border-l-[10px]" : suggestion.priority === "MEDIUM" ? "border-yellow-600 border-l-[10px]" : "border-red-500 border-l-[10px]"}
                        `}
            style={{boxShadow: "inset 0 0 18px 0 #111827"}}>
            <div className={`flex justify-between items-center gap-6 mt-2`}>
                {suggestion.isVisible ?
                <div className="flex gap-2 items-center">
                    <img src={user.profilePic ? JSON.parse(user.profilePic).secure_url : pp.src} alt="profile picture" className="w-12 h-12 rounded-[50%]" />
                    <h3 className="m-1">{cap(user.firstname??"--") + " " + cap(user.lastname ?? "--")}</h3>
                </div> :
                <span className="opacity-70 italic my-2">Anonymouse User</span>
                }
                <StatusAddressWrap posts={posts} suggestion={suggestion} />
            </div>
            <div className="flex flex-col gap-0">
            <p className="text-[15px]">{ suggestion.content }</p>
            </div>
            <div className="flex justify-between gap-6 items-end flex-wrap">
                <div className="flex gap-4 text-[12px] italic opacity-80">
                    <span>Created: { decideWhichFormat(suggestion.createdAt) }</span>
                    {suggestion.createdAt !== suggestion.updatedAt &&  <span className="text-green-600">Updated: {decideWhichFormat(suggestion.updatedAt)}</span>}
                </div>
                <div className="flex gap-2 items-end">
                    <RemoveSuggestion suggestion={suggestion} />
                    { suggestion.status === "PENDING" &&
                    <Link target="_blank" href={`/create?refer=suggestion&suggestion_id=${suggestion.suggns_id}`}><button className="text-yellow-500 hover:text-white py-1 px-2 w-max text-[13px]">Address</button></Link> }
                </div>
            </div>
        </div>

    )

}

export default SugestionCard


