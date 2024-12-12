import Link from "next/link"
import SignUpForm from "../_lib/SignUpForm"

const AdminSignUp = () => {
  return (
    <div className="w-full flex items-center flex-col flex-auto">
        <br />
        <h1  className="text-gray-900 text-xl">Sign Up</h1>
        <SignUpForm />
        <span className="text-gray-900">Already Have One? <Link href="/admin-login" className="underline">Log in</Link></span>
    </div>
  )
}

export default AdminSignUp