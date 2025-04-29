/* eslint-disable @next/next/no-img-element */
import { fetchSingleUser } from "@/actions/fetchsAction";
import DeleteAccount from "@/app/_lib/DeleteAccount";
import Inconvienence from "@/app/_lib/Inconveinence";
import { TAuthor } from "@/app/_lib/type";
import Link from "next/link"
import { redirect } from "next/navigation";
import ppplaceholder from "../../../../../public/person_icon.svg"
import ToggleWarnUser from "./_lib/ToggleWarnUser";


const UserDetail = async ({ params }: {params: Promise<{userId: string}>}) => {

  const { userId } = await params;

  const { success, data, redirectUrl, fetchstatus, status, message } = await fetchSingleUser(userId);

  if (!success && redirectUrl !== null) {
      redirect(redirectUrl)
  }

  if (fetchstatus === false || success === false) {
    return <Inconvienence message={message}/>
  }

  const { user } : { user: TAuthor} = data

  if (status === 404) {
    return (
      <div className=" flex-auto text-center pt-40 p-20 text-red-900 italic">
          <p className="opacity-60 mb-10">{message}!</p>
          <Link href="/user" className="hover:opacity-60 no-underline">👈 Back to users</Link>
      </div>
    )
  }
  const pp = user.profilePic ?  JSON.parse(user.profilePic) : null;
  return (
    <div className="flex-auto text-blue-950 flex gap-10 flex-col items-center">
      <div className="flex flex-col items-center mt-10">
        <div className="" title="Update Avatar">
            <img
                src={pp ? pp.secure_url : (ppplaceholder.src)}
                alt="user pofile picture"
                className="h-[160px] cursor-pointer w-[180px] rounded-[50%] border-slate-700 border-[2px] hover:border-none hover:opacity-70"
            />
        </div>
        <h2 className="text-3xl text-center">{user.username} { user.isWarned && <span className="text-yellow-800 italic text-[14px]">warned!</span>}</h2>
        <div className="flex flex-col gap-1">
          <span>Full Name: {`${user.firstname} ${user.lastname}`}</span>
          <span>Username: {user.username}</span>
        </div>
      </div>
      <div className="text-[14px] flex flex-col gap-2 mt-8">
        <Link href={`/user/${user.users_id}/activities`} className="text-white no-underline bg-slate-800 text-center rounded hover:bg-slate-950 py-2 px-4">see user&apos;s activities</Link>
        { user.Role === "USER" && <ToggleWarnUser user={user} />}
        { user.Role === "USER" && <DeleteAccount userId={userId} />}
      </div>
    </div>
  )
}

export default UserDetail
