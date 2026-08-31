import { createOpenRole } from '@/actions/createOpenRole'
import { updateOpenRoleAction } from '@/actions/updateOpenRole'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useActionState, useEffect, useState } from 'react'


type TProps = {
    openId: string,
    title: string,
    description: string | null,
    slots: number,
    notes: string,
    isActive: boolean,
    role: string | ("ADMIN" | "EDITOR" | "CREATOR"),
    setIsShow: Dispatch<SetStateAction<boolean>>,
    type: "create" | "edit"

}



const CreateOpenRoleForm = ({ openId, title, description, slots, notes, isActive, role, setIsShow, type }: TProps) => {

    const [ttl, setTitle] = useState(title ? title : "")
    const [descrip, setDescription] = useState(description ? description : "")
    const [slts, setSlots] = useState(slots ? slots : 0)
    const [nts, setNts] = useState(notes ? notes : "")
    const [rl, setRole] = useState(role ? role : "")
    const [isActv, setIsActv] = useState<"on" | "off">(isActive ? "on" : "off")

    const updateActionWrapper = (prevState: { success: boolean, message: string, redirectUrl: string | null }, formData: FormData) => {
        return updateOpenRoleAction(openId, formData)
    }
        
    const [state, action] = useActionState(type === "create" ? createOpenRole : updateActionWrapper, { success: "", message: "", redirectUrl: "" })
    const router = useRouter()
    

    if(state.success === false && state.redirectUrl === null ) {
        alert(state.message)
    }

    useEffect(() => {
        if (state.success === true) {
            router.refresh();
            setIsShow(false)
        }
        state.success = ""
    }, [state, router]);


    
  return (
        <form
            action={action}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 shadow-lg flex flex-col gap-8 bg-[#c8daf2] p-4 rounded w-[380px] sm:w-[500px] md:w-[600px] max-h-[90vh] overflow-y-scroll`}
        >

        <div className='flex flex-col gap-4'>
            <label htmlFor="title">Title</label>
            <input
                name="title"
                id="title"
                type="text"
                value={ttl}
                onChange={(e) => setTitle(e.target.value)}
                className='p-2 py-3 text-[15px] bg-[#b8cdea] rounded placeholder:text-gray-600 resize-none border-[1px] border-gray-500'
                placeholder='Title the situation ...'
                required
            />
        </div>

        <div className='flex flex-col gap-4'>
            <label htmlFor="description">Description</label>
            <input
                name="description"
                id="description"
                type="text"
                required
                value={descrip}
                onChange={(e) => setDescription(e.target.value)}
                className='p-2 py-3 text-[15px] bg-[#b8cdea] rounded placeholder:text-gray-600 resize-none border-[1px] border-gray-500'
                placeholder='Describe the situation ...'
            />
        </div>

        <div className='flex flex-col gap-4'>
            <label htmlFor="slots">Slots</label>
            <input 
                value={slts}
                onChange={(e) => setSlots(+e.target.value)}
                name="slots"
                type="number"
                required
                id="slots"
                placeholder="Available slots"
                className='p-2 py-3 text-[15px] bg-[#b8cdea] rounded placeholder:text-gray-600 resize-none border-[1px] border-gray-500'

            />
        </div>


        <div className='flex flex-col gap-4'>
            <label htmlFor="role">Select Role</label>
            <select
                required
                name="role"
                id="role"
                className='self-center
                p-2 rounded
                bg-[#b8cdea] w-full'
                value={rl}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="ADMIN">Admin</option>
                <option value="EDITOR">Editor</option>
                <option value="CREATOR">Creator</option>
            </select>
        </div>

        <div className='flex flex-col gap-4'>
            <label htmlFor="notes">Notes for Applicants</label>
            <textarea
                name="notes"
                id="notes"
                required
                value={nts}
                onChange={(e) => setNts(e.target.value)}
                className='p-2 py-3 text-[15px] h-[130px] bg-[#b8cdea] rounded placeholder:text-gray-600 resize-none border-[1px] border-gray-500'
                placeholder='Notes for applicant...'
            ></textarea>
        </div>

        <div className='flex gap-4 items-center'>
            <input
                onChange={(e) => setIsActv(e.target.checked ? "on" : "off")}
                type="checkbox"
                checked={isActv === "on"  ? true : false }
                name="isActive"
                id="isActive"
                className='accent-slate-700 w-5 h-5'
                />
            <label htmlFor="isActive">Mark as Active</label>
        </div>
        <span className={`text-center mt-2 italic ${state.success === true ? "text-green-600" : "text-red-600" } text-[14px]`}>{state.message}</span>

        <button type="submit" className='hover:opacity-75 py-3 hover:text-yellow-500 mt-10'>Open Role</button>

    </form>
  )
}

export default CreateOpenRoleForm