import Link from "next/link"
import Search from "./Search"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    const res = await fetch("http://localhost:3456/manage_posts/", {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) {
        redirect("/admin-login")
    }
    const { posts } : { posts: TPost[]} = await res.json();
    // const { comments } : {comments: TComment[]} = await res.json()
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-5 p-4 text-black">
        <h1 className="text-2xl pb-2 border-b-[1px] border-black">View Posts and Manage Comments</h1>
        <Search />
        <div className="flex flex-col gap-3">
            {
                posts.map((post, index) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex justify-between min-w-96 border-[1px] border-black p-3 items-center gap-5 rounded-md">
                            <h1 className="max-w-[60%] text-xs"> {index+1 + ". " + (post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title)}</h1>
                            <div className="flex gap-2">
                                <Link href={`/read/${post.posts_id}`}><button className="h-fit p-1 text-xs">View the post and Manage Comments</button></Link>
                                <span className={`text-[11px] ${post.status === "PUBLISHED" ? 'text-yellow-200' : "text-green-200"}`}>{post.status}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}


// by manage we mean replying, deleting, liking comments
export default ViewManage

