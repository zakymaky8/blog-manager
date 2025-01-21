import Link from "next/link";
// import Search from "./Search"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decideWhichFormat } from "./utils";

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
    const cookieStore =  cookies();
    const token = (await cookieStore).get("token")?.value;
    
    const res = await fetch(`http://localhost:3456/posts`, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) {
        redirect("/admin-login")
    }
    const { posts } = await res.json()
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-4 p-4 text-black">
        <h1 className="text-2xl pb-2 border-b-[1px] border-black">Update Published Post</h1>
        {/* <Search /> */}
        <div className="flex flex-col gap-3">
            {
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
                })
            }
        </div>
    </div>
  )
}

export default UpdatePost