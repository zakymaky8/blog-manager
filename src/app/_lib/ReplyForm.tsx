"use client"

import {  Dispatch, FormEvent, SetStateAction, useState } from "react"
import { getTokenFromCookies } from "./utils"
import { usePathname, useRouter } from "next/navigation"


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
    const pathname = usePathname()

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const token = getTokenFromCookies()

        const formData = new FormData(e.target as HTMLFormElement);
        const commentData = {
            content: formData.get("content")
        }
        const url = (action === "to_comment") ?
                `http://localhost:3456/posts/${postId}/comments/${commentId}/replies/${action}`:
                `http://localhost:3456/posts/${postId}/comments/${commentId}/replies/${replyId}/${action}`;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(commentData)
        })
        if (!res.ok) {
            setIsReply(false)
            alert("unable to REPLY")
            
        } else {
            setIsReply(false)
            router.replace(pathname);
            // if (replyValue)setIsReply(false)
        }
    }
  return (
    <form
        onSubmit={handleSubmit}
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