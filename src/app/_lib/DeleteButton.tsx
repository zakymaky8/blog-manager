"use client"

import Image from "next/image"
import deleteBtn from "../../../public/delete.svg"

const DeleteButton = ({postId, commentId}: {
    postId: string,
    commentId: string
}) => {
    
  return (
        <form className="w-fit" style={{boxShadow: "0px 0px 0px 0px "}}
            action={`http://localhost:3456/posts/${postId}/comments/${commentId}?_method=DELETE`}
            method="POST">
            <button type="submit" className="bg-slate-300 p-0">
                <Image title="delete comment" className="h-[20px] w-[20px]" src={deleteBtn} alt="delete button"/>
            </button>
        </form>
    )
}

export default DeleteButton