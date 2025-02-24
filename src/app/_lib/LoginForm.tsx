"use client"

import { SignInAction } from "@/actions/authActions";
import { redirect } from "next/navigation";
import { useActionState, useState } from "react";

const LoginForm = () => {
  const [isPwdSeen, setIsPwdSeen] = useState(false)
  const [state, action] = useActionState(SignInAction, {success: "", message: ""})

  if (state.success === true) {
    redirect("/actions")
  }
  return (
    <form action={action} method="POST"  className="flex flex-col  h-1/2 p-6 pt-10 gap-5 pb-2 m-4 min-w-80 rounded bg-slate-500">
        <div className="flex justify-between gap-2 items-center">
          <label htmlFor="uname">Username: </label>
          <input type="text" name="username" required id="uname" className="w-32 bg-slate-800 text-white rounded-lg p-2 box-border flex-grow" placeholder="username"/>
        </div>
        <div className="relative flex justify-between gap-2 items-center">
          <label htmlFor="pwd">Password: </label>
          <input type={isPwdSeen ? "text" : "password"} name="password" id="pwd" className=" text-white w-32 bg-slate-800 rounded-lg p-2 box-border flex-grow" placeholder="password" required/>
          <span onClick={() => setIsPwdSeen(!isPwdSeen)} className={`${isPwdSeen ? "blur-[1px]" : "blur-none"} absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer`}>👁️‍🗨️</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
            <label htmlFor="role" className="text-black text-sm italic"><span className="text-xl text-red-500">*</span> Enter admin password!</label>
            <input
                required placeholder="********" className="w-32 text-white pt-1 bg-black rounded h-6 pl-2 pr-2" type="password" name="admin_pwd" id="role"/>
          </div>
        <button type="submit" className="bg-slate-800 hover:bg-slate-900 mt-6">Log in</button>
        {!state.success && <span className="self-center text-red-900">{state.message}</span>}
    </form>
  )
}

export default LoginForm