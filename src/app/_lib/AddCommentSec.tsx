"use client"

import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react";
import { TComment } from "./type";
import { createCommentAction } from "@/actions/createComment";

const AddCommentSec = ({postId}: {postId: string}) => {
    const router = useRouter();
    const [value, setValue] = useState("");

    const actionWrapper = async (prev: { success: boolean, message: string, redirectUrl: string | null, comment: TComment }, formData: FormData) => {
        return await createCommentAction(postId, formData)
    }
    const [ state, formAction ] = useActionState(actionWrapper, { success: "", message: "", redirectUrl: "", comment: null })

    if (!state.success && !["", null].includes(state.redirectUrl)) {
        router.replace(state.redirectUrl!)
    } else if (state.success === false) {
        alert(state.message)
    }
    useEffect(() => {
        if (state.success === true) {
            setValue("")
            router.refresh();
        }
        state.success = ""
    }, [state, router]);
  return (
    <form
        action={formAction}
        className="mb-6 flex flex-col justify-center flex-wrap items-center p-2 gap-1">
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                name="content"
                id="addcomment"
                className="w-full text-white pt-2 px-2 h-20 bg-slate-600 rounded resize-none border-[2px] border-gray-900"
                placeholder="Add your comment ..."
                required
            ></textarea>
            <button
                type="submit"
                disabled={!value}
                className={`h-7 ${!value ? "bg-gray-500" : "bg-[#1f1f1f] hover:bg-black"} text-[#d2cfcf] text-[14px] w-14 self-end`}
                    >Add
            </button>
    </form>
  )
}

export default AddCommentSec