import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor), { ssr: false });

const EditorTinyMce = ({ editorRef, postContent }) => {
  return (
    <Editor
      apiKey="6ikkbo7faw7k6kqopvhmt25f1i4z8aok171git76kcjhb7pw"
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
        images_upload_handler: async (blobInfo, success, failure) => {
          // Custom image upload handler
          const formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());

          try {
            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            success(data.location); // Replace with the URL of the uploaded image
          } catch (error) {
            failure("Image upload failed: " + error.message);
          }
        },
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
