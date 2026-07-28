"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Heading {
  id: string;
  text: string;
}

interface Blog {
  title: string;
  image?: string;
  content: string;
  createdAt: string;
  author?: string;
  readTime?: string;
}

// ─── Inject IDs into H2s using DOMParser ─────────────────────────────────────

function parseHeadings(html: string): { html: string; headings: Heading[] } {
  if (typeof window === "undefined") return { html, headings: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const h2Els = doc.querySelectorAll("h2");
  const headings: Heading[] = [];

  h2Els.forEach((el) => {
    const text = el.textContent?.trim() ?? "";
    if (!text) return;

    // Build a slug id from the heading text
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Inject the id directly onto the <h2> in the parsed DOM
    el.setAttribute("id", id);
    headings.push({ id, text });
  });

  return { html: doc.body.innerHTML, headings };
}

// ─── Scroll by ID ─────────────────────────────────────────────────────────────
// Uses getElementById — works because parseHeadings already injected the id
// into the HTML string, and dangerouslySetInnerHTML has painted it by the
// time any click handler fires.

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // Offset 100px so a fixed navbar doesn't cover the heading
  const top = el.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-10" />
      <div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-10" />
      <div className="flex gap-10">
        <div className="hidden lg:block w-56 shrink-0 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          ))}
        </div>
        <div className="flex-1 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Reading progress ─────────────────────────────────────────────────────────

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(100, Math.round(pct)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="mt-6 px-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Read</span>
        <span className="text-[10px] text-indigo-500 font-bold">{progress}%</span>
      </div>
      <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ─── Top progress bar ─────────────────────────────────────────────────────────

function TopProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(Math.min(100, pct));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-indigo-500 transition-all duration-100"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ─── Mobile TOC ───────────────────────────────────────────────────────────────

function MobileTOC({
  headings,
  activeId,
}: {
  headings: Heading[];
  activeId: string;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), 150);
  };

  if (headings.length === 0) return null;

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200
          dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-semibold
          text-gray-700 dark:text-gray-300 shadow-sm w-full"
      >
        <span>📋</span>
        <span className="flex-1 text-left">Table of Contents</span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md overflow-hidden">
          {headings.map((h) => (
            <button
              key={h.id}
              onClick={() => handleClick(h.id)}
              className={`
                w-full text-left px-5 py-3 text-sm border-b border-gray-100
                dark:border-gray-800 last:border-0 transition-colors duration-100
                ${activeId === h.id
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }
              `}
            >
              {h.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SingleBlogPage() {
  const params = useParams();
  const contentRef = useRef<HTMLDivElement>(null);

  const [blog, setBlog]                   = useState<Blog | null>(null);
  const [loading, setLoading]             = useState(true);
  const [headings, setHeadings]           = useState<Heading[]>([]);
  const [parsedContent, setParsedContent] = useState("");
  const [activeId, setActiveId]           = useState("");

  // ── Fetch + parse ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!params?.permalink) return;
    (async () => {
      try {
        const res  = await fetch(`/api/blog/${params.permalink}`);
        const data = await res.json();
        if (data.success) {
          // parseHeadings injects id="slug" into every <h2> in the HTML string.
          // When React sets this via dangerouslySetInnerHTML those ids are in the
          // real DOM, so getElementById works instantly on any subsequent click.
          const { html, headings: h } = parseHeadings(data.blog.content);
          setBlog(data.blog);
          setParsedContent(html);
          setHeadings(h);
          if (h.length > 0) setActiveId(h[0].id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);

  // ── IntersectionObserver: update activeId as user scrolls ──────────────────
  // Runs after headings state is set (which means parsedContent is also set
  // and React has committed the new innerHTML to the DOM).
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Among all currently-intersecting headings, pick the topmost one
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    // getElementById works here because parsedContent (with injected ids)
    // was set in the same state batch as headings — React has already painted.
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // ── Render ──────────────────────────────────────────────────────────────────

  if (loading) return <Skeleton />;

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950">
        <span className="text-5xl">📭</span>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Blog not found</h2>
        <Link href="/blog" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <TopProgressBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 mt-10">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400
            hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
        >
          ← Back to all blogs
        </Link>
<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 flex justify-center items-center dark:text-white leading-tight mb-4">
            {blog.title}
          </h1>
        {/* Cover image */}
        {blog.image && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg">
            <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Title + meta */}
        <div className="mb-10">
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
            {blog.author && (
              <span className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {blog.author.charAt(0).toUpperCase()}
                </span>
                {blog.author}
              </span>
            )}
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
            {blog.readTime && <span>· {blog.readTime} min read</span>}
          </div>
        </div>

        {/* Mobile TOC */}
        <MobileTOC headings={headings} activeId={activeId} />

        {/* Two-column layout */}
        <div className="flex gap-12 items-start">

          {/* ── Left: TOC sidebar ── */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-24">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-1">
                  On this page
                </p>

                <nav className="flex flex-col gap-0.5">
                  {headings.map((h) => {
                    const isActive = activeId === h.id;
                    return (
                      <button
                        key={h.id}
                        onClick={() => scrollToId(h.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm
                          transition-all duration-150 border-l-2
                          ${isActive
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold"
                            : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }
                        `}
                      >
                        <span
                          className={`
                            inline-block w-1.5 h-1.5 rounded-full mr-2 mb-0.5 align-middle
                            ${isActive ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"}
                          `}
                        />
                        {h.text}
                      </button>
                    );
                  })}
                </nav>

                {/* <ProgressBar /> */}
              </div>
            </aside>
          )}

          {/* ── Right: Blog content ── */}
          {/* 
            scroll-mt-28 on headings ensures the fixed navbar + 100px offset
            don't cover the heading when the browser does native anchor jumps.
            Our scrollToId() function adds the same 100px offset manually.
          */}
          <div
            ref={contentRef}
            className="
              flex-1 min-w-0
              prose prose-sm prose-gray dark:prose-invert max-w-none
              prose-headings:scroll-mt-28
              prose-h2:text-2xl prose-h2:font-bold
              prose-h2:text-gray-900 dark:prose-h2:text-white
              prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700
              prose-h2:pb-2 prose-h2:mt-10
              prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50
              dark:prose-blockquote:bg-indigo-900/20 prose-blockquote:rounded-r-xl
              prose-code:text-indigo-600 dark:prose-code:text-indigo-300
              prose-code:bg-indigo-50 dark:prose-code:bg-indigo-900/30 prose-code:rounded prose-code:px-1
              prose-img:rounded-xl prose-img:shadow-md prose-ul:list-disc
              bg-white dark:bg-gray-900 rounded-2xl shadow-sm
              border border-gray-200 dark:border-gray-700
              p-8 sm:p-10
            "
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </div>
      </div>
    </div>
  );
}