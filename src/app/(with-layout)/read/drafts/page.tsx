import Image from "next/image";
import Link from "next/link";
import seeBtn from "../../../../../public/see.svg"
import editBtn from "../../../../../public/edit_icon.svg"
import TogglePublish from "@/app/_lib/TogglePublish";
import { redirect } from "next/navigation";
import { fetchDraftPosts } from "@/actions/fetchsAction";
import Inconvienence from "@/app/_lib/Inconveinence";
import Search from "@/app/_lib/Search";
import Pagination from "@/app/_lib/Pagination";
import { TPost } from "@/app/_lib/type";
import { decideWhichFormat } from "@/app/_lib/utils";

const Drafts = async ({ searchParams }: { searchParams: Promise<{ page: number, limit: number, search: string }> }) => {
    const { limit, page, search } = await searchParams;
    const { success, data, redirectUrl, status, message, meta } = await fetchDraftPosts(page, limit, search);

    if (!success && redirectUrl !== null) {
        redirect(redirectUrl)
    }
    if (status === false || success === false) {
        return <Inconvienence message={message}/>
    }
    const { drafts:posts } : { drafts: TPost[]} = data

  return (
    <div className="w-full flex flex-col flex-auto items-center gap-5 p-4 text-black">
        <h2 className="text-2xl pb-2 border-b-[1px] border-black mb-6 mt-10">Manipulate Drafts</h2>
        <Search />
        <div className="flex flex-col gap-3 mt-2 mb-20">
            { posts.length > 0 ?
                posts.map((post) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex flex-col justify-between w-[380px] sm:w-[450px] md:w-[550px] lg:w-[650px] max-w-[700px] border-[1px] border-black p-3 gap-5 rounded">
                            <div className="flex items-center justify-between gap-6 -mt-2">
                                <h3 className="font-bold text-base"> {post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title}</h3>
                                <span className={`text-[11px] ${post.status === "PUBLISHED" ? 'text-yellow-200' : "text-green-200"}`}>{post.status}</span>
                            </div>
                            <p className="text-[12px] -mt-3">{post.excerpt}</p>
                            <div className="flex gap-2 items-center justify-between">
                                <span className="text-[11px] opacity-80 italic">Last Update: {decideWhichFormat(post.lastUpdate)}</span>
                                <div className="flex gap-2 items-center">
                                    <Link href={`/read/${post.posts_id}`}>
                                        <button className="h-fit text-xs bg-slate-300 p-1">
                                            <Image title="see post" className="h-[20px] w-[20px]" src={seeBtn} alt="see button"/>
                                        </button>
                                    </Link>

                                    <Link href={`/update/${post.posts_id}`}>
                                        <button className="h-fit text-xs bg-slate-300 p-1">
                                            <Image title="edit post" className="h-[20px] w-[20px]" src={editBtn} alt="edit button"/>
                                        </button>
                                    </Link>
                                    <TogglePublish  action="Publish" postId={post.posts_id}/>
                                </div>
                            </div>
                        </div>
                    )
                }) :
                <span
                    className="text-center opacity-60 text-[14px] mt-20 italic">
                        Your drafts will appear here If you create one!
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

export default Drafts
