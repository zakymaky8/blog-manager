/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { redirect } from "next/navigation";
import { TAuthor } from "../../_lib/type";
import { cap, decideWhichFormat } from "../../_lib/utils";
import { fetchALlUsers } from "@/actions/fetchsAction";
import Inconvienence from "@/app/_lib/Inconveinence";
import pp from  "../../../../public/person_icon.svg"
import Pagination from "@/app/_lib/Pagination";
import Search from "@/app/_lib/Search";

const Users = async  ({ searchParams }: { searchParams: Promise<{ page: number, limit: number, search: string }> }) => {
    const { limit, page, search } = await searchParams
    const { success, data, redirectUrl, status, message, meta } = await fetchALlUsers(page, search, limit);

    if (!success && redirectUrl !== null) {
        redirect(redirectUrl)
    }
    if (status === false || success === false) {
        return <Inconvienence message={message}/>
    }
    const { users } : { users: TAuthor[]} = data

  return (
    <div className="w-full flex flex-col flex-auto items-center gap-5 p-4 text-black">

    <h2 className="text-2xl pb-2 border-b-[1px] border-black my-10">
        Users
        <span className="ml-5 text-yellow-700">{users.length}</span>
    </h2>

    <Search />

    <div className="flex flex-col gap-3 mt-4 mb-20">
        { users.length > 0 ?
            users.map((user: TAuthor) => {
                return (
                    <div key={user.users_id} className="bg-slate-400 flex flex-col justify-between border-[1px] border-black p-3 w-[380px] sm:w-[450px] md:w-[550px] lg:w-[650px] max-w-[700px] gap-8 rounded">
                        <div className="flex justify-between gap-6 items-center">
                            <div className="flex gap-2 items-center">
                                <img src={user.profilePic ? JSON.parse(user.profilePic).secure_url : pp.src} alt="profile picture" className="w-10 h-10 rounded-[50%]" />
                                <h3 className="m-1 text-base">{cap(user.firstname??"--") + " " + cap(user.lastname ?? "--")}</h3>
                            </div>
                            <span className="opacity-80 italic text-[12px]">Created: {decideWhichFormat(user.createdAt)}</span>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/user/${user.users_id}`} className="py-[6px] px-3 text-[11px] text-white no-underline hover:text-yellow-500 hover:bg-slate-700 rounded bg-black">See User</Link>
                            <Link href={`/user/${user.users_id}/activities`} className="py-[6px] px-3 text-[11px] text-white no-underline hover:text-yellow-500 hover:bg-slate-700 rounded bg-black">Activities</Link>
                        </div>
                    </div>
                )
            }) :
            <span
                className="text-center opacity-60 text-[14px] mt-20 italic">
                    There are no users who created account yet!
            </span>
        }
    </div>

    <Pagination
            type="post"
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

export default Users