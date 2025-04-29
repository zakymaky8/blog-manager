import Link from "next/link";
import { redirect } from "next/navigation";
import { decideWhichFormat } from "./utils";
import { fetchPublishedPosts } from "@/actions/fetchsAction";
import Inconvienence from "./Inconveinence";
import { TPost } from "./type";
import Pagination from "./Pagination";
import Search from "./Search";

const UpdatePost = async ({ searchParams }: { searchParams: Promise<{ page: number, limit: number, search: string }> }) => {

    const { limit, page, search } = await searchParams;
    const { redirectUrl, success, posts, status, message, meta } = await fetchPublishedPosts(page, limit, search)
    if (redirectUrl !==null && !success) {
        redirect(redirectUrl)
    }

    if (status === false || success === false) {
        return <Inconvienence message={message}/>
    }
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-4 p-4 text-black">
        <h1 className="text-2xl pb-2 border-b-[1px] border-black my-10">Update Published Post</h1>

        <Search />

        <div className="flex flex-col gap-3 mt-4 mb-20">
            { posts.length > 0 ?
                posts.map((post:TPost) => {
                    return (
                        <div key={post.posts_id} className="w-[380px] sm:w-[450px] md:w-[550px] lg:w-[650px] max-w-[700px] bg-slate-400 flex flex-col justify-between min-w-96 border-[1px] border-black p-3 gap-5 rounded-md">
                            <h3 className="font-bold text-base break-all">{post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title}</h3>
                            <p className="text-[12px]">{post.excerpt.slice(0, 150)}...</p>
                            <div className="flex gap-2 justify-between items-center">
                                <p className="text-[10px]">Last Update: {decideWhichFormat(post.lastUpdate)}</p>
                                <Link href={`/update/${post.posts_id}`} className="h-[22px] no-underline bg-black rounded text-white hover:text-yellow-500 px-3 py-[6px] text-[12px] hover:bg-slate-700">Update</Link>
                            </div>
                        </div>
                    )
                }) :
                <span
                    className="text-center opacity-60 text-[14px] mt-20 italic">
                        Published posts will appear here If you create one!
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

export default UpdatePost