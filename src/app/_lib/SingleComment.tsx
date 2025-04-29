"use client"

import LikeButton from "./LikeButton"
import ReplyButton from "./ReplyButton"
import editBtn from "../../../public/edit_icon.svg"
import Image from "next/image"
import DeleteButton from "./DeleteButton"
import { useState } from "react"
import EditCommentForm from "./EditCommentForm"
import ReplyForm from "./ReplyForm"
import { TAuthor, TComment } from "./type"
import Link from "next/link"
import DislikeButton from "./DislikeButton"

type TProps = {
    commentIsLiked: boolean,
    commentAuthor: TAuthor | undefined,
    comment: TComment,
    currentUser: TAuthor,
    authorname: TAuthor | undefined,
    postId: string,
    commentIsDisLiked: boolean
}


const SingleComment = ({commentIsLiked, commentIsDisLiked, commentAuthor, comment, currentUser, authorname, postId}: TProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isReply, setIsReply] = useState(false)

  return (
    <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
        <h3><Link className="text-sm text-gray-600 hover:underline no-underline cursor-pointer" href={`/user/${comment.user_id}`}>@{authorname?.username}</Link></h3>
        {
        isEditMode ? <EditCommentForm content={comment.content} replyId="" type="comment" commentId = {comment.comments_id} postId={postId} setIsEditMode={setIsEditMode} /> : <p className="pt-1 text-xs italic mb-2">{comment.content}</p>
        }
        <div className="self-end flex gap-2 items-start">
            <div className="flex items-center gap-[2px]">
                <span className=" mr-1 text-red-900 font-extrabold rounded-xl px-[7px]">{comment.dislikes?.length}</span>
                <DislikeButton replyId="" bg={commentIsDisLiked ? "#ef4444" : "black"} postId={postId} type="comment" commentId={comment.comments_id} />
            </div>
            <div className="flex items-center gap-[2px]">
                <span className=" mr-1 text-red-900 font-extrabold rounded-xl px-[7px]">{comment.likes?.length}</span>
                <LikeButton replyId="" bg={commentIsLiked ? "#ef4444" : "black"} postId={postId} type="comment" commentId={comment.comments_id} />
            </div>
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