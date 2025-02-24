"use client"


import { SignUpAction } from "@/actions/createAccount";
import { useRouter } from "next/navigation";
import { useActionState } from "react";


const SignUpForm = () => {
    const router = useRouter()

    const [state, formAction] = useActionState(SignUpAction, { success: "", message: "", redirectUrl: "", user: null })

    if (state.success && ![null, ""].includes(state.redirectUrl)) {
      router.replace(state.redirectUrl!)
    }
    return (
      <form action={formAction} method="POST" className="flex flex-col flex-wrap rounded h-1/2 p-8 pb-0 gap-8 justify-center m-4 min-w-72  bg-slate-500">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-2 items-center">
            <label htmlFor="fname">First Name: </label>
            <input
                required
                type="text"
                name="firstname"
                id="fname"
                placeholder="first name"
                className=" h-10 bg-slate-800 rounded-lg p-1 box-border placeholder:text-[12px] flex-grow pl-2 text-white" />
          </div>
          <div className="flex justify-between gap-2 items-center">
            <label htmlFor="lname">Last Name: </label>
            <input
                required
                type="text"
                name="lastname"
                id="lname"
                placeholder="last name"
                className=" h-10 bg-slate-800 rounded-lg p-1 box-border placeholder:text-[12px] flex-grow pl-2 text-white" />
          </div>
        </div>
        <div  className="flex flex-col gap-4">
          <div className="flex justify-between gap-2 items-center">
            <label htmlFor="uname">Username: </label>
            <input
                required
                type="text"
                name="username"
                id="uname"
                placeholder="username"
                className=" h-10 bg-slate-800 rounded-lg p-1 box-border placeholder:text-[12px] flex-grow pl-2 text-white" />
          </div>
          <div className="flex justify-between gap-2 items-center">
            <label htmlFor="pwd">Password: </label>
            <input
                required
                type="password"
                name="password"
                id="pwd"
                placeholder="password"
                className=" h-10 bg-slate-800 rounded-lg p-1 box-border placeholder:text-[12px] flex-grow pl-2 text-white" />
          </div>
          <div className="flex justify-between gap-2 items-center">
            <label htmlFor="cpwd">Confirm Password: </label>
            <input
                required
                type="text"
                name="confirm_password"
                id="cpwd"
                placeholder="confirm"
                className=" h-10 bg-slate-800 rounded-lg p-1 box-border placeholder:text-[12px] flex-grow pl-2 text-white" />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <label htmlFor="role" className="text-black italic"><span className="text-2xl text-red-500">*</span> Enter admin password!</label> {/* <span className="text-yellow-500 text-[10px]">optional</span>*/}
            <input
                required placeholder="********" className="w-32 pt-1 text-white h-6 rounded pl-2 pr-2 bg-black" type="password" name="admin_pwd" id="role"/>
          </div>
        </div>
        <button type="submit" className="h-10 bg-slate-800 hover:bg-slate-900 mt-10">Register</button>
        {
          !state.success && <span className="text-red-700 text-[12px] self-center italic">{state.message}</span>
        }
      </form>
    )
  }

  export default SignUpForm