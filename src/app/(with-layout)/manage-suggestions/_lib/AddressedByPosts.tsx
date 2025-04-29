"use client"

import { updateSuggToPostToSugg } from "@/actions/updateSuggestion";
import { TPost, TSuggestions } from "@/app/_lib/type";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const AddressedByPosts = ({posts, suggestion, setStatuss}: {posts: TPost[], suggestion: TSuggestions, setStatuss: Dispatch<SetStateAction<"PENDING" | "ADDRESSED" | "DENIED">>}) => {
    const [isOn, setIsOn] = useState(false);
    const router = useRouter();

    const handleChange = async (e:ChangeEvent<HTMLSelectElement>) => {
        const postId = e.target.value;
        const suggId = suggestion.suggns_id

        const { message, redirectUrl, success } = await updateSuggToPostToSugg(suggId, postId);

        if (success) {
            setIsOn(false)
            setStatuss("ADDRESSED")
            router.refresh()
        }

        if (!success && redirectUrl) {
            router.replace(redirectUrl)
            return;
        }
        if (!success) {
            alert(message)
            return;
        }
    }


  return (
    <>
        <button onClick={() => setIsOn(true)} className="text-[12px] py-1 px-2 text-yellow-500 hover:text-white">Addressed By</button>
        {
            isOn &&
            <div className="text-[14px] z-20 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 bg-slate-500 flex flex-col gap-6 shadow-md">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Set Post Limit: </label>
                    <input
                        type="number"
                        name="limit"
                        id="limit"
                        min={1}
                        className="max-w-[100px] p-[5px]"
                    />
                </div>
                <select onChange={handleChange} name="post_to_sugg_to_post" className=" bg-slate-300 rounded p-4">
                    <option value="" disabled selected>Select One</option>
                    {
                        posts?.map(post => {
                            return <option key={post.posts_id} value={post.posts_id}>{post.title.slice(0, 60)}</option>
                        })
                    }
                </select>
            </div>

        }

        <div
            onClick={()=>{
              setIsOn(false)
            }}
            className={`
                fixed right-0 top-0 w-screen z-10
                min-h-screen bg-[#07283e] opacity-80
                ${isOn ? "block" : "hidden"}
              `}>
        </div>

    </>
  )
}

export default AddressedByPosts