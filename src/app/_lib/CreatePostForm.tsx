"use client"

import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import {  useActionState, useEffect, useState } from "react"

import { useRef } from "react";
import EditorTinyMce from "./EditorTinyMce";
import { cap } from "./utils";
import { TStatus } from "@/utils/type";
import { createPostAction } from "@/actions/createPost";
import { updatePostAction } from "@/actions/updatePost";

type TPriority = "LOW" | "MEDIUM" | "HIGH"
type TProps = {
    postTitle: string,
    postContent: string,
    action: string,
    pageTitle: string,
    post_id: string,
    excerptContent: string,
    readTime: string,
    priority: TPriority,
    suggestion_id: string,
    author: {
        firstname: string,
        lastname: string
    } | string
}

const CreatePostForm = ({post_id, postTitle, postContent, action, pageTitle, author, excerptContent, readTime, priority, suggestion_id}: TProps) => {
    const [status, setStatus] = useState<TStatus>("DRAFT");
    const [title, setTitle] = useState(postTitle ? postTitle : "")
    const [excerpt, setExcerpt] = useState(excerptContent ? excerptContent : "")
    const [timeRead, setTimeRead] = useState(readTime ? readTime : 0)
    const [priorty, setPriorty] = useState(priority ? priority : "MEDIUM")
    const router = useRouter()
    const editorRef = useRef<Editor | null>(null);

    const actionWrapper =
        function(
            prev:{
                  success: boolean,
                  message: string,
                  redirectUrl: string | null
                },
            formData: FormData) {

        // @ts-expect-error expected error
        const editorContent = editorRef.current?.getContent()
        return action.toLowerCase() === "update" ?
                updatePostAction(post_id, action, editorContent, formData) :
                createPostAction(status, editorContent, suggestion_id, formData)
    }
    const [state, formStateAction ] = useActionState(actionWrapper, {success: "", message: "", redirectUrl: ""});

    if (!["", null].includes(state.redirectUrl)) {
        router.push(state.redirectUrl!)
    }

    useEffect(() => {
        if (state.success === true) {
            router.refresh();
        }
        state.success = ""
    }, [state, router]);

    return (
      <form
          action={formStateAction}
          className="text-black flex flex-wrap flex-col items-center justify-between gap-6 p-2 flex-auto">
          <h1 className="text-2xl font-bold border-b-[1px] border-red-400">{pageTitle}</h1>
          {typeof author !== "string" && <span>Authored By: {cap(author.firstname)} {cap(author.lastname)}</span>}
          
          <div className="flex gap-2 flex-col">
              <label htmlFor="title"  className="text-slate-500 mb-6 mt-10">👉 Blog Title: </label>
              <input
                  className="font-bold text-xl min-w-[400px] h-[40px] box-border p-4 focus:outline-none bg-transparent border-b-[1px] border-red-500"
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value ? e.target.value.toUpperCase()[0] + e.target.value.slice(1,): "")}
                  value={title}
                  required
                  placeholder="Write blog title here ..."/>
          </div>

          <div className="flex gap-2 flex-col">
              <label htmlFor="excerpt" className="text-slate-500 mb-6 mt-10">👉 Blog excerpt on cards: </label>
              <textarea
                  className="italic text-slate-900  font-sans h-[180px] bg-slate-200 resize-none text-sm min-w-[400px] p-4"
                  name="excerpt"
                  id="excerpt"
                  rows={70}
                  cols={20}
                  onChange={(e) => setExcerpt(e.target.value)}
                  value={excerpt}
                  style={{scrollbarWidth: "none"}}
                  required
                  placeholder="Write an excerpt to be displayed on cards ..."></textarea>
          </div>

          <div className="flex gap-2 flex-col">
              <label htmlFor="priority" className="text-slate-500 mb-6 mt-10">Post Significance: </label>
              <select
                value={priorty}
                name="priority"
                id="priority"
                onChange={(e) => setPriorty(e.target.value as TPriority)}
                className="bg-slate-200 p-2 rounded cursor-pointer hover:bg-[#c4c9d0]"
                >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
          </div>

          <div className="flex gap-2 flex-col">
            <label htmlFor="time_read"  className="text-slate-500 mb-6 mt-10">Reading time in min: </label>
            <input
                value={timeRead}
                onChange={(e) => setTimeRead(e.target.value)}
                className=" text-slate-900 font-sans bg-slate-200 text-sm w-[70px] p-2"
                type="number"
                required
                min={0}
                name="time_read"
                id="time_read"
            />
          </div>

          <div className="flex gap-2 flex-col relative ">
              <label htmlFor="content"  className="text-slate-500 mb-6 mt-10">👉 Write Your idea </label>
              <EditorTinyMce postContent={postContent} editorRef ={editorRef} />
          </div>
          {state.success === false && <span className="text-red-700 italic text-[14px]">{state.message}</span>}
          <div className="text-sm flex w-96 justify-between my-20">
              {
                action.toLowerCase() !== "update" &&
                    <button
                        type="submit"
                        className="bg-yellow-950 py-3 px-5"
                        onClick={() => setStatus("DRAFT")}
                         >📝 Save As Draft
                    </button>
              }

              <button
                    type="submit"
                    className="bg-green-950 py-3 px-5"
                    onClick={() => action.toLowerCase()==="update" ? null : setStatus("PUBLISHED")}
                     >{action}
              </button>
          </div>
      </form>
    )
  }

  export default CreatePostForm
