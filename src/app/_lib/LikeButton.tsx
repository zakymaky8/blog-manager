"use client"

import Image from "next/image";
import likeBtn from "../../../public/like.svg"

const LikeButton = ({type} : {
    type: string
  }) => {
  return (
    <form action={type==="post" ? `http://localhost:3456/posts/:postId/:action : posts/:postId/comments/:commentId/:action`: ''}
           method="POST"
           className="flex items-center w-fit"
           style={{boxShadow: "0px 0px 0px 0px "}}>
        <span className="text-[16px] mr-1">0</span>
        <button type="submit" className="bg-slate-300 p-0 w-fit">
            <Image title="like" src={likeBtn} alt="like button"  className="h-[22px] w-[22px] rounded-[50%]"/>
        </button>
    </form>
  )
}

export default LikeButton