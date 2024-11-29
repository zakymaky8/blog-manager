"use client"

import { useState } from "react"

const CreatePostForm = () => {

    const [characters, setCharacter] = useState("")


    return (
      <form
          action="/create_post"
          method="POST"
          className="text-black flex flex-wrap flex-col items-center justify-between gap-5 p-2 flex-auto">
          <h1 className="text-2xl font-bold border-b-[1px] border-red-400">Create Blog</h1>
          <div className="flex gap-2 flex-col">
              <label htmlFor="title">👉 Blog Title: </label>
              <input
                  className="font-bold text-lg min-w-[400px] h-[40px] box-border p-4 focus:outline-none bg-transparent border-b-[1px] border-red-500"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="write blog title here ..."/>
          </div>
  
          <div className="flex gap-2 flex-col relative">
              <label htmlFor="content">👉 Write Your idea</label>
              <textarea
                  className="min-h-96 min-w-96 text-xs p-4 focus:outline-none bg-slate-200 rounded-md resize-none"
                  name="content"
                  onChange={(e)=>setCharacter(e.target.value)}
                  value={characters}
                  id="content"
                  placeholder="your idea here ..."></textarea>
                  <span className="absolute -bottom-4 right-5 text-[10px] text-green-900">{characters.length} characters</span>
          </div>
          <div className="text-sm">
              <label htmlFor="files">👉 Upload images: </label>
              <input type="file" name="files" id="files" multiple/>
          </div>
          <div className="text-sm flex w-96 justify-between">
              <button type="submit">📝 Save As Draft</button>
              <button type="submit">📢 Publish</button>
          </div>
      </form>
    )
  }
  
  export default CreatePostForm