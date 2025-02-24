"use client"

import {  Dispatch, SetStateAction, useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TReply } from "./type"
import { createReplyToCommentAction, createReplyToReplyAction } from "@/actions/createReply"


const ReplyForm = ({ postId, commentId, setIsReply, action, replyId}:
     {
        postId: string,
        commentId:string,
        setIsReply: Dispatch<SetStateAction<boolean>>,
        action: string,
        replyId: string
}) => {
    const [replyValue, setReplyValue] = useState("")
    const router = useRouter()

    const actionWrapper = async (prev: { success: boolean, message: string, redirectUrl: string | null, reply: TReply }, formData: FormData) => {
        return action === "to_comment" ?
                    await createReplyToCommentAction(postId, commentId, action, formData) :
                    await createReplyToReplyAction(postId, commentId, replyId, action, formData)
    }

    const [state, formStateAction] = useActionState(actionWrapper, { success: "", message: "", redirectUrl: "", reply: "" })

    if (!state.success && !["", null].includes(state.redirectUrl)) {
        router.replace(state.redirectUrl!)
    } else if (state.success === false) {
        alert(state.message)
    }

    useEffect(() => {
        if (state.success === true) {
            setIsReply(false)
            router.refresh();
        }
        state.success = ""
    }, [state, router, setIsReply]);

  return (
    <form
        action={formStateAction}
        className="flex mt-1 mb-1"
        >
        <textarea
            name="content"
            id="content"
            value={replyValue}
            onChange={(e)=> setReplyValue(e.target.value)}
            placeholder="reply comment"
            className="h-[40px]  w-fit resize-none  bg-slate-400 pl-1 text-green-950"

        ></textarea>
        {replyValue ? <button type="submit" className=" rounded-none h-fit w-50px text-[13px]">Reply</button>: 
        <span onClick={() => setIsReply(false)} className="bg-black cursor-pointer text-white text-[13px] h-fit p-1 rounded-none">cancel</span>
        }

    </form>
  )
}

export default ReplyForm