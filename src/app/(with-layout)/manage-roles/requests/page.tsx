import { fetchRequests } from '@/actions/fetchsAction'
import Inconvienence from '@/app/_lib/Inconveinence'
import { cap, decideWhichFormat } from '@/app/_lib/utils'
import { getAccessToken } from '@/utils/server-only'
import { TRequest } from '@/utils/type'
import { redirect } from 'next/navigation'
import pp from  "../../../../../public/person_icon.svg"
import Link from 'next/link'
import DeleteRoleRequestButton from './_cpts/DeleteRoleRequest'
import AcceptRoleRequest from './_cpts/AcceptRoleRequest'
import RejectRoleReuest from './_cpts/RejectRequest'
import Image from 'next/image'

const ManageRoleRequestPage = async () => {

    const token = await getAccessToken()
    if (!token) {
      redirect("/admin-login")
    }
    const myReqRes = await fetchRequests()

    const { data, message, redirectUrl, success } = myReqRes;

    if (!success && redirectUrl !== null) redirect(redirectUrl)
    if (!success) {
        return (
          <Inconvienence message={ message } />
        )
    }
  return (
    <div className='text-black flex flex-col gap-8 mb-20'>
      { data.map((request: TRequest) => {
                return (
                <li key={request.request_id} className="w-[320px] sm:w-[460px] md:w-[740px] shadow p-4 px-6 rounded flex flex-col gap-3 border-[#898989] border-[1px]">

                    <div className="flex justify-between items-center">
                        <Link href={`/user/${request.user.users_id}`} className="flex gap-2 items-center no-underline hover:underline text-black">
                          <Image src={request.user.profilePic ? JSON.parse(request.user.profilePic).secure_url : pp.src} alt="profile picture" className="w-10 h-10 rounded-[50%]" unoptimized />
                          <h3 className="m-1 text-base">{cap(request.user.firstname??"--") + " " + cap(request.user.lastname ?? "--")}</h3>
                      </Link>
                      <span className={`text-sm ${ request.status === "APPROVED" ? 'text-green-700' : request.status === 'REJECTED' ? 'text-red-700'  : 'text-gray-500' }`}>{ request.status ?? "Pending" }</span>
                    </div>
                    <div className='flex flex-col gap-2 mt-4 text-[12px]'>
                      <span>Requested Role: <strong className='text-slate-600 font-thin'>{ request.role.name }</strong></span>
                      <span>Current Role: <strong className='text-slate-600 font-thin'>{ request.user.Role }</strong></span>
                    </div>
                    
                    <div className="text-[10pt] flex flex-col gap-4">
                      <div>
                        <p style={{lineHeight: 1.5}}><strong className="text-slate-600">VALUE PROPOSED:</strong> <br /> { request.value_proposition }</p>
                        <p><strong className="text-slate-600">CONTACT NOTE:</strong> <br /> { request.contact }</p>
                      </div>
                      <div className='flex justify-between'>
                        <span className="text-slate-600"> Created: { decideWhichFormat(request.createdAt)}</span>
                        <span className="text-slate-600"> Updated: { decideWhichFormat(request.updatedAt)}</span>
                      </div>
                      <div className='flex justify-between mt-5'>
                        <div className='flex gap-2'>
                          <RejectRoleReuest request={ request } />
                          <AcceptRoleRequest request={ request } />

                        </div>
                        <DeleteRoleRequestButton requestId={request.request_id} />
                      </div>
                    </div>
                </li>
                )
              }) }
    </div>
  )
}

export default ManageRoleRequestPage