"use client"

import Image from "next/image"
import deleteBtn from "../../../public/delete.svg"
import { FormEvent } from "react"
import { getTokenFromCookies } from "./utils"
import { usePathname, useRouter } from "next/navigation"

const DeleteButton = ({postId, commentId, type, replyId}: {
    postId: string,
    commentId: string,
    type: string,
    replyId: string
}) => {
    const router = useRouter()
    const pathname = usePathname()

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const confirmed = confirm("Confirm?");

        if (confirmed) {
            const token = getTokenFromCookies()
            const url = type === "comment" ? 
                    `http://localhost:3456/posts/${postId}/comments/${commentId}` :
                    `http://localhost:3456/posts/${postId}/comments/${commentId}/replies/${replyId}`
            const res = await fetch (url, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            if (!res.ok) {
                alert("unable to delete")
            } else {
                router.replace(pathname, {scroll: false})
            }
        } else {
            alert("Action regressed!")
        }
    }
  return (
        <form
            className="w-fit" style={{boxShadow: "0px 0px 0px 0px "}}
            onSubmit={handleSubmit} >
            <button type="submit" className="bg-slate-300 p-0">
                <Image title="delete comment" className="h-[20px] w-[20px]" src={deleteBtn} alt="delete button"/>
            </button>
        </form>
    )
}

export default DeleteButton