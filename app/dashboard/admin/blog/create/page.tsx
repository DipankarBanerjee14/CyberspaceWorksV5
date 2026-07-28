"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ImageIcon, FileText, Tag, Link2, Code2, Type, Loader2, Send } from "lucide-react";

const BlogEditor = dynamic(() => import("@/components/BlogEditor"), { ssr: false });

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {hint && (
          <span className="text-xs text-gray-400 dark:text-gray-500">{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Input / Textarea base classes ────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-gray-200 dark:border-gray-700 " +
  "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 " +
  "placeholder:text-gray-400 dark:placeholder:text-gray-600 " +
  "px-4 py-3 text-sm outline-none " +
  "focus:ring-2 focus:ring-indigo-500 focus:border-transparent " +
  "transition-all duration-150 shadow-sm";

// ─── Section card ─────────────────────────────────────────────────────────────

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60">
        <span className="text-indigo-500">{icon}</span>
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wide uppercase">
          {title}
        </h3>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

// ─── Image upload preview ─────────────────────────────────────────────────────

function ImageUpload({
  image,
  onChange,
}: {
  image: File | null;
  onChange: (f: File | null) => void;
}) {
  const preview = image ? URL.createObjectURL(image) : null;

  return (
    <label className="
      flex flex-col items-center justify-center gap-3 cursor-pointer
      rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700
      bg-gray-50 dark:bg-gray-800/40
      hover:border-indigo-400 dark:hover:border-indigo-500
      hover:bg-indigo-50/40 dark:hover:bg-indigo-900/10
      transition-all duration-150 overflow-hidden
      min-h-[160px] relative
    ">
      {preview ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Cover preview" className="w-full h-48 object-cover" />
          <span className="absolute bottom-2 right-3 text-xs text-white bg-black/50 rounded-full px-2 py-0.5">
            Click to change
          </span>
        </>
      ) : (
        <>
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Upload cover image
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              PNG, JPG, WebP — max 5 MB
            </p>
          </div>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    permalink: "",
    schema: "",
  });

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      if (image) data.append("image", image);
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      const res = await fetch("/api/blog/create", { method: "POST", body: data });
      const result = await res.json();
      alert(result.message || "Published!");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* ── Page heading ── */}
        <div className="mb-2">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Create New Blog Post
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Fill in the details below and publish when ready.
          </p>
        </div>

        {/* ── Basic Info ── */}
        <Section icon={<Type className="w-4 h-4" />} title="Basic Info">
          <Field label="Post Title" required>
            <input
              placeholder="e.g. How to Build a Next.js Blog"
              className={inputCls}
              value={form.title}
              onChange={set("title")}
            />
          </Field>

          <Field label="Cover Image" hint="Recommended 1200×630 px">
            <ImageUpload image={image} onChange={setImage} />
          </Field>
        </Section>

        {/* ── Content ── */}
        <Section icon={<FileText className="w-4 h-4" />} title="Content">
          <Field label="Body" required>
            <BlogEditor
              value={form.content}
              onChange={(value) => setForm((f) => ({ ...f, content: value }))}
            />
          </Field>
        </Section>

        {/* ── SEO ── */}
        <Section icon={<Tag className="w-4 h-4" />} title="SEO & Meta">
          <Field label="Meta Title" hint={`${form.metaTitle.length}/60`}>
            <input
              placeholder="Short, keyword-rich title for search engines"
              className={inputCls}
              maxLength={60}
              value={form.metaTitle}
              onChange={set("metaTitle")}
            />
          </Field>

          <Field label="Meta Description" hint={`${form.metaDescription.length}/160`}>
            <textarea
              placeholder="One or two sentences that describe the post"
              className={`${inputCls} resize-none`}
              rows={3}
              maxLength={160}
              value={form.metaDescription}
              onChange={set("metaDescription")}
            />
          </Field>

          <Field label="Keywords" hint="Comma-separated">
            <input
              placeholder="nextjs, react, tutorial"
              className={inputCls}
              value={form.keywords}
              onChange={set("keywords")}
            />
          </Field>
        </Section>

        {/* ── URL & Schema ── */}
        <Section icon={<Link2 className="w-4 h-4" />} title="URL & Schema">
          <Field label="Permalink" hint="Leave blank to auto-generate">
            <div className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
              <span className="px-3 py-3 text-sm text-gray-400 dark:text-gray-500 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 select-none">
                /blog/
              </span>
              <input
                placeholder="my-post-slug"
                className="flex-1 px-3 py-3 text-sm bg-transparent text-gray-900 dark:text-gray-100 outline-none placeholder:text-gray-400"
                value={form.permalink}
                onChange={set("permalink")}
              />
            </div>
          </Field>

        
        </Section>

        {/* ── Submit ── */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            All fields marked <span className="text-red-400">*</span> are required.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-xl
              bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800
              disabled:opacity-60 disabled:cursor-not-allowed
              text-white text-sm font-bold
              shadow-md hover:shadow-indigo-500/30
              transition-all duration-150
            "
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Publishing…</>
              : <><Send className="w-4 h-4" /> Publish Post</>
            }
          </button>
        </div>
      </form>
    </div>
  );
}