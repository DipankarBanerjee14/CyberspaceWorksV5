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
// interface Purchase {
//   id: string;
//   product: string;
//   customer: string;
//   email: string;
//   amount: number;
//   status: string;
//   date: string;
// }
// // import DashboardAnalytics from "./dashboard/page"

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
//   const [id,setId] =useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [priceRange, setPriceRange] = useState(0);
//   const [image, setImage] = useState<File | null>(null);
//   const [role, setRole] = useState<string | null>(null);
// const [loadingRole, setLoadingRole] = useState(true);
// const [userId, setUserId] = useState("");
// const [drawerOpen, setDrawerOpen] = useState(false);
// const [drawerType, setDrawerType] = useState<"wishlist" | "cart">("wishlist");

// const [wishlistItems, setWishlistItems] = useState<any[]>([]);
// const [cartItems, setCartItems] = useState<any[]>([]);
// // const [wishlistItems, setWishlistItems] = useState<any[]>([]);



//   const [view, setView] = useState<"products" | "analytics">("analytics");
//   const [form, setForm] = useState({
//     title: "", actualPrice: "", discountPrice: "",
//     category: "", shortDescription: "", longDescription: "",demoLink: "", driveLink: "",
//   });
//   useEffect(() => {
//   const loadUser = async () => {
//     try {
//       const res = await fetch("/api/auth/me");
//       const data = await res.json();


//       setUserId(data.user.email);
//       setId(data.user._id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   loadUser();
// }, []);
// useEffect(() => {
//   if (!userId) return;

//   const loadCart = async () => {
//     try {
//         console.log("hi");
//         console.log(userId);
//       const res = await fetch(
//         `/api/cart?userId=${id}`
//       );

//       const data = await res.json();


//       if (data.success) {
//         console.log("cart",data);
//         setCartItems(data.cart || []);
//       }
//     } catch (err) {
//       console.error("Cart fetch failed", err);
//     }
//   };

//   loadCart();
// }, [id]);
// useEffect(() => {
//   if (!id) return;

//   const loadWishlist = async () => {
//     try {
//       const res = await fetch(
//         `/api/wishlist?userId=${id}`
//       );

//       const data = await res.json();

//       if (data.success) {
//         setWishlistItems(data.wishlist || []);
//       }
//     } catch (error) {
//       console.error(
//         "Wishlist fetch failed",
//         error
//       );
//     }
//   };

//   loadWishlist();
// }, [id]);
// const removeFromCart = async (
//   productId: string
// ) => {
//   try {
//     const res = await fetch("/api/cart", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId,
//         productId,
//       }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       setCartItems((prev) =>
//         prev.filter(
//           (item) => item.productId !== productId
//         )
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const removeFromWishlist = async (
//   productId: string
// ) => {
//   try {
//     const res = await fetch(
//       "/api/wishlist",
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type":
//             "application/json",
//         },
//         body: JSON.stringify({
//           userId: id,
//           productId,
//         }),
//       }
//     );

//     const data = await res.json();

//     if (data.success) {
//       setWishlistItems((prev) =>
//         prev.filter(
//           (item) =>
//             item.productId !== productId
//         )
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
// useEffect(() => {
//   if (!userId) return;

//   const loadPurchases = async () => {
//     try {
//       setFetching(true);

//       const res = await fetch("/api/analytics/purchase");

//       if (!res.ok) {
//         throw new Error("Failed");
//       }

//       const data = await res.json();
//       console.log("Fetched purchases:", data);
    
// console.log("Current user ID:", userId);
// console.log("All purchases:", data.orders);
//       const userProducts =
//         data.orders?.filter(
//           (order: any) =>
//             order.email === userId
//         ) || [];
//         console.log("User products:", userProducts);

//       setProducts(userProducts);
//     } catch (error) {
//       console.error(error);
//       setProducts([]);
//     } finally {
//       setFetching(false);
//     }
//   };

//   loadPurchases();
// }, [userId]);
// console.log(products);

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
//   const thStyle: React.CSSProperties = {
//   textAlign: "left",
//   padding: "14px",
//   color: "#e8e8e8",
//   fontSize: "13px",
//   fontWeight: 600,
// };

// const tdStyle: React.CSSProperties = {
//   padding: "14px",
//   color: "rgba(255,255,255,0.75)",
//   fontSize: "13px",
// };

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

        
//        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

    
//          <div
//   style={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//     gap: "1rem",
//     marginBottom: "2rem",
//   }}
// >
//   <div>
//     <h1
//       style={{
//         fontFamily: "'Cormorant Garamond', serif",
//         fontWeight: 300,
//         fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
//         color: "#e8e8e8",
//         margin: 0,
//       }}
//     >
//       My <em>Purchases</em>
//     </h1>

//     <p
//       style={{
//         marginTop: ".4rem",
//         fontSize: ".68rem",
//         letterSpacing: ".08em",
//         color: "rgba(255,255,255,.3)",
//       }}
//     >
//       {fetching
//         ? "Loading..."
//         : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
//     </p>
//   </div>

//   <div
//     style={{
//       display: "flex",
//       gap: "12px",
//     }}
//   >
//     <button
//   onClick={() => {
//     setDrawerType("wishlist");
//     setDrawerOpen(true);
//   }}
//   className="mp-add-btn"
// >
//   ❤️ Wishlist ({wishlistItems.length})
// </button>
//     <button
//       onClick={() => {
//         setDrawerType("cart");
//         setDrawerOpen(true);
//       }}
//       className="mp-add-btn"
//     >
//       🛒 Cart ({cartItems.length})
//     </button>
//   </div>
// </div>

       
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
//   <div className="text-center py-10">
//     Loading purchases...
//   </div>
// ) : products.length === 0 ? (
//   <div
//     style={{
//       textAlign: "center",
//       padding: "6rem 0",
//     }}
//   >
//     <h2
//       style={{
//         fontSize: "4rem",
//         fontWeight: "bold",
//         color: "#e8e8e8",
//       }}
//     >
//       0
//     </h2>

//     <p
//       style={{
//         color: "rgba(255,255,255,0.5)",
//       }}
//     >
//       Purchases Found
//     </p>
//   </div>
// ) : (
//   <div
//     style={{
//       overflowX: "auto",
//       border: "1px solid rgba(255,255,255,0.08)",
//       borderRadius: "12px",
//       background: "#111",
//     }}
//   >
//     <table
//       style={{
//         width: "100%",
//         borderCollapse: "collapse",
//       }}
//     >
//       <thead>
//         <tr
//           style={{
//             background: "#181818",
//             borderBottom: "1px solid rgba(255,255,255,0.08)",
//           }}
//         >
//           <th style={thStyle}>#</th>
//           <th style={thStyle}>Product</th>
//           <th style={thStyle}>Customer</th>
//           <th style={thStyle}>Email</th>
//           <th style={thStyle}>Amount</th>
//           <th style={thStyle}>Status</th>
//           <th style={thStyle}>Date</th>
//         </tr>
//       </thead>

//       <tbody>
//         {products.map((purchase, index) => (
//           <tr
//             key={purchase.id}
//             style={{
//               borderBottom:
//                 "1px solid rgba(255,255,255,0.05)",
//             }}
//           >
//             <td style={tdStyle}>{index + 1}</td>

//             <td style={tdStyle}>
//               {purchase.product}
//             </td>

//             <td style={tdStyle}>
//               {purchase.customer}
//             </td>

//             <td style={tdStyle}>
//               {purchase.email}
//             </td>

//             <td style={tdStyle}>
//               ₹{purchase.amount}
//             </td>

//             <td style={tdStyle}>
//               <span
//                 style={{
//                   padding: "4px 10px",
//                   borderRadius: "999px",
//                   background:
//                     purchase.status === "paid"
//                       ? "rgba(34,197,94,.15)"
//                       : "rgba(239,68,68,.15)",
//                   color:
//                     purchase.status === "paid"
//                       ? "#22c55e"
//                       : "#ef4444",
//                   fontSize: "12px",
//                 }}
//               >
//                 {purchase.status}
//               </span>
//             </td>

//             <td style={tdStyle}>
//               {new Date(
//                 purchase.date
//               ).toLocaleDateString()}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}

//         </div>
//         </>

//       </div>
// <div
//   onClick={() => setDrawerOpen(false)}
//   style={{
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,.5)",
//     backdropFilter: "blur(2px)",
//     opacity: drawerOpen ? 1 : 0,
//     pointerEvents: drawerOpen ? "auto" : "none",
//     transition: ".3s",
//     zIndex: 90,
//   }}
// />
// <div
//   style={{
//     position: "fixed",
//     top: 0,
//     right: drawerOpen ? 0 : "-450px",
//     width: "450px",
//     maxWidth: "100%",
//     height: "100vh",
//     background: "#111",
//     borderLeft: "1px solid rgba(255,255,255,.08)",
//     transition: ".35s ease",
//     zIndex: 100,
//     overflowY: "auto",
//   }}
// >
//   <div style={{ padding: "24px" }}>
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "20px",
//       }}
//     >
//       <h2
//         style={{
//           color: "#fff",
//           margin: 0,
//         }}
//       >
//         {drawerType === "wishlist"
//           ? "❤️ Wishlist"
//           : "🛒 Shopping Cart"}
//       </h2>

//       <button
//         onClick={() => setDrawerOpen(false)}
//         style={{
//           background: "transparent",
//           border: "none",
//           color: "#fff",
//           cursor: "pointer",
//           fontSize: "20px",
//         }}
//       >
//         ✕
//       </button>
//     </div>

//     {drawerType === "wishlist" ? (
//       <>
//         {wishlistItems.length === 0 ? (
//           <p style={{ color: "#888" }}>
//             No items in wishlist
//           </p>
//         ) : (
//           wishlistItems.map((item) => (
//   <div
//     key={item._id}
//     style={{
//       padding: "14px",
//       borderBottom:
//         "1px solid rgba(255,255,255,.08)",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       gap: "12px",
//     }}
//   >
//     <div>
//       <div
//         style={{
//           color: "#fff",
//           fontWeight: 500,
//         }}
//       >
//         {item.productName}
//       </div>

//       <div
//         style={{
//           color: "#ec4899",
//           marginTop: "4px",
//           fontSize: "14px",
//         }}
//       >
//         ₹{item.productPrice}
//       </div>
//     </div>

//     <button
//       onClick={() =>
//         removeFromWishlist(
//           item.productId
//         )
//       }
//       style={{
//         width: "32px",
//         height: "32px",
//         borderRadius: "50%",
//         border:
//           "1px solid rgba(255,255,255,.12)",
//         background: "transparent",
//         color: "#ef4444",
//         cursor: "pointer",
//         fontSize: "18px",
//       }}
//     >
//       ✕
//     </button>
//   </div>
// ))
//         )}
//       </>
//     ) : (
//       <>
//         {cartItems.length === 0 ? (
//           <p style={{ color: "#888" }}>
//             Cart is empty
//           </p>
//         ) : (
//       cartItems.map((item) => (
//   <div
//     key={item._id}
//     style={{
//       padding: "14px",
//       borderBottom:
//         "1px solid rgba(255,255,255,.08)",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       gap: "12px",
//     }}
//   >
//     <div>
//       <div
//         style={{
//           color: "#fff",
//           fontWeight: 500,
//         }}
//       >
//         {item.productName}
//       </div>

//       <div
//         style={{
//           color: "#22c55e",
//           marginTop: "4px",
//           fontSize: "14px",
//         }}
//       >
//         ₹{item.productPrice}
//       </div>

//       <div
//         style={{
//           color: "#888",
//           fontSize: "12px",
//           marginTop: "2px",
//         }}
//       >
//         Qty: {item.quantity}
//       </div>
//     </div>

//     <button
//       onClick={() =>
//         removeFromCart(item.productId)
//       }
//       style={{
//         width: "32px",
//         height: "32px",
//         borderRadius: "50%",
//         border:
//           "1px solid rgba(255,255,255,.12)",
//         background: "transparent",
//         color: "#ef4444",
//         cursor: "pointer",
//         fontSize: "18px",
//       }}
//     >
//       ✕
//     </button>
//   </div>
// ))
//         )}
//       </>
//     )}
//   </div>
// </div>
//     </>
    
//   );
// }



"use client";

import { Heart, ShoppingCart } from "lucide-react";
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
interface Purchase {
  id: string;
  product: string;
  customer: string;
  email: string;
  amount: number;
  status: string;
  date: string;
}

const PRICE_RANGES = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹2,999", min: 1000, max: 2999 },
  { label: "₹3,000 – ₹5,999", min: 3000, max: 5999 },
  { label: "₹6,000+", min: 6000, max: Infinity },
];

export default function DashboardMarketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [userId, setUserId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<"wishlist" | "cart">("wishlist");
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "", actualPrice: "", discountPrice: "",
    category: "", shortDescription: "", longDescription: "",
    demoLink: "", driveLink: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUserId(data.user.email);
        setId(data.user._id);
      } catch (err) { console.error(err); }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const loadCart = async () => {
      try {
        const res = await fetch(`/api/cart?userId=${id}`);
        const data = await res.json();
        if (data.success) setCartItems(data.cart || []);
      } catch (err) { console.error("Cart fetch failed", err); }
    };
    loadCart();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const loadWishlist = async () => {
      try {
        const res = await fetch(`/api/wishlist?userId=${id}`);
        const data = await res.json();
        if (data.success) setWishlistItems(data.wishlist || []);
      } catch (error) { console.error("Wishlist fetch failed", error); }
    };
    loadWishlist();
  }, [id]);

  const removeFromCart = async (productId: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      if (data.success) setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (error) { console.error(error); }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const res = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, productId }),
      });
      const data = await res.json();
      if (data.success) setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    if (!userId) return;
    const loadPurchases = async () => {
      try {
        setFetching(true);
        const res = await fetch("/api/analytics/purchase");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const userProducts = data.orders?.filter((order: any) => order.email === userId) || [];
        setProducts(userProducts);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally { setFetching(false); }
    };
    loadPurchases();
  }, [userId]);

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
      const matchSearch = !q || p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
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
    } catch { alert("Something went wrong"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');

        /* ── Design tokens ─────────────────────────────────────── */
        :root {
          /* Light */
          --bg:           #ffffff;
          --bg-surface:   #ffffff;
          --bg-raised:    #efefed;
          --bg-input:     #f0f0ee;
          --border:       rgba(0,0,0,0.10);
          --border-mid:   rgba(0,0,0,0.08);
          --border-sub:   rgba(0,0,0,0.05);
          --text:         #0a0a0a;
          --text-muted:   rgba(0,0,0,0.50);
          --text-faint:   rgba(0,0,0,0.28);
          --text-ghost:   rgba(0,0,0,0.18);
          --pill-bg:      transparent;
          --pill-border:  rgba(0,0,0,0.15);
          --pill-color:   rgba(0,0,0,0.50);
          --pill-a-bg:    #0a0a0a;
          --pill-a-color: #f5f5f3;
          --pill-a-bdr:   #0a0a0a;
          --pill-h-bdr:   rgba(0,0,0,0.35);
          --pill-h-color: rgba(0,0,0,0.75);
          --btn-bg:       #0a0a0a;
          --btn-color:    #f5f5f3;
          --submit-bg:    #0a0a0a;
          --submit-color: #f5f5f3;
          --close-bg:     rgba(0,0,0,0.06);
          --close-bdr:    rgba(0,0,0,0.12);
          --close-color:  rgba(0,0,0,0.45);
          --close-h-bg:   rgba(0,0,0,0.12);
          --close-h-color:rgba(0,0,0,0.80);
          --table-head:   #ebebea;
          --table-row-h:  rgba(0,0,0,0.025);
          --th-color:     rgba(0,0,0,0.55);
          --td-color:     rgba(0,0,0,0.65);
          --badge-bg:     rgba(0,0,0,0.06);
          --badge-color:  rgba(0,0,0,0.40);
          --badge-bdr:    rgba(0,0,0,0.06);
          --select-bg:    #f0f0ee;
          --search-bg:    #f0f0ee;
          --search-color: #0a0a0a;
          --search-ph:    rgba(0,0,0,0.25);
          --panel-bg:     #ffffff;
          --panel-border: rgba(0,0,0,0.10);
          --panel-shadow: -12px 0 60px rgba(0,0,0,0.12);
          --overlay-bg:   rgba(0,0,0,0.35);
          --drawer-bg:    #ffffff;
          --card-bg:      #eeeeec;
          --scrollbar-thumb: rgba(0,0,0,0.15);
          --input-focus-ring: rgba(0,0,0,0.08);
          --empty-text:   #0a0a0a;
          --status-paid-bg: rgba(34,197,94,0.12);
          --status-paid-color: #15803d;
          --status-fail-bg: rgba(239,68,68,0.10);
          --status-fail-color: #b91c1c;
          --item-price-wish: #db2777;
          --item-price-cart: #15803d;
        }

        .dark {
          /* Dark */
          --bg:           #0a0a0a;
          --bg-surface:   #111111;
          --bg-raised:    #181818;
          --bg-input:     #161616;
          --border:       rgba(255,255,255,0.09);
          --border-mid:   rgba(255,255,255,0.07);
          --border-sub:   rgba(255,255,255,0.05);
          --text:         #e8e8e8;
          --text-muted:   rgba(255,255,255,0.50);
          --text-faint:   rgba(255,255,255,0.30);
          --text-ghost:   rgba(255,255,255,0.18);
          --pill-bg:      transparent;
          --pill-border:  rgba(255,255,255,0.10);
          --pill-color:   rgba(255,255,255,0.40);
          --pill-a-bg:    #e8e8e8;
          --pill-a-color: #0a0a0a;
          --pill-a-bdr:   #e8e8e8;
          --pill-h-bdr:   rgba(255,255,255,0.30);
          --pill-h-color: rgba(255,255,255,0.75);
          --btn-bg:       #e8e8e8;
          --btn-color:    #0a0a0a;
          --submit-bg:    #e8e8e8;
          --submit-color: #0a0a0a;
          --close-bg:     rgba(255,255,255,0.05);
          --close-bdr:    rgba(255,255,255,0.10);
          --close-color:  rgba(255,255,255,0.40);
          --close-h-bg:   rgba(255,255,255,0.10);
          --close-h-color:rgba(255,255,255,0.80);
          --table-head:   #181818;
          --table-row-h:  rgba(255,255,255,0.025);
          --th-color:     #e8e8e8;
          --td-color:     rgba(255,255,255,0.75);
          --badge-bg:     rgba(255,255,255,0.07);
          --badge-color:  rgba(255,255,255,0.40);
          --badge-bdr:    rgba(255,255,255,0.07);
          --select-bg:    #161616;
          --search-bg:    #161616;
          --search-color: #e8e8e8;
          --search-ph:    rgba(255,255,255,0.20);
          --panel-bg:     #111111;
          --panel-border: rgba(255,255,255,0.08);
          --panel-shadow: -12px 0 60px rgba(0,0,0,0.70);
          --overlay-bg:   rgba(0,0,0,0.60);
          --drawer-bg:    #111111;
          --card-bg:      #111111;
          --scrollbar-thumb: rgba(255,255,255,0.12);
          --input-focus-ring: rgba(255,255,255,0.04);
          --empty-text:   #e8e8e8;
          --status-paid-bg: rgba(34,197,94,0.15);
          --status-paid-color: #22c55e;
          --status-fail-bg: rgba(239,68,68,0.15);
          --status-fail-color: #ef4444;
          --item-price-wish: #ec4899;
          --item-price-cart: #22c55e;
        }

        * { box-sizing: border-box; }

        .mp-root {
          font-family: 'DM Mono', monospace;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          transition: background 0.25s, color 0.25s;
        }

        /* ── Panel (Add Product) ────────────────────────────────── */
        .mp-panel {
          position: fixed; top: 0; right: 0; height: 100vh;
          width: 480px; max-width: 96vw;
          background: var(--panel-bg);
          border-left: 1px solid var(--panel-border);
          box-shadow: var(--panel-shadow);
          z-index: 50;
          transform: translateX(100%);
          transition: transform 0.42s cubic-bezier(0.22,1,0.36,1);
          overflow-y: auto;
        }
        .mp-panel.open { transform: translateX(0); }

        /* ── Side Drawers (Cart / Wishlist) ─────────────────────── */
        .mp-drawer {
          position: fixed; top: 0; right: 0; height: 100vh;
          width: 450px; max-width: 100%;
          background: var(--drawer-bg);
          border-left: 1px solid var(--panel-border);
          z-index: 100;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
          overflow-y: auto;
        }
        .mp-drawer.open { transform: translateX(0); }

        /* ── Overlays ────────────────────────────────────────────── */
        .mp-overlay {
          position: fixed; inset: 0;
          background: var(--overlay-bg);
          z-index: 40; opacity: 0; pointer-events: none;
          transition: opacity 0.3s; backdrop-filter: blur(2px);
        }
        .mp-overlay.open { opacity: 1; pointer-events: auto; }
        .mp-overlay-drawer {
          position: fixed; inset: 0;
          background: var(--overlay-bg);
          z-index: 90; opacity: 0; pointer-events: none;
          transition: opacity 0.3s; backdrop-filter: blur(2px);
        }
        .mp-overlay-drawer.open { opacity: 1; pointer-events: auto; }

        /* ── Cards ───────────────────────────────────────────────── */
        .mp-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 10px; overflow: hidden;
          transition: box-shadow 0.22s, transform 0.22s, border-color 0.22s;
          animation: cardIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
          cursor: pointer;
        }
        .mp-card:hover {
          box-shadow: 0 0 0 1px var(--border), 0 16px 48px rgba(0,0,0,0.18);
          transform: translateY(-3px); border-color: var(--border);
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Pills ───────────────────────────────────────────────── */
        .mp-pill {
          font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.32rem 0.8rem; border-radius: 2px;
          border: 1px solid var(--pill-border);
          background: var(--pill-bg); cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          white-space: nowrap; color: var(--pill-color);
        }
        .mp-pill.active {
          background: var(--pill-a-bg); color: var(--pill-a-color);
          border-color: var(--pill-a-bdr);
        }
        .mp-pill:hover:not(.active) {
          border-color: var(--pill-h-bdr); color: var(--pill-h-color);
        }

        /* ── Search & selects ────────────────────────────────────── */
        .mp-search {
          font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.04em;
          border: 1px solid var(--border); border-radius: 2px;
          padding: 0.55rem 1rem 0.55rem 2.4rem;
          background: var(--search-bg); outline: none; width: 240px;
          transition: border-color 0.15s, box-shadow 0.15s;
          color: var(--search-color);
        }
        .mp-search:focus {
          border-color: var(--pill-h-bdr);
          box-shadow: 0 0 0 3px var(--input-focus-ring);
        }
        .mp-search::placeholder { color: var(--search-ph); }

        .mp-select {
          font-family: 'DM Mono', monospace; font-size: 0.63rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid var(--border); border-radius: 2px;
          padding: 0.55rem 0.9rem;
          background: var(--select-bg); outline: none;
          color: var(--text-muted); cursor: pointer; transition: border-color 0.15s;
        }
        .mp-select:focus { border-color: var(--pill-h-bdr); }
        .mp-select option { background: var(--bg-input); color: var(--text); }

        /* ── Form inputs ─────────────────────────────────────────── */
        .mp-input {
          width: 100%; font-family: 'DM Mono', monospace; font-size: 0.78rem;
          border: 1px solid var(--border); border-radius: 6px;
          padding: 0.7rem 0.9rem;
          background: var(--bg-input); outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          color: var(--text);
        }
        .mp-input:focus {
          border-color: var(--pill-h-bdr);
          background: var(--bg-surface);
          box-shadow: 0 0 0 3px var(--input-focus-ring);
        }
        .mp-input::placeholder { color: var(--text-ghost); }
        .mp-label {
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--text-faint); display: block; margin-bottom: 0.4rem;
        }

        /* ── Buttons ─────────────────────────────────────────────── */
        .mp-add-btn {
          font-family: 'DM Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          background: var(--btn-bg); color: var(--btn-color);
          border: none; border-radius: 2px;
          padding: 0.65rem 1.3rem; cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
          display: flex; align-items: center; gap: 0.5rem;
          white-space: nowrap; font-weight: 500;
        }
        .mp-add-btn:hover { opacity: 0.80; }
        .mp-add-btn:active { transform: scale(0.97); }

        .mp-submit {
          font-family: 'DM Mono', monospace; font-size: 0.7rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          background: var(--submit-bg); color: var(--submit-color);
          border: none; border-radius: 6px;
          padding: 0.85rem 1rem; width: 100%;
          cursor: pointer; transition: opacity 0.15s; margin-top: 0.5rem; font-weight: 500;
        }
        .mp-submit:hover { opacity: 0.80; }
        .mp-submit:disabled { opacity: 0.35; cursor: not-allowed; }

        .mp-close-btn {
          background: var(--close-bg);
          border: 1px solid var(--close-bdr); border-radius: 2px;
          padding: 0.4rem 0.65rem; cursor: pointer;
          color: var(--close-color); font-size: 0.75rem;
          transition: background 0.15s, color 0.15s;
        }
        .mp-close-btn:hover { background: var(--close-h-bg); color: var(--close-h-color); }

        .mp-icon-btn {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid var(--border);
          background: transparent; color: #ef4444;
          cursor: pointer; font-size: 18px; display: flex;
          align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .mp-icon-btn:hover { background: rgba(239,68,68,0.08); }

        /* ── Table ───────────────────────────────────────────────── */
        .mp-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-surface);
        }
        .mp-table { width: 100%; border-collapse: collapse; }
        .mp-thead tr {
          background: var(--table-head);
          border-bottom: 1px solid var(--border-mid);
        }
        .mp-th {
          text-align: left; padding: 14px;
          color: var(--th-color);
          font-size: 13px; font-weight: 600;
        }
        .mp-td {
          padding: 14px;
          color: var(--td-color);
          font-size: 13px;
        }
        .mp-tbody tr {
          border-bottom: 1px solid var(--border-sub);
          transition: background 0.15s;
        }
        .mp-tbody tr:hover { background: var(--table-row-h); }

        .mp-status {
          padding: 4px 10px; border-radius: 999px;
          font-size: 12px; font-family: 'DM Mono', monospace;
        }
        .mp-status.paid {
          background: var(--status-paid-bg);
          color: var(--status-paid-color);
        }
        .mp-status.failed {
          background: var(--status-fail-bg);
          color: var(--status-fail-color);
        }

        /* ── Drawer items ────────────────────────────────────────── */
        .mp-drawer-item {
          padding: 14px;
          border-bottom: 1px solid var(--border-mid);
          display: flex; justify-content: space-between;
          align-items: center; gap: 12px;
        }
        .mp-drawer-item-name { color: var(--text); font-weight: 500; }
        .mp-drawer-item-price-wish { color: var(--item-price-wish); margin-top: 4px; font-size: 14px; }
        .mp-drawer-item-price-cart { color: var(--item-price-cart); margin-top: 4px; font-size: 14px; }
        .mp-drawer-item-qty { color: var(--text-muted); font-size: 12px; margin-top: 2px; }
        .mp-drawer-empty { color: var(--text-muted); padding: 1rem 0; }

        /* ── Divider ─────────────────────────────────────────────── */
        .mp-hr { border: none; border-top: 1px solid var(--border-mid); margin-bottom: 1.75rem; }

        /* ── Filter bar ──────────────────────────────────────────── */
        .mp-filter-bar {
          display: flex; flex-wrap: wrap; gap: 0.75rem;
          align-items: center; margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-mid);
        }

        /* ── Scrollbar ───────────────────────────────────────────── */
        .mp-panel::-webkit-scrollbar,
        .mp-drawer::-webkit-scrollbar { width: 4px; }
        .mp-panel::-webkit-scrollbar-track,
        .mp-drawer::-webkit-scrollbar-track { background: var(--bg-surface); }
        .mp-panel::-webkit-scrollbar-thumb,
        .mp-drawer::-webkit-scrollbar-thumb {
          background: var(--scrollbar-thumb); border-radius: 2px;
        }

        /* ── Skeletons ───────────────────────────────────────────── */
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .mp-skeleton {
          background: linear-gradient(90deg, var(--bg-raised) 25%, var(--bg-input) 50%, var(--bg-raised) 75%);
          background-size: 600px 100%; animation: shimmer 1.4s infinite linear; border-radius: 6px;
        }

        /* ── Empty state ─────────────────────────────────────────── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .mp-empty { animation: fadeUp 0.5s ease both; text-align: center; padding: 6rem 0; }
        .mp-empty-num { font-size: 4rem; font-weight: bold; color: var(--empty-text); }
        .mp-empty-label { color: var(--text-muted); margin-top: 0.5rem; }

        /* ── file input ──────────────────────────────────────────── */
        .mp-file-input { color: var(--text-muted); font-size: 0.75rem; }
        .mp-file-input::file-selector-button {
          font-family: 'DM Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          background: var(--btn-bg); color: var(--btn-color);
          border: none; border-radius: 2px; padding: 0.4rem 0.8rem;
          cursor: pointer; margin-right: 0.75rem; transition: opacity 0.15s;
        }
        .mp-file-input::file-selector-button:hover { opacity: 0.80; }
      `}</style>

      <div className="mp-root">
        {/* Panel overlay */}
        <div className={`mp-overlay ${panelOpen ? "open" : ""}`} onClick={() => setPanelOpen(false)} />

        {/* ── Add Product panel ─────────────────────────────────── */}
        <div className={`mp-panel ${panelOpen ? "open" : ""}`}>
          <div style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.75rem", color: "var(--text)", margin: 0 }}>
                  Add <em>Product</em>
                </h2>
                <p style={{ fontSize: "0.68rem", color: "var(--text-faint)", letterSpacing: "0.06em", margin: "0.3rem 0 0" }}>
                  Fill in the details below
                </p>
              </div>
              <button className="mp-close-btn" onClick={() => setPanelOpen(false)}>✕</button>
            </div>

            <hr className="mp-hr" />

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
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="mp-file-input" />
              </div>
              <button className="mp-submit" type="submit" disabled={loading}>
                {loading ? "Creating…" : "+ Create Product"}
              </button>
            </form>
          </div>
        </div>

        {/* ── Main content ──────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem,5vw,3.5rem)", color: "var(--text)", margin: 0 }}>
                My <em>Purchases</em>
              </h1>
              <p style={{ marginTop: ".4rem", fontSize: ".68rem", letterSpacing: ".08em", color: "var(--text-faint)" }}>
                {fetching ? "Loading…" : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => { setDrawerType("wishlist"); setDrawerOpen(true); }} className="mp-add-btn">
                <Heart /> 
                Wishlist ({wishlistItems.length})
              </button>
              <button onClick={() => { setDrawerType("cart"); setDrawerOpen(true); }} className="mp-add-btn">
                <ShoppingCart />
                 Cart ({cartItems.length})
              </button>
            </div>
          </div>

          {/* Filter bar */}
          <div className="mp-filter-bar">
            <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", pointerEvents: "none" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
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

          {/* Table / Empty */}
          {fetching ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)", fontSize: "0.78rem", letterSpacing: "0.1em" }}>
              Loading purchases…
            </div>
          ) : products.length === 0 ? (
            <div className="mp-empty">
              <div className="mp-empty-num">0</div>
              <p className="mp-empty-label" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>Purchases Found</p>
            </div>
          ) : (
            <div className="mp-table-wrap">
              <table className="mp-table">
                <thead className="mp-thead">
                  <tr>
                    {["#", "Product", "Customer", "Email", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} className="mp-th">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="mp-tbody">
                  {products.map((purchase: any, index) => (
                    <tr key={purchase.id}>
                      <td className="mp-td">{index + 1}</td>
                      <td className="mp-td">{purchase.product}</td>
                      <td className="mp-td">{purchase.customer}</td>
                      <td className="mp-td">{purchase.email}</td>
                      <td className="mp-td">₹{purchase.amount}</td>
                      <td className="mp-td">
                        <span className={`mp-status ${purchase.status === "paid" ? "paid" : "failed"}`}>
                          {purchase.status}
                        </span>
                      </td>
                      <td className="mp-td">{new Date(purchase.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Cart / Wishlist drawer ────────────────────────────── */}
        <div className={`mp-overlay-drawer ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)} />

        <div className={`mp-drawer ${drawerOpen ? "open" : ""}`}>
          <div style={{ padding: "24px" }}>
            {/* Drawer header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ color: "var(--text)", margin: 0, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.6rem" }}>
                {/* {drawerType === "wishlist" ? <Heart /> : <ShoppingCart />} */}
                {drawerType === "wishlist" ? " Wishlist" : " Cart"}
              </h2>
              <button className="mp-close-btn" onClick={() => setDrawerOpen(false)}>✕</button>
            </div>

            <hr className="mp-hr" />

            {drawerType === "wishlist" ? (
              wishlistItems.length === 0 ? (
                <p className="mp-drawer-empty">No items in wishlist</p>
              ) : (
                wishlistItems.map((item) => (
                  <div key={item._id} className="mp-drawer-item">
                    <div>
                      <div className="mp-drawer-item-name">{item.productName}</div>
                      <div className="mp-drawer-item-price-wish">₹{item.productPrice}</div>
                    </div>
                    <button className="mp-icon-btn" onClick={() => removeFromWishlist(item.productId)}>✕</button>
                  </div>
                ))
              )
            ) : (
              cartItems.length === 0 ? (
                <p className="mp-drawer-empty">Cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="mp-drawer-item">
                    <div>
                      <div className="mp-drawer-item-name">{item.productName}</div>
                      <div className="mp-drawer-item-price-cart">₹{item.productPrice}</div>
                      <div className="mp-drawer-item-qty">Qty: {item.quantity}</div>
                    </div>
                    <button className="mp-icon-btn" onClick={() => removeFromCart(item.productId)}>✕</button>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}