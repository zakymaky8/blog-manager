import Link from "next/link"

const Footer = () => {
  return (
    <ul className="flex gap-5 opacity-50 bg-black p-5 -mb-2 text-[11px] self-center w-full justify-center">
        <Link href="/somewhere" className="text-white no-underline">Contact me</Link >
        <Link href="/somewhere" className="text-white no-underline">Ask Help</Link >
        <Link href="/somewhere" className="text-white no-underline">Work With me</Link >
        <Link href="/somewhere" className="text-white no-underline">About Me</Link >
        <Link href="/somewhere" className="text-white no-underline">About This Blog</Link >
    </ul>
  )
}

export default Footer