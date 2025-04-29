import { redirect } from "next/navigation";
import DeletePostBtn from "./DeletePostBtn";
import { TPost } from "./type";
import { fetchAllPosts } from "@/actions/fetchsAction";
import Inconvienence from "./Inconveinence";
import Pagination from "./Pagination";
import Search from "./Search";
import Link from "next/link";

const DeletePost = async ({ searchParams }: { searchParams: Promise<{ page: number, limit: number, search: string }> }) => {

    const { limit, page, search } = await searchParams;
    const { success, data, redirectUrl, status, message, meta } = await fetchAllPosts(page, limit, search);

    if (!success && redirectUrl !== null) {
        redirect(redirectUrl)
    }

    if (status === false || success === false) {
        return <Inconvienence message={message}/>
    }
    const { posts } : { posts: TPost[]} = data
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-4 p-4 text-black">
        <h2 className="my-10 border-b-[1px] pb-1 border-black">Delete Posts</h2>

        <Search />

        <div className="flex flex-col gap-3 mt-4 mb-20">

            { posts.length > 0 ?
                posts.map((post) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex flex-col justify-between w-[380px] sm:w-[450px] md:w[550px] lg:w-[650px] max-w-[700px] border-[1px] border-black p-3 gap-3 rounded">
                            <div className="flex justify-between items-center -mt-2">
                                <h3 className="text-base font-bold">{post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title}</h3>
                                <span className={`text-[11px] ${post.status === "PUBLISHED" ? 'text-yellow-200' : "text-green-200"}`}>{post.status}</span>
                            </div>
                            <p className="text-[12px] -mt-2">{post.excerpt}</p>
                            <div className="flex gap-3 justify-between">
                                <Link href={`/read/${post.posts_id}`}>Detail</Link>
                                <DeletePostBtn postId={post.posts_id} />
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

export default DeletePost