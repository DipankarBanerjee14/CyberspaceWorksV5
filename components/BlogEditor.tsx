"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor, Bold, Italic, Underline, Heading,
  List, ListProperties, Link, Table, TableToolbar,
  Paragraph, Essentials, Undo, Image, ImageToolbar,
  ImageCaption, ImageResize, ImageUpload, BlockQuote,
  FontSize, FontColor,
} from "ckeditor5";
// @ts-expect-error — ckeditor5 CSS side-effect import
import "ckeditor5/ckeditor5.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogEditor({ value, onChange }: Props) {
  return (
    <div className="
      rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700
      shadow-sm
      [&_.ck-editor__editable]:min-h-[320px]
      [&_.ck-editor__editable]:text-gray-900
      [&_.ck-editor__editable]:dark:text-gray-100
      [&_.ck-editor__editable]:dark:bg-gray-900
      [&_.ck-toolbar]:dark:bg-gray-800
      [&_.ck-toolbar]:dark:border-gray-700
      [&_.ck-button]:dark:text-gray-300
      [&_.ck.ck-editor]:border-0
    ">
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials, Paragraph, Heading, Bold, Italic, Underline,
            List, ListProperties, Link, Table, TableToolbar,
            BlockQuote, FontSize, FontColor, Undo,
            Image, ImageToolbar, ImageCaption, ImageResize, ImageUpload,
          ],
          heading: {
            options: [
              { model: "paragraph" as const,  title: "Paragraph", class: "ck-heading_paragraph" },
              { model: "heading1" as const, view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
              { model: "heading2" as const, view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
              { model: "heading3" as const, view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
            ],
          },
          list: {
            properties: { styles: true, startIndex: true, reversed: true },
          },
          toolbar: {
            items: [
              "undo", "redo", "|",
              "heading", "|",
     "fontColor", "|",
              "bold", "italic", "underline", "|",
              "bulletedList", "numberedList", "|",
              "blockQuote", "insertTable", 
              
            ],
            shouldNotGroupWhenFull: true,
          },
          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
          },
          image: {
            toolbar: [
              "imageStyle:inline", "imageStyle:block", "imageStyle:side",
              "|", "toggleImageCaption", "imageTextAlternative",
            ],
          },
        }}
        data={value}
        onChange={(_, editor) => onChange(editor.getData())}
      />
    </div>
  );
}