import SignUpForm from "@/app/_lib/SignUpForm"
import Link from "next/link"

const AdminSignUp = () => {
  return (
    <div className="w-full flex items-center flex-col flex-auto mt-10 mb-20 gap-4">
        <br />
        <h1  className="text-gray-900 text-3xl font-bold">Sign Up</h1>
        <SignUpForm />
        <span className="text-gray-900">Already Have One? <Link href="/admin-login" className="underline  hover:no-underline">Log in</Link></span>
    </div>
  )
}

export default AdminSignUp