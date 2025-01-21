// import Search from "@/app/_lib/Search";
import { TPost } from "@/app/_lib/ViewManage";
import Image from "next/image";
import Link from "next/link";

import seeBtn from "../../../../public/see.svg"
import editBtn from "../../../../public/edit_icon.svg"
import TogglePublish from "@/app/_lib/TogglePublish";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Drafts = async () => {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    const res = await fetch("http://localhost:3456/manage_posts/drafts/", {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) {
        redirect("/admin-login")
    }
    const { posts } : { posts: TPost[]} = await res.json();
  return (
    <div className="w-full flex flex-col flex-auto items-center gap-5 p-4 text-black">
        <h1 className="text-2xl pb-2 border-b-[1px] border-black">Manipulate Drafts</h1>
        {/* <Search /> */}
        <div className="flex flex-col gap-3">
            {
                posts.map((post, index) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex justify-between min-w-96 border-[1px] border-black p-3 items-center gap-5 rounded-md">
                            <h1 className="max-w-[60%] text-xs"> {index+1 + ". " + (post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title)}</h1>
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

export default Drafts
