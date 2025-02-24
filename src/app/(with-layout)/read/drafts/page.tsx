import { TPost } from "@/app/_lib/ViewManage";
import Image from "next/image";
import Link from "next/link";
import seeBtn from "../../../../../public/see.svg"
import editBtn from "../../../../../public/edit_icon.svg"
import TogglePublish from "@/app/_lib/TogglePublish";
import { redirect } from "next/navigation";
import { fetchDraftPosts } from "@/actions/fetchsAction";
import Inconvienence from "@/app/_lib/Inconveinence";

const Drafts = async () => {

    const { success, data, redirectUrl, status, message } = await fetchDraftPosts();

    if (!success && redirectUrl !== null) {
        redirect(redirectUrl)
    }
    if (status === false || success === false) {
        return <Inconvienence message={message}/>
    }
    const { drafts:posts } : { drafts: TPost[]} = data

  return (
    <div className="w-full flex flex-col flex-auto items-center gap-5 p-4 text-black">
        <h2 className="text-2xl pb-2 border-b-[1px] border-black">Manipulate Drafts</h2>
        <div className="flex flex-col gap-3">
            { posts.length > 0 ?
                posts.map((post, index) => {
                    return (
                        <div key={post.posts_id} className="bg-slate-400 flex justify-between min-w-96 border-[1px] border-black p-3 items-center gap-5 rounded-md">
                            <h3 className="max-w-[60%] text-xs"> {index+1 + ". " + (post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title)}</h3>
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
                }) :
                <span
                    className="text-center opacity-60 text-[14px] mt-20 italic">
                        Your drafts will appear here If you create one!
                </span>
            }
        </div>
    </div>
  )
}

export default Drafts
