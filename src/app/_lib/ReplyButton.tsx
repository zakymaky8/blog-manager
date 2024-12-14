"unse client"

import Image from "next/image";
import replyBtn from "../../../public/reply.svg"
import { Dispatch, SetStateAction } from "react";
const ReplyButton = ({setIsReply}: {setIsReply:  Dispatch<SetStateAction<boolean>>}) => {
  return (
    <button onClick={() => setIsReply(true)}  className="bg-slate-300 p-0">
        <Image title="reply comment" src={replyBtn} alt="reply button"  className="h-[22px] w-[22px] rounded-[50%]"/>
    </button>
  )
}

export default ReplyButton