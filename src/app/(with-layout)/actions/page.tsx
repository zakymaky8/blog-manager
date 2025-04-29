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
    <div className="flex-auto flex flex-col items-center p-5 mt-5 justify-center">
      <h2 className="text-2xl mb-4 text-black">Actions</h2>
      <div className="flex flex-col items-stretch gap-3 p-5 bg-slate-500 rounded-2xl min-w-[340px]">
          <Link href="/create" className="no-underline w-full">
                <button className="w-full px-3 py-3 flex items-center justify-center gap-3  hover:text-gray-500 text-slate-300">
                  ➕
                  <span>Create Blog Post</span>
                </button>
          </Link>
          <Link href="/read" className="no-underline w-full">
                <button className=" px-3 py-3 w-full flex items-center justify-center   hover:text-gray-500 text-slate-300">
                  👁️ View Posts and Manage Comments
                </button>
          </Link>

          <Link href="/update" className="no-underline  w-full">
                <button className="px-3 py-3 flex items-center w-full justify-center gap-3  hover:text-gray-500 text-slate-300">
                    <Image src={update}  alt="create" className="bg-white rounded-[50%] h-5 w-5 p-[1px]"/>
                    Update Published Post
                </button>
          </Link>

          <Link href="/delete" className="no-underline w-full">
                <button className="px-3 py-3 flex items-center w-full justify-center gap-3  hover:text-gray-500 text-slate-300">
                    <Image src={deleter}  alt="create" className="bg-white rounded-[50%] h-5 w-5 p-[1px]"/>
                    Delete Post(s)
                </button>
          </Link>

          <Link href="/read/drafts/">
                <button className=" w-full hover:text-gray-500 text-slate-300 p-3">
                  Track Drafts
                </button>
          </Link>

          <Link href="/user/">
                <button className=" w-full hover:text-gray-500 text-slate-300 p-3">
                  👱 Manage Users
                </button>
          </Link>

          <Link href="/manage-suggestions/" className=" w-full">
                <button className=" w-full hover:text-gray-500 text-slate-300 p-3">
                💡 Manage Suggestions
                </button>
          </Link>
          
      </div>
    </div>
  );
}
