import { checkLogInStatus } from "@/actions/authActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import Inconvienence from "../_lib/Inconveinence";

export default async function Home() {

  const { success, status, message } = await checkLogInStatus()
  if (success) {
    redirect("/actions")
  }
  if (status === false) {
     return <Inconvienence message={message}/>
  }
  if (status && !success)
  return (
    <div className="flex-auto flex items-center justify-center flex-col gap-20">
      <h2 className="text-black text-5xl">Manage Tiplogger</h2>
      <div className="flex gap-6 items-center">
        <button className="opacity-90 hover:opacity-100 px-7 py-3">
          <Link href="/admin-login" className="text-white no-underline">Login Here</Link>
        </button>

      </div>
    </div>
  );
}