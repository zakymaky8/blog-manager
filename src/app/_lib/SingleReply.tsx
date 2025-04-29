"use client"

import editBtn from "../../../public/edit_icon.svg"
import Image from "next/image"
import ReplyButton from "./ReplyButton"
import { useState } from "react"
import ReplyForm from "./ReplyForm"
import LikeButton from "./LikeButton"
import EditCommentForm from "./EditCommentForm"
import DeleteButton from "./DeleteButton"
import { TAuthor, TComment, TReply, TReplyActor } from "./type"
import Link from "next/link"
import DislikeButton from "./DislikeButton"


type TProps = {
    reply: TReply,
    authorname: TReplyActor | undefined,
    comment: TComment,
    postId: string,
    currentUser: TAuthor
}


const SingleReply = ({reply, authorname, comment, postId, currentUser}: TProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isReply, setIsReply] = useState(false)
    const replyIsLiked = reply.likes.includes(currentUser.users_id) ? true : false
    const replyIsDisLiked = reply.dislikes.includes(currentUser.users_id) ? true : false

  return (
    <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
        <h3><Link className="text-[12px] text-gray-600 hover:underline no-underline cursor-pointer" href={`/user/${reply.user_id}/`}>@{authorname?.replier.username}</Link></h3>
        <h3 className="text-[9px]">
            <span className="opacity-70 text-black">Replied to </span>
            <Link className="text-gray-600 no-underline hover:underline cursor-pointer" href={`/user/${reply.replied_id}/`}>@{authorname?.replied_to.username}</Link>
        </h3>

        {isEditMode ?
            <EditCommentForm
                content = {reply.content}
                replyId={reply.replies_id}
                type="reply"
                commentId = {comment.comments_id}
                postId={postId}
                setIsEditMode={setIsEditMode}/>
                 :
             <p className="pt-1 text-[10px] italic">{reply.content}</p> }

        <div className="self-end flex gap-2 items-start">
            <div className="flex items-center gap-[2px]">
                <span className="text-[13px] mr-1 font-extrabold text-red-900">{reply.dislikes?.length}</span>
                <DislikeButton replyId={reply.replies_id} bg={replyIsDisLiked ? '#ef4444' : 'black'} postId={postId} type="reply" commentId={comment.comments_id} />
            </div>

            <div className="flex items-center gap-[2px]">
                <span className="text-[13px] mr-1 font-extrabold text-red-900">{reply.likes?.length}</span>
                <LikeButton replyId={reply.replies_id} bg={replyIsLiked ? '#ef4444' : 'black'} postId={postId} type="reply" commentId={comment.comments_id} />
            </div>
            <ReplyButton setIsReply={setIsReply}/>
            {
             currentUser.users_id === authorname?.replier.users_id &&
            <button type="submit" onClick={() => setIsEditMode(true)} className="bg-slate-300 p-0 w-fit">
                <Image title="edit comment" src={editBtn} alt="edit button"  className="h-[20px] w-[20px] rounded-[50%]"/>
            </button>
            }
            <DeleteButton replyId={reply.replies_id} type="reply" postId={postId} commentId={comment.comments_id}/>
        </div>
         {isReply && <ReplyForm action="to_reply" replyId={reply.replies_id} commentId={comment.comments_id} postId={postId} setIsReply={setIsReply} />}
  </div>
  )
}

export default SingleReply