"use client"



import dynamic from "next/dynamic";

// @ts-expect-error error expected

const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor), { ssr: false });

// @ts-expect-error expected error
const EditorTinyMce = ({ editorRef, postContent }) => {
  return (
    <Editor
      apiKey={`${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}`}
      onInit={(evt, editor) => (editorRef.current = editor)}
      id="zekaryas"
      initialValue={postContent}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
          "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
          "insertdatetime", "media", "table", "code", "help", "wordcount", 
          "imagetools", "emoticons", "codesample","template", "autosave",
           "spellchecker", "comments"
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic underline strikethrough forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
          "link image media | codesample table | emoticons charmap | " +
          "fontfamily fontsize | removeformat | help | comments | spellchecker",

        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        font_formats:
          "Arial=arial,helvetica,sans-serif;" +
          "Courier New=courier new,courier,monospace;" +
          "Georgia=georgia,palatino,serif;" +
          "Tahoma=tahoma,arial,helvetica,sans-serif;" +
          "Verdana=verdana,geneva,sans-serif;",
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
        table_default_attributes: {
          border: "1",
        },
        table_default_styles: {
          width: "100%",
          borderCollapse: "collapse",
        },
      }}
    />
  );
};

export default EditorTinyMce;
