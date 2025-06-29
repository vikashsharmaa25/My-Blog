"use client";

import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const JoditTextEditor = ({ value, onChange }: any) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing your blog content...",
      height: 400,
      toolbar: true,
      spellcheck: true,
      language: "en",
      toolbarButtonSize: "middle" as "middle",
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "superscript",
        "subscript",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "file",
        "video",
        "table",
        "link",
        "|",
        "left",
        "center",
        "right",
        "justify",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        "symbol",
        "fullsize",
        "print",
        "about",
      ],
      uploader: {
        insertImageAsBase64URI: true,
        url: "/api/upload",
      },
      removeButtons: ["brush", "file"],
      showPlaceholder: true,
      style: {
        font_size: "14px",
        font_family: "Arial, sans-serif",
      },
    }),
    []
  );

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onBlur={(newContent: any) => onChange(newContent)}
        onChange={() => {}}
      />
    </div>
  );
};

export default JoditTextEditor;
