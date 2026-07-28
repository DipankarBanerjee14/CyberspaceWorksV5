// "use client";

// import { useState, useMemo, useEffect } from "react";

// interface Product {
//   id: number;
//   title: string;
//   actualPrice: number;
//   discountPrice: number;
//   category: string;
//   shortDescription: string;
//   longDescription: string;
//   image?: string; 
//   demoLink?: string; 
// }
// import DashboardAnalytics from "./dashboard/page"

// const PRICE_RANGES = [
//   { label: "All prices", min: 0, max: Infinity },
//   { label: "Under ₹1,000", min: 0, max: 1000 },
//   { label: "₹1,000 – ₹2,999", min: 1000, max: 2999 },
//   { label: "₹3,000 – ₹5,999", min: 3000, max: 5999 },
//   { label: "₹6,000+", min: 6000, max: Infinity },
// ];

// export default function DashboardMarketplace() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [fetching, setFetching] = useState(true);
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [priceRange, setPriceRange] = useState(0);
//   const [image, setImage] = useState<File | null>(null);
//   const [role, setRole] = useState<string | null>(null);
// const [loadingRole, setLoadingRole] = useState(true);

//   const [view, setView] = useState<"products" | "analytics">("analytics");
//   const [form, setForm] = useState({
//     title: "", actualPrice: "", discountPrice: "",
//     category: "", shortDescription: "", longDescription: "",demoLink: "", driveLink: "",
//   });


//   useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const res = await fetch("/api/auth/me");

//       if (!res.ok) {
//         throw new Error("Failed to fetch user");
//       }

//       const data = await res.json();

//       console.log("User Data:", data);

//       const userRole = data?.user?.role;

//       setRole(userRole);

//       if (userRole === "employee") {
//         setView("products");
//       } 
//       else if(userRole === "client") {
//         setView("products");
//       }
//       else {
//         setView("analytics");
//       }
//     } catch (error) {
//       console.error(error);
//       setView("analytics");
//     } finally {
//       setLoadingRole(false);
//     }
//   };

//   fetchUser();
// }, []);
//   // Fetch products from DB
//   useEffect(() => {
//     const load = async () => {
//       try {
//         setFetching(true);
//         const res = await fetch("/api/products");
//         if (!res.ok) throw new Error("Failed to fetch");
//         const data = await res.json();
//         setProducts(Array.isArray(data) ? data : (data.products ?? []));
//       } catch {
//         setProducts([]);
//       } finally {
//         setFetching(false);
//       }
//     };
//     load();
//   }, []);

//   const categories = useMemo(() => {
//     const cats = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
//     return ["All", ...cats];
//   }, [products]);

//   const filtered = useMemo(() => {
//     const { min, max } = PRICE_RANGES[priceRange];
//     return products.filter((p) => {
//       const matchCat = activeCategory === "All" || p.category === activeCategory;
//       const matchPrice = p.discountPrice >= min && p.discountPrice <= max;
//       const q = search.toLowerCase();
//       const matchSearch = !q || p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
//       return matchCat && matchPrice && matchSearch;
//     });
//   }, [products, activeCategory, priceRange, search]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const formData = new FormData();

//     formData.append("title", form.title);
//     formData.append("actualPrice", String(Number(form.actualPrice)));
//     formData.append("discountPrice", String(Number(form.discountPrice)));
//     formData.append("category", form.category);
//     formData.append("shortDescription", form.shortDescription);
//     formData.append("longDescription", form.longDescription);
//     formData.append("demoLink", form.demoLink);
//     formData.append("driveLink", form.driveLink);

//     // ✅ correct image
//     if (image) {
//       formData.append("image", image);
//     }
//     console.log("Submitting form with data:", {
//       title: form.title,
//       actualPrice: form.actualPrice,
//       discountPrice: form.discountPrice,
//       category: form.category,
//       shortDescription: form.shortDescription,
//       longDescription: form.longDescription,
//       demoLink: form.demoLink,
//       image: image,
//     });
//     const res = await fetch("/api/products", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Failed");
//       return;
//     }

//     const newProduct = data.product ?? {
//       ...form,
//       id: Date.now(),
//       image: data.product?.image,
//     };

//     setProducts((prev) => [newProduct, ...prev]);

//    setForm({
//   title: "",
//   actualPrice: "",
//   discountPrice: "",
//   category: "",
//   shortDescription: "",
//   longDescription: "",
//   demoLink: "",
//   driveLink: "",
// });

//     setImage(null);
//     setPanelOpen(false);
//   } catch {
//     alert("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };

//   const discount = (a: number, d: number) => Math.round(((a - d) / a) * 100);

//   const THUMB_PATTERNS = [
//     "repeating-linear-gradient(45deg,#1a1a1a,#1a1a1a 10px,#222 10px,#222 20px)",
//     "repeating-linear-gradient(135deg,#1a1a1a,#1a1a1a 10px,#252525 10px,#252525 20px)",
//     "repeating-linear-gradient(90deg,#1c1c1c,#1c1c1c 8px,#232323 8px,#232323 16px)",
//     "repeating-linear-gradient(0deg,#1a1a1a,#1a1a1a 8px,#212121 8px,#212121 16px)",
//     "radial-gradient(circle at 30% 40%,#252525 0%,#111 100%)",
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');
//         * { box-sizing: border-box; }
//         .mp-root { font-family: 'DM Mono', monospace; background: #0a0a0a; color: #e8e8e8; }
//         .dark .mp-root {
//   background: #0a0a0a;
//   color: #e8e8e8;
// }
//         .mp-panel {
//           position: fixed; top: 0; right: 0; height: 100vh;
//           width: 480px; max-width: 96vw; background: #111;
//           border-left: 1px solid rgba(255,255,255,0.08);
//           box-shadow: -12px 0 60px rgba(0,0,0,0.7);
//           z-index: 50; transform: translateX(100%);
//           transition: transform 0.42s cubic-bezier(0.22,1,0.36,1); overflow-y: auto;
//         }
//         .mp-panel.open { transform: translateX(0); }
//         .mp-overlay {
//           position: fixed; inset: 0; background: rgba(0,0,0,0.6);
//           z-index: 40; opacity: 0; pointer-events: none;
//           transition: opacity 0.3s; backdrop-filter: blur(2px);
//         }
//         .mp-overlay.open { opacity: 1; pointer-events: auto; }
//         .mp-card {
//           background: #111; border: 1px solid rgba(255,255,255,0.07);
//           border-radius: 10px; overflow: hidden;
//           transition: box-shadow 0.22s, transform 0.22s, border-color 0.22s;
//           animation: cardIn 0.4s cubic-bezier(0.22,1,0.36,1) both; cursor: pointer;
//         }
//         .mp-card:hover {
//           box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 16px 48px rgba(0,0,0,0.5);
//           transform: translateY(-3px); border-color: rgba(255,255,255,0.14);
//         }
//         @keyframes cardIn {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .mp-card-thumb {
//           height: 120px; display: flex; align-items: center; justify-content: center;
//           font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-style: italic;
//           color: rgba(255,255,255,0.15); letter-spacing: 0.06em;
//           position: relative; overflow: hidden;
//         }
//         .mp-card-thumb::after {
//           content: ''; position: absolute; inset: 0;
//           background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%);
//         }
//         .mp-pill {
//           font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase;
//           padding: 0.32rem 0.8rem; border-radius: 2px;
//           border: 1px solid var(--pill-border, rgba(255,255,255,0.1));
//           background: transparent; cursor: pointer;
//           transition: background 0.15s, color 0.15s, border-color 0.15s;
//           white-space: nowrap; color: var(--pill-color, rgba(255,255,255,0.4));
//         }
//         .mp-pill.active { background: var(--pill-active-bg, #e8e8e8); color: var(--pill-active-color, #0a0a0a); border-color: var(--pill-active-border, #e8e8e8); }
//         .mp-pill:hover:not(.active) { border-color: var(--pill-hover-border, rgba(255,255,255,0.3)); color: var(--pill-hover-color, rgba(255,255,255,0.75)); }
//         :root { --pill-border: rgba(0,0,0,0.15); --pill-color: rgba(0,0,0,0.5); --pill-active-bg: #0a0a0a; --pill-active-color: #e8e8e8; --pill-active-border: #0a0a0a; --pill-hover-border: rgba(0,0,0,0.35); --pill-hover-color: rgba(0,0,0,0.75); }
//         .dark { --pill-border: rgba(255,255,255,0.1); --pill-color: rgba(255,255,255,0.4); --pill-active-bg: #e8e8e8; --pill-active-color: #0a0a0a; --pill-active-border: #e8e8e8; --pill-hover-border: rgba(255,255,255,0.3); --pill-hover-color: rgba(255,255,255,0.75); }
//         .mp-search {
//           font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.04em;
//           border: 1px solid rgba(255,255,255,0.1); border-radius: 2px;
//           padding: 0.55rem 1rem 0.55rem 2.4rem;
//           background: #161616; outline: none; width: 240px;
//           transition: border-color 0.15s, box-shadow 0.15s; color: #e8e8e8;
//         }
//         .mp-search:focus { border-color: rgba(255,255,255,0.35); box-shadow: 0 0 0 3px rgba(255,255,255,0.04); }
//         .mp-search::placeholder { color: rgba(255,255,255,0.2); }
//         .mp-select {
//           font-family: 'DM Mono', monospace; font-size: 0.63rem;
//           letter-spacing: 0.1em; text-transform: uppercase;
//           border: 1px solid rgba(255,255,255,0.1); border-radius: 2px;
//           padding: 0.55rem 0.9rem; background: #161616; outline: none;
//           color: rgba(255,255,255,0.45); cursor: pointer; transition: border-color 0.15s;
//         }
//         .mp-select:focus { border-color: rgba(255,255,255,0.35); }
//         .mp-select option { background: #161616; color: #e8e8e8; }
//         .mp-input {
//           width: 100%; font-family: 'DM Mono', monospace; font-size: 0.78rem;
//           border: 1px solid rgba(255,255,255,0.1); border-radius: 6px;
//           padding: 0.7rem 0.9rem; background: #161616; outline: none;
//           transition: border-color 0.15s, box-shadow 0.15s; color: #e8e8e8;
//         }
//         .mp-input:focus { border-color: rgba(255,255,255,0.35); background: #1a1a1a; box-shadow: 0 0 0 3px rgba(255,255,255,0.04); }
//         .mp-input::placeholder { color: rgba(255,255,255,0.2); }
//         .mp-label { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.35); display: block; margin-bottom: 0.4rem; }
//         .mp-badge { font-size: 0.54rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 0.18rem 0.5rem; border-radius: 2px; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.07); }
//         .mp-discount { font-size: 0.54rem; letter-spacing: 0.1em; background: #e8e8e8; color: #0a0a0a; padding: 0.15rem 0.45rem; border-radius: 2px; font-weight: 500; }
//         .mp-add-btn {
//           font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
//           background: #e8e8e8; color: #0a0a0a; border: none; border-radius: 2px;
//           padding: 0.65rem 1.3rem; cursor: pointer; transition: opacity 0.15s, transform 0.1s;
//           display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; font-weight: 500;
//         }
//         .mp-add-btn:hover { opacity: 0.85; }
//         .mp-add-btn:active { transform: scale(0.97); }
//         .mp-submit {
//           font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
//           background: #e8e8e8; color: #0a0a0a; border: none; border-radius: 6px;
//           padding: 0.85rem 1rem; width: 100%; cursor: pointer; transition: opacity 0.15s; margin-top: 0.5rem; font-weight: 500;
//         }
//         .mp-submit:hover { opacity: 0.85; }
//         .mp-submit:disabled { opacity: 0.35; cursor: not-allowed; }
//         .mp-close-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; padding: 0.4rem 0.65rem; cursor: pointer; color: rgba(255,255,255,0.4); font-size: 0.75rem; transition: background 0.15s, color 0.15s; }
//         .mp-close-btn:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }
//         @keyframes shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
//         .mp-skeleton { background: linear-gradient(90deg,#161616 25%,#1e1e1e 50%,#161616 75%); background-size: 600px 100%; animation: shimmer 1.4s infinite linear; border-radius: 6px; }
//         @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
//         .mp-empty { animation: fadeUp 0.5s ease both; }
//         .mp-panel::-webkit-scrollbar { width: 4px; }
//         .mp-panel::-webkit-scrollbar-track { background: #111; }
//         .mp-panel::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
//       `}</style>

//       <div className="min-h-screen bg-background text-foreground font-[DM_Mono]">
//         <div style={{ display: "flex", gap: "0.5rem" }}>
//           {!loadingRole && role !== "employee" && role !== "client" && (
//   <button
//     onClick={() => setView("analytics")}
//     className={`mp-pill ${view === "analytics" ? "active" : ""}`}
//   >
//     Analytics
//   </button>
// )}
//   {!loadingRole && role !== "employee" && role !== "client"&& (
//   <button
//     onClick={() => setView("products")}
//     className={`mp-pill ${view === "products" ? "active" : ""}`}
//   >
//     Product List
//   </button>
// )}

  
// </div>


//         {view === "products" ? (
//   <><div className={`mp-overlay ${panelOpen ? "open" : ""}`} onClick={() => setPanelOpen(false)} />

//         {/* Slide-in panel */}
//         <div className={`mp-panel ${panelOpen ? "open" : ""}`}>
//           <div style={{ padding: "2rem" }}>
//             <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
//               <div>
//                 <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.75rem", color: "#e8e8e8", margin: 0 }}>
//                   Add <em>Product</em>
//                 </h2>
//                 <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", margin: "0.3rem 0 0" }}>
//                   Fill in the details below
//                 </p>
//               </div>
//               <button className="mp-close-btn" onClick={() => setPanelOpen(false)}>✕</button>
//             </div>

//             <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: "1.75rem" }} />

//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
//               <div>
//                 <label className="mp-label">Product Title</label>
//                 <input className="mp-input" type="text" name="title" value={form.title} onChange={handleChange} placeholder="Premium Portfolio Template" required />
//               </div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
//                 <div>
//                   <label className="mp-label">Actual Price (₹)</label>
//                   <input className="mp-input" type="number" name="actualPrice" value={form.actualPrice} onChange={handleChange} placeholder="4999" required />
//                 </div>
//                 <div>
//                   <label className="mp-label">Discount Price (₹)</label>
//                   <input className="mp-input" type="number" name="discountPrice" value={form.discountPrice} onChange={handleChange} placeholder="2999" required />
//                 </div>
//               </div>
//               <div>
//                 <label className="mp-label">Category</label>
//                 <input className="mp-input" type="text" name="category" value={form.category} onChange={handleChange} placeholder="Templates" required />
//               </div>
//               <div>
//                 <label className="mp-label">Short Description</label>
//                 <textarea className="mp-input" name="shortDescription" value={form.shortDescription} onChange={handleChange} rows={2} placeholder="Short overview of the product..." style={{ resize: "none" }} required />
//               </div>
//               <div>
//   <label className="mp-label">Demo Link</label>
//   <input
//     className="mp-input"
//     type="url"
//     name="demoLink"
//     value={form.demoLink}
//     onChange={handleChange}
//     placeholder="https://your-demo-link.com"
//   />
// </div>
// <div>
//   <label className="mp-label">Google Drive Link</label>
//   <input
//     className="mp-input"
//     type="url"
//     name="driveLink"
//     value={form.driveLink}
//     onChange={handleChange}
//     placeholder="https://drive.google.com/..."
//   />
// </div>
//               <div>
//                 <label className="mp-label">Long Description</label>
//                 <textarea className="mp-input" name="longDescription" value={form.longDescription} onChange={handleChange} rows={5} placeholder="Detailed product information..." style={{ resize: "vertical" }} required />
//               </div>

//               <input
//   type="file"
//   accept="image/*"
//   onChange={(e) => setImage(e.target.files?.[0] || null)}
//   className="text-white"
// />
//               <button className="mp-submit" type="submit" disabled={loading}>
//                 {loading ? "Creating…" : "+ Create Product"}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Main content */}
//        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

//           {/* Header */}
//           <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
//             <div>
//               <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#e8e8e8", lineHeight: 1, margin: 0 }}>
//                 Market<em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>place</em>
//               </h1>
//               <p style={{ marginTop: "0.4rem", fontSize: "0.68rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", margin: "0.4rem 0 0" }}>
//                 {fetching ? "Loading…" : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} available`}
//               </p>
//             </div>
//             {role !== "client" && (
//               <button className="mp-add-btn" onClick={() => setPanelOpen(true)}>
//                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                   <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//                 </svg>
//                 Add Product
//               </button>
//             )}
//           </div>

//           {/* Filter bar */}
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
//             <div style={{ position: "relative" }}>
//               <svg style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.25)", pointerEvents: "none" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
//                 <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//               </svg>
//               <input className="mp-search" type="text" placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} />
//             </div>

//             <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
//               {categories.map((cat) => (
//                 <button key={cat} className={`mp-pill ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             <select className="mp-select" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}>
//               {PRICE_RANGES.map((r, i) => (
//                 <option key={i} value={i}>{r.label}</option>
//               ))}
//             </select>
//           </div>

//           {/* Grid */}
//           {fetching ? (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
//                   <div className="mp-skeleton" style={{ height: 120 }} />
//                   <div style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
//                     <div className="mp-skeleton" style={{ height: 12, width: "40%" }} />
//                     <div className="mp-skeleton" style={{ height: 18, width: "80%" }} />
//                     <div className="mp-skeleton" style={{ height: 10, width: "100%" }} />
//                     <div className="mp-skeleton" style={{ height: 10, width: "70%" }} />
//                     <div style={{ paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
//                       <div className="mp-skeleton" style={{ height: 16, width: "30%" }} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="mp-empty" style={{ textAlign: "center", padding: "5rem 0" }}>
//               <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem", color: "rgba(255,255,255,0.3)" }}>
//                 No products found
//               </div>
//               <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>Try adjusting your filters</div>
//             </div>
//           ) : (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
//               {filtered.map((product, i) => (
//                 <div key={product.id} className="mp-card" style={{ animationDelay: `${i * 0.05}s` }}>
//                   <div className="mp-card-thumb" style={{ background: THUMB_PATTERNS[i % THUMB_PATTERNS.length] }}>
//   {product.image ? (
//     <img
//       src={product.image}
//       alt={product.title}
//       style={{
//         width: "100%",
//         height: "100%",
//         objectFit: "cover",
//       }}
//     />
//   ) : (
//     <span>{product.category}</span>
//   )}
// </div>
//                   <div style={{ padding: "1.1rem" }}>
//                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
//                       <span className="mp-badge">{product.category}</span>
//                       {product.actualPrice > product.discountPrice && (
//                         <span className="mp-discount">-{discount(product.actualPrice, product.discountPrice)}%</span>
//                       )}
//                     </div>
//                     <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.15rem", color: "#e8e8e8", margin: "0 0 0.4rem", lineHeight: 1.25 }}>
//                       {product.title}
//                     </h3>
//                     <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.38)", letterSpacing: "0.03em", lineHeight: 1.75, margin: "0 0 1rem" }}>
//                       {product.shortDescription}
//                     </p>
//                     <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
//                       <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "1rem", color: "#e8e8e8" }}>
//                         ₹{product.discountPrice.toLocaleString()}
//                       </span>
//                       {product.actualPrice > product.discountPrice && (
//                         <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", textDecoration: "line-through" }}>
//                           ₹{product.actualPrice.toLocaleString()}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         </>
// ) : (
//   <div style={{ padding: "3rem", color: "rgba(255,255,255,0.6)" }}>
//     <DashboardAnalytics/>
//   </div>
// )}
//       </div>
//     </>
//   );
// }


"use client";

import { useState, useMemo, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  actualPrice: number;
  discountPrice: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  image?: string;
  demoLink?: string;
}
import DashboardAnalytics from "./dashboard/page";

const PRICE_RANGES = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹2,999", min: 1000, max: 2999 },
  { label: "₹3,000 – ₹5,999", min: 3000, max: 5999 },
  { label: "₹6,000+", min: 6000, max: Infinity },
];

// Light-mode thumb patterns use subtle warm-toned stripes
const THUMB_PATTERNS_DARK = [
  "repeating-linear-gradient(45deg,#1a1a1a,#1a1a1a 10px,#222 10px,#222 20px)",
  "repeating-linear-gradient(135deg,#1a1a1a,#1a1a1a 10px,#252525 10px,#252525 20px)",
  "repeating-linear-gradient(90deg,#1c1c1c,#1c1c1c 8px,#232323 8px,#232323 16px)",
  "repeating-linear-gradient(0deg,#1a1a1a,#1a1a1a 8px,#212121 8px,#212121 16px)",
  "radial-gradient(circle at 30% 40%,#252525 0%,#111 100%)",
];

const THUMB_PATTERNS_LIGHT = [
  "repeating-linear-gradient(45deg,#e8e4df,#e8e4df 10px,#ede9e4 10px,#ede9e4 20px)",
  "repeating-linear-gradient(135deg,#e4e0db,#e4e0db 10px,#eae6e1 10px,#eae6e1 20px)",
  "repeating-linear-gradient(90deg,#e6e2dd,#e6e2dd 8px,#ebe7e2 8px,#ebe7e2 16px)",
  "repeating-linear-gradient(0deg,#e5e1dc,#e5e1dc 8px,#eae6e1 8px,#eae6e1 16px)",
  "radial-gradient(circle at 30% 40%,#ece8e3 0%,#d8d4cf 100%)",
];

export default function DashboardMarketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const [view, setView] = useState<"products" | "analytics">("analytics");
  const [form, setForm] = useState({
    title: "", actualPrice: "", discountPrice: "",
    category: "", shortDescription: "", longDescription: "",
    demoLink: "", driveLink: "",
  });

  // Detect dark mode from <html> class
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        const userRole = data?.user?.role;
        setRole(userRole);
        if (userRole === "employee" || userRole === "client") {
          setView("products");
        } else {
          setView("analytics");
        }
      } catch (error) {
        console.error(error);
        setView("analytics");
      } finally {
        setLoadingRole(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setFetching(true);
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : (data.products ?? []));
      } catch {
        setProducts([]);
      } finally {
        setFetching(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ["All", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    const { min, max } = PRICE_RANGES[priceRange];
    return products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchPrice = p.discountPrice >= min && p.discountPrice <= max;
      const q = search.toLowerCase();
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchPrice && matchSearch;
    });
  }, [products, activeCategory, priceRange, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("actualPrice", String(Number(form.actualPrice)));
      formData.append("discountPrice", String(Number(form.discountPrice)));
      formData.append("category", form.category);
      formData.append("shortDescription", form.shortDescription);
      formData.append("longDescription", form.longDescription);
      formData.append("demoLink", form.demoLink);
      formData.append("driveLink", form.driveLink);
      if (image) formData.append("image", image);

      const res = await fetch("/api/products", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { alert(data.message || "Failed"); return; }

      const newProduct = data.product ?? { ...form, id: Date.now(), image: data.product?.image };
      setProducts((prev) => [newProduct, ...prev]);
      setForm({ title: "", actualPrice: "", discountPrice: "", category: "", shortDescription: "", longDescription: "", demoLink: "", driveLink: "" });
      setImage(null);
      setPanelOpen(false);
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const discount = (a: number, d: number) => Math.round(((a - d) / a) * 100);

  const thumbPatterns = isDark ? THUMB_PATTERNS_DARK : THUMB_PATTERNS_LIGHT;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; }

        /* ── CSS tokens ── */
        :root {
          --mp-bg:            #ffffff;
          --mp-surface:       #faf9f7;
          --mp-surface-alt:   #f0eeeb;
          --mp-border:        rgba(0,0,0,0.09);
          --mp-border-strong: rgba(0,0,0,0.14);
          --mp-text:          #1a1a1a;
          --mp-text-muted:    rgba(0,0,0,0.42);
          --mp-text-faint:    rgba(0,0,0,0.28);
          --mp-heading:       #1a1a1a;
          --mp-heading-ghost: rgba(0,0,0,0.18);

          --mp-input-bg:      #f0eeeb;
          --mp-input-text:    #1a1a1a;
          --mp-input-ph:      rgba(0,0,0,0.3);
          --mp-input-focus-border: rgba(0,0,0,0.4);
          --mp-input-focus-shadow: rgba(0,0,0,0.06);

          --mp-pill-border:        rgba(0,0,0,0.15);
          --mp-pill-color:         rgba(0,0,0,0.45);
          --mp-pill-hover-border:  rgba(0,0,0,0.35);
          --mp-pill-hover-color:   rgba(0,0,0,0.75);
          --mp-pill-active-bg:     #1a1a1a;
          --mp-pill-active-color:  #f5f3f0;
          --mp-pill-active-border: #1a1a1a;

          --mp-badge-bg:     rgba(0,0,0,0.06);
          --mp-badge-color:  rgba(0,0,0,0.45);
          --mp-badge-border: rgba(0,0,0,0.08);

          --mp-discount-bg:    #1a1a1a;
          --mp-discount-color: #f5f3f0;

          --mp-thumb-text:   rgba(0,0,0,0.2);
          --mp-price-color:  #1a1a1a;
          --mp-strike-color: rgba(0,0,0,0.28);

          --mp-panel-bg:     #faf9f7;
          --mp-panel-border: rgba(0,0,0,0.08);
          --mp-panel-shadow: -12px 0 60px rgba(0,0,0,0.12);

          --mp-overlay-bg:   rgba(0,0,0,0.25);

          --mp-add-btn-bg:    #1a1a1a;
          --mp-add-btn-color: #f5f3f0;

          --mp-submit-bg:    #1a1a1a;
          --mp-submit-color: #f5f3f0;

          --mp-close-bg:       rgba(0,0,0,0.05);
          --mp-close-border:   rgba(0,0,0,0.1);
          --mp-close-color:    rgba(0,0,0,0.4);
          --mp-close-hover-bg: rgba(0,0,0,0.1);
          --mp-close-hover-color: rgba(0,0,0,0.75);

          --mp-select-bg:    #f0eeeb;
          --mp-select-color: rgba(0,0,0,0.45);

          --mp-skeleton-from: #e8e5e1;
          --mp-skeleton-to:   #dedad5;

          --mp-divider:      rgba(0,0,0,0.08);

          --mp-card-bg:      #faf9f7;
          --mp-card-border:  rgba(0,0,0,0.08);
          --mp-card-hover-border: rgba(0,0,0,0.18);
          --mp-card-hover-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 16px 48px rgba(0,0,0,0.1);
          --mp-card-row-divider: rgba(0,0,0,0.07);
        }

        .dark {
          --mp-bg:            #0a0a0a;
          --mp-surface:       #111;
          --mp-surface-alt:   #161616;
          --mp-border:        rgba(255,255,255,0.07);
          --mp-border-strong: rgba(255,255,255,0.12);
          --mp-text:          #e8e8e8;
          --mp-text-muted:    rgba(255,255,255,0.38);
          --mp-text-faint:    rgba(255,255,255,0.22);
          --mp-heading:       #e8e8e8;
          --mp-heading-ghost: rgba(255,255,255,0.18);

          --mp-input-bg:      #161616;
          --mp-input-text:    #e8e8e8;
          --mp-input-ph:      rgba(255,255,255,0.2);
          --mp-input-focus-border: rgba(255,255,255,0.35);
          --mp-input-focus-shadow: rgba(255,255,255,0.04);

          --mp-pill-border:        rgba(255,255,255,0.1);
          --mp-pill-color:         rgba(255,255,255,0.4);
          --mp-pill-hover-border:  rgba(255,255,255,0.3);
          --mp-pill-hover-color:   rgba(255,255,255,0.75);
          --mp-pill-active-bg:     #e8e8e8;
          --mp-pill-active-color:  #0a0a0a;
          --mp-pill-active-border: #e8e8e8;

          --mp-badge-bg:     rgba(255,255,255,0.07);
          --mp-badge-color:  rgba(255,255,255,0.4);
          --mp-badge-border: rgba(255,255,255,0.07);

          --mp-discount-bg:    #e8e8e8;
          --mp-discount-color: #0a0a0a;

          --mp-thumb-text:   rgba(255,255,255,0.15);
          --mp-price-color:  #e8e8e8;
          --mp-strike-color: rgba(255,255,255,0.25);

          --mp-panel-bg:     #111;
          --mp-panel-border: rgba(255,255,255,0.08);
          --mp-panel-shadow: -12px 0 60px rgba(0,0,0,0.7);

          --mp-overlay-bg:   rgba(0,0,0,0.6);

          --mp-add-btn-bg:    #e8e8e8;
          --mp-add-btn-color: #0a0a0a;

          --mp-submit-bg:    #e8e8e8;
          --mp-submit-color: #0a0a0a;

          --mp-close-bg:       rgba(255,255,255,0.05);
          --mp-close-border:   rgba(255,255,255,0.1);
          --mp-close-color:    rgba(255,255,255,0.4);
          --mp-close-hover-bg: rgba(255,255,255,0.1);
          --mp-close-hover-color: rgba(255,255,255,0.8);

          --mp-select-bg:    #161616;
          --mp-select-color: rgba(255,255,255,0.45);

          --mp-skeleton-from: #161616;
          --mp-skeleton-to:   #1e1e1e;

          --mp-divider:      rgba(255,255,255,0.07);

          --mp-card-bg:      #111;
          --mp-card-border:  rgba(255,255,255,0.07);
          --mp-card-hover-border: rgba(255,255,255,0.14);
          --mp-card-hover-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 16px 48px rgba(0,0,0,0.5);
          --mp-card-row-divider: rgba(255,255,255,0.07);
        }

        /* ── Component styles ── */
        .mp-panel {
          position: fixed; top: 0; right: 0; height: 100vh;
          width: 480px; max-width: 96vw;
          background: var(--mp-panel-bg);
          border-left: 1px solid var(--mp-panel-border);
          box-shadow: var(--mp-panel-shadow);
          z-index: 50; transform: translateX(100%);
          transition: transform 0.42s cubic-bezier(0.22,1,0.36,1); overflow-y: auto;
        }
        .mp-panel.open { transform: translateX(0); }

        .mp-overlay {
          position: fixed; inset: 0;
          background: var(--mp-overlay-bg);
          z-index: 40; opacity: 0; pointer-events: none;
          transition: opacity 0.3s; backdrop-filter: blur(2px);
        }
        .mp-overlay.open { opacity: 1; pointer-events: auto; }

        .mp-card {
          background: var(--mp-card-bg);
          border: 1px solid var(--mp-card-border);
          border-radius: 10px; overflow: hidden;
          transition: box-shadow 0.22s, transform 0.22s, border-color 0.22s;
          animation: cardIn 0.4s cubic-bezier(0.22,1,0.36,1) both; cursor: pointer;
        }
        .mp-card:hover {
          box-shadow: var(--mp-card-hover-shadow);
          transform: translateY(-3px);
          border-color: var(--mp-card-hover-border);
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mp-card-thumb {
          height: 120px; display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-style: italic;
          color: var(--mp-thumb-text); letter-spacing: 0.06em;
          position: relative; overflow: hidden;
        }
        .mp-card-thumb::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.15) 100%);
        }

        .mp-pill {
          font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.32rem 0.8rem; border-radius: 2px;
          border: 1px solid var(--mp-pill-border);
          background: transparent; cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          white-space: nowrap; color: var(--mp-pill-color);
          font-family: 'DM Mono', monospace;
        }
        .mp-pill.active {
          background: var(--mp-pill-active-bg);
          color: var(--mp-pill-active-color);
          border-color: var(--mp-pill-active-border);
        }
        .mp-pill:hover:not(.active) {
          border-color: var(--mp-pill-hover-border);
          color: var(--mp-pill-hover-color);
        }

        .mp-search {
          font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.04em;
          border: 1px solid var(--mp-border); border-radius: 2px;
          padding: 0.55rem 1rem 0.55rem 2.4rem;
          background: var(--mp-input-bg); outline: none; width: 240px;
          transition: border-color 0.15s, box-shadow 0.15s;
          color: var(--mp-input-text);
        }
        .mp-search:focus {
          border-color: var(--mp-input-focus-border);
          box-shadow: 0 0 0 3px var(--mp-input-focus-shadow);
        }
        .mp-search::placeholder { color: var(--mp-input-ph); }

        .mp-select {
          font-family: 'DM Mono', monospace; font-size: 0.63rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid var(--mp-border); border-radius: 2px;
          padding: 0.55rem 0.9rem;
          background: var(--mp-select-bg); outline: none;
          color: var(--mp-select-color); cursor: pointer; transition: border-color 0.15s;
        }
        .mp-select:focus { border-color: var(--mp-input-focus-border); }
        .mp-select option { background: var(--mp-input-bg); color: var(--mp-input-text); }

        .mp-input {
          width: 100%; font-family: 'DM Mono', monospace; font-size: 0.78rem;
          border: 1px solid var(--mp-border); border-radius: 6px;
          padding: 0.7rem 0.9rem;
          background: var(--mp-input-bg); outline: none;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
          color: var(--mp-input-text);
        }
        .mp-input:focus {
          border-color: var(--mp-input-focus-border);
          background: var(--mp-surface-alt);
          box-shadow: 0 0 0 3px var(--mp-input-focus-shadow);
        }
        .mp-input::placeholder { color: var(--mp-input-ph); }

        .mp-label {
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--mp-text-faint); display: block; margin-bottom: 0.4rem;
          font-family: 'DM Mono', monospace;
        }

        .mp-badge {
          font-size: 0.54rem; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.18rem 0.5rem; border-radius: 2px;
          background: var(--mp-badge-bg);
          color: var(--mp-badge-color);
          border: 1px solid var(--mp-badge-border);
        }

        .mp-discount {
          font-size: 0.54rem; letter-spacing: 0.1em;
          background: var(--mp-discount-bg);
          color: var(--mp-discount-color);
          padding: 0.15rem 0.45rem; border-radius: 2px; font-weight: 500;
        }

        .mp-add-btn {
          font-family: 'DM Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          background: var(--mp-add-btn-bg);
          color: var(--mp-add-btn-color);
          border: none; border-radius: 2px;
          padding: 0.65rem 1.3rem; cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
          display: flex; align-items: center; gap: 0.5rem;
          white-space: nowrap; font-weight: 500;
        }
        .mp-add-btn:hover { opacity: 0.85; }
        .mp-add-btn:active { transform: scale(0.97); }

        .mp-submit {
          font-family: 'DM Mono', monospace; font-size: 0.7rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          background: var(--mp-submit-bg);
          color: var(--mp-submit-color);
          border: none; border-radius: 6px;
          padding: 0.85rem 1rem; width: 100%; cursor: pointer;
          transition: opacity 0.15s; margin-top: 0.5rem; font-weight: 500;
        }
        .mp-submit:hover { opacity: 0.85; }
        .mp-submit:disabled { opacity: 0.35; cursor: not-allowed; }

        .mp-close-btn {
          background: var(--mp-close-bg);
          border: 1px solid var(--mp-close-border);
          border-radius: 2px; padding: 0.4rem 0.65rem; cursor: pointer;
          color: var(--mp-close-color); font-size: 0.75rem;
          transition: background 0.15s, color 0.15s;
        }
        .mp-close-btn:hover {
          background: var(--mp-close-hover-bg);
          color: var(--mp-close-hover-color);
        }

        .mp-file-input { color: var(--mp-text-muted); font-family: 'DM Mono', monospace; font-size: 0.75rem; }

        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .mp-skeleton {
          background: linear-gradient(
            90deg,
            var(--mp-skeleton-from) 25%,
            var(--mp-skeleton-to) 50%,
            var(--mp-skeleton-from) 75%
          );
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite linear;
          border-radius: 6px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mp-empty { animation: fadeUp 0.5s ease both; }

        .mp-panel::-webkit-scrollbar { width: 4px; }
        .mp-panel::-webkit-scrollbar-track { background: var(--mp-panel-bg); }
        .mp-panel::-webkit-scrollbar-thumb { background: var(--mp-border-strong); border-radius: 2px; }
      `}</style>

      {/* Root uses Tailwind bg/text for outer shell, inner uses CSS vars */}
      <div className="min-h-screen bg-background text-foreground" style={{ background: "var(--mp-bg)", color: "var(--mp-text)" }}>

        {/* View toggle */}
        <div style={{ display: "flex", gap: "0.5rem", padding: "1rem 1.5rem 0" }}>
          {!loadingRole && role !== "employee" && role !== "client" && (
            <button onClick={() => setView("analytics")} className={`mp-pill ${view === "analytics" ? "active" : ""}`}>
              Analytics
            </button>
          )}
          {!loadingRole && role !== "employee" && role !== "client" && (
            <button onClick={() => setView("products")} className={`mp-pill ${view === "products" ? "active" : ""}`}>
              Product List
            </button>
          )}
        </div>

        {view === "products" ? (
          <>
            <div className={`mp-overlay ${panelOpen ? "open" : ""}`} onClick={() => setPanelOpen(false)} />

            {/* Slide-in panel */}
            <div className={`mp-panel ${panelOpen ? "open" : ""}`}>
              <div style={{ padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.75rem", color: "var(--mp-heading)", margin: 0 }}>
                      Add <em>Product</em>
                    </h2>
                    <p style={{ fontSize: "0.68rem", color: "var(--mp-text-faint)", letterSpacing: "0.06em", margin: "0.3rem 0 0" }}>
                      Fill in the details below
                    </p>
                  </div>
                  <button className="mp-close-btn" onClick={() => setPanelOpen(false)}>✕</button>
                </div>

                <hr style={{ border: "none", borderTop: `1px solid var(--mp-divider)`, marginBottom: "1.75rem" }} />

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div>
                    <label className="mp-label">Product Title</label>
                    <input className="mp-input" type="text" name="title" value={form.title} onChange={handleChange} placeholder="Premium Portfolio Template" required />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label className="mp-label">Actual Price (₹)</label>
                      <input className="mp-input" type="number" name="actualPrice" value={form.actualPrice} onChange={handleChange} placeholder="4999" required />
                    </div>
                    <div>
                      <label className="mp-label">Discount Price (₹)</label>
                      <input className="mp-input" type="number" name="discountPrice" value={form.discountPrice} onChange={handleChange} placeholder="2999" required />
                    </div>
                  </div>
                  <div>
                    <label className="mp-label">Category</label>
                    <input className="mp-input" type="text" name="category" value={form.category} onChange={handleChange} placeholder="Templates" required />
                  </div>
                  <div>
                    <label className="mp-label">Short Description</label>
                    <textarea className="mp-input" name="shortDescription" value={form.shortDescription} onChange={handleChange} rows={2} placeholder="Short overview of the product…" style={{ resize: "none" }} required />
                  </div>
                  <div>
                    <label className="mp-label">Demo Link</label>
                    <input className="mp-input" type="url" name="demoLink" value={form.demoLink} onChange={handleChange} placeholder="https://your-demo-link.com" />
                  </div>
                  <div>
                    <label className="mp-label">Google Drive Link</label>
                    <input className="mp-input" type="url" name="driveLink" value={form.driveLink} onChange={handleChange} placeholder="https://drive.google.com/…" />
                  </div>
                  <div>
                    <label className="mp-label">Long Description</label>
                    <textarea className="mp-input" name="longDescription" value={form.longDescription} onChange={handleChange} rows={5} placeholder="Detailed product information…" style={{ resize: "vertical" }} required />
                  </div>

                  <div>
                    <label className="mp-label">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                      className="mp-file-input"
                    />
                  </div>

                  <button className="mp-submit" type="submit" disabled={loading}>
                    {loading ? "Creating…" : "+ Create Product"}
                  </button>
                </form>
              </div>
            </div>

            {/* Main content */}
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--mp-heading)", lineHeight: 1, margin: 0 }}>
                    Market<em style={{ fontStyle: "italic", color: "var(--mp-heading-ghost)" }}>place</em>
                  </h1>
                  <p style={{ marginTop: "0.4rem", fontSize: "0.68rem", letterSpacing: "0.08em", color: "var(--mp-text-faint)", margin: "0.4rem 0 0" }}>
                    {fetching ? "Loading…" : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} available`}
                  </p>
                </div>
                {role !== "client" && (
                  <button className="mp-add-btn" onClick={() => setPanelOpen(true)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Product
                  </button>
                )}
              </div>

              {/* Filter bar */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: `1px solid var(--mp-divider)` }}>
                <div style={{ position: "relative" }}>
                  <svg style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--mp-text-faint)", pointerEvents: "none" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input className="mp-search" type="text" placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {categories.map((cat) => (
                    <button key={cat} className={`mp-pill ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
                      {cat}
                    </button>
                  ))}
                </div>

                <select className="mp-select" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}>
                  {PRICE_RANGES.map((r, i) => (
                    <option key={i} value={i}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Grid */}
              {fetching ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ background: "var(--mp-surface)", border: `1px solid var(--mp-card-border)`, borderRadius: 10, overflow: "hidden" }}>
                      <div className="mp-skeleton" style={{ height: 120 }} />
                      <div style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        <div className="mp-skeleton" style={{ height: 12, width: "40%" }} />
                        <div className="mp-skeleton" style={{ height: 18, width: "80%" }} />
                        <div className="mp-skeleton" style={{ height: 10, width: "100%" }} />
                        <div className="mp-skeleton" style={{ height: 10, width: "70%" }} />
                        <div style={{ paddingTop: "0.75rem", borderTop: `1px solid var(--mp-divider)` }}>
                          <div className="mp-skeleton" style={{ height: 16, width: "30%" }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="mp-empty" style={{ textAlign: "center", padding: "5rem 0" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem", color: "var(--mp-text-muted)" }}>
                    No products found
                  </div>
                  <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--mp-text-faint)" }}>Try adjusting your filters</div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
                  {filtered.map((product, i) => (
                    <div key={product.id} className="mp-card" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="mp-card-thumb" style={{ background: thumbPatterns[i % thumbPatterns.length] }}>
                        {product.image ? (
                          <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span>{product.category}</span>
                        )}
                      </div>
                      <div style={{ padding: "1.1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                          <span className="mp-badge">{product.category}</span>
                          {product.actualPrice > product.discountPrice && (
                            <span className="mp-discount">-{discount(product.actualPrice, product.discountPrice)}%</span>
                          )}
                        </div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.15rem", color: "var(--mp-heading)", margin: "0 0 0.4rem", lineHeight: 1.25 }}>
                          {product.title}
                        </h3>
                        <p style={{ fontSize: "0.68rem", color: "var(--mp-text-muted)", letterSpacing: "0.03em", lineHeight: 1.75, margin: "0 0 1rem" }}>
                          {product.shortDescription}
                        </p>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", paddingTop: "0.75rem", borderTop: `1px solid var(--mp-card-row-divider)` }}>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "1rem", color: "var(--mp-price-color)" }}>
                            ₹{product.discountPrice.toLocaleString()}
                          </span>
                          {product.actualPrice > product.discountPrice && (
                            <span style={{ fontSize: "0.68rem", color: "var(--mp-strike-color)", textDecoration: "line-through" }}>
                              ₹{product.actualPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ padding: "3rem", color: "var(--mp-text-muted)" }}>
            <DashboardAnalytics />
          </div>
        )}
      </div>
    </>
  );
}