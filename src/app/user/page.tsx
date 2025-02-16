import Link from "next/link"
import { redirect } from "next/navigation";
import { TAuthor } from "../_lib/type";
import { cap } from "../_lib/utils";
import { fetchALlUsers } from "@/actions/fetchsAction";

const Users = async  () => {

    const { success, data, redirectUrl } = await fetchALlUsers();

    if (!success && redirectUrl !== null) {
        redirect(redirectUrl)
    }
    const { users } : { users: TAuthor[]} = data

  return (
    <div className="w-full flex flex-col flex-auto items-center gap-5 p-4 text-black">

    <h2 className="text-2xl pb-2 border-b-[1px] border-black">
        Users
        <span className="ml-5 text-yellow-700">{users.length}</span>
    </h2>
    <div className="flex flex-col gap-3">
        { users.length > 0 ?
            users.map((user: TAuthor, index:number) => {
                    return (
                        <div key={user.users_id} className="bg-slate-400 flex justify-between min-w-96 border-[1px] border-black p-3 items-center gap-5 rounded-md">
                            <h1 className="max-w-[60%] text-xs">
                                <strong><em>{index+1 + ". " + cap(user.username)}</em></strong>
                            </h1>
                            <div className="flex gap-2">
                                <Link href={`/user/${user.users_id}`}><button className="h-fit p-1 text-xs">See User</button></Link>
                                <Link href={`/user/${user.users_id}/activities`}><button className="h-fit p-1 text-xs">Activities</button></Link>
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
</div>
  )
}

export default Users