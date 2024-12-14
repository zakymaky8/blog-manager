"use client"

import LikeButton from "./LikeButton"
import ReplyButton from "./ReplyButton"
import editBtn from "../../../public/edit_icon.svg"
import Image from "next/image"
import DeleteButton from "./DeleteButton"
import { TAuthor, TComment } from "./CommentCard"
import { useState } from "react"
import EditCommentForm from "./EditCommentForm"
import ReplyForm from "./ReplyForm"

type TProps = {
    commentIsLiked: boolean,
    commentAuthor: TAuthor | undefined,
    comment: TComment,
    currentUser: TAuthor,
    authorname: TAuthor | undefined,
    postId: string
}


const SingleComment = ({commentIsLiked, commentAuthor, comment, currentUser, authorname, postId}: TProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    // const [value, setValue] = useState(comment.content)
    const [isReply, setIsReply] = useState(false)

  return (
    <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
        <h1 className="text-sm text-gray-600 hover:underline cursor-pointer">@{authorname?.username}</h1>
        {
        isEditMode ? <EditCommentForm content={comment.content} replyId="" type="comment" commentId = {comment.comments_id} postId={postId} setIsEditMode={setIsEditMode} /> : <p className="pt-1 text-xs italic mb-2">{comment.content}</p>
        
        }
        <div className="self-end flex gap-2 items-start">
            <span className="text-[16px] mr-1">{comment.likes?.length}</span>
            <LikeButton replyId="" bg={commentIsLiked ? "bg-red-500" : "bg-none"} postId={postId} type="comment" commentId={comment.comments_id} />
            <ReplyButton setIsReply = {setIsReply}/>
            {
            currentUser.users_id === commentAuthor?.users_id &&
            <button onClick={() => setIsEditMode(true)}  type="submit" className="bg-slate-300 p-0 w-fit">
                <Image title="edit comment" src={editBtn} alt="edit button"  className="h-[20px] w-[20px] rounded-[50%]"/>
            </button>
            }
            <DeleteButton type="comment" replyId="" postId={postId} commentId={comment.comments_id}/>
        </div>
        {isReply && <ReplyForm replyId="" action="to_comment" commentId={comment.comments_id} postId={postId} setIsReply={setIsReply} />
        }
  </div>
  )
}

export default SingleComment