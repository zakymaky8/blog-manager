import Link from "next/link"
import { redirect } from "next/navigation";
import { decideWhichFormat } from "./utils";
import { fetchAllPosts } from "@/actions/fetchsAction";
import Inconvienence from "./Inconveinence";
import { TPost } from "./type";
import Pagination from "./Pagination";
import Search from "./Search";


export type TComment = {
    comments_id: string;
    content: string;
    createdAt: Date;
    lastUpdate: Date;
    likes: number;
    post_id: string;
    user_id: string;
}

const ViewManage = async ({ searchParams }: { searchParams: Promise<{ page: number, limit: number, search: string }> }) => {

    const { page, limit, search } = await searchParams;

    const { success, data, redirectUrl, status, message, meta } = await fetchAllPosts(page, limit, search);

    if (!success && redirectUrl !== null) {
        redirect(redirectUrl)
    }

    if (status === false || success === false) {
        return <Inconvienence message={message}/>
    }

    const { posts } : { posts: TPost[]} = data
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-5 p-4 text-black">

        <h2
            className="text-2xl pb-2 border-b-[1px] border-black mb-6"
                >Manage posts and their comments
        </h2>
        <Search />
        <div
            className="flex flex-col gap-4 my-4 mb-20">

            { posts.length > 0 ?
                posts.map((post) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex flex-col border-[1px] px-6 border-black p-3 gap-3 rounded max-w-[700px]">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold"> {post.title}</h3>
                                <span className={`text-[11px] ${post.status === "PUBLISHED" ? 'text-yellow-200' : "text-green-200"}`}>{post.status}</span>
                            </div>
                            <p className="-mt-1 text-[13px]">{post.excerpt.length > 200 ? post.excerpt.slice(0, 200) + "..." : post.excerpt}</p>
                            <div className="flex gap-2 justify-between items-center mt-4">
                                <div className="flex gap-2 flex-wrap flex-col items-stretch sm:flex-row">
                                    <Link href={`/read/${post.posts_id}`} className="hover:bg-slate-950 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-900 text-white" >Manage Post</Link>
                                    <Link href={`/read/comments/${post.posts_id}`} className="hover:bg-slate-950 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-900 text-white" >Comments</Link>
                                    <Link href={`/read/likes/${post.posts_id}`} className="hover:bg-slate-950 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-900 text-white" >Likes</Link>
                                    <Link href={`/read/dislikes/${post.posts_id}`} className="hover:bg-slate-950 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-900 text-white" >Dislikes</Link>
                                    <Link href={`/read/views/${post.posts_id}`} className="hover:bg-slate-950 no-underline rounded-sm text-center h-fit py-[5px] px-3 text-[13px] bg-slate-900 text-white" >Views</Link>
                                </div>
                                <p className="text-[10px]">Last Update: {decideWhichFormat(post.lastUpdate)}</p>
                            </div>
                        </div>
                    )
                }) :
                <span
                    className="text-center opacity-60 text-[14px] mt-20 italic">
                        Your posts will appear here If you create one!
                </span>
            }

        </div>

        <Pagination
            type="post"
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

export default ViewManage
