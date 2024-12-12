"use client"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


const SignUpForm = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const formData = new FormData(e.target as HTMLFormElement);
      const userData = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        username: formData.get("username"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
        admin_pwd: formData.get("admin_pwd")
      }
      console.log(userData);

      try {
        const response =  await fetch("http://localhost:3456/admin-register", {
          headers: {
            "content-type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          router.replace("/admin-signup")
          setError(response.status + " " + response.statusText)
        }
        const userD = await response.json();
        console.log(userD);
        router.replace("/admin-login")

      } catch {
        throw new Error("Failed to register user!")
      }
    }

    return (
      <form onSubmit={handleSubmit} method="POST" className="flex flex-wrap border-2 h-1/2 p-8 gap-8 justify-center m-4 max-w-96 rounded-xl bg-slate-500">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="fname">First Name: </label>
            <input
                required
                type="text"
                name="firstname"
                id="fname"
                placeholder="first name"
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div>
            <label htmlFor="lname">Last Name: </label>
            <input
                required
                type="text"
                name="lastname"
                id="lname"
                placeholder="last name"
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
        </div>
        <div  className="flex flex-col gap-4">
          <div>
            <label htmlFor="uname">Username: </label>
            <input
                required
                type="text"
                name="username"
                id="uname"
                placeholder="username"
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div>
            <label htmlFor="pwd">Password: </label>
            <input
                required
                type="password"
                name="password"
                id="pwd"
                placeholder="password"
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div>
            <label htmlFor="cpwd">Confirm Password: </label>
            <input
                required
                type="text"
                name="confirm_password"
                id="cpwd"
                placeholder="confirm"
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <label htmlFor="role" className="text-black italic"><span className="text-2xl text-red-500">*</span> Enter admin password!</label> {/* <span className="text-yellow-500 text-[10px]">optional</span>*/}
            <input
                required className="w-28 bg-slate-800 rounded-[16px] pl-2 pr-2" type="password" name="admin_pwd" id="role"/>
          </div>
        </div>
        <button type="submit" className="self-end">Register</button>
        <span className="text-red-500">{error}</span>
      </form>
    )
  }
  
  export default SignUpForm