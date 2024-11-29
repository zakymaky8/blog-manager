import Link from "next/link";
// import Search from "./Search";

export default function Header() {
  return (
    <div className="flex justify-between items-center min-h-28 bg-gray-900 shadow-inner p-4 flex-wrap gap-4">
        <h1 className="text-2xl"> <Link href="/"> Blog Manager</Link></h1>
        {/* <Search /> */}
        <div className="flex gap-1 items-center justify-between">
            <Link href="/login"><button> Log in as admin</button></Link>
          {/* <button className="text-3xl border-2 rounded-full p-1">🧑‍🦱</button> */}
        </div>
    </div>
  )
}
