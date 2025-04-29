import CommentsCard from '@/app/_lib/CommentCard';
import LikeButton from '@/app/_lib/LikeButton';
import TogglePublish from '@/app/_lib/TogglePublish';
import Image from 'next/image';
import editbBtn from "../../../../../public/edit_icon.svg"
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DeletePostBtn from '@/app/_lib/DeletePostBtn';
import AddCommentSec from '@/app/_lib/AddCommentSec';
import { cap } from '@/app/_lib/utils';
import { fetchSinglePost } from '@/actions/fetchsAction';
import { TPageProps, TSuggestions } from '@/app/_lib/type';
import Inconvienence from '@/app/_lib/Inconveinence';


import DislikeButton from "@/app/_lib/DislikeButton";




export async function generateMetadata({ params }: TPageProps) {
  const { postId } = await params;
  const { data, message, success } = await fetchSinglePost(postId);
  if (!success ) return { title: message}
  else {
    return {title: data.post.title}
  }
}

const PostDetail = async ({params, searchParams}: TPageProps) =>  {
    const { postId } = await params;

    const { success, data, redirectUrl, status, message } = await fetchSinglePost(postId)

    if (!success && redirectUrl !== null) {
      return redirect(redirectUrl)
    }

    if (!success && status === 404) {
      return <Inconvienence message={message} />
    }

    if (!success) {
      console.log("bad thng", status)
    }

    const {post, author, currentUser, suggestions} = data
    const postIsLiked = post.likes.includes(currentUser.users_id) ? true : false;
    const postIsDisLiked = post?.dislikes?.includes(currentUser.users_id) ? true : false;

    return (
      <div className="text-black flex flex-col w-full items-center gap-5 p-5 flex-auto">
        <div className="flex flex-col gap-3 max-w-[600px]">
          <div className='flex flex-col justify-between gap-6 items-center' >
            <div className='flex gap-2 items-end'>
              <TogglePublish action={post.status === "DRAFT" ? "Publish" : "Unpublish"} postId={postId} />
              <button type="submit" className="bg-slate-300 p-0">
                <Link href={`/update/${post.posts_id}`} className="bg-slate-300 p-0">
                  <Image title="edit post" className="h-[20px] w-[20px]" src={editbBtn} alt="edit button"/>
                </Link>
              </button>
              <DeletePostBtn postId={post.posts_id} />
            </div>
            <h2 className="text-2xl font-bold" style={{maxWidth: "450px"}}>{post.title.toUpperCase()[0] + post.title.slice(1,)}</h2>


          </div>
          <div className="flex gap-4 justify-start text-[10px] italic flex-wrap">
            <p>Author: {`${cap(author.firstname)} ${cap(author.lastname)}`}</p>
            <p> Creation time: {(new Date(post.createdAt.split("T")[0])).toLocaleDateString() + ' ' + post.createdAt.split("T")[1].split(".")[0]}</p>
            <p> Last update: {post.lastUpdate.split("T")[0] + ' ' + post.lastUpdate.split("T")[1].split(".")[0]}</p>
          </div>
        </div>

        <div className="p-4">
          <div className="text-justify max-w-[600px] rounded-xl bg-[#d1e2f3] px-6 p-3 py-8 border-y-[10px] text-[14px] border-slate-800" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.status === "PUBLISHED" &&
        <div className='flex gap-1 items-center w-fit'>
            <div className="flex gap-5 items-center">
              <div className="flex gap-2 items-center">
                <span className="text-[14px] -mt-1 cursor-pointer">{post.dislikes?.length}</span>
                <DislikeButton commentId="" replyId="" bg={postIsDisLiked ? "#ef4444" : "black"} type='post' postId={postId}/>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-[14px] -mt-1 cursor-pointer">{post.likes?.length}</span>
                <LikeButton commentId="" replyId="" bg={postIsLiked ? "#ef4444" : "black"} type='post' postId={postId}/>
              </div>
            </div>
            <span className="text-[14px] italic opacity-75 ml-4">{post.views.length} view{post.views.length > 1 ? "s" : ""}</span>


        </div> }


        {
          suggestions.length > 0 &&
          <div className='self-center max-w-[600px] mt-10'>
            <h3 className='font-bold text-[16px]'>Suggestions to the post</h3>
            <ul>
              {suggestions.map((sugg: TSuggestions) => {
                return <li className="text-[14px] italic opacity-80" key={sugg.suggns_id}>{sugg.content}</li>
              })}
            </ul>
          </div>
        }

        {post.status === "PUBLISHED" ? (
            <>
                <hr className="w-full border-[1px] border-black opacity-50"/>
                <div>
                    <AddCommentSec postId={postId} />
                    <CommentsCard postId={postId} searchParams={searchParams} />
                </div>
            </>

        ) : <span className='text-green-500'>Unpublished post !</span>
        }
      </div>
    )
}

export default PostDetail
