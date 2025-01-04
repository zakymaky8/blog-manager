"use client"

import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

import { useRef } from "react";
import EditorTinyMce from "./EditorTinyMce";



function cap(word: string):string {
    return word[0].toUpperCase() + word.slice(1,).toLowerCase()
  }
  

type TStatus = "DRAFT" | "PUBLISHED";
type TProps = {
    postTitle: string,
    postContent: string,
    action: string,
    pageTitle: string,
    post_id: string,
    excerptContent: string,
    author: {
        firstname: string,
        lastname: string
    } | string
}

const CreatePostForm = ({post_id, postTitle, postContent, action, pageTitle, author, excerptContent}: TProps) => {
    const [status, setStatus] = useState<TStatus>("DRAFT");
    const [title, setTitle] = useState("")
    const [excerpt, setExcerpt] = useState("")
    const router = useRouter()
    const editorRef = useRef<Editor | null>(null);


    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);

        const getTokenFromCookies = () => {
            const cookies = document.cookie.split("; ");
            const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
            return tokenCookie ? tokenCookie.split("=")[1] : null;
        };
        const token = getTokenFromCookies();
        console.log(token);
        
        const blogData = {
            title: formData.get("title"),
            excerpt: formData.get("excerpt"),
            content: editorRef.current?.getContent(),
        }
        console.log(blogData);
        
        try {
            const url = action.toLowerCase() === "update" ?
                            `http://localhost:3456/posts/${post_id}/${action.toLowerCase()}`:
                            `http://localhost:3456/create_post/${status}`;
    
            const method = action.toLowerCase() === "update" ? "PUT" : "POST"
            console.log(url)
            const res = await fetch( url, {
                                        method: method,
                                        headers: {
                                            "authorization": `Bearer ${token}`,
                                            "content-type": "application/json"
                                        },
                                        body: JSON.stringify(blogData)
                                    })
            if (res.ok) {
                if (action.toLowerCase() === "update") {
                    router.push("/update");
                } else {
                    router.push("/read");
                }
            } else {
                router.replace("/admin-login")
            }
            
        } catch  {
            throw new Error("Unauthorized: faild to create a post!")
        }
    }
    return (
      <form
        onSubmit={handleSubmit}
          className="text-black flex flex-wrap flex-col items-center justify-between gap-6 p-2 flex-auto">
          <h1 className="text-2xl font-bold border-b-[1px] border-red-400">{pageTitle}</h1>
          {typeof author !== "string" && <span>Authored By: {cap(author.firstname)} {cap(author.lastname)}</span>}
          <div className="flex gap-2 flex-col">
              <label htmlFor="title">👉 Blog Title: </label>
              <input
                  className="font-bold text-lg min-w-[400px] h-[40px] box-border p-4 focus:outline-none bg-transparent border-b-[1px] border-red-500"
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value ? e.target.value.toUpperCase()[0] + e.target.value.slice(1,): "")}
                  value={title || postTitle}
                  required
                  placeholder="Write blog title here ..."/>
          </div>

          <div className="flex gap-2 flex-col">
              <label htmlFor="excerpt">👉 Blog excerpt on cards: </label>
              <textarea
                  className="font-medium h-[200px] resize-none text-lg min-w-[400px] box-border p-4 focus:outline-none bg-transparent border-b-[1px] border-red-500"
                  name="excerpt"
                  id="excerpt"
                  rows={70}
                  cols={20}
                  onChange={(e) => setExcerpt(e.target.value)}
                  value={excerpt || excerptContent}
                  required
                  placeholder="Write an excerpt to be displayed on cards ..."></textarea>
          </div>

          <div className="flex gap-2 flex-col relative">
              <label htmlFor="content">👉 Write Your idea</label>
              <EditorTinyMce postContent={postContent} editorRef ={editorRef} />
          </div>
          <div className="text-sm flex w-96 justify-between">
              {action.toLowerCase() !== "update" && <button type="submit" onClick={() => setStatus("DRAFT")}>📝 Save As Draft</button>}
              <button type="submit" onClick={() => action.toLowerCase()==="update" ? null : setStatus("PUBLISHED")}>{action}</button>
          </div>
      </form>
    )
  }
  
  export default CreatePostForm
