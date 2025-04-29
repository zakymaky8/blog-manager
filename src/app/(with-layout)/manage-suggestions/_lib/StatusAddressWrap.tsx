"use client"

import { TPost, TSuggestions } from "@/app/_lib/type";
import AddressedByPosts from "./AddressedByPosts";
import UpdateSuggStatus from "./UpdateSuggStatus";
import { useState } from "react";

const StatusAddressWrap = ({ suggestion, posts }: { suggestion: TSuggestions, posts: TPost[]}) => {
    const [statuss, setStatuss] = useState(suggestion.status ?? "PENDING");
  return (
    <>
        {(suggestion.status !== "ADDRESSED" && posts.length > 0) && <AddressedByPosts posts={posts}  suggestion={suggestion} setStatuss={setStatuss} />}
        <UpdateSuggStatus suggestion={suggestion} statuss={statuss} setStatuss={setStatuss} />
    </>
  )
}

export default StatusAddressWrap