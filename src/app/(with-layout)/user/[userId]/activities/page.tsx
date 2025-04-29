import { fetchSingleUserActivities } from '@/actions/fetchsAction';
import DeleteButton from '@/app/_lib/DeleteButton';
import Inconvienence from '@/app/_lib/Inconveinence';
import { TAuthor, TPaired, TPost } from '@/app/_lib/type';
import { decideWhichFormat } from '@/app/_lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const UserActivities = async ({ params }: {params: Promise<{userId: string}>}) => {
  const { userId } = await params;

  const { success, data, redirectUrl, status, message, fetchstatus } = await fetchSingleUserActivities(userId);

  if (status === 404) return <div className='flex-auto text-red-800'>{message}</div>

  if (!success && redirectUrl !== null) {
      redirect(redirectUrl)
  }
  if (fetchstatus === false || !success) {
    return <Inconvienence message={message} />
  }
  const { user, likedPosts, paired, dislikedPosts, viewedPosts }: {user: TAuthor,likedPosts: TPost[], paired: TPaired[], dislikedPosts: TPost[], viewedPosts: TPost[]} = data

  return (
    <div className='flex-auto text-black flex flex-col items-center mb-20 gap-8'>
      <h2 className='font-extrabold text-4xl mt-14 bg-blue-950 text-white p-4'>{user.username}&apos;s activities</h2>
      <div className='flex flex-col gap-12 mx-4'>
        <div className='mx-5'>
          <h3 className='mb-4 text-xl font-bold'>Likes <span className='text-yellow-700 ml-1'>{likedPosts.length}</span></h3>
          <p><strong>👉{user.username} </strong> liked post(s) with title(s): </p>
          <ul className='flex flex-col gap-2 list-none'>
            { likedPosts.length > 0 ?
              likedPosts.map(post => {
                return <li key={post.posts_id}>
                          <Link className='no-underline hover:underline' href={`/read/${post.posts_id}/`}><em><strong> &quot;{post.title}&quot;</strong></em></Link>
                        </li>
              }) : <div className='text-center text-[12px] italic -ml-8 text-red-700'>No Likes!</div>
            }
          </ul>
        </div>

        <div className='mx-5'>
          <h3 className='mb-4 text-xl font-bold'>Dislikes <span className='text-yellow-700 ml-1'>{dislikedPosts.length}</span></h3>
          <p><strong>👉{user.username} </strong> disliked post(s) with title(s): </p>
          <ul className='flex flex-col gap-2 list-none'>
            { dislikedPosts.length > 0 ?
              dislikedPosts.map(post => {
                return <li key={post.posts_id}>
                          <Link className='no-underline hover:underline' href={`/read/${post.posts_id}/`}><em><strong> &quot;{post.title}&quot;</strong></em></Link>
                        </li>
              }) : <div className='text-center text-[12px] italic -ml-8 text-red-700'>No Dislikes!</div>
            }
          </ul>
        </div>


        <div className='mx-5'>
          <h3 className='mb-4 text-xl font-bold'>Views <span className='text-yellow-700 ml-1'>{viewedPosts.length}</span></h3>
          <p><strong>👉{user.username} </strong> viewed post(s) with title(s): </p>
          <ul className='flex flex-col gap-2 list-none'>
            { viewedPosts.length > 0 ?
              viewedPosts.map(post => {
                return <li key={post.posts_id}>
                          <Link className='no-underline hover:underline' href={`/read/${post.posts_id}/`}><em><strong> &quot;{post.title}&quot;</strong></em></Link>
                        </li>
              }) : <div className='text-center text-[12px] italic -ml-8 text-red-700'>No Views!</div>
            }
          </ul>
        </div>

        <div className="w-full bg-[#cbc4f2]">
          <h3 className='text-xl mx-4 font-bold'>Comments <span className='text-yellow-700 ml-1'>{paired.length}</span></h3>
          <div className='overflow-x-auto max-w-[95vw] md:max-w-[780px] p-2 mx-2'>
            <table className='m-5 min-w-[600px]'>
              <thead className='bg-blue-950 text-white'>
                <tr>
                  <th className='border-b-black border p-1 px-3 w-max'>No_</th>
                  <th className='border-b-black border p-1 px-3 w-max'>Comment</th>
                  <th className='border-b-black border p-1 px-3 w-max'>Post</th>
                  <th className='border-b-black border p-1 px-3 w-max'>Time</th>
                  <th className='border-b-black border p-1 px-3 w-max'>Take action</th>
                </tr>
              </thead>
              <tbody>
                {
                  paired.length > 0 ?
                  paired.map((pair, index) => {
                    return (
                      <tr key={index}>
                        <td className='border-b-black border p-2'>{index+1}</td>

                        <td className='border-b-black text-[14px] border p-2 italic bg-[#9caae7]'>
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

                        <td className='border-b-black border p-2 text-[14px] bg-[#acb6df]'>{pair.post.title}</td>
                        <td className='border-b-black border p-2 text-[14px] bg-[#bdc4e0]'>{decideWhichFormat(pair.comment.createdAt)}</td>
                        <td className='border-b-black border p-2 text-[14px] bg-[#c7bcc5]'>
                          <Link title="see the post" href={`/read/${pair.post.posts_id}`} className='p-1 flex justify-center rounded no-underline text-white text-center bg-slate-900 hover:bg-slate-600'>👁️</Link><br />
                          <div className='bg-red-700 p-[2px] flex justify-center rounded-md hover:opacity-80'>
                            <DeleteButton commentId={pair.comment.comments_id} postId={pair.post.posts_id} replyId='' type='comment' />
                          </div>
                        </td>
                      </tr>
                    )
                  }) : <tr className='text-[12px] text-red-700'>
                          <td className='border-b-black border p-2 bg-[#acb6df]'>0</td>
                          <td className='border-b-black border p-2 bg-[#acb6df]'>No comment</td>
                          <td className='border-b-black border p-2 bg-[#acb6df]'>On Any Post</td>
                          <td className='border-b-black border p-2 bg-[#acb6df]'>at any time</td>
                          <td className='border-b-black border p-2 bg-[#acb6df]'>So no action to take</td>
                      </tr>
                }
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  )
}

export default UserActivities
