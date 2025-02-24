import Image from "next/image";
import Link from "next/link";
import update from "../../../../public/edit_icon.svg";
import deleter from "../../../../public/delete.svg";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/utils/server-only";


export default async function Actions() {
  const token = await getAccessToken()
  if (!token) {
    redirect("/admin-login")
  }
  return (
    <div className="flex-auto flex flex-col items-center p-5 justify-center">
      <h2 className="text-2xl mb-2 text-black">Actions</h2>
      <div className="flex flex-col items-center gap-3 p-5 bg-slate-500 rounded-2xl">

          <Link href="/create" className="no-underline">
                <button className="pl-3 pr-3 flex items-center justify-center gap-3 w-[259px] hover:text-gray-500 text-slate-300">
                  ➕
                  <span>Create Blog Post</span>
                </button>
          </Link>
          <Link href="/read" className="no-underline">
                <button className=" pl-3 pr-3  flex items-center justify-center  w-[259px] hover:text-gray-500 text-slate-300">
                  👁️ View Posts and Manage Comments
                </button>
          </Link>

          <Link href="/update" className="no-underline">
                <button className="pl-3 pr-3 flex items-center justify-center gap-3 w-[259px] hover:text-gray-500 text-slate-300">
                    <Image src={update}  alt="create" className="bg-white rounded-[50%] h-5 w-5 p-[1px]"/>
                    Update Published Post
                </button>
          </Link>

          <Link href="/delete" className="no-underline">
                <button className="pl-3 pr-3 flex items-center justify-center gap-3 w-[259px] hover:text-gray-500 text-slate-300">
                    <Image src={deleter}  alt="create" className="bg-white rounded-[50%] h-5 w-5 p-[1px]"/>
                    Delete Post(s)
                </button>
          </Link>

          <Link href="/read/drafts/">
                <button className="w-[259px] hover:text-gray-500 text-slate-300">
                  Track Drafts
                </button>
          </Link>

          <Link href="/user/">
                <button className="w-[259px] hover:text-gray-500 text-slate-300">
                  👱 Manage Users
                </button>
          </Link>
      </div>
    </div>
  );
}
