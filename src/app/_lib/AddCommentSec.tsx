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
        className="mb-6 flex justify-center flex-wrap items-center p-2 gap-2">
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text" name="content" id="addcomment" className="max-w-[200px] text-white pl-2 pr-2 h-8 bg-slate-600 rounded-[2px]" placeholder="add your comment ..." required/>
            <button type="submit" className="h-8 text-white text-[12px] hover:opacity-70 w-16">Add</button>
</form>
  )
}

export default AddCommentSec