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
    <form action={action} method="POST"  className="flex flex-col  border-2 h-1/2 p-8 gap-5  m-4 max-w-96 rounded-xl bg-slate-500">
        <div>
          <label htmlFor="uname">Username: </label>
          <input type="text" name="username" required id="uname" className="w-32 bg-slate-800 rounded-lg p-2 box-border" placeholder="username"/>
        </div>
        <div className="relative">
          <label htmlFor="pwd">Password: </label>
          <input type={isPwdSeen ? "text" : "password"} name="password" id="pwd" className="w-32 bg-slate-800 rounded-lg p-2 box-border" placeholder="password" required/>
          <span onClick={() => setIsPwdSeen(!isPwdSeen)} className={`${isPwdSeen ? "blur-[1px]" : "blur-none"} absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer`}>👁️‍🗨️</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
            <label htmlFor="role" className="text-black text-sm italic"><span className="text-xl text-red-500">*</span> Enter admin password!</label>
            <input
                required className="w-28 bg-slate-800 rounded-[16px] pl-2 pr-2" type="password" name="admin_pwd" id="role"/>
          </div>
        <button type="submit">Log in</button>
        {!state.success && <span className="self-center text-red-900">{state.message}</span>}
    </form>
  )
}

export default LoginForm
