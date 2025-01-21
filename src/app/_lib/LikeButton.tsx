"use client"

import Image from "next/image";
import likeBtn from "../../../public/like.svg"
import { FormEvent } from "react";
import { getTokenFromCookies } from "./utils";
import { usePathname, useRouter } from "next/navigation";

const LikeButton = ({type, postId, bg, commentId, replyId} : {
    type: string,
    postId: string,
    bg: string,
    commentId?: string,
    replyId: string
  }) => {
    const router = useRouter()
    const pathname = usePathname()
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const token = getTokenFromCookies();
      try {
        const url = type === "post" ?
               `http://localhost:3456/posts/${postId}?action=like_unlike` :

               type === "comment" ?
                `http://localhost:3456/posts/${postId}/comments/${commentId}?action=like_unlike` :
                `http://localhost:3456/posts/${postId}/comments/${commentId}/replies/${replyId}?action=like_unlike`
        const res = await fetch(url, {
          method: "PUT",
          headers: { "authorization": `Bearer ${token}` }
        })
        if (!res.ok) {
          alert("unable to like!")
        } else {
          router.replace(pathname, {scroll: false})
        }
      } catch {
        throw new Error("")
      }
    }
  return (
    <form
        onSubmit={handleSubmit}
        className=""
        style={{boxShadow: "0px 0px 0px 0px "}}>
            <button type="submit" className="bg-slate-300 p-0 w-fit">
              <Image title="like" src={likeBtn} alt="like button"  className={`h-[22px] w-[22px] rounded-[50%] ${bg}`}/>
            </button>
    </form>
  )
}

export default LikeButton