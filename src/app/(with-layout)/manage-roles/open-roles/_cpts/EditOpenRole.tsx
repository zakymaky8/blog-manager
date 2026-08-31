"use client"

import React, { useState } from 'react'
import CreateOpenRoleForm from './CreateOpenRoleForm'



type TProps = {
    openId: string,
    title: string,
    description: string | null,
    slots: number,
    notes: string,
    isActive: boolean,
    role: string | ("ADMIN" | "EDITOR" | "CREATOR"),

}


const EditOpenRole = ({openId, title, description, slots, notes, isActive, role}: TProps) => {


    const [isShow, setIsShow] = useState(false)


  return (


    <>
        <button className="px-4 py-[5px] text-yellow-700 border-[1px] hover:border-[2px] border-black bg-transparent" onClick={() => setIsShow(true)}>EDIT</button>
    {
        isShow && <CreateOpenRoleForm openId={openId} type='edit' description={description} isActive={isActive} notes={notes} role={role} slots={slots} title={title} setIsShow={setIsShow} />
    }


    <div
        onClick={() => {
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



/*


  
      

  return (
    <>
        <button onClick={() => setIsShow(!isShow)} className="bg-green-800 py-[10px]  px-10 self-end"><strong>+</strong> Open New Role</button>
    {
        isShow && <CreateOpenRoleForm description="" isActive={false} notes="" role="" slots={0} title="" setIsShow={setIsShow} />
    }


  )


*/

export default EditOpenRole