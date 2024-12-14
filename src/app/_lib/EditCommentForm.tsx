"use client"

import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { getTokenFromCookies } from "./utils"
import { usePathname, useRouter } from "next/navigation"


const EditCommentForm = ({content, setIsEditMode, postId, commentId, type, replyId}:
     {
        setIsEditMode: Dispatch<SetStateAction<boolean>>,
        postId: string,
        commentId:string,
        type: string,
        replyId: string,
        content: string
}) => {
    const router = useRouter()
    const pathname = usePathname()
    const [editValue, setEditValue] = useState(content)
    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const token = getTokenFromCookies()
        const formData = new FormData(e.target as HTMLFormElement);
        const commentData = {
            content: formData.get("content")
        }
        const url = type === "comment" ? `http://localhost:3456/posts/${postId}/comments/${commentId}/update_content` :
                                        `http://localhost:3456/posts/${postId}/comments/${commentId}/replies/${replyId}/update_content`;

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(commentData)
        })
        if (!res.ok) {
            alert("unable to edit")
            router.replace('/admin-login')
            setIsEditMode(false)
        } else {
            router.replace(pathname)
            setIsEditMode(false)
        }
    }
  return (
    <form 
        onSubmit={handleSubmit} //consider unchanged cancel
        className="flex mt-1 mb-1"
        >
        <textarea
            name="content"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            id="content"
            className="h-fit w-fit resize-none  bg-slate-400 pl-1 text-green-950"
        
        ></textarea>

        {editValue === content ?
            <span onClick={() => setIsEditMode(false)} className="bg-black cursor-pointer text-white text-[13px] h-fit p-1 rounded-none">cancel</span> : 
            <button type="submit" className=" rounded-none h-fit w-50px text-[13px]">Edit</button>
        }
        
    </form>
  )
}

export default EditCommentForm