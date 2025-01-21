import DeleteButton from '@/app/_lib/DeleteButton';
import { TAuthor, TPaired, TPost } from '@/app/_lib/type';
import { decideWhichFormat } from '@/app/_lib/utils';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const UserActivities = async ({ params }: {params: {userId: string}}) => {
  const { userId } = await params;
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`http://localhost:3456/user/${userId}/activities`, {
    headers: {
      "authorization": `Bearer ${token}`,
      "content-type": "application/json"
    }
  })

  if (!res.ok && res.status === 404) {
    const {error} = await res.json();
    return <div className='flex-auto text-red-800'>{error}</div>
  }
  else if (!res.ok && (res.status === 403 || res.status === 401)) {
    redirect("/admin-login")
  }
  const activities = await res.json();
  const { user, likedPosts, paired }: {user: TAuthor,likedPosts: TPost[], paired: TPaired[]} = activities

  return (
    <div className='flex-auto text-black flex flex-col items-center mb-20 gap-6'>
      <h2 className='font-extrabold text-4xl mt-14 bg-blue-950 text-white p-4'>{user.username}&apos;s Activities</h2>
      <div>
        <h3 className='text-center text-xl font-bold'>Likes <span className='text-yellow-700 ml-1'>{likedPosts.length}</span></h3>
        <p><strong>👉{user.username} </strong> liked post(s) with title(s): </p>
        <ul className='flex flex-col gap-2 list-none'>
          { likedPosts.length > 0 ?
            likedPosts.map(post => {
              return <li key={post.posts_id}>
                        <Link href={`/read/${post.posts_id}/`}><em><strong> &quot;{post.title}&quot;</strong></em></Link>
                      </li>
            }) : <div className='text-center text-[12px] italic -ml-8 text-red-700'>No Likes!</div>
          }
        </ul>
      </div>

      <div>
        <h3 className='text-center text-xl font-bold'>Comments <span className='text-yellow-700 ml-1'>{paired.length}</span></h3>
        <table className='border-collapse m-5'>
          <thead className='bg-blue-950 text-white'>
            <tr>
              <th className='border-black border p-3'>No_</th>
              <th className='border-black border p-3'>Comment</th>
              <th className='border-black border p-3'>Post</th>
              <th className='border-black border p-3'>Time</th>
              <th className='border-black border p-3'>Take action</th>
            </tr>
          </thead>
          <tbody>
            {
              paired.length > 0 ?
              paired.map((pair, index) => {
                return (
                  <tr key={index}>
                    <td className='border-black border p-2 max-w-[300px]'>{index+1}</td>

                    <td className='border-black border p-2 max-w-[300px] italic bg-[#9caae7]'>
                        {pair.comment.content.length > 100 ?
                          <>
                            {pair.comment.content.slice(0, 100)}
                            <details>
                              <summary className='cursor-pointer opacity-50 text-[12px]'>expand/collapse</summary>
                              <span>{pair.comment.content.slice(100,)}</span>
                            </details> 
                          </> :
                        pair.comment.content}
                    </td>

                    <td className='border-black border p-2 max-w-[300px] bg-[#acb6df]'>{pair.post.title}</td>
                    <td className='border-black border p-2 max-w-[300px] bg-[#bdc4e0]'>{decideWhichFormat(pair.comment.createdAt)}</td>
                    <td className='border-black border p-4 bg-[#83557b]'>
                      <Link href={`/read/${pair.post.posts_id}`} className='p-1 text-[11px] w-fit'><button>See on Post</button></Link>
                      <div className='bg-red-800 flex justify-center mt-2 pt-1 rounded-md hover:opacity-80'>
                        <DeleteButton commentId={pair.comment.comments_id} postId={pair.post.posts_id} replyId='' type='comment' />
                      </div>
                    </td>
                  </tr>
                )
              }) : <tr className='text-[12px] text-red-700'>
                      <td className='border-black border p-2 max-w-[300px] bg-[#acb6df]'>0</td>
                      <td className='border-black border p-2 max-w-[300px] bg-[#acb6df]'>No comment</td>
                      <td className='border-black border p-2 max-w-[300px] bg-[#acb6df]'>On Any Post</td>
                      <td className='border-black border p-2 max-w-[300px] bg-[#acb6df]'>at any time</td>
                      <td className='border-black border p-2 max-w-[300px] bg-[#acb6df]'>So no action to take</td>
                  </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserActivities
