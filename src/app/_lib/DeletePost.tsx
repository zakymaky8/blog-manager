import { redirect } from "next/navigation";
import DeletePostBtn from "./DeletePostBtn";
import { TPost } from "./type";
import { fetchAllPosts } from "@/actions/fetchsAction";

const DeletePost = async () => {

    const { success, data, redirectUrl } = await fetchAllPosts();

    if (!success && redirectUrl !== null) {
        redirect(redirectUrl)
    }

    const { posts } : { posts: TPost[]} = data
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-4 p-4 text-black">
        <h2>Delete Posts</h2>
        <div className="flex flex-col gap-3">

            { posts.length > 0 ?
                posts.map((post, index) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex justify-between min-w-96 border-[1px] border-black p-3 items-center gap-5 rounded-md">
                            <h3 className="max-w-[60%] text-xs">{index+1 + ". " + (post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title)}</h3>
                            <div className="flex gap-3">
                                <span className={`text-[11px] ${post.status === "PUBLISHED" ? 'text-yellow-200' : "text-green-200"}`}>{post.status}</span>
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
    </div>
  )
}

export default DeletePost