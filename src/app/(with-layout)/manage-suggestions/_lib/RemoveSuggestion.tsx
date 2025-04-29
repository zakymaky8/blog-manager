"use client"

import { deleteSuggestionAction } from "@/actions/removeSuggestion";
import { TSuggestions } from "@/app/_lib/type"
import { useRouter } from "next/navigation";
import { useState } from "react"


const RemoveSuggestion = ({ suggestion }: { suggestion: TSuggestions } ) => {
    const [isModalShow, setIsModalShow] = useState(false);
    const router = useRouter();
    async function handleDeletion(){
        const { message, redirectUrl, success }  = await deleteSuggestionAction(suggestion.suggns_id);
        if (success === true) {
            setIsModalShow(false)
            router.refresh()
        }
        if (success == false && !["", null].includes(redirectUrl)) {
            router.replace(redirectUrl!)
        }
        if (success === false ) {
            alert(message)
        }
    }

  return (
    <>
        <button onClick={() => setIsModalShow(true)} className="hover:text-white py-1 px-2 w-max text-[13px] bg-red-700 text-red-200">delete</button>
        {
            isModalShow &&
            <div
                className= {`fixed top-1/2 md:top-1/2 left-1/2 -translate-x-1/2
                    -translate-y-1/2 bg-slate-700 rounded
                    shadow-lg text-white p-6 flex flex-col gap-4 z-20`}
                    >
                <p className="italic text-[15px]">Are you sure you wanted to delete this suggestion?</p>
                <div className="flex justify-between gap-6 text-[15px] items-center">
                    <button onClick={() => setIsModalShow(false)} className="px-5 bg-transparent hover:opacity-70">Close</button>
                    <button onClick={handleDeletion}  className="bg-transparent text-red-500 px-5 hover:opacity-70">Delete</button>
                </div>
            </div>
        }
            <div
                onClick={()=>{
                    setIsModalShow(false)
                }}
                className={`
                    fixed right-0 top-0 w-screen z-10
                    min-h-screen bg-[#07283e] opacity-50
                    ${isModalShow ? "block" : "hidden"}
                    `}>
            </div>
    </>
  )
}

export default RemoveSuggestion