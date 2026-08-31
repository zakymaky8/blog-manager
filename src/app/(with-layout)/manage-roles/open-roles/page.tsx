import React from 'react'
import { fetchAllOpenRoles } from '@/actions/fetchsAction'
import Inconvienence from '@/app/_lib/Inconveinence';
import { redirect } from 'next/navigation';
import { TOpenRole } from '@/utils/type';
import { getAccessToken } from '@/utils/server-only';
import { decideWhichFormat } from '@/app/_lib/utils';
import DeleteOpenRoleButton from './_cpts/DeleteOpenRole';
import CreateOpenRole from './_cpts/CreateOpenRole';
import EditOpenRole from './_cpts/EditOpenRole';

const OpenRolesPage = async () => {

    const token = await getAccessToken()

    if (!token) {
        redirect("/admin-login")
    }

    const { data:openRoles, message, redirectUrl, status, success } = await fetchAllOpenRoles();

    if (!success || !status) {
        return <Inconvienence message={ message } />
    }

    if (!success && (redirectUrl !== null)) {
        redirect(redirectUrl)
    }

  return (
    <div className="w-[340px] sm:w-[450px] md:w-[740px] flex flex-col items-center gap-10 text-black mb-20">
        <CreateOpenRole />
        {
            openRoles.length >= 1 ? openRoles.map( (openRole: TOpenRole) => {
                return (
                    <div key={openRole.open_id} className="w-full shadow p-4 px-6 rounded flex flex-col justify-between gap-3 border-[#898989] border-[1px]">
                        <div className="flex justify-between items-center">
                            <h3 className='text-[22px] font-bold'>{ openRole.title }</h3>
                            <span className={`text-[11px] ${ openRole.isActive ? "text-green-900" : "text-gray-700"} text-green-900`}>{ openRole.isActive ? "Available" : "Not Available" }</span>
                        </div>
                        <div className="flex flex-col self-start">
                            <p>{ openRole.description }</p>
                        </div>
                        <p className='text-[12px]'><strong>Note: </strong>{ openRole.notes }</p>
                        <div className="text-[10pt] flex justify-between items-center">
                            <span><strong className="font-medium">Vacant Slots: </strong> <span className="text-slate-600">{ openRole.slots }</span></span>
                            <span><strong className="font-medium">Role Needed: </strong> <span className="text-slate-600">{ openRole.role.name }</span></span>
                        </div>

                        <div className='flex text-[9pt] gap-7 mt-4'>
                            <span className="text-slate-600"> Created: { decideWhichFormat(openRole.createdAt)}</span>
                            <span className="text-slate-600"> Updated: { decideWhichFormat(openRole.updatedAt)}</span>
                        </div>

                        <div className='flex justify-between mt-5 text-[9pt] gap-6 items-center'>
                            <EditOpenRole openId={openRole.open_id} description={ openRole.description } isActive={openRole.isActive} notes={openRole.notes} role={openRole.role.name} slots={openRole.slots} title={ openRole.title } />
                            <DeleteOpenRoleButton openId={openRole.open_id} />
                        </div>

                    </div>
                )
            } )
        : <p className='my-20 text-gray-600'>No Open Role Found</p>}
        
    </div>
  )
}

export default OpenRolesPage