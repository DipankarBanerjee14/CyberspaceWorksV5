"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChefHat, IdCardLanyard, NotebookTabs, Pill, ReceiptIndianRupee, ReceiptText, ShoppingBag, SquareKanban, Stethoscope } from "lucide-react";

import {
  Search,
  Heart,
  ShoppingCart,
  X,
} from "lucide-react";
import DotGrid from "../products/cyberclinic-clinic-management-system/components/DotGrid";
import styled from "styled-components";


const CUT = 32;
function ProductSkeleton() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
  <div className="relative">
    <div className="h-16 w-16 rounded-full border-4 border-cyan-500/20"></div>

    <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-cyan-500"></div>
  </div>
</div>
  );
}
function cutPath(cut = CUT) {
  return `polygon(
    ${cut}px 0%,
    100% 0%,
    100% calc(100% - ${cut}px),
    calc(100% - ${cut}px) 100%,
    0% 100%,
    0% ${cut}px
  )`;
}

function innerCutPath(
  cut: number,
  inset = 1.5
) {
  const c = cut - inset;

  return `polygon(
    ${c}px 0%,
    100% 0%,
    100% calc(100% - ${c}px),
    calc(100% - ${c}px) 100%,
    0% 100%,
    0% ${c}px
  )`;
}



function CornerMark({
  cut,
  accent,
}: {
  cut: number;
  accent: string;
}) {
  const len = cut * 0.85;

  return (
    <>
      <svg
        className="absolute top-0 left-0 z-10 pointer-events-none"
        width={cut + len}
        height={cut + len}
        fill="none"
      >
        <line
          x1={cut}
          y1={0}
          x2={0}
          y2={cut}
          stroke={accent}
          strokeWidth="1.2"
        />

        <line
          x1={cut}
          y1={0}
          x2={cut + len}
          y2={0}
          stroke={accent}
          strokeWidth="1.2"
        />

        <line
          x1={0}
          y1={cut}
          x2={0}
          y2={cut + len}
          stroke={accent}
          strokeWidth="1.2"
        />
      </svg>

      <svg
        className="absolute bottom-0 right-0 z-10 pointer-events-none"
        width={cut + len}
        height={cut + len}
        fill="none"
      >
        <line
          x1={len}
          y1={cut + len}
          x2={cut + len}
          y2={len}
          stroke={accent}
          strokeWidth="1.2"
        />

        <line
          x1={0}
          y1={cut + len}
          x2={len}
          y2={cut + len}
          stroke={accent}
          strokeWidth="1.2"
        />

        <line
          x1={cut + len}
          y1={0}
          x2={cut + len}
          y2={len}
          stroke={accent}
          strokeWidth="1.2"
        />
      </svg>
    </>
  );
}


interface CardProps {
  label: string;
  title: string;
  description: string;
  tag?: string;
  demo?: string;
  accent?: string;
  cut?: number;
  duration?: string;
  icon?: ReactNode;
  href?: string;
  price?: number;
  id?:string,
  wishlist?: any[]; 
  wishlistDB?: any[];
  toggleWishlist?: any;
  addToCart?: any;
  removeFromCart?: any;
  isInCart?: (productId:any)=>boolean;
  image?: string;
}
interface Product {
  id: number;
  title: string;
  actualPrice: number;
  discountPrice: number;
  category: string;
  demo?: string;
  shortDescription: string;
  longDescription: string;
  image?: string;   // ✅ add this
}

const CutoutCardShell = styled.div<{ $active: boolean }>`
  position: relative;
  height: 100%;
  background: #000;
  transition: transform 300ms;
  transform: ${({ $active }) =>
    $active ? "translateY(-5px) scale(1.015)" : "none"};
`;

const CutoutCardFrame = styled.div<{ $cut: number }>`
  position: relative;
  height: 100%;
  padding: 1.5px;
  clip-path: ${({ $cut }) => cutPath($cut)};
`;

const CutoutCardBorder = styled.div<{ $cut: number }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  clip-path: ${({ $cut }) => cutPath($cut)};
`;

const CutoutCardInner = styled.div<{ $cut: number }>`
  position: relative;
  z-index: 10;
  height: 100%;
  overflow: hidden;
  background: #0a0a0a;
  clip-path: ${({ $cut }) => innerCutPath($cut, 1.5)};
`;
const CutoutCardCartButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 4rem; /* beside wishlist */
  z-index: 30;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: rgba(255,255,255,.7);
  // border: 1px solid rgba(255,255,255,.14);
  backdrop-filter: blur(10px);
  transition: all 300ms;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    border-color: #00ced4;
    color: #00ced4;
  }
`;

const CutoutCardSpotlight = styled.div<{
  $inside: boolean;
  $x: number;
  $y: number;
  $accent: string;
}>`
  position: absolute;
  inset: 0;
  opacity: ${({ $inside }) => ($inside ? 1 : 0)};
  transition: opacity 300ms;
  background: ${({ $inside, $x, $y, $accent }) =>
    $inside
      ? `radial-gradient(circle 180px at ${$x}% ${$y}%, ${$accent}28 0%, transparent 70%)`
      : "transparent"};
`;

const CutoutCardLabel = styled.span<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ $accent }) => `${$accent}35`};
  background: ${({ $accent }) => `${$accent}18`};
  color: ${({ $accent }) => $accent};
  padding: 0.25rem 0.5rem;
  font-size: 9px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const CutoutCardAction = styled.button<{
  $inside: boolean;
  $accent: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid
    ${({ $inside, $accent }) =>
      $inside ? $accent : "rgba(255,255,255,.12)"};
  color: ${({ $inside, $accent }) =>
    $inside ? $accent : "rgba(255,255,255,.4)"};
  background: ${({ $inside, $accent }) => ($inside ? `${$accent}18` : "transparent")};
  padding: 0.75rem 1rem;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: all 300ms;
  cursor: pointer;
`;

const CutoutCardImage = styled.div`
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
`;

const CutoutCardWishlistButton = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 1rem;
  left: 1rem;

  z-index: 30;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
 color: ${({ $active }) =>
  $active ? "#ef4444" : "transparent"};
background:transparent;
// border: 1px solid
//   ${({ $active }) => ($active ? "#ef4444" : "rgba(255,255,255,.14)")};
  backdrop-filter: blur(10px);
  transition: all 300ms;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    border-color: #ef4444;
    color: #ef4444;
  }
`;

function CutoutCard({
  label,
  id,
  title,
  description,
  demo,
  tag,
  accent = "#00ced4",
  cut = CUT,
  duration = "3s",
  icon,
  href,
  price,
  image,
  wishlist, 
  
  wishlistDB,
  toggleWishlist,
  addToCart,
  removeFromCart,
  isInCart,
}: CardProps){
  const cardRef =
    useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState<any>(null);
    const { data: session } = useSession();

useEffect(() => {
  const loadUser = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    if (data.success) {
      setCurrentUser(data.user);
    }
  };

  loadUser();
}, []);
    
const isWishlisted = wishlistDB?.some(
  (item) =>
    String(item.productId) === String(id) &&
    item.isActive === true
);

  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
    inside: false,
  });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const r =
        cardRef.current?.getBoundingClientRect();

      if (!r) return;

      setMouse({
        x:
          ((e.clientX - r.left) / r.width) * 100,
        y:
          ((e.clientY - r.top) / r.height) *
          100,
        inside: true,
      });
    },
    []
  );

  const onLeave = useCallback(() => {
    setMouse((m) => ({
      ...m,
      inside: false,
    }));
  }, []);

  // Determine if this product is already in the cart
  const inCart = isInCart ? isInCart(id) : false;

  return (
    <CutoutCardShell
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      $active={mouse.inside}
      id="next-section"
     onClick={() => {
  const storedUser = localStorage.getItem("user");
  const user1 =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

const userId =
  (session?.user as any)?.id ||
  user1?.id ||
  currentUser?.id;

  if (!userId) {
    alert("Please login first");
    router.push("/login"); // optional redirect
    return;
  }

  router.push(`/shop/${id}`);
}}
    >
      <CutoutCardFrame $cut={cut}>
        <CutoutCardBorder $cut={cut} />

        <CutoutCardInner $cut={cut}>
          <CutoutCardSpotlight
            $inside={mouse.inside}
            $x={mouse.x}
            $y={mouse.y}
            $accent={accent}
          />

        
        <CutoutCardWishlistButton
  type="button"
  $active={isWishlisted}
  onClick={(event) => {
    event.stopPropagation();
    toggleWishlist?.({
      id,
      title,
      price,
      image,
      label,
      description,
    });
  }}
>
  <Heart
      size={14}
      fill={isWishlisted ? "#ef4444" : "none"}
      // When not wish‑listed, show only the outline (no fill) with a subtle color.
      color={isWishlisted ? "#ef4444" : "rgba(255,255,255,0.7)"}
    />
</CutoutCardWishlistButton>

{inCart ? (
  <CutoutCardCartButton
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      removeFromCart?.({ id, title, price });
    }}
  >
    {/* X icon indicates removal */}
    <X size={14} />
  </CutoutCardCartButton>
) : (
  <CutoutCardCartButton
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      addToCart?.({ id, title, price });
    }}
  >
    <ShoppingCart size={14} />
  </CutoutCardCartButton>
)}

          <div className="relative z-20 flex h-full flex-col gap-4 p-7 bg-gray-900">
            <CornerMark
              cut={cut}
              accent={accent}
            />

            <div className="flex items-start justify-between mt-5">
              {/* <CutoutCardLabel $accent={accent}>
                {label}
              </CutoutCardLabel> */}

              {tag ? (
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  {tag}
                </span>
              ) : null}
            </div>

            {image ? (
              <CutoutCardImage>
                <Image
                  src={image}
                  alt={title}
                  width={1200}
                  height={800}
                  unoptimized
                  className="h-40 w-full object-cover"
                />
              </CutoutCardImage>
            ) : null}

            <div className="flex flex-1 flex-col gap-3">
              <div className="flex items-start gap-2">
                {icon ? (
                  <span className="flex items-center justify-center text-cyan-500 [&>svg]:h-5 [&>svg]:w-5">
                    {icon}
                  </span>
                ) : null}

                <h3 className="text-xl font-semibold text-white">
                  {title}
                </h3>
              </div>

              <p className="text-sm leading-7 text-white/50">
                {description}
              </p>
            {demo && (
  <a
    href={demo}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="text-cyan-400 hover:text-cyan-300 text-sm break-all"
  >
    Live Demo →
  </a>
)}
              
            </div>

            <div className="mt-auto flex items-center justify-between gap-4 pt-2">
              {price !== undefined ? (
                <div className="text-2xl font-bold text-white">
                  ₹{price}
                </div>
              ) : (
                <span />
              )}

              <CutoutCardAction
  $inside={mouse.inside}
  $accent={accent}
  onClick={(e) => {
    router.push(`/shop/${id}`);
  }}
>
                Purchase Now
              </CutoutCardAction>
            </div>
          </div>
        </CutoutCardInner>
      </CutoutCardFrame>
    </CutoutCardShell>
  );
}


export default function SoftwareShowcase() {
  const router = useRouter();
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [wishlist, setWishlist] = useState<any[]>([]);
const [wishlistDB, setWishlistDB] = useState<any[]>([]);
const [cart, setCart] = useState<any[]>([]);
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [priceRange, setPriceRange] = useState([0, 5000]);
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

useEffect(() => {
  const loadUser = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    if (data.success) {
      setCurrentUser(data.user);
    }
    console.log("user",currentUser);
  };

  loadUser();
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
useEffect(() => {
  const storedUser = localStorage.getItem("user"); 
  console.log("user", storedUser);
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  } else {
    setUser(null);
  }
}, []);
const user1 =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

const userId =
  (session?.user as any)?.id ||
  user1?.id ||
  user?.id;

// ---------------------------------------------------------------------
// Load the wishlist for the current user. Defined at component scope so it
// can be reused by the initial effect and the global "wishlist-updated"
// listener.
// ---------------------------------------------------------------------
const loadWishlist = async () => {
  if (!userId) return;
  const res = await fetch(`/api/wishlist/toggle?userId=${userId}`);
  const data = await res.json();
  if (data.success) {
    setWishlistDB(data.wishlist);
  }
};
const loadCart = async () => {
  if (!userId) return;

  try {
    const res = await fetch(
      `/api/cart?userId=${userId}`
    );

    const data = await res.json();

    if (data.success) {
      setCart(data.cart || []);
    }
  } catch (error) {
    console.error(error);
  }
};

// Listen for external cart updates (e.g., from the Navbar drawer) and refresh the local cart state.
useEffect(() => {
  const handler = () => {
    // Re-fetch the cart to keep UI in sync with the server.
    loadCart();
  };
  if (typeof window !== "undefined") {
    window.addEventListener("cart-updated", handler);
  }
  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("cart-updated", handler);
    }
  };
}, []);

useEffect(() => {
  if (!userId) return;

  loadWishlist();
  loadCart();
}, [userId]);
const isInCart = (productId: string) => {
  return cart.some(
    (item) =>
      String(item.productId) ===
      String(productId)
  );
};

  // ---------------------------------------------------------------------
  // Listen for global "wishlist-updated" events dispatched by Navbar.
  // When the user removes an item from the drawer, Navbar updates its
  // state and emits the event. Refresh the local `wishlistDB` here so the
  // heart icon on this page reflects the current state (blank when not
  // wishlisted).
  // ---------------------------------------------------------------------
  useEffect(() => {
    const handler = () => {
      // Re‑load the wishlist from the server to get the latest `isActive`
      // flags. Errors are silently ignored – the UI will simply keep the
      // previous state.
      loadWishlist();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("wishlist-updated", handler);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("wishlist-updated", handler);
      }
    };
  }, []);
// const user1 =
//   typeof window !== "undefined"
//     ? JSON.parse(localStorage.getItem("user") || "null")
//     : null;

// const userId = (session?.user as any)?.id || user1?.id || user?.id;
console.log(user1);
console.log("userId", userId);
const StyledPattern = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background-color: #000;
  background-image: radial-gradient(#00ced4 10%, transparent 10%);
  background-size: 11px 11px;
  opacity: 0.5;
  mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
`;
const Pattern = () => <StyledPattern />;

const categories = [
  "All",
  ...new Set(products.map((p) => p.category)),
];
const filteredProducts = products.filter((product: any) => {
  const matchSearch = product.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCategory =
    category === "All" || product.category === category;

  const matchPrice =
    product.discountPrice >= priceRange[0] &&
    product.discountPrice <= priceRange[1];

  return matchSearch && matchCategory && matchPrice;
});
const [priceHover, setPriceHover] = useState(false);
const toggleWishlist = async (product: any) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  console.log("user1",user);

  if (!userId) {
    // console.log("user1",user1.id);
    return alert("Login required");
  }
console.log("product", product);
  const res = await fetch("/api/wishlist/toggle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      productId: product.id,
      productName: product.title,
      productPrice: product.price,
    }),
  });

  const data = await res.json();

  if (data.success) {
    setWishlistDB((prev) => {
      const exists = prev.find(
        (item) => item.productId === product.id
      );

      if (exists) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, isActive: !item.isActive }
            : item
        );
      }
        // The API may return the newly created wishlist entry without an
        // explicit `isActive` flag. By default a newly added item should be
        // active, so we force the flag to `true` here.
        const newItem = {
          ...(data.wishlist || {}),
          isActive: true,
        };
        return [...prev, newItem];
    });
    // Refresh the navbar badge immediately
    if (typeof window !== "undefined") {
      (window as any).__refreshWishlist?.();
    }
  }
};
// Add an item to the cart (POST request) and update local state
const addToCart = async (product: any) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!userId) {
    alert("Please login first");
    return;
  }

  const quantity = 1; // could be made dynamic later

  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      productId: product.id,
      productName: product.title,
      productPrice: product.price,
      quantity,
      totalPrice: product.price * quantity,
    }),
  });

  const data = await res.json();

  if (data.success) {
    console.log("Added to cart");
    // Optimistically update local cart state. Ensure each cart entry has a `productId`
    // field that matches the product's `id`. This aligns with the `isInCart` helper
    // which checks `item.productId`. If the API returns a cartItem we use it; otherwise
    // we construct a minimal object containing the necessary fields.
    const newCartItem = data.cartItem ?? {
      productId: product.id,
      title: product.title,
      price: product.price,
    };
    setCart((prev) => [...prev, newCartItem]);
    if (typeof window !== "undefined") {
      (window as any).__refreshCart?.();
    }
  }
};

// Remove an item from the cart (DELETE request) and update local state
// Accept a `product` argument (the product object from the UI) and use its `id`
// field to identify the cart item to delete.
const removeFromCart = async (product: any) => {
  const user = currentUser;
  console.log("currentUser in removeFromCart:", user);

  if (!userId) return;

  const res = await fetch("/api/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      // The product object uses `id` (not `_id`) throughout the component.
      productId: product.id,
    }),
  });

  const data = await res.json();
  console.log("removeFromCart response:", data);

  if (data.success) {
    // Update the local `cart` state (not `cartItems`).
    setCart((prev) =>
      prev.filter(
        (item) => String(item.productId) !== String(product.id)
      )
    );
  }
};

// Helper to check if a product is already in the cart
// const isInCart = (productId: any) => {
//   return cart.some((c) => c.productId === productId);
// };

  return (
    <div id="products" className="relative min-h-screen overflow-hidden bg-black">
     
<Pattern/>
      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-20">
        
        <div className="mb-10 flex flex-col md:flex-row gap-4 w-full">
  <div className="relative flex-1">
    <Search className="absolute left-4 top-4 size-4 text-white/50" />

    <input
      type="text"
      placeholder="Search software..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      aria-label="Search software"
      className="w-full rounded-xl bg-black border border-white/10 pl-12 pr-4 py-3 text-white outline-none"
    />
  </div>
        <div className="flex flex-col">
  {/* <label htmlFor="price-range" className="text-white text-sm">
    Price Range
  </label> */}

  {/* show only on hover / interaction */}
   
    <div className="mt-2 text-sm text-white/60">
      Price - ₹{priceRange[0]} - ₹{priceRange[1]}
    </div>


  <input
    id="price-range"
    type="range"
    min={0}
    max={10000}
    value={priceRange[1]}
    aria-label="Price range maximum"
    onMouseEnter={() => setPriceHover(true)}
    onMouseLeave={() => setPriceHover(false)}
    onMouseDown={() => setPriceHover(true)}
    onMouseUp={() => setPriceHover(false)}
    onChange={(e) =>
      setPriceRange([priceRange[0], Number(e.target.value)])
    }
    className="accent-cyan-500 mt-2"
  />
</div>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    aria-label="Select category"
    className="rounded-xl bg-black border border-white/10 px-4 py-3 text-white"
  >
    {categories.map((cat) => (
      <option key={cat}>{cat}</option>
    ))}
  </select>
</div>


        {/* Grid */}
     <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  {fetching ? (
    Array.from({ length: 1 }).map((_, index) => (
      <ProductSkeleton key={index} />
    ))
  ) : filteredProducts.length > 0 ? (
    filteredProducts.map((product: any) => (
        <CutoutCard
        key={product._id}
        id={product._id}
        label={product.category}
        title={product.title}
        demo={product.demoLink}
        description={product.shortDescription}
        price={product.discountPrice}
        image={product.image}
        wishlist={wishlist}
        wishlistDB={wishlistDB}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        isInCart={isInCart}
      />
    ))
  ) : (
    <div className="col-span-full text-center py-20 text-white/60">
      No products found
    </div>
  )}
</div>
      </div>

      {/* Animation */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}