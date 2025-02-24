import Link from "next/link";
import { redirect } from "next/navigation";
import { decideWhichFormat } from "./utils";
import { fetchPublishedPosts } from "@/actions/fetchsAction";

export type TPost = {
    posts_id: string;
    title: string;
    content: string;
    createdAt: Date;
    lastUpdate: Date;
    postImgs: string[];
    likes: number;
    views: number;
    user_id: string;
    status: "DRAFT" | "PUBLISHED";
}

const UpdatePost = async () => {
    const { redirectUrl, success, posts } = await fetchPublishedPosts()
    if (redirectUrl !==null && !success) {
        redirect(redirectUrl)
    }
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-4 p-4 text-black">
        <h1 className="text-2xl pb-2 border-b-[1px] border-black">Update Published Post</h1>
        <div className="flex flex-col gap-3">
            { posts.length > 0 ? 
                posts.map((post:TPost, index: number) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex justify-between min-w-96 border-[1px] border-black p-3 items-center gap-5 rounded-md">
                            <h1 className="max-w-[60%] text-xs">{index+1 + ". " + (post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title)}</h1>
                            <div className="flex gap-2">
                                <p className="text-[10px]">Last Update: {decideWhichFormat(post.lastUpdate)}</p>
                                <Link href={`/update/${post.posts_id}`}><button className="h-[22px] p-1 text-xs">Update</button></Link>
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
    </div>
  )
}

export default UpdatePost