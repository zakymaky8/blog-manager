import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor), { ssr: false });




const EditorTinyMce = ({editorRef, postContent}) => {
  return (
            <Editor
                apiKey='6ikkbo7faw7k6kqopvhmt25f1i4z8aok171git76kcjhb7pw'
                onInit={(evt, editor) => editorRef.current = editor}
                id="zekaryas"
                initialValue={postContent}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    content_css: 'default',
                    toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                />
  )
}

export default EditorTinyMce