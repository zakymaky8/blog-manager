"use client"

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { likeCommentAction, likePostAction, likeReplyAction } from "@/actions/likeActions";
import { FaRegThumbsUp } from "react-icons/fa";

const LikeButton = ({type, postId, bg, commentId, replyId} : {
    type: string,
    postId: string,
    bg: string,
    commentId: string,
    replyId: string
  }) => {
    const router = useRouter()

    const actionWrapper = async () => {
        return type === "post" ?
          await likePostAction(postId) :
        type === "comment" ?
          await likeCommentAction(postId, commentId) :
          await likeReplyAction(postId, commentId, replyId)
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
            <FaRegThumbsUp size={20} color={`${bg}`} />
            </button>
    </form>
  )
}

export default LikeButton