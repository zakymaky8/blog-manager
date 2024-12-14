import React from 'react'
import {  TAuthor, TComment, TReply, TReplyActor } from './CommentCard'
import SingleReply from './SingleReply'

const Replies = ({commentReply, replyActorPairs, comment, postId, currentUser}: {commentReply: TReply[], replyActorPairs: TReplyActor[], comment: TComment, postId: string, currentUser: TAuthor}) => {
    function findReplyActorPairs(replierId:string, repliedId:string) {
        const actors = replyActorPairs.find(actors => actors.replier.users_id === replierId && actors.replied_to.users_id === repliedId)
        return actors;
      }

  return (
    commentReply.length ? <details className='ml-10 mt-1'>
        {commentReply.length !==0  &&
        <summary  className='cursor-pointer text-[13px] italic -ml-6 opacity-80'>Replies: {commentReply.length}</summary>}

        {commentReply.map(reply => {

            return <SingleReply
                            currentUser = {currentUser}
                            postId={postId}
                            comment = {comment}
                            authorname={findReplyActorPairs(reply.user_id, reply.replied_id)}
                            key={reply.replies_id}
                            reply={reply} />
            })}
    </details> : <span className='text-[10px] text-slate-600 opacity-70 float-end m-2'>0 replies</span>
  )
}

export default Replies