import { redirect } from "next/navigation";
import DeletePostBtn from "./DeletePostBtn";
// import Search from "./Search"
import { cookies } from "next/headers";
import { TPost } from "./type";

const DeletePost = async () => {
    const cookieStore = cookies()
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
    const { posts } : { posts: TPost[]} = await res.json()
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-4 p-4 text-black">
        <h1>Delete Posts</h1>
        {/* <Search /> */}
        <div className="flex flex-col gap-3">

            {
                posts.map((post, index) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex justify-between min-w-96 border-[1px] border-black p-3 items-center gap-5 rounded-md">
                            <h1 className="max-w-[60%] text-xs">{index+1 + ". " + (post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title)}</h1>
                            <div className="flex gap-3">
                                <span className={`text-[11px] ${post.status === "PUBLISHED" ? 'text-yellow-200' : "text-green-200"}`}>{post.status}</span>
                                <DeletePostBtn postId={post.posts_id} />
                            </div>
                        </div>

                    )
                })
            }
        </div>
    </div>
  )
}

export default DeletePost