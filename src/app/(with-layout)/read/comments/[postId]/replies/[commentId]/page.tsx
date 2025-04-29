/* eslint-disable @next/next/no-img-element */
import { fetchCommentsReplies } from '@/actions/fetchsAction';
import Inconvienence from '@/app/_lib/Inconveinence';
import Pagination from '@/app/_lib/Pagination';
import { TReply } from '@/app/_lib/type';
import { redirect } from 'next/navigation';
import DeleteButton from '@/app/_lib/DeleteButton';
import Link from 'next/link';

const CommentsRepliesPage = async ({ params, searchParams }: { params: Promise<{commentId: string, postId: string}>, searchParams: Promise<{ page: number, limit: number }> }) => {
  const { commentId, postId } = await params;
  const { page, limit } = await searchParams;
  const {data, message, redirectUrl, success, meta} = await fetchCommentsReplies(postId, commentId, page, limit);

  if (!success && !["", null].includes(redirectUrl)) {
    redirect(redirectUrl!)
  }

  if (!success) {
    return <Inconvienence message={message} />
  }

  return (
      <div className="flex flex-col gap-4 items-center min-w-[340px] my-10 flex-grow text-black">
        <h3 className="text-2xl font-bold mb-10 mt-14">Replies directly to the comment</h3>
        <ul className="flex flex-col gap-1 items-center mb-40">
          {
            data.replies.length > 0 ?
            data.replies.map((reply: TReply) => {
              return (
                <div key={reply.replies_id} className="flex flex-col w-[360px] sm:w-[520px] md:w-[620px] max-w-[750px] p-3 px-5 rounded bg-slate-950 gap-6 text-white" style={{maxWidth: "550px"}}>

                  <p className="pt-1 text-md italic mb-2">{reply.content}</p>

                  <div className="flex justify-between items-center">
                    <Link href={`/user/${reply.user_id}`} className="hover:bg-slate-900 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-800 text-white" >Author</Link>
                    <div className="self-end">
                      <DeleteButton type="reply" replyId="" postId={postId} commentId={commentId}/>
                    </div>
                  </div>
                </div>
              )
            }) : <span className="opacity-70 italic">No reply found</span>
          }
        </ul>
        <Pagination
              type="reactions"
              currentPage={+meta.current_page}
              currentPageItems={+meta.current_page_items}
              itemsPerPage={+meta.items_per_page}
              totalPages={+meta.total_pages}
              totalItems={+meta.total_items}
              limit={limit? +limit : limit}
          />
    </div>

  )
}

export default CommentsRepliesPage