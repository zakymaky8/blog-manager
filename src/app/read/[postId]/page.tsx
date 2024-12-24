import CommentsCard from '@/app/_lib/CommentCard';
import LikeButton from '@/app/_lib/LikeButton';
import TogglePublish from '@/app/_lib/TogglePublish';
import Image from 'next/image';
import React from 'react'
import editbBtn from "../../../../public/edit_icon.svg"
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DeletePostBtn from '@/app/_lib/DeletePostBtn';
import AddCommentSec from '@/app/_lib/AddCommentSec';
import { cap } from '@/app/_lib/utils';

const PostDetail = async ({params}: {
    params: {
        postId: string
    }
  }) => {
    const { postId } = await params;
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    
      const res = await fetch(`http://localhost:3456/posts/${postId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) {
        redirect("/admin-login")
      }
      const { data } = await res.json();
      const [post, author, currentUser] = data
      const postIsLiked = post.likes.includes(currentUser.users_id) ? true : false
      

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
            <h1 className="text-2xl font-bold" style={{maxWidth: "450px"}}>{post.title.toUpperCase()[0] + post.title.slice(1,)}</h1>


          </div>
          <div className="flex gap-4 justify-start text-[10px] italic flex-wrap">
            <p>Author: {`${cap(author.firstname)} ${cap(author.lastname)}`}</p>
            <p> Creation time: {(new Date(post.createdAt.split("T")[0])).toLocaleDateString() + ' ' + post.createdAt.split("T")[1].split(".")[0]}</p>
            <p> Last update: {post.lastUpdate.split("T")[0] + ' ' + post.lastUpdate.split("T")[1].split(".")[0]}</p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-justify max-w-[600px] rounded-xl bg-[#d1e2f3] px-6 p-3 py-8 border-y-[10px] text-[14px] border-slate-800" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        {post.status === "PUBLISHED" &&
        <div className='flex gap-1 items-center w-fit'>
            <span className="text-[14px] -mt-1 cursor-pointer">{post.likes?.length}</span>
            <LikeButton replyId='' bg={postIsLiked ? "bg-red-500" : "bg-none"} type='post' postId={postId}/>
            <span className='text-[14px] italic -mt-[3px] font-bold'>Like this Post!{postIsLiked && <span className=' text-[14px] opacity-70 font-light'> (You liked this post) </span>}</span>
        </div> }

        {post.status === "PUBLISHED" ? (
            <>
                <hr className="w-full border-[1px] border-black opacity-50"/>
                <div>
                    <AddCommentSec postId={postId} />
                    {/* <h2 className="font-bold text-xl mb-5">Comments: </h2> */}

                    <CommentsCard postId={postId}/>
                </div>
            </>

        ) : <span className='text-green-500'>Unpublished post !</span>
        }
      </div>
    )
}

export default PostDetail