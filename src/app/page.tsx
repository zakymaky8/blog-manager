import { checkLogInStatus } from "@/actions/authActions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {

  const { success } = await checkLogInStatus()
  if (success) {
    redirect("/actions")
  }
  return (
    <div className="flex-auto flex items-center justify-center flex-col gap-20">
      <h2 className="text-black text-4xl">Manage Blog</h2>
      <div className="flex gap-6 items-center">
        <button className="opacity-80 hover:opacity-100">
          <Link href="/admin-login" className="text-white no-underline">Login here</Link>
        </button>
        <span className="text-black">Or</span>
        <button className="opacity-80 hover:opacity-100">
          <Link href="/admin-signup" className="text-white no-underline">Register here</Link>
        </button>
      </div>
    </div>
  );
}