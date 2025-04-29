"use client"

import { FaRegThumbsDown } from "react-icons/fa"
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { dislikeCommentAction, dislikePostAction, dislikeReplyAction } from "@/actions/dislikeActions";

const DislikeButton = ({type, postId, bg, commentId, replyId} : {
    type: string,
    postId: string,
    bg: string,
    commentId: string,
    replyId: string
  }) => {

    const router = useRouter()

    const actionWrapper = async () => {
      return type === "post" ?
        await dislikePostAction(postId) :
      type === "comment" ?
        await dislikeCommentAction(postId, commentId) :
        await dislikeReplyAction(postId, commentId, replyId)
  }

    const [state, formAction] = useActionState(actionWrapper, {  success: "", message: "", redirectUrl: ""})

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
        action={formAction}
        className=""
        style={{boxShadow: "0px 0px 0px 0px "}}>
            <button type="submit" className="bg-slate-300 p-0 w-fit">
                <FaRegThumbsDown color={`${bg}`} size={20} />
            </button>
    </form>
  )
}

export default DislikeButton