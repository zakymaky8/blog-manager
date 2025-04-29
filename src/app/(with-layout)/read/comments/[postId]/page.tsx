import { fetchPostsComments } from "@/actions/fetchsAction";
import DeleteButton from "@/app/_lib/DeleteButton";
import { TComment } from "@/app/_lib/type";
import Link from "next/link";


const CommentsPage = async ({ params }: { params: Promise<{ postId: string }> } ) => {

  const { postId } = await params;

  const { data:{ comments }  } = await fetchPostsComments(postId)

  return (
    <div className="flex flex-col gap-4 items-center min-w-[340px] my-10 flex-grow text-black">
      <h3 className="text-2xl font-bold mb-10 mt-14">Comments</h3>
        {
          comments.length > 0 ?
          comments.map((comment: TComment) => {
            return (
              <div key={comment.comments_id} className="flex flex-col w-[360px] sm:w-[520px] md:w-[620px] max-w-[750px] p-3 px-5 rounded bg-slate-950 gap-6 text-white" style={{maxWidth: "550px"}}>

                <p className="pt-1 text-md italic mb-2">{comment.content}</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap flex-col items-stretch sm:flex-row">
                      <Link href={`/user/${comment.user_id}`} className="hover:bg-slate-900 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-800 text-white" >Author</Link>
                      <Link href={`/read/comments/${postId}/likes/${comment.comments_id}`} className="hover:bg-slate-900 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-800 text-white" >Likes</Link>
                      <Link href={`/read/comments/${postId}/dislikes/${comment.comments_id}`} className="hover:bg-slate-900 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-800 text-white" >Dislikes</Link>
                      <Link href={`/read/comments/${postId}/replies/${comment.comments_id}`} className="hover:bg-slate-900 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-800 text-white" >Replies</Link>
                  </div>
                  <div className="self-end">
                    <DeleteButton type="comment" replyId="" postId={postId} commentId={comment.comments_id}/>
                  </div>
                </div>
              </div>
            )
          }) : <span className="opacity-70 italic">No Comment Found</span>
        }
    </div>

  )
}

export default CommentsPage