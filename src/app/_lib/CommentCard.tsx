// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SingleComment from "./SingleComment";
import Replies from "./Replies";
import { fetchPostsComments } from "@/actions/fetchsAction";
import { TPageProps } from "./type";
import Pagination from "./Pagination";
import ToggleSearchBar from "./ToggleSearchBar";

export type TAuthor = {
    users_id: string,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    Role: string
}

export type TComment = {
    content: string;
    createdAt: Date;
    lastUpdate: Date;
    likes: string[];
    dislikes: string[];
    user_id: string;
    comments_id: string;
    post_id: string;
}

export type TReply = {
  content: string;
  user_id: string;
  replies_id: string;
  comment_id: string;
  replied_id: string;
  likes: string[]
}

export type TReplyActor = {
  replier: TAuthor,
  replied_to: TAuthor
}

const CommentsCard = async ({ postId, searchParams }: {postId: string, searchParams: TPageProps["searchParams"]}) => {

    const { search, limit, page } = await searchParams;
    const { data:{ comments, authors, currentUser, replies, replyActorPairs, totalComments }, redirectUrl, success, meta  } = await fetchPostsComments(postId, search, page, limit)
  
    if (!["", null].includes(redirectUrl) && !success) {
      redirect(redirectUrl!)
    }
    function findAuthor(id: string) {
      const authr = authors.find((author:TAuthor) => author.users_id === id);
      return authr
    }


  return (
    <div className="flex flex-col">
      <div className="bg-slate-200 p-3 rounded-xl max-w-[450px] min-w-[350px] relative">
        <ToggleSearchBar />
        <h2 className="font-bold text-xl mb-5">Comments: {totalComments}</h2>
          {comments.length ?
          comments.map((comment:TComment) => {
              const commentIsLiked = comment.likes.includes(currentUser.users_id) ? true : false;
              const commentAuthor = findAuthor(comment.user_id);
              const thisCommentReply = replies.filter((reply:TReply) => reply.comment_id === comment.comments_id) || null;
              const commentIsDisLiked = comment.dislikes.includes(currentUser.users_id) ? true : false
              return (
                  <div key={comment.comments_id} className="flex flex-col gap-3">
                    <SingleComment
                      comment={comment}
                      commentAuthor={commentAuthor}
                      commentIsLiked={commentIsLiked}
                      currentUser={currentUser}
                      authorname = {findAuthor(comment.user_id)}
                      postId= {postId}
                      commentIsDisLiked={commentIsDisLiked}
                    />

                    <Replies
                      currentUser={currentUser}
                      postId={postId}
                      comment={comment}
                      replyActorPairs={replyActorPairs}
                      commentReply={thisCommentReply} />

                    <hr className="border-[1px] border-black opacity-20"/>

                </div>
              )
          }) : <p className="text-center mt-10 opacity-70 text-[14px]">No comments yet!</p> }
      </div>
      <div className="mt-20">
        <Pagination
            type="comments"
            currentPage={+meta.current_page}
            currentPageItems={+meta.current_page_items}
            itemsPerPage={+meta.items_per_page}
            totalPages={+meta.total_pages}
            totalItems={+meta.total_items}
            limit={limit? +limit : limit}
        />

      </div>
    </div>
  )
}

export default CommentsCard