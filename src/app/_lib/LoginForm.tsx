"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState("");
  const [isPwdSeen, setIsPwdSeen] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
      admin_pwd: formData.get("admin_pwd")
    };

    try {
      const res = await fetch("http://localhost:3456/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        setError("Invalid Credential");
        const errMsg:string = await new Promise(resolve => setTimeout(() => resolve(""), 1500))
        setError(errMsg)
        router.replace("/admin-login")
        return;
      }

      const { token } = await res.json();
      console.log(token)
      document.cookie = `token=${token}; path=/; secure`
      router.replace("/actions")
      await new Promise(() => setTimeout(() => window.location.reload(), 1000))


    } catch {
      setError("Invalid credential");
    }
  };
  return (
    <form onSubmit={handleSubmit} method="POST"  className="flex flex-col  border-2 h-1/2 p-8 gap-5  m-4 max-w-96 rounded-xl bg-slate-500">
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
            <label htmlFor="role" className="text-black text-sm italic"><span className="text-xl text-red-500">*</span> Enter admin password!</label> {/* <span className="text-yellow-500 text-[10px]">optional</span>*/}
            <input
                required className="w-28 bg-slate-800 rounded-[16px] pl-2 pr-2" type="password" name="admin_pwd" id="role"/>
          </div>
        <button type="submit">Log in</button>
        {error && <span className="self-center text-red-900">{error}</span>}
    </form>
  )
}

export default LoginForm

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19pZCI6IjkxOTYyYmZmLTY4NGEtNGU5ZC04MmYwLWI0OWQ2ZGY3MWJmNyIsImZpcnN0bmFtZSI6Ilpla2FyeWFzIiwibGFzdG5hbWUiOiJNZWt1YW5pbml0IiwidXNlcm5hbWUiOiJ6YWt5ZGV2IiwicGFzc3dvcmQiOiIkMmIkMTAkVXFaR0ZWSVNwSzR1SUoyYUNuR2x6dWFxRm8xby5mb0NJcTY0U29oOVFncE9FWUM3SGF6b2EiLCJSb2xlIjoiQURNSU4iLCJpc1dhcm5lZCI6ZmFsc2UsImlhdCI6MTczOTA0Njg2OSwiZXhwIjoxNzM5MDU0MDY5fQ.XlO0YrNa6BZGtVZS_14K_5nQ_EUGiAZMiuBwm3neO9k