import Link from "next/link"
import LoginForm from "../_lib/LoginForm"

const AdminLogin = () => {
  return (
    <div className="w-full flex items-center flex-col flex-auto">
      <br />
      <h1 className="text-gray-900">Sign In</h1>
      <LoginForm />
      <span className="text-gray-900">No account yet? <Link href="/admin-signup" className="underline">Register</Link></span>
    </div>
  )
}

export default AdminLogin