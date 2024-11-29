import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-auto flex flex-col items-center p-5 justify-center">
      <h2 className="text-2xl mb-2 text-black">Actions</h2>
      <div className="flex flex-col items-center gap-3 p-5 bg-slate-500 rounded-2xl">
          <Link href="/create"><button className="w-[259px] hover:text-gray-500 text-slate-300">Create Blog Post</button></Link>
          <Link href="/read"><button className="w-[259px] hover:text-gray-500 text-slate-300">View Posts and Manage Comments</button></Link>
          <Link href="/update"><button className="w-[259px] hover:text-gray-500 text-slate-300">Update Post</button></Link>
          <Link href="/delete"><button className="w-[259px] hover:text-gray-500 text-slate-300">Delete Post(s)</button></Link>
      </div>
    </div>
  );
}
