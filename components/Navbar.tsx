"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, Sun, Moon, ChevronDown, Info, Contact, Wrench,
  ChefHat, Pill, Stethoscope, IdCardLanyard, NotebookTabs,
  SquareKanban, ReceiptIndianRupee, ShoppingBag, Package,
  Building2, Heart, User2Icon, ShoppingCart, Users, ArrowRight,
  Rocket, ChevronLeft, CheckCircle2,LucideIcon
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { IoCallOutline, IoLocationOutline, IoReorderThree } from "react-icons/io5"
import { IoMailOutline } from "react-icons/io5"
import { HomeIcon, Cog6ToothIcon, PhoneIcon, InformationCircleIcon, XMarkIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Drawer } from "@base-ui/react/drawer"
import { HoverBorderGradient } from "./ui/hover-border-gradient"
import {
  FaLaptopCode, FaMobileAlt, FaCode, FaPalette, FaBullhorn,
  FaBrush, FaBrain, FaPhoneAlt, FaEnvelope, FaWhatsapp,
  FaInstagram, FaLinkedin, FaFacebookF,
} from "react-icons/fa"
import { SiGoogleanalytics } from "react-icons/si"
import SiteNav from "./nav-animation"
import AnimatedBadge from "./ui/animated-badge"
const GLOBAL_STYLES = `
  .sparkle-nav__dropdown {
    position: fixed; top: 65px; left: 14vw; right: 0; width: 70vw;
    background: #000; backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
    border-top: 1px solid rgba(0,255,252,0.15); border-bottom: 1px solid rgba(0,255,252,0.10);
    box-shadow: 0 30px 100px rgba(0,0,0,0.9), inset 0 0 40px rgba(0,255,255,0.05);
    z-index: 9999; padding: 28px 48px 32px;
    display: grid; grid-template-columns: repeat(4,1fr); gap: 4px;
    border-radius: 20px; animation: dropdownFadeIn 0.18s ease forwards; overflow: hidden;
  }
  .sparkle-nav__dropdown::before {
    content:''; position:absolute; top:0; left:0; width:300px; height:300px;
    transform:translate(-128px,-128px);
    background:radial-gradient(circle,#06b6d4 0%,transparent 100%);
    filter:blur(160px); opacity:0.6; pointer-events:none; z-index:0;
  }
  .sparkle-nav__dropdown::after {
    content:''; position:absolute; bottom:0; right:0; width:300px; height:300px;
    transform:translate(128px,128px);
    background:radial-gradient(circle,#6366f1 0%,transparent 100%);
    filter:blur(160px); opacity:0.6; pointer-events:none; z-index:0;
  }
  @keyframes dropdownFadeIn {
    from { opacity:0; transform:translateY(-6px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .sparkle-nav__dropdown-item {
    display:flex; flex-direction:row; align-items:flex-start; gap:14px;
    padding:18px 16px; border-radius:10px; text-decoration:none; color:white;
    transition:background 0.18s ease; border:1px solid transparent;
    position:relative; z-index:1;
  }
  .sparkle-nav__dropdown-item:hover { background:rgba(0,255,252,0.05); border-color:rgba(0,255,252,0.12); }
  .sparkle-nav__dropdown-icon {
    flex-shrink:0; display:inline-flex; align-items:center; justify-content:center;
    width:42px; height:42px; background:rgba(0,255,252,0.08);
    border-radius:8px; border:1px solid rgba(0,255,252,0.18);
  }
  .sparkle-nav__dropdown-icon svg { width:22px; height:22px; color:#00BCD4; stroke:#00BCD4; }
  .sparkle-nav__dropdown-text { display:flex; flex-direction:column; gap:4px; }
  .sparkle-nav__dropdown-name { font-size:14px; font-weight:700; color:#fff; letter-spacing:0.01em; line-height:1.3; }
  .sparkle-nav__dropdown-subtext { font-size:12px; color:#00BCD4; line-height:1.5; font-weight:400; opacity:0.85; }
  .nav-left-slice-bg  { clip-path: path('M0 0 H55 V63 C25 64 23 38 -7 40 Z'); }
  .nav-right-slice-bg { clip-path: path('M0 0 H51 V41 C27 45 35 65 -9 64 Z'); }

  /* Drawer slide animations */
  .drawer-panel[data-starting-style] { transform: translateX(100%); }
  .drawer-panel[data-ending-style]   { transform: translateX(100%); }

  /* Form slide */
  @keyframes formSlideIn {
    from { opacity:0; transform:translateX(24px); }
    to   { opacity:1; transform:translateX(0); }
  }
  .form-slide-in { animation: formSlideIn 0.35s cubic-bezier(0.22,1,0.36,1) both; }

  @keyframes cardsFadeIn {
    from { opacity:0; transform:translateX(-16px); }
    to   { opacity:1; transform:translateX(0); }
  }
  .cards-fade-in { animation: cardsFadeIn 0.3s cubic-bezier(0.22,1,0.36,1) both; }
`

// ─── Sub-components ───────────────────────────────────────────────────────────
const MobileThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
 
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />
  const isDark = theme === "dark" || resolvedTheme === "dark"
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-cyan-400/10 transition-colors text-white hover:text-cyan-400"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

const NavLink = ({ href, icon: Icon, label, active }: {
  href: string; icon: LucideIcon; label: string; active: boolean
}) => (
  <Link
    href={href}
    aria-current={active ? "page" : undefined}
    className={`group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap
      ${active ? "text-cyan-400" : "text-white hover:text-cyan-400"}`}
  >
    <Icon className={`w-4 h-4 transition-colors ${active ? "text-cyan-400" : "text-white group-hover:text-cyan-400"}`} />
    <span>{label}</span>
  </Link>
)

// ─── Software options ─────────────────────────────────────────────────────────
const SOFTWARE_OPTIONS = [
  { id: "payroll",  label: "CyberPayroll",  desc: " HR & payroll automation.",           icon: <IdCardLanyard size={18} /> },
  { id: "dine",     label: "CyberDine",     desc: "Cloud restaurant POS system.",         icon: <ChefHat size={18} /> },
  { id: "pharma",   label: "CyberPharma",   desc: " Pharmacy inventory & billing",           icon: <Pill size={18} /> },
  { id: "clinic",   label: "CyberClinic",   desc: "Patient & EMR management",            icon: <Stethoscope size={18} /> },
  { id: "retail",   label: "CyberRetail",   desc: "Retail store POS platform.",              icon: <ShoppingBag size={18} /> },
  { id: "ledger",   label: "CyberLedger",   desc: "Corporate financial bookkeeping",          icon: <NotebookTabs size={18} /> },
  { id: "invoice",  label: "CyberInvoice",  desc: "Fast GST billing & invoicing",     icon: <ReceiptIndianRupee size={18} /> },
  { id: "projects", label: "CyberProjects", desc: "Agile team workspace planner",            icon: <SquareKanban size={18} /> },
]
  // const services = [
  //   { name: "AI & Intelligent Systems", icon: <FaBrain />,           subtext: "Automation, ML & LLM solutions",  href: "/services/ai-intelligent-systems" },
  //   { name: "Web Development",          icon: <FaLaptopCode />,       subtext: "Custom, scalable web apps",       href: "/services/web-development" },
  //   { name: "App Development",          icon: <FaMobileAlt />,        subtext: "iOS & Android native solutions",  href: "/services/app-development" },
  //   { name: "Software Development",     icon: <FaCode />,             subtext: "Tailored enterprise solutions",   href: "/services/software-development" },
  //   { name: "UI/UX Design",             icon: <FaPalette />,          subtext: "Designs that convert users",      href: "/services/ui-ux-design" },
  //   { name: "Graphic Design",           icon: <FaBrush />,            subtext: "Creative branding visuals",       href: "/services/graphic-design" },
  //   { name: "Digital Marketing",        icon: <FaBullhorn />,         subtext: "Boost your brand visibility",     href: "/services/digital-marketing" },
  //   { name: "Research & Analytics",     icon: <SiGoogleanalytics />,  subtext: "Data-driven insights",            href: "/services/research-and-analytics" },
  // ]
const services = [
  "AI & Intelligent Systems", "Web Development", "App Development",
  "Software Development", "UI/UX Design", "Graphic Design",
  "Research & Analytics", "Digital Marketing",
]

const SERVICE_CATEGORIES = [
  "CyberPayroll - HR Management System", "CyberDine - Resturant Management System", "CyberPharma - Pharmacy Management System",
  "CyberRetail - Store Management System", "CyberLedger - Tally Software", "CyberInvoice - GST & Billing System",
  "CyberClinic - Clinic Management System", "CyberProjects - Project Management System",
]

// ─── Enquiry Drawer ───────────────────────────────────────────────────────────
type DrawerView = "home" | "project" | "software" | "success"

function EnquiryDrawer({
  open,
  setOpen,
  drawerType,
  cartItems,
  wishlistItems,
  isLoadingCart,
  isLoadingWishlist,
  cartError,
  wishlistError,
  onCartToggle,       // ✅ Add this
  onWishlistToggle, 
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  drawerType: "enquiry" | "wishlist" | "cart";

  cartItems: any[];
  wishlistItems: any[];

  isLoadingCart?: boolean;
  isLoadingWishlist?: boolean;

  cartError?: string | null;
  wishlistError?: string | null;
  onCartToggle: (item: any, isInCart: boolean) => void;      // ✅ Add this
  onWishlistToggle: (item: any) => void;
}) {
  const [view, setView] = useState<DrawerView>("home")
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([])
  const [form, setForm] = useState({ name: "", email: "",phone: "", service: "", description: "" })
  const router = useRouter();

  const reset = () => {
    setView("home")
    setSelectedSoftware([])
    setForm({ name: "", email: "",phone: "", service: "", description: "" })
  }

  const toggleSoftware = (id: string) => {
    setSelectedSoftware(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setView("success")
  }
  

  const inputClass = `
    w-full rounded-2xl bg-white/[0.05] border border-white/[0.09]
    px-4 py-3 text-[14px] text-white placeholder-white/25
    focus:outline-none focus:border-white/25 focus:bg-white/[0.07]
    transition-all duration-200
  `
  const labelClass = "block text-[12px] font-semibold text-white/50 mb-1.5 uppercase tracking-wider"

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) setTimeout(reset, 400)
      }}
    >
      <Drawer.Portal>
        {/* ── Backdrop ── */}
        <Drawer.Backdrop className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-[6px] transition-opacity duration-400 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />

        {/* ── Panel ── */}
        <Drawer.Popup className="drawer-panel fixed top-0 right-0 z-[2001] h-screen w-full max-w-[540px] bg-[#111113] flex flex-col overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <Drawer.Content className="flex flex-col h-full">

            {/* ════ TOP BAR ════ */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.07] shrink-0">
              <div className="flex items-center gap-3">
                {/* Back button — shown on sub-views */}
                {(view === "project" || view === "software") && (
                  <button
                    onClick={() => setView("home")}
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <ChevronLeft size={16} strokeWidth={2.5} />
                    
                  </button>
                )}
               
                {!(view === "project" || view === "software") && (<div className="flex items-center gap-2">
                  <Image src="/logo2.png" alt="Logo" width={32} height={32} className="h-8 w-8 object-contain" />
                  <span className="text-white/70 text-[13px] font-semibold tracking-wide">Cyberspace Works</span>
                </div>
                )}
              </div>
             

              {/* Close */}
              <Drawer.Close
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.09] bg-white/[0.04] text-[11px] font-bold tracking-[0.1em] text-white/50 hover:bg-white/[0.08] hover:text-white/80 transition-all duration-200 cursor-pointer"
              >
                <X size={12} strokeWidth={2.5} />
                CLOSE
              </Drawer.Close>
            </div>

            {/* ════ VIEWS ════ */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">

              {/* ── HOME VIEW ── */}
              {drawerType === "enquiry" && view === "home" && (
                <div className="cards-fade-in">
                  {/* Hero section — matches image: rounded dark card */}
                  <div className="mx-6 mt-6 rounded-3xl bg-[#18181b]/80 border border-white/[0.06] p-8 pb-9">
                    {/* Available badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 mb-6">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span className="text-[13px] text-white/55 font-medium">Available for new projects</span>
                    </div>

                    <h2 className="text-[2.1rem] font-bold tracking-tight text-white leading-[1.15] mb-3">
                      How can we help you?
                    </h2>
                    <p className="text-[15px] text-white/40 leading-relaxed">
                      Choose how you&apos;d like to work with us.
                    </p>
                  </div>

                  {/* Two cards — matching image layout exactly */}
                  <div className="px-6 pt-5 pb-6 grid grid-cols-2 gap-4">

                    {/* Card 1: Start a Project */}
                    <div
                      onClick={() => setView("project")}
                      className="group flex flex-col rounded-2xl p-6 border border-[#0e7480] bg-[#0e7480]/40 hover:border-white/[0.18] hover:bg-[#0e7480] transition-all duration-300 cursor-pointer min-h-[240px]"
                    >
                      {/* Icon box — blue tint like image */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e2340] border border-[#2d3560] text-[#00ced4] mb-6">
                        <Rocket size={24} strokeWidth={1.7} />
                      </div>

                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-[1.05rem] font-bold text-white leading-tight">Start a Project</h3>
                        <ArrowRight size={16} className="text-white/25 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-200 mt-0.5 shrink-0" />
                      </div>
                      <p className="text-[12.5px] text-white/40 leading-relaxed mb-auto">
                        Hire us for web, mobile, backend, SEO or custom software solutions.
                      </p>
                      <button className="mt-5 text-[11px] font-bold tracking-[0.1em] text-[#00ced4] flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                        GET STARTED <ArrowRight size={12} />
                      </button>
                    </div>

                    {/* Card 2: Purchase a Software — purple tint like image */}
                    <div
                      onClick={() => setView("software")}
                      className="group flex flex-col rounded-2xl p-6 border border-purple-500/[0.2] bg-[#16102a]/60 hover:border-purple-400/40 hover:bg-[#1c1438]/80 transition-all duration-300 cursor-pointer min-h-[240px]"
                    >
                      {/* Icon box — purple tint like image */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#281848] border border-purple-500/30 text-[#00ced4] mb-6">
                        <Package size={24} strokeWidth={1.7} />
                      </div>

                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-[1.05rem] font-bold text-white leading-tight">Purchase a Software</h3>
                        <ArrowRight size={16} className="text-white/25 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all duration-200 mt-0.5 shrink-0" />
                      </div>
                      <p className="text-[12.5px] text-white/40 leading-relaxed mb-auto">
                        Explore our 8 ready-made software products for your business needs.
                      </p>
                      <button className="mt-5 text-[11px] font-bold tracking-[0.1em] text-[#00ced4] flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                        BROWSE SOFTWARE <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Footer trust row */}
                  <div className="px-6 pt-2 pb-6 border-t border-white/[0.05] mx-6 rounded-b">
                    <div className="flex items-center justify-center gap-6 pt-4">
                      {["Responds in 24 hrs", "Secure & confidential", "No commitment"].map(text => (
                        <div key={text} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="text-[11.5px] text-white/30 font-medium">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── PROJECT FORM VIEW ── */}
              {drawerType === "enquiry" && view === "project" && (
                <form onSubmit={handleSubmit} className="form-slide-in px-7 py-7 space-y-5">
                  <div>
                    <h3 className="text-[1.4rem] font-bold text-white mb-1">Start a Project</h3>
                    <p className="text-[13px] text-white/40">Fill in the details and we&apos;ll get back to you within 24 hours.</p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text" required placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email" required placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone No</label>
                    <input
                      type="phone" required placeholder="0000000000"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                  {/* Service category */}
               <div>
  <label className={labelClass}>Services</label>

  <select
    value={form.service}
    onChange={(e) =>
      setForm((f) => ({
        ...f,
        service: e.target.value,
      }))
    }
    className="
      w-full
      rounded-xl
      bg-white/[0.03]
      border border-white/[0.08]
      px-4 py-3
      text-sm text-white
      outline-none
      focus:border-[#5b7cff]/60
      focus:ring-2 focus:ring-[#5b7cff]/20
      transition-all duration-200
    "
  >
    <option value="" className="bg-[#0d0d0f] text-white/50">
      Select a Service
    </option>

    {services.map((cat) => (
      <option
        key={cat}
        value={cat}
        className="bg-[#0d0d0f] text-white"
      >
        {cat}
      </option>
    ))}
  </select>
</div>

                  {/* Description */}
                  <div>
                    <label className={labelClass}>Project Description</label>
                    <textarea
                      rows={4} placeholder="Tell us about your project..."
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#00ced4] hover:bg-[#6d8dff] active:scale-[0.98] text-white font-bold text-[14px] tracking-wide transition-all duration-200 shadow-[0_0_24px_rgba(91,124,255,0.3)]"
                  >
                    Submit Enquiry →
                  </button>
                </form>
              )}

              {/* ── SOFTWARE PURCHASE VIEW ── */}
             {drawerType === "enquiry" && view === "software" && (
                <form onSubmit={handleSubmit} className="form-slide-in px-7 py-7 space-y-5">
                  <div>
                    <h3 className="text-[1.4rem] font-bold text-white mb-1">Purchase a Software</h3>
                    <p className="text-[13px] text-white/40">Select the software(s) you&apos;re interested in and leave your details.</p>
                  </div>

                
         

                  
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text" required placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                 
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email" required placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone No</label>
                    <input
                      type="phone" required placeholder="0000000000"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                           <div>
  <label className={labelClass}>Products</label>

  <select
    value={form.service}
    onChange={(e) =>
      setForm((f) => ({
        ...f,
        service: e.target.value,
      }))
    }
    className="
      w-full
      rounded-xl
      bg-white/[0.03]
      border border-white/[0.08]
      px-4 py-3
      text-sm text-white
      outline-none
      focus:border-[#5b7cff]/60
      focus:ring-2 focus:ring-[#5b7cff]/20
      transition-all duration-200
    "
  >
    <option value="" className="bg-[#0d0d0f] text-white/50">
      Select a Products
    </option>

    {SERVICE_CATEGORIES.map((cat) => (
      <option
        key={cat}
        value={cat}
        className="bg-[#0d0d0f] text-white"
      >
        {cat}
      </option>
    ))}
  </select>
</div>
                  
                  <div>
                    <label className={labelClass}>Additional Notes</label>
                    <textarea
                      rows={3} placeholder="Any specific requirements or questions..."
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={selectedSoftware.length === 0}
                    className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white font-bold text-[14px] tracking-wide transition-all duration-200 shadow-[0_0_24px_rgba(147,51,234,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Enquiry →
                  </button>
                </form>
              )}


         {/* {drawerType === "wishlist" && (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-4">
      Wishlist
    </h2>

    {(() => {
  const activeWishlistItems = wishlistItems?.filter(
    (item: any) => item.isActive
  );

  return activeWishlistItems?.length === 0 ? (
    <p className="text-white/60">
      No items in wishlist.
    </p>
  ) : (
    <div className="space-y-3">
      {activeWishlistItems.map((item: any) => (
        <div
          key={item._id}
          className="flex items-center justify-between border border-white/10 rounded-lg p-4 bg-black/40"
        >
          <div>
            <h3 className="text-white font-medium">
              {item.productName}
            </h3>

            <p className="text-cyan-400 font-semibold">
              ₹{item.productPrice}
            </p>
          </div>

          <Heart
            size={20}
            className="text-red-500 fill-red-500"
          />
        </div>
      ))}
    </div>
  );
})()}
  </div>
)} */}

{drawerType === "wishlist" && (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-4">Wishlist</h2>

    {isLoadingWishlist ? (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400 mb-3" />
        <p className="text-white/60 text-sm">Loading wishlist...</p>
      </div>
    ) : (
      (() => {
        const activeWishlistItems = wishlistItems?.filter((item: any) => item.isActive);
        return activeWishlistItems?.length === 0 ? (
          <p className="text-white/60">No items in wishlist.</p>
        ) : (
          <div className="space-y-3">
            {activeWishlistItems.map((item: any) => {
              const isInCart = cartItems.some(
                (c: any) => c.productId === item.productId || c.productName === item.productName
              );
              return (
                <div
                  key={item._id}
                  className="border border-white/10 rounded-xl p-4 bg-black/40 space-y-3"
                >
                  {/* Product info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">{item.productName}</h3>
                      <p className="text-cyan-400 font-semibold">₹{item.productPrice}</p>
                    </div>
                    {/* Wishlist remove button */}
                    <button
                      onClick={() => onWishlistToggle(item)}
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all"
                      title="Remove from wishlist"
                    >
                      <Heart size={16} className="text-red-500 fill-red-500" />
                    </button>
                  </div>

                  {/* Add to Cart / Remove from Cart */}
                  <button
                    onClick={() => onCartToggle(item, isInCart)}
                    className={`w-full py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2
                      ${isInCart
                        ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                        : "bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20"
                      }`}
                  >
                    <ShoppingCart size={15} />
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })()
    )}
  </div>
)}
 {drawerType === "cart" && (
  <div className="p-6 h-full flex flex-col">
    <h2 className="text-2xl font-bold text-white mb-6">
      Shopping Cart
    </h2>

    {isLoadingCart ? (
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4" />
        <p className="text-white/60">Loading cart...</p>
      </div>
    ) : cartError ? (
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="mb-4">
          <svg className="w-12 h-12 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-400 font-semibold mb-2">Error</p>
        <p className="text-white/60 text-sm">{cartError}</p>
      </div>
    ) : cartItems.length === 0 ? (
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <ShoppingCart size={48} className="text-white/20 mb-4" />
        <p className="text-white/60">Your cart is empty.</p>
        <p className="text-white/40 text-sm mt-2">Add items to get started!</p>
      </div>
    ) : (
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
  {cartItems.map((item: any) => {
    const isInCart = cartItems.some(
      (c: any) =>
        c.productId === item.productId ||
        c.productName === item.productName
    );

    return (
      <div
        key={item._id}
        className="border border-white/10 rounded-xl p-4 bg-black/40"
      >
        <div className="space-y-3">
          {/* Product Name */}
          <h3 className="text-white font-semibold text-lg">
            {item.productName}
          </h3>

          {/* Price */}
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Price</span>
            <span className="text-cyan-400 font-semibold">
              ₹{item.productPrice?.toLocaleString()}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Quantity</span>
            <span className="text-white">
              {item.quantity || 1}
            </span>
          </div>

          {/* Total */}
          <div className="border-t border-white/10 pt-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-medium">
                Total
              </span>

              <span className="text-green-400 font-bold text-lg">
                ₹
                {(
                  (item.productPrice || 0) *
                  (item.quantity || 1)
                ).toLocaleString()}
              </span>
            </div>
<div className="flex items-center justify-center gap-3">
            <button
              onClick={() => onCartToggle(item, isInCart)}
              className={`w-full py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center cursor-pointer gap-2 ${
                isInCart
                  ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                  : "bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20"
              }`}
            >
              <ShoppingCart size={15} />
              {isInCart
                ? "Remove from Cart"
                : "Add to Cart"}
            </button>
             <button
  onClick={() => {
    alert("Redirecting to Shop Page...");
    router.push(`/shop/${item.productId}`);
  }}
  className="bg-cyan-500 px-5 py-2 rounded-full cursor-pointer"
>
  Purchase
</button>
</div>
          </div>
        </div>
      </div>
    );
  })}
</div>
    )}
  </div>
)}
              {/* ── SUCCESS VIEW ── */}
              {drawerType === "enquiry" && view === "success" && (
                <div className="form-slide-in flex flex-col items-center justify-center h-full min-h-[400px] px-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30 mb-6">
                    <CheckCircle2 size={36} className="text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[1.6rem] font-bold text-white mb-3">We&apos;ll be in touch!</h3>
                  <p className="text-[14px] text-white/40 leading-relaxed max-w-xs">
                    Your enquiry has been received. Our team typically responds within 24 hours.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-8 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.1] text-[13px] font-semibold transition-all duration-200"
                  >
                    Start another enquiry
                  </button>
                </div>
              )}

            </div>
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ className, ...props }: { className?: string; [key: string]: unknown }) => {
  const router = useRouter();
  const [isLeftMenuOpen, setIsLeftMenuOpen]   = useState(false)
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown]       = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen]           = useState(false)
  const [drawerType, setDrawerType] = useState<"enquiry" | "wishlist" | "cart">("enquiry")
  const [notchMetrics, setNotchMetrics]       = useState<{ left: number; right: number; vw: number } | null>(null)
  const notchRef      = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isServicesOpenMobile, setIsServicesOpenMobile] = useState(false);
  const [isProductOpenMobile,setIsProductOpenMobile]=useState(false);
const [cartItems, setCartItems] = useState<any[]>([]);
const [isLoadingCart, setIsLoadingCart] = useState(false);
const [cartError, setCartError] = useState<string | null>(null);
const [wishlistItems, setWishlistItems] = useState<any[]>([]);
const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
const [wishlistError, setWishlistError] = useState<string | null>(null);
 const [currentUser, setCurrentUser] = useState<any>(null);

  const pathname        = usePathname()
  const { status }      = useSession()
  const isAuthenticated = status === "authenticated"
  const isActive = (href: string) => pathname === href

  const hideNavbar = pathname?.startsWith("/dashboard") || pathname === "/schedule" || pathname === "/login" || pathname === "/signup" || pathname.startsWith("/share")

  const items    = { left: [{ label: "About", href: "/about-us", icon: Building2 }, { label: "Services", href: "/services", icon: Info }] }
  const navitems = { left: [{ label: "Products", href: "/products", icon: Package }, { label: "Contact", href: "/contact-us", icon: Contact }] }

  const socialLinks1 = [
    { name: "Shop",     icon: <ShoppingBag />,  link: "/shop" },
    { name: "Wishlist", icon: (
        <div className="relative"><Heart />
         {wishlistItems?.some((item: any) => item.isActive) && (
  <span className="absolute -top-1 -right-2 flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
  </span>
)}
        </div>), link: "/" },
    {
  name: "Cart",
  icon: (
    <div className="relative">
      <ShoppingCart />

      {cartItems.length > 0 && (
        <span className="absolute -top-1 -right-2 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
      )}
    </div>
  ),
  link: "/",
},
    { name: "Account", icon: <User2Icon />, link: "/login" },
  ]

  const socialLinks2 = [
    { name: "Call",      icon: <FaPhoneAlt />,  link: "tel:7980715765" },
    { name: "Mail",      icon: <FaEnvelope />,  link: "mailto:cyberspaceworksofficial@gmail.com" },
    { name: "WhatsApp",  icon: <FaWhatsapp />,  link: "https://wa.me/7980715765" },
    { name: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/cyberspaceworks" },
    { name: "LinkedIn",  icon: <FaLinkedin />,  link: "https://www.linkedin.com/company/cyberspace-works" },
    { name: "Facebook",  icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=100086774724799" },
  ]

  const services = [
    { name: "AI & Intelligent Systems", icon: <FaBrain />,          subtext: "Automation, ML & LLM solutions", href: "/services/ai-intelligent-systems" },
    { name: "Web Development",          icon: <FaLaptopCode />,      subtext: "Custom, scalable web apps",      href: "/services/web-development" },
    { name: "App Development",          icon: <FaMobileAlt />,       subtext: "iOS & Android native solutions", href: "/services/app-development" },
    { name: "Software Development",     icon: <FaCode />,            subtext: "Tailored enterprise solutions",  href: "/services/software-development" },
    { name: "UI/UX Design",             icon: <FaPalette />,         subtext: "Designs that convert users",     href: "/services/ui-ux-design" },
    { name: "Graphic Design",           icon: <FaBrush />,           subtext: "Creative branding visuals",      href: "/services/graphic-design" },
    { name: "Digital Marketing",        icon: <FaBullhorn />,        subtext: "Boost your brand visibility",    href: "/services/digital-marketing" },
    { name: "Research & Analytics",     icon: <SiGoogleanalytics />, subtext: "Data-driven insights",           href: "/services/research-and-analytics" },
  ]

  const products = [
    { name: "CyberPayroll", icon: <IdCardLanyard />,       subtext: " HR & payroll automation.",                  href: "/products/cyberpayroll-hr-management-software" },
    { name: "CyberDine",    icon: <ChefHat />,             subtext: "Cloud restaurant POS system.",          href: "/products/cyberdine-restaurant-management-system" },
    { name: "CyberPharma",  icon: <Pill />,                subtext: " Pharmacy inventory & billing.",    href: "/products/cyberpharma-pharmacy-management-system" },
    { name: "CyberClinic",  icon: <Stethoscope />,         subtext: " Patient & EMR management.",     href: "/products/cyberclinic-clinic-management-system" },
    { name: "CyberRetail",  icon: <ShoppingBag />,         subtext: "Retail store POS platform.",             href: "/products/cyberretail-store-management-system" },
    { name: "CyberLedger",  icon: <NotebookTabs />,        subtext: "Corporate financial bookkeeping.",                          href: "/products/cyberledger-accounting-software" },
    { name: "CyberInvoice", icon: <ReceiptIndianRupee />,  subtext: "Fast GST billing & invoicing.", href: "/products/cyberinvoice-gst-billing-software" },
    { name: "CyberProjects",icon: <SquareKanban />,        subtext: "Agile team workspace planner.",            href: "/products/cyberprojects-project-management-software" },
  ]

  const handleDropdownClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200)
  }

  useEffect(() => {
    const measure = () => {
      if (!notchRef.current) return
      const rect  = notchRef.current.getBoundingClientRect()
      const vw    = window.innerWidth
      setNotchMetrics({ left: Math.round(rect.left + window.scrollX), right: Math.round(rect.right + window.scrollX), vw })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (notchRef.current) ro.observe(notchRef.current)
    window.addEventListener("resize", measure)
    return () => { ro.disconnect(); window.removeEventListener("resize", measure) }
  }, [])

  useEffect(() => {
    const handleOut = (e: MouseEvent | TouchEvent) => {
      const lm = document.querySelector(".left-menu-container-mobile")
      const rm = document.querySelector(".right-menu-container-mobile")
      const lb = document.querySelector(".left-hamburger")
      const rb = document.querySelector(".right-hamburger")
      if (!lm?.contains(e.target as Node) && !rm?.contains(e.target as Node) && !lb?.contains(e.target as Node) && !rb?.contains(e.target as Node)) {
        setIsLeftMenuOpen(false); setIsRightMenuOpen(false)
      }
    }
    const handleScroll = () => { setIsLeftMenuOpen(false); setIsRightMenuOpen(false) }
    document.addEventListener("mousedown", handleOut)
    document.addEventListener("touchstart", handleOut)
    window.addEventListener("scroll", handleScroll)
    return () => { document.removeEventListener("mousedown", handleOut); document.removeEventListener("touchstart", handleOut); window.removeEventListener("scroll", handleScroll) }
  }, [])
  useEffect(() => {
      const loadUser = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    if (data.success) {
       console.log("Checking authentication status:", data.user);
      setCurrentUser(data.user);
     
    }
  };

  loadUser();
  }, []); 

  // ---------------------------------------------------------------------
  // Periodically refresh cart and wishlist so the badge glows immediately
  // after an item is added from the shop (even when the drawer is closed).
  // The interval runs only when a user is authenticated.
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (!currentUser?._id) return;

    const interval = setInterval(() => {
      // Refresh both lists – errors are handled inside the loaders.
      loadCart();
      loadWishlist();
    }, 10_000); // 30 seconds

    return () => clearInterval(interval);
  }, [currentUser?._id]);

  // ---------------------------------------------------------------------
  // Expose helper functions on the window object so other parts of the
  // application (e.g., the shop page) can trigger an immediate refresh of
  // the cart and wishlist badges without opening the drawer.
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    (window as any).__refreshCart = () => {
      if (currentUser?._id) loadCart();
    };
    (window as any).__refreshWishlist = () => {
      if (currentUser?._id) loadWishlist();
    };
  }, [currentUser?._id]);

// Replace your existing useEffect for drawer loading with these two:

// 1. Load data on mount once currentUser is set
// useEffect(() => {
//   if (currentUser?._id) {
//     loadCart();
//     loadWishlist();
//   }
// }, [currentUser]); 

// 2. Refresh when drawer opens (keep this for freshness)
useEffect(() => {
  if (drawerOpen && currentUser?._id) {
    if (drawerType === "cart") loadCart();
    if (drawerType === "wishlist") {
      loadWishlist();
      loadCart();
    }
  }
}, [drawerOpen, drawerType]);

  if (hideNavbar) return null

const loadCart = async () => {
  try {
    setIsLoadingCart(true);
    setCartError(null);

    if (!currentUser?._id) {           // ← use optional chaining, skip localStorage
      setCartError("Please log in to view your cart");
      setCartItems([]);
      return;
    }

    const res = await fetch(`/api/cart?userId=${currentUser._id}`);
    const data = await res.json();

    if (data.success && data.cart) {
      setCartItems(data.cart);
    } else {
      setCartError(data.message || "Failed to load cart");
      setCartItems([]);
    }
  } catch (error) {
    console.error("Cart load error:", error);
    setCartError("Error loading cart. Please try again.");
    setCartItems([]);
  } finally {
    setIsLoadingCart(false);
  }
};

  const loadWishlist = async () => {
  try {
    console.log("hello");
    setIsLoadingWishlist(true);
    setWishlistError(null);

    const storedUser = localStorage.getItem("user");

    if (!currentUser) {
      setWishlistError("Please log in to view your wishlist");
      console.log("No user found in localStorage");
      setWishlistItems([]);
      return;
    }
    console.log("bc");

    const user = JSON.parse(storedUser);

    if (!currentUser._id) {
      console.log("User data is invalid:", currentUser);
      setWishlistError("Invalid user data. Please log in again.");
      setWishlistItems([]);
      return;
    }
    console.log("Current user ID:", currentUser._id);
    const res = await fetch(`/api/wishlist?userId=${currentUser._id}`);
    const data = await res.json();
    console.log("Wishlist API response:", data);

    if (data.success) {
      // Preserve the `isActive` flag that the API returns (or defaults to false).
      // The badge visibility relies on this flag, so we must not overwrite it.
      const filteredWishlist = (data.wishlist || []).filter(
        (item: any) => item.userId === currentUser._id
      );

      setWishlistItems(filteredWishlist);
      console.log("Filtered wishlist items:", filteredWishlist);
      // Notify other components (e.g., shop page) that the wishlist has changed
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("wishlist-updated"));
      }
    } else {
      setWishlistError(data.message || "Failed to load wishlist");
      setWishlistItems([]);
    }
  } catch (error) {
    console.error("Wishlist load error:", error);
    setWishlistError("Error loading wishlist");
    setWishlistItems([]);
  } finally {
    setIsLoadingWishlist(false);
  }
};
const onCartToggle = async (item: any, isInCart: boolean) => {
  try {
    if (!currentUser?._id) return;

    if (isInCart) {
      // ── Remove from cart ──
      const res = await fetch(`/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser._id,
          productId: item.productId || item._id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Remove from local state instantly and refresh any external UI (shop page)
        setCartItems(prev =>
          prev.filter(
            (c: any) =>
              c.productId !== (item.productId || item._id) &&
              c.productName !== item.productName
          )
        );
        // Notify other components that the cart has changed so the badge stops glowing
        if (typeof window !== "undefined") {
          (window as any).__refreshCart?.();
          // Emit a custom event for pages that maintain their own cart state (e.g., shop page)
          window.dispatchEvent(new Event('cart-updated'));
        }
      }
    } else {
      // ── Add to cart ──
      const res = await fetch(`/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser._id,
          productId: item.productId || item._id,
          productName: item.productName,
          productPrice: item.productPrice,
          quantity: 1,
        }),
      });
      const data = await res.json();
        if (data.success) {
        // Add to local state instantly and refresh external UI
        setCartItems(prev => [
          ...prev,
          {
            _id: data.cartItem?._id || Date.now(),
            productId: item.productId || item._id,
            productName: item.productName,
            productPrice: item.productPrice,
            quantity: 1,
          },
        ]);
        if (typeof window !== "undefined") {
          (window as any).__refreshCart?.();
          // Emit event for other components to sync
          window.dispatchEvent(new Event('cart-updated'));
        }
      }
    }
  } catch (error) {
    console.error("Cart toggle error:", error);
  }
};

const onWishlistToggle = async (item: any) => {
  try {
    if (!currentUser?._id) return;
    console.log("Toggling wishlist for item:", item);

    const res = await fetch(`/api/wishlist`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser._id,
        productId: item.productId || item._id,
      }),
    });
    const data = await res.json();
    if (data.success) {
      // Remove from local state instantly
      setWishlistItems(prev =>
        prev.filter((w: any) => w._id !== item._id)
      );
      // Notify other components that the wishlist changed
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("wishlist-updated"));
      }
    }
  } catch (error) {
    console.error("Wishlist toggle error:", error);
  }
};


  return (
    <>
      <style jsx global>{GLOBAL_STYLES}</style>

      {/* ── Enquiry Drawer (rendered at root level) ── */}
<EnquiryDrawer
  open={drawerOpen}
  setOpen={setDrawerOpen}
  drawerType={drawerType}
  cartItems={cartItems}
  wishlistItems={wishlistItems}
  isLoadingCart={isLoadingCart}
  isLoadingWishlist={isLoadingWishlist}
  cartError={cartError}
  wishlistError={wishlistError}
  onCartToggle={onCartToggle}         // ✅ Add this
  onWishlistToggle={onWishlistToggle}
/>

      <header className={cn("hidden lg:flex fixed top-0 inset-x-0 z-[1001] h-16 px-0 overflow-visible", className)} {...props}>

        <div className="absolute inset-0 pointer-events-none z-0">
          {notchMetrics && (
            <SiteNav notchLeft={notchMetrics.left - 60} notchRight={notchMetrics.right + 70} viewportWidth={notchMetrics.vw} />
          )}
        </div>

        {/* ── Left sidebar ── */}
        <div className="rainbow-line-host flex-1 h-10 z-20 relative min-w-0">
          <svg className="absolute bg-black inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0} strokeWidth={0} />
          </svg>
          <div className="hidden lg:flex flex-col items-center gap-3 font-bold px-2 py-1 rounded-xl shadow-xl absolute left-2 top-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center space-x-3 w-full">
              {socialLinks1.map(item => (
                <div key={item.name} className="flex flex-col items-center justify-center w-10 h-7" title={item.name}>
                  {item.name === "Wishlist" ? (
  <button
    onClick={() => {
      setDrawerType("wishlist")
      setDrawerOpen(true)
    }}
    className="flex h-full w-full items-center justify-center text-cyan-400 text-xl hover:text-cyan-600"
  >
    {item.icon}
  </button>
) : item.name === "Cart" ? (
  <button
    onClick={() => {
      setDrawerType("cart")
      setDrawerOpen(true)
    }}
    className="flex h-full w-full items-center justify-center text-cyan-400 text-xl hover:text-cyan-600"
  >
    {item.icon}
  </button>
) : (
  <Link
    href={item.link}
    className="flex h-full w-full items-center justify-center text-cyan-400 text-xl hover:text-cyan-600"
  >
    {item.icon}
  </Link>
)}
                </div>
              ))}
              {/* Quick Enquiry badge triggers drawer */}
              <div onClick={() => {
  setDrawerType("enquiry")
  setDrawerOpen(true)
}} className="cursor-pointer">
                <AnimatedBadge text="Quick Enquiry" color="#22d3ee" href="#" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Notch ── */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">
          <div className="w-[50px] h-full relative shrink-0 rainbow-line-host">
            <div className="nav-left-slice-bg absolute inset-0 bg-black" />
          </div>

          <div ref={notchRef} className="flex-1 h-full relative min-w-0 -ml-px">
            <div className="rainbow-line-host absolute inset-0 bg-black" />
            <div className="relative w-full h-full flex items-center justify-between px-4 md:px-8">

              {/* Desktop left nav */}
              <div className="hidden md:flex items-center gap-8 shrink-0">
                <nav className="flex items-center gap-8 text-white">
                  {items.left.map(item => {
                    if (item.label === "Services") {
                      return (
                        <div key={item.label} className="relative"
                          onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
                          onMouseLeave={handleDropdownClose}
                        >
                          <Link href={item.href} className={`group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${isActive(item.href) ? "text-cyan-400" : "text-white hover:text-cyan-400"}`}>
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                          </Link>
                          {openDropdown === item.label && (
                            <div className="sparkle-nav__dropdown"
                              onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
                              onMouseLeave={handleDropdownClose}
                            >
                              {services.map(sub => (
                                <Link key={sub.name} href={sub.href} className="sparkle-nav__dropdown-item">
                                  {sub.icon && <span className="sparkle-nav__dropdown-icon">{sub.icon}</span>}
                                  <span className="sparkle-nav__dropdown-text">
                                    <span className="sparkle-nav__dropdown-name">{sub.name}</span>
                                    <span className="sparkle-nav__dropdown-subtext">{sub.subtext}</span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }
                    return <NavLink key={item.label} {...item} active={isActive(item.href)} />
                  })}
                </nav>
              </div>

              {/* Logo */}
              <div className="hidden md:flex shrink-0 items-center justify-center px-4">
                <Link href="/" className="transition-opacity hover:opacity-80">
                  <Image src="/logo2.png" alt="Logo" width={64} height={64} className="h-16 w-16" />
                </Link>
              </div>

              {/* Desktop right nav */}
              <div className="hidden md:flex items-center gap-5 shrink-0 text-white ml-auto">
                <nav className="flex items-center gap-8">
                  {navitems.left.map(item => {
                    if (item.label === "Products") {
                      return (
                        <div key={item.label} className="relative"
                          onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
                          onMouseLeave={handleDropdownClose}
                        >
                          <Link href={item.href} className={`group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${isActive(item.href) ? "text-cyan-400" : "text-white hover:text-cyan-400"}`}>
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                          </Link>
                          {openDropdown === item.label && (
                            <div className="sparkle-nav__dropdown"
                              onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
                              onMouseLeave={handleDropdownClose}
                            >
                              {products.map(sub => (
                                <Link key={sub.name} href={sub.href} className="sparkle-nav__dropdown-item">
                                  {sub.icon && <span className="sparkle-nav__dropdown-icon">{sub.icon}</span>}
                                  <span className="sparkle-nav__dropdown-text">
                                    <span className="sparkle-nav__dropdown-name">{sub.name}</span>
                                    <span className="sparkle-nav__dropdown-subtext">{sub.subtext}</span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }
                    return <NavLink key={item.label} {...item} active={isActive(item.href)} />
                  })}
                </nav>
              </div>

              {/* Mobile hamburger */}
              <button className="md:hidden mb-1 p-1 text-white hover:text-cyan-400 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="md:hidden flex-1 flex justify-center shrink-0 mx-2 mt-1">
                <Link href="/"><Image src="/logo/bg-less.png" alt="Logo" width={32} height={32} className="h-8 w-auto dark:invert" /></Link>
              </div>
              <div className="md:hidden flex items-center gap-2 mb-1"><MobileThemeToggle /></div>
            </div>
          </div>

          <div className="w-[50px] h-full relative shrink-0 -ml-px rainbow-line-host">
            <div className="nav-right-slice-bg absolute inset-0 bg-black" />
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="rainbow-line-host flex-1 h-10 bg-black z-20 relative min-w-0 -ml-px">
          <div className="hidden lg:flex flex-col items-center gap-3 font-bold px-2 py-1 rounded-xl shadow-xl absolute right-2 top-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center space-x-3 w-full">
              {socialLinks2.map(item => (
                <div key={item.name} className="flex flex-col items-center justify-center w-10 h-7" title={item.name}>
                  <Link href={item.link} className="flex h-full w-full items-center justify-center text-cyan-400 text-xl hover:text-cyan-600 cursor-pointer leading-none">
                    {item.icon}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile menus ── */}
      <div className="lg:hidden flex items-center left-hamburger fixed left-8 z-50 group bg-black/30 border border-white/10 shadow-xl rounded-md"
        onMouseEnter={() => { setIsLeftMenuOpen(true); setIsRightMenuOpen(false) }}>
        <button className="text-3xl text-cyan-400"><IoReorderThree /></button>
      </div>

      <div className="lg:hidden flex items-center right-hamburger fixed right-8 z-50 group bg-black/30 border border-white/10 shadow-xl rounded-md"
        onClick={() => { setIsRightMenuOpen(!isRightMenuOpen); setIsLeftMenuOpen(false) }}>
        <button className="text-3xl text-cyan-400"><IoReorderThree /></button>
      </div>

      <div className={`lg:hidden left-menu-container-mobile fixed top-0 left-0 h-full w-64 bg-black/90 border-r border-cyan-400/20 backdrop-blur-xl transform transition-transform duration-300 z-[9999] ${
              isLeftMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
              <div className="flex flex-col p-6 space-y-6 text-white">
                <div className="flex flex-col items-start space-y-2">
                  <Link href="/" onClick={() => setIsLeftMenuOpen(false)}>
                    <Image src="/logo2.png" alt="Logo" 
                     width={180} 
                     height={70}
                    className="w-32 h-auto" />
                  </Link>
                  <p className="text-sm text-gray-300">
                    Cyberspace Works - Website, Software, App Developer | Digital Marketing | Graphics Design | UI/UX | Research & Analysis
                  </p>
                 <p className="text-gray-400 flex items-start gap-2 mt-3">
  <IoCallOutline className="text-cyan-400 mt-1" />
  <a
    href="tel:+917980715765"
    className="hover:underline leading-snug pl-6"
  >
    +91 7980715765
  </a>
</p>

<p className="text-gray-400 flex items-start gap-2 mt-3">
  <IoMailOutline className="text-cyan-400 mt-1 size-5" />
  <a
    href="mailto:cyberspaceworksofficial@gmail.com"
    className="hover:underline leading-snug text-center"
  >
    cyberspaceworks
    official@gmail.com
  </a>
</p>

<p className="text-gray-400 flex items-start gap-2 mt-3">
  <IoLocationOutline className="text-cyan-400 mt-1 size-12" />
  <a
    href="https://maps.app.goo.gl/QABsaPuw5qL3BwRa7"
    className="hover:underline leading-snug text-center"
  >
    Kolkata 19, Krishna Chatterjee Ln, Bally, Howrah, West Bengal 711201
  </a>
</p>

                </div>
                
                <div className="flex flex-col items-center gap-3 font-bold px-2 py-1 rounded-xl shadow-xl mt-4">
            <div className="flex items-center justify-center space-x-3 w-full">
              {socialLinks1.map(item => (
                <div key={item.name}  className="flex flex-col items-center justify-center w-10 h-7" title={item.name}>
                  {item.name === "Wishlist" ? (
  <button
    onClick={() => {
      setDrawerType("wishlist")
      setDrawerOpen(true)
    }}
    className="flex h-full w-full items-center justify-center text-cyan-400 text-xl hover:text-cyan-600"
  >
    {item.icon}
  </button>
) : item.name === "Cart" ? (
  <button
    onClick={() => {
      setDrawerType("cart")
      setDrawerOpen(true)
    }}
    className="flex h-full w-full items-center justify-center text-cyan-400 text-xl hover:text-cyan-600"
  >
    {item.icon}
  </button>
) : (
  <Link
    href={item.link}
    className="flex h-full w-full items-center justify-center text-cyan-400 text-xl hover:text-cyan-600"
  >
    {item.icon}
  </Link>
)}
                </div>
              ))}
              {/* Quick Enquiry badge triggers drawer */}
              
            </div>
            <div onClick={() => {
  setDrawerType("enquiry")
  setDrawerOpen(true)
}} className="cursor-pointer">
                <AnimatedBadge text="Quick Enquiry" color="#22d3ee" href="#" />
              </div>
          </div>
        </div>
              </div>
            {/* </div> */}

      <div className={`lg:hidden right-menu-container-mobile fixed top-0 right-0 h-full w-64 bg-black/90 border-l border-cyan-400/20 backdrop-blur-xl transform transition-transform duration-300 z-[9999] ${isRightMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col p-6 space-y-4 text-white">
          <h3 className="text-sm font-semibold text-cyan-400 mb-3">Follow Us</h3>
          {socialLinks2.map(item => (
            <Link key={item.name} href={item.link} className="flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors">
              <span className="text-cyan-400 text-base">{item.icon}</span><span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>


      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-neutral-900 border-b border-foreground/5 p-4 md:hidden shadow-lg">
            <nav className="flex flex-col gap-2">
              {[...items.left, ...navitems.left].map(item => (
                <Link key={item.label} href={item.href}
                  className={`group flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive(item.href) ? "text-cyan-400" : "text-white hover:text-cyan-400 hover:bg-foreground/5"}`}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <item.icon className="w-5 h-5" /><span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[350px] mx-auto bg-black/10 border border-white/10 shadow-xl backdrop-blur-sm rounded-2xl z-50">
 {/* FAB */}
<div className="relative">
  <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-50">
    
    {/* Outer Pulsing Glow Ring */}
    <div
      className="absolute inset-0 w-14 h-14 rounded-full animate-pulseGlowRing"
      style={{
        background: 'conic-gradient(from 0deg, #0ea5e9, #06b6d4, #0ea5e9)',
        filter: 'blur(16px)',
        opacity: 0.9,
        zIndex: -1,
        transform: 'translateY(-8px)',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />

    {/* Inner Solid Circle */}
    <div className="relative bg-black border border-gray-700 rounded-full p-2 shadow-lg w-14 h-14 flex items-center justify-center overflow-visible cursor-pointer">
       <Link 
    href="/" >
      <Image
        src="/logo2.png"
        alt="Logo"
        width={100}
        height={100}
        className="object-contain w-auto h-12"
      />
      </Link>
    </div>
  </div>

  {/* Global CSS for Animation */}
  {/* <style jsx global>{`
    
    }
  `}</style> */}
</div>
  {/* Bottom nav items */}
  <div className="flex justify-around items-center py-3 relative">


 
{/* Home */}
<div className="relative">
  <div
    className="flex flex-col items-center relative cursor-pointer group"
    onClick={() => setIsProductOpenMobile(prev => !prev)}
    onMouseEnter={() => window.innerWidth >= 1024 && setIsProductOpenMobile(true)}
    onMouseLeave={() => window.innerWidth >= 1024 && setIsProductOpenMobile(false)}
  >
    <Package
      className={`w-6 h-6 transition-colors duration-300 ${
        pathname.startsWith("/product")
          ? "text-cyan-400"
          : "text-cyan-100 group-hover:text-cyan-400"
      }`}
    />
    <span
      className={`text-xs mt-1 transition-colors duration-300 ${
        pathname.startsWith("/product")
          ? "text-cyan-400"
          : "text-gray-100 group-hover:text-cyan-400"
      }`}
    >
      Products
    </span>

    {/* Hover underline for inactive */}
    {!pathname.startsWith("/product") && (
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
    )}

    {/* Active underline */}
    {pathname.startsWith("/product") && (
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full"></span>
    )}
  </div>

  {/* Dropdown */}
  <div
    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-gray-900/95 backdrop-blur-sm border border-cyan-400/20 rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out origin-bottom z-[9999]
      ${isProductOpenMobile ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
  >
    <button
      onClick={() => setIsProductOpenMobile(false)}
      className="absolute top-2 right-2 p-1 rounded-full hover:bg-cyan-400/20 transition-colors"
      aria-label="Close services menu"
    >
      <XMarkIcon className="w-5 h-5 text-cyan-400 cursor-pointer" />
    </button>

    <div className="py-2 pt-8">
      {/* Service Page */}
      <Link
        href="/product"
        onClick={() => setIsProductOpenMobile(false)}
        className="flex items-center gap-3 px-4 py-2 text-sm text-cyan-100 font-semibold transition-colors duration-300 hover:text-cyan-400 hover:bg-cyan-400/10"
      >
        <span className="text-lg text-cyan-400"><Cog6ToothIcon /></span>
        Our Products
      </Link>

      {/* Subservices */}
      {products.map((service) => (
        <Link
          key={service.name}
          href={service.href}
          onClick={() => setIsProductOpenMobile(false)}
          className={`flex items-center gap-3 px-4 py-2 text-sm relative transition-colors duration-300
            ${pathname === service.href
              ? "text-cyan-400 bg-cyan-400/10"
              : "text-gray-100 hover:text-cyan-400 hover:bg-cyan-400/10"
            }`}
        >
          <span className="text-lg text-cyan-400">{service.icon}</span>
          {service.name}
        </Link>
      ))}
    </div>
  </div>
</div>
      
 {/* Services */}
<div className="relative">
  <div
    className="flex flex-col items-center relative cursor-pointer group"
    onClick={() => setIsServicesOpenMobile(prev => !prev)}
    onMouseEnter={() => window.innerWidth >= 1024 && setIsServicesOpenMobile(true)}
    onMouseLeave={() => window.innerWidth >= 1024 && setIsServicesOpenMobile(false)}
  >
    <Cog6ToothIcon
      className={`w-6 h-6 transition-colors duration-300 ${
        pathname.startsWith("/services")
          ? "text-cyan-400"
          : "text-cyan-100 group-hover:text-cyan-400"
      }`}
    />
    <span
      className={`text-xs mt-1 transition-colors duration-300 ${
        pathname.startsWith("/services")
          ? "text-cyan-400"
          : "text-gray-100 group-hover:text-cyan-400"
      }`}
    >
      Services
    </span>

    {/* Hover underline for inactive */}
    {!pathname.startsWith("/services") && (
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
    )}

    {/* Active underline */}
    {pathname.startsWith("/services") && (
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full"></span>
    )}
  </div>

  {/* Dropdown */}
  <div
    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-gray-900/95 backdrop-blur-sm border border-cyan-400/20 rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out origin-bottom z-[9999]
      ${isServicesOpenMobile ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
  >
    <button
      onClick={() => setIsServicesOpenMobile(false)}
      className="absolute top-2 right-2 p-1 rounded-full hover:bg-cyan-400/20 transition-colors"
      aria-label="Close services menu"
    >
      <XMarkIcon className="w-5 h-5 text-cyan-400 cursor-pointer" />
    </button>

    <div className="py-2 pt-8">
      {/* Service Page */}
      <Link
        href="/services"
        onClick={() => setIsServicesOpenMobile(false)}
        className="flex items-center gap-3 px-4 py-2 text-sm text-cyan-100 font-semibold transition-colors duration-300 hover:text-cyan-400 hover:bg-cyan-400/10"
      >
        <span className="text-lg text-cyan-400"><Cog6ToothIcon /></span>
        Our Services
      </Link>

      {/* Subservices */}
      {services.map((service) => (
        <Link
          key={service.name}
          href={service.href}
          onClick={() => setIsServicesOpenMobile(false)}
          className={`flex items-center gap-3 px-4 py-2 text-sm relative transition-colors duration-300
            ${pathname === service.href
              ? "text-cyan-400 bg-cyan-400/10"
              : "text-gray-100 hover:text-cyan-400 hover:bg-cyan-400/10"
            }`}
        >
          <span className="text-lg text-cyan-400">{service.icon}</span>
          {service.name}
        </Link>
      ))}
    </div>
  </div>
</div>


    <div className="w-12" /> {/* FAB gap */}

 {/* About */}
<Link
  href="/about-us"
  className="flex flex-col items-center relative group"
>
  <InformationCircleIcon
    className={`w-6 h-6 transition-colors duration-300 ${
      isActive("/about-us")
        ? "text-cyan-400"
        : "text-cyan-100 group-hover:text-cyan-400"
    }`}
  />
  <span
    className={`text-xs mt-1 transition-colors duration-300 ${
      isActive("/about-us")
        ? "text-cyan-400"
        : "text-gray-100 group-hover:text-cyan-400"
    }`}
  >
    About
  </span>

  {/* Hover underline for inactive */}
  {!isActive("/about-us") && (
    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
  )}

  {/* Active underline */}
  {isActive("/about-us") && (
    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full"></span>
  )}
</Link>

{/* Contact */}
<Link
  href="/contact-us"
  className="flex flex-col items-center relative group"
>
  <PhoneIcon
    className={`w-6 h-6 transition-colors duration-300 ${
      isActive("/contact-us")
        ? "text-cyan-400"
        : "text-cyan-100 group-hover:text-cyan-400"
    }`}
  />
  <span
    className={`text-xs mt-1 transition-colors duration-300 ${
      isActive("/contact-us")
        ? "text-cyan-400"
        : "text-gray-100 group-hover:text-cyan-400"
    }`}
  >
    Contact
  </span>

  {/* Hover underline for inactive */}
  {!isActive("/contact-us") && (
    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
  )}

  {/* Active underline */}
  {isActive("/contact-us") && (
    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full"></span>
  )}
</Link>


  </div>
</div>
    </>
  )
}

export default Navbar