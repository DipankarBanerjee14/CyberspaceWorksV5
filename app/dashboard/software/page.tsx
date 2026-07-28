"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import DashboardAnalytics from "./dashboard/page";

import { useRouter } from "next/navigation";
import { ChefHat, Heart, IdCardLanyard, NotebookTabs, Pill, ReceiptIndianRupee, ReceiptText, ShoppingBag, ShoppingCart, SquareKanban, Stethoscope } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
const CUT = 32;

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
    productId: string;
  productPrice: number;
  label: string;
  title: string;
  description: string;
  tag?: string;
  accent?: string;
  cut?: number;
  duration?: string;
  icon?: ReactNode;
  href?: string;

  onWishlist?: () => void;
  onAddToCart?: () => void;
}
function CutoutCard({
  productId,
  productPrice,

  label,
  title,
  description,
  tag,
  accent = "#e8ff47",
  cut = CUT,
  duration = "3s",
  icon,
  href,
}: CardProps){

    const { data: session } = useSession();

const userId = (session?.user as any)?.id;
const [isWishlisted, setIsWishlisted] = useState(false);
const [isInCart, setIsInCart] = useState(false);
const handleCart = async (
  e: React.MouseEvent
) => {
  e.stopPropagation();

  try {
    const res = await axios.post(
      "/api/cart",
      {
        userId,
        productId,
        productName: title,
        productPrice,
        quantity: 1,
      }
    );

    setIsInCart(res.data.isInCart);
  } catch (error) {
    console.error(error);
  }
};

const handleWishlist = async (
  e: React.MouseEvent
) => {
  e.stopPropagation();
console.log({
  userId,
  productId,
  productName: title,
  productPrice,
});
  try {
    const res = await axios.post(
      "/api/wishlist/toggle",
      {
        userId,
        productId,
        productName: title,
        productPrice,
      }
    );

    setIsWishlisted(
      res.data.wishlist?.isActive
    );
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  if (!userId) return;

  const checkCart = async () => {
    try {
      const res = await axios.get(
        `/api/cart?userId=${userId}`
      );

      const exists = res.data.cart.some(
        (item: any) =>
          item.productId === productId
      );

      setIsInCart(exists);
    } catch (error) {
      console.error(error);
    }
  };

  checkCart();
}, [userId, productId]);
  const cardRef =
    useRef<HTMLDivElement>(null);

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
 const router = useRouter();
  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative h-full transition-all duration-300"
      style={{
        transform: mouse.inside
          ? "translateY(-5px) scale(1.015)"
          : "none",
      }}
      id="next-section"
    >

      <div
        className="relative h-full p-[1.5px]"
        style={{
          clipPath: cutPath(cut),
        }}
      >
        <div
          className="relative z-10 h-full overflow-hidden bg-[#0a0a0a]"
          style={{
            clipPath: innerCutPath(cut, 1.5),
          }}
        >
            <button
 onClick={handleWishlist}
  className="absolute top-4 left-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-sm transition-all hover:border-red-500 hover:text-red-500"
>
<Heart
  size={16}
  fill={isWishlisted ? "red" : "none"}
/>
</button>
          {/* Spotlight */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: mouse.inside ? 1 : 0,
              background: `radial-gradient(
                circle 180px at ${mouse.x}% ${mouse.y}%,
                ${accent}28 0%,
                transparent 70%
              )`,
            }}
          />

          <div className="relative z-20 flex h-full flex-col gap-4 p-7">
            <CornerMark
              cut={cut}
              accent={accent}
            />

            <div className="flex items-start justify-between">
              <span
  className="inline-flex items-center gap-2 border px-2 py-1 text-[9px] uppercase tracking-[0.2em]"
  style={{
    color: accent,
    borderColor: `${accent}35`,
    background: `${accent}18`,
  }}
>
 

  {label}
</span>

              {tag && (
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  {tag}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3">
              <div className="flex">
               {icon && (
    <span className="flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 text-cyan-500">
      {icon}
    </span>
  )}
              <h3 className="text-xl ml-2 font-semibold text-white">
                {title}
              </h3>
              </div>

              <p className="text-sm leading-7 text-white/50">
                {description}
              </p>
            </div>

            <div className="mt-auto flex gap-2">
  <button
    className="flex-1 flex items-center justify-center gap-2 border px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
    style={{
      borderColor: mouse.inside
        ? accent
        : "rgba(255,255,255,.12)",
      color: mouse.inside
        ? accent
        : "rgba(255,255,255,.4)",
      background: mouse.inside
        ? `${accent}18`
        : "transparent",
    }}
    onClick={() => router.push(href || "/")}
  >
    View More
  </button>

 <button
  onClick={handleCart}
  className={`flex items-center justify-center gap-2 border px-4 py-3 transition-all duration-300 ${
    isInCart
      ? "border-red-500 text-red-500 hover:bg-red-500/10"
      : "border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
  }`}
>
  <ShoppingCart size={16} />

  <span className="hidden md:block text-xs">
    {isInCart ? "Remove" : "Add"}
  </span>
</button>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const softwares = [
  "CyberProjects",
  "CyberInvoice",
  "CyberLedger",
  "CyberPayroll",
  "CyberRetail",
  "CyberClinic",
  "CyberPharma",
  "CyberDine",
];
export default function SoftwareShowcase() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"software" | "analytics">(
  "analytics"
);
  return (
    <div id="products" className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="mb-4">
   <div className="inline-flex rounded-lg gap-2 p-1 bg-muted/50">
  <button
    onClick={() => setActiveView("analytics")}
    className={`px-6 py-2 border rounded-md text-sm transition-all ${
      activeView === "analytics"
        ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
        : "text-muted-foreground border-border hover:text-foreground"
    }`}
  >
    Analytics
  </button>

  <button
    onClick={() => setActiveView("software")}
    className={`px-6 py-2 border rounded-md text-sm transition-all ${
      activeView === "software"
        ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
        : "text-muted-foreground border-border hover:text-foreground"
    }`}
  >
    Software
  </button>
</div> 

   {/* <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
    onClick={() => setView("analytics")}
    className={`mp-pill ${view === "analytics" ? "active" : ""}`}
  >
    Analytics
  </button>
  <button
    onClick={() => setView("products")}
    className={`mp-pill ${view === "products" ? "active" : ""}`}
  >
    Product List
  </button>

  
</div> */}
</div>
      {activeView === "software" && (
        
    <SoftwareCRM/>
      )}

 {activeView === "analytics" && (
  <DashboardAnalytics />
)}

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


import {
  UserPlus,
  Pencil,
  X,
  Users,
  ChevronRight,
  Package,
} from "lucide-react";



const emptyForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  contractStartDate: "",
  contractEndDate: "",
  softwareName: "",
  tenure: "monthly",
  plan: "",
  source: "",
  description: "",
};

 function SoftwareCRM() {
  const [rows, setRows] = useState(
    softwares.map((software) => ({ software, plan: "Basic" }))
  );
  const [clients, setClients] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  const loadClients = async () => {
    try {
      const res = await fetch("/api/software-client");
      const data = await res.json();
      if (data.success) setClients(data.clients);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const updatePlan = (index: number, plan: string) => {
    const updated = [...rows];
    updated[index].plan = plan;
    setRows(updated);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(form);
  //   const url = editingId
  //     ? `/api/software-client/${editingId}`
  //     : "/api/software-client";
  //   const method = editingId ? "PUT" : "POST";
  //   const response = await fetch(url, {
  //     method,
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   if (data.success) {
  //     loadClients();
  //     closeDrawer();
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const url = editingId
    ? `/api/software-client/${editingId}`
    : "/api/software-client";

  const method = editingId ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await response.json();

  if (data.success) {
    // Second API call
    const secondResponse = await fetch("https://pharma-managebasic-wgi8.vercel.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tenantId: data.client._id, // example
        email: form.email,
      }),
    });

    const secondData = await secondResponse.json();

    if (secondData.success) {
      loadClients();
      closeDrawer();
    }
  }
};

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const openAdd = (software: string, plan: string) => {
    setForm({ ...emptyForm, softwareName: software, plan });
    setEditingId(null);
    setDrawerOpen(true);
  };

  const openEdit = (client: any) => {
    setEditingId(client._id);
    setForm({
      name: client.name || "",
      email: client.email || "",
      password: client.password || "",
      phone: client.phone || "",
      contractStartDate: client.contractStartDate?.split("T")[0] || "",
      contractEndDate: client.contractEndDate?.split("T")[0] || "",
      softwareName: client.softwareName || "",
      tenure: client.tenure || "monthly",
      plan: client.plan || "",
      source: client.source || "",
      description: client.description || "",
    });
    setDrawerOpen(true);
  };

  return (
    // Root: supports both light and dark via Tailwind's dark: prefix
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans transition-colors duration-300">
      {/* Page Header */}
      <div className="border-b border-black/10 dark:border-white/10 px-8 py-6">
        <div className="flex items-center gap-3 mb-1">
          <Package className="w-6 h-6 opacity-60" />
          <h1 className="text-2xl font-bold tracking-tight">Software CRM</h1>
        </div>
        <p className="text-sm text-black/40 dark:text-white/40 ml-9">
          Manage software clients and subscriptions
        </p>
      </div>

      {/* Table */}
      <div className="px-8 py-6">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04]">
                {["Software", "Plan", "Users", "Lead Source", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
              {rows.map((row, index) => {
                const filtered = clients.filter(
                  (c) => c.softwareName === row.software && c.plan === row.plan
                );

                return (
                  <tr
                    key={row.software}
                    className="align-top hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Software name */}
                    <td className="px-5 py-4 font-semibold tracking-tight">
                      {row.software}
                    </td>

                    {/* Plan selector */}
                    <td className="px-5 py-4">
                      <select
                        value={row.plan}
                        onChange={(e) => updatePlan(index, e.target.value)}
                        className="
                          rounded-lg border border-black/15 dark:border-white/15
                          bg-transparent px-3 py-1.5 text-sm
                          text-black dark:text-white
                          focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
                          appearance-none pr-7 cursor-pointer
                        "
                        style={{ backgroundImage: "none" }}
                      >
                        {["Basic", "Business", "Enterprise"].map((p) => (
                          <option key={p} value={p} className="bg-white dark:bg-black">
                            {p}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Users */}
                    <td className="px-5 py-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-black/50 dark:text-white/50">
                          <Users className="w-3.5 h-3.5" />
                          {filtered.length} {filtered.length === 1 ? "user" : "users"}
                        </div>
                        {filtered.length > 0 ? (
                          filtered.map((c: any) => (
                            <button
                              key={c._id}
                              onClick={() => openEdit(c)}
                              className="block text-sm text-black dark:text-white hover:underline underline-offset-2 text-left"
                            >
                              {c.email}
                            </button>
                          ))
                        ) : (
                          <span className="text-xs text-black/30 dark:text-white/30 italic">
                            No users yet
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-5 py-4">
                      <div className="space-y-1.5">
                        {filtered.length > 0 ? (
                          filtered.map((c: any) => (
                            <div key={c._id + "-src"} className="text-sm text-black/60 dark:text-white/60">
                              {c.source || (
                                <span className="text-black/30 dark:text-white/30 italic">—</span>
                              )}
                            </div>
                          ))
                        ) : (
                          <span className="text-black/30 dark:text-white/30">—</span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {/* Add Client */}
                        <button
                          onClick={() => openAdd(row.software, row.plan)}
                          title="Add client"
                          className="
                            flex items-center gap-1.5 rounded-lg
                            bg-black dark:bg-white
                            text-white dark:text-black
                            px-3 py-1.5 text-xs font-semibold
                            hover:opacity-80 transition-opacity
                          "
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          Add
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => filtered[0] && openEdit(filtered[0])}
                          disabled={!filtered.length}
                          title="Edit first client"
                          className="
                            flex items-center gap-1.5 rounded-lg
                            border border-black/20 dark:border-white/20
                            px-3 py-1.5 text-xs font-semibold
                            hover:bg-black/5 dark:hover:bg-white/5
                            disabled:opacity-30 disabled:cursor-not-allowed
                            transition-colors
                          "
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 dark:bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Right-side Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full w-full max-w-md
          bg-white dark:bg-[#0a0a0a]
          border-l border-black/10 dark:border-white/10
          shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/10">
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              {editingId ? "Edit Client" : "Add Client"}
            </h2>
            <p className="text-xs text-black/40 dark:text-white/40 mt-0.5">
              {editingId ? "Update client details below" : "Fill in details to register a new client"}
            </p>
          </div>
          <button
            onClick={closeDrawer}
            className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Section: Identity */}
          <SectionLabel icon={<ChevronRight className="w-3 h-3" />} label="Client Info" />

          <Field label="Full Name">
            <Input
              placeholder="Jane Smith"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
          </Field>

          <Field label="Email">
            <Input
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />
          </Field>

          <Field label="Password">
            <Input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(v) => setForm({ ...form, password: v })}
              required
            />
          </Field>

          <Field label="Phone">
            <Input
              placeholder="+1 555 000 0000"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              required
            />
          </Field>

          {/* Section: Contract */}
          <SectionLabel icon={<ChevronRight className="w-3 h-3" />} label="Contract" />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Start Date">
              <Input
                type="date"
                value={form.contractStartDate}
                onChange={(v) => setForm({ ...form, contractStartDate: v })}
              />
            </Field>
            <Field label="End Date">
              <Input
                type="date"
                value={form.contractEndDate}
                onChange={(v) => setForm({ ...form, contractEndDate: v })}
              />
            </Field>
          </div>

          {/* Section: Subscription */}
          <SectionLabel icon={<ChevronRight className="w-3 h-3" />} label="Subscription" />

          <Field label="Product">
            <select
              value={form.softwareName}
              onChange={(e) => setForm({ ...form, softwareName: e.target.value, plan: "", source: "" })}
              className={selectCls}
            >
              <option value="">Select product</option>
              {softwares.map((s) => (
                <option key={s} value={s} className="bg-white dark:bg-black">{s}</option>
              ))}
            </select>
          </Field>

          {form.softwareName && (
            <Field label="Plan">
              <select
                value={form.plan}
                onChange={(e) => setForm({ ...form, plan: e.target.value })}
                className={selectCls}
              >
                <option value="">Select plan</option>
                {["Basic", "Business", "Enterprise"].map((p) => (
                  <option key={p} value={p} className="bg-white dark:bg-black">{p}</option>
                ))}
              </select>
            </Field>
          )}

          {form.plan && (
            <>
              <Field label="Billing Cycle">
                <select
                  value={form.tenure}
                  onChange={(e) => setForm({ ...form, tenure: e.target.value })}
                  className={selectCls}
                >
                  {["monthly", "yearly", "lifetime"].map((t) => (
                    <option key={t} value={t} className="bg-white dark:bg-black capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </Field>

              <Field label="Lead Source">
                <Input
                  placeholder="e.g. Referral, LinkedIn, Cold call"
                  value={form.source}
                  onChange={(v) => setForm({ ...form, source: v })}
                />
              </Field>

              <Field label="Notes">
                <textarea
                  rows={3}
                  placeholder="Any additional notes..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </>
          )}
        </form>

        {/* Drawer footer */}
        <div className="px-6 py-4 border-t border-black/10 dark:border-white/10 flex gap-3">
          <button
            type="button"
            onClick={closeDrawer}
            className="
              flex-1 rounded-xl border border-black/15 dark:border-white/15
              py-2.5 text-sm font-semibold
              hover:bg-black/5 dark:hover:bg-white/5
              transition-colors
            "
          >
            Cancel
          </button>
          <button
            type="submit"
            form="crm-form"
            onClick={handleSubmit as any}
            className="
              flex-1 rounded-xl
              bg-black dark:bg-white
              text-white dark:text-black
              py-2.5 text-sm font-semibold
              hover:opacity-80 transition-opacity
            "
          >
            {editingId ? "Save Changes" : "Add Client"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

const inputCls = `
  w-full rounded-lg border border-black/15 dark:border-white/15
  bg-transparent px-3 py-2 text-sm
  text-black dark:text-white
  placeholder:text-black/30 dark:placeholder:text-white/30
  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
  transition
`;

const selectCls = `
  w-full rounded-lg border border-black/15 dark:border-white/15
  bg-white dark:bg-black px-3 py-2 text-sm
  text-black dark:text-white
  focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
  transition appearance-none cursor-pointer
`;

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={inputCls}
    />
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">
        {label}
      </label>
      {children}
    </div>
  );
}

function SectionLabel({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <span className="text-black/30 dark:text-white/30">{icon}</span>
      <span className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
        {label}
      </span>
      <div className="flex-1 h-px bg-black/8 dark:bg-white/8" />
    </div>
  );
}