"use client"

import { useState } from "react"
import CreateOpenRoleForm from "./CreateOpenRoleForm"




const CreateOpenRole = () => {

    const [isShow, setIsShow] = useState(false)
      

  return (
    <>
        <button onClick={() => setIsShow(!isShow)} className="bg-green-800 py-[10px]  px-10 self-end"><strong>+</strong> Open New Role</button>
    {
        isShow && <CreateOpenRoleForm openId="" type="create" description="" isActive={false} notes="" role="" slots={0} title="" setIsShow={setIsShow} />
    }



    <div
        onClick={()=>{
            setIsShow(false)
        }}
        className={`
            fixed right-0 top-0 w-screen z-10
            min-h-screen bg-[#07283e] opacity-80
            ${isShow ? "block" : "hidden"}
            `}>
    </div>
    </>
  )
}

export default CreateOpenRole