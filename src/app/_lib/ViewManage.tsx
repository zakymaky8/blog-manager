import Link from "next/link"
import { redirect } from "next/navigation";
import { decideWhichFormat } from "./utils";
import { fetchAllPosts } from "@/actions/fetchsAction";
import Inconvienence from "./Inconveinence";

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

export type TComment = {
    comments_id: string;
    content: string;
    createdAt: Date;
    lastUpdate: Date;
    likes: number;
    post_id: string;
    user_id: string;
}

const ViewManage = async () => {

    const { success, data, redirectUrl, status, message } = await fetchAllPosts();

    if (!success && redirectUrl !== null) {
        redirect(redirectUrl)
    }

    if (status === false || success === false) {
        return <Inconvienence message={message}/>
    }

    const { posts } : { posts: TPost[]} = data
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-5 p-4 text-black">
        <h1 className="text-2xl pb-2 border-b-[1px] border-black">View Posts and Manage Comments</h1>
        <div className="flex flex-col gap-3">
            { posts.length > 0 ?
                posts.map((post, index) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex-wrap flex justify-between min-w-96 border-[1px] border-black p-3 items-center gap-5 rounded-md">
                            <h1 className="max-w-[60%] text-xs"> {index+1 + ". " + (post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title)}</h1>
                            <div className="flex gap-2 items-center">
                                <Link href={`/read/${post.posts_id}`}><button className="h-fit p-1 text-[11px]">View and Manage</button></Link>
                                <span className={`text-[11px] ${post.status === "PUBLISHED" ? 'text-yellow-200' : "text-green-200"}`}>{post.status}</span>
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
    </div>
  )
}

export default ViewManage
