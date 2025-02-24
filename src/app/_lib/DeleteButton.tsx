"use client"

import Image from "next/image"
import deleteBtn from "../../../public/delete.svg"
import {  useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { deleteCommentAction } from "@/actions/deleteComment"
import { deleteReplyAction } from "@/actions/deleteReply"

const DeleteButton = ({postId, commentId, type, replyId}: {
    postId: string,
    commentId: string,
    type: string,
    replyId: string
}) => {
    const router = useRouter()

    const actionWrapper = async () => {
        return type === "comment" ?
            await deleteCommentAction(postId, commentId) :
            await deleteReplyAction(postId, commentId, replyId)
    }


    const [ state, formAction ] = useActionState(actionWrapper, { success: "", message: "", redirectUrl: "", comment: "" } )

    if (!["", null].includes(state.redirectUrl)) {
        router.push(state.redirectUrl!)
    }
    if(state.success === false && state.redirectUrl === null ) {
        alert(state.message)
    }

    useEffect(() => {
        if (state.success === true) {
            router.refresh();
        }
        state.success = ""
    }, [state, router]);
  return (
        <form
            className="w-fit" style={{boxShadow: "0px 0px 0px 0px "}}
            action={formAction}
            >
            <button type="submit" className="bg-slate-300 p-0">
                <Image title="delete comment" className="h-[20px] w-[20px]" src={deleteBtn} alt="delete button"/>
            </button>
        </form>
    )
}

export default DeleteButton