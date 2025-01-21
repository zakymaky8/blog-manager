import DeleteAccount from "@/app/_lib/DeleteAccount";
import { cookies } from "next/headers";
import Link from "next/link"
import { redirect } from "next/navigation";

const UserDetail = async ({ params }: {params: {userId: string}}) => {

  const { userId } = await params;

  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`http://localhost:3456/user/${userId}`, {
    headers: {
      "authorization": `Bearer ${token}`,
      "content-type": "application/json"
    }
  });

  if (!res.ok && res.status === 404) {
    const {error} = await res.json()
    return (
      <div className=" flex-auto text-center pt-40 p-20 text-red-900 italic">
          <p className="opacity-60 mb-10">{error}!</p>
          <Link href="/user" className="hover:opacity-60 no-underline">👈 Back to users</Link>
      </div>
    )
  }
  else if (!res.ok && (res.status === 401 || res.status === 403)) {
    redirect("/admin-login")
  }

  const { user } = await res.json();

  return (
    <div className="flex-auto text-blue-950 flex gap-10 flex-col items-center">
      <div className="flex flex-col">
        <h2 className="text-3xl text-center">{user.username}</h2>
        <ul className="flex flex-col gap-2 list-none">
          <li>Full Name: {`${user.firstname} ${user.lastname}`}</li>
          <li>Username: {user.username}</li>
        </ul>
      </div>
      <div className="text-[14px] flex flex-col gap-1">
        <button><Link href={`/user/${user.users_id}/activities`} className="text-white no-underline">see user&apos;s activities</Link></button>
        { user.Role === "USER" && <button className="bg-yellow-600">put warninig sign on user&apos;s account</button>}
        { user.Role === "USER" && <DeleteAccount userId={userId} />}
      </div>
    </div>
  )
}

export default UserDetail
