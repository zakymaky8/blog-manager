/* eslint-disable @next/next/no-img-element */
import { fetchPostDislikes } from "@/actions/fetchsAction"
import Inconvienence from "@/app/_lib/Inconveinence";
import { TAuthor } from "@/app/_lib/type";
import { redirect } from "next/navigation";
import pp from "../../../../../../public/person_icon.svg"
import Pagination from "@/app/_lib/Pagination";
import Link from "next/link";

const DislikesPage = async ({ params, searchParams }: { params: Promise<{ postId: string }>, searchParams: Promise<{ page: number, limit: number }> }) => {
  const {postId} = await params;
  const { limit, page }  = await searchParams;
  const {meta, data, message, redirectUrl, success} = await fetchPostDislikes(postId, page, limit);

  if (!success && !["", null].includes(redirectUrl)) {
    redirect(redirectUrl!)
  }

  if (!success) {
    return <Inconvienence message={message} />
  }


  return (
    <div className="grow flex flex-col mt-4 text-black w-full gap-6">
      <h3 className="text-xl font-bold self-center mb-10">Users who disliked your post</h3>
      <ul className="flex flex-col gap-1 items-center mb-40">
        {
        data.users.length > 0 ?
        data.users.map((user: TAuthor) => {
          const prp = user.profilePic ? JSON.parse(user.profilePic).secure_url : pp.src
          return (
            <Link href={`/user/${user.users_id}`} key={user.users_id} className="flex w-[350px] sm:w-[460px] no-underline md:w-[560px] max-w-[700px] gap-3 items-center bg-slate-950 text-white px-6 hover:bg-slate-900 cursor-pointer rounded">
              <img src={prp} alt="User Profile" className="w-10 h-10 rounded-[50%]" />
              <h4>{(user.firstname ?? "---") + " " + (user.lastname ?? "---")}</h4>
            </Link>
          )
        }) : <span className="opacity-70 italic mt-6">No user has disliked yet!</span>
      }
      </ul>
      <Pagination
            type="reactions"
            currentPage={+meta.current_page}
            currentPageItems={+meta.current_page_items}
            itemsPerPage={+meta.items_per_page}
            totalPages={+meta.total_pages}
            totalItems={+meta.total_items}
            limit={limit? +limit : limit}
        />
    </div>
  )
}

export default DislikesPage