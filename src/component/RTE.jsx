import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom";

// IMPORTANT CSS FIXES
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/content/default/content.min.css";
import "tinymce/skins/ui/oxide/content.css";

import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/code";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/charmap";
import "tinymce/plugins/wordcount";

const RTE = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,

              // Required for TinyMCE 7/8 local use
              license_key: "gpl",

              plugins: [
                "link",
                "lists",
                "image",
                "table",
                "code",
                "advlist",
                "autolink",
                "charmap",
                "wordcount",
              ],

              toolbar:
                "undo redo | bold italic underline | link image | " +
                "alignleft aligncenter alignright | bullist numlist | code",

              content_style:
                "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }",
            }}
          />
        )}
      />
    </div>
  );
};

export default RTE;
