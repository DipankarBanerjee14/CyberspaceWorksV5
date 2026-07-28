"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

import { useRouter } from "next/navigation";
import { ChefHat, IdCardLanyard, NotebookTabs, Pill, ReceiptIndianRupee, ReceiptText, ShoppingBag, SquareKanban, Stethoscope } from "lucide-react";


/* ═══════════════════════════════════════════════════════
   CUTOUT HELPERS
═══════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════
   CORNER MARK
═══════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════
   CUTOUT CARD
═══════════════════════════════════════════════════════ */

// interface CardProps {
//   label: string;
//   title: string;
//   description: string;
//   tag?: string;
//   accent?: string;
//   cut?: number;
//   duration?: string;
// }

interface CardProps {
  label: string;
  title: string;
  description: string;
  tag?: string;
  accent?: string;
  cut?: number;
  duration?: string;
  icon?: ReactNode;
  href?: string;
}
function CutoutCard({
  label,
  title,
  description,
  tag,
  accent = "#e8ff47",
  cut = CUT,
  duration = "3s",
  icon,
  href,
}: CardProps) {
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
    // <div style={{ width: '100%', height: '400px', position: 'relative' }}>
   
    
 
// </div>
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
        {/* Rotating Border */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: cutPath(cut),
          }}
        >
          <div
            className="absolute inset-[-100%]"
            style={{
              animation: `spin ${duration} linear infinite`,
              background: `conic-gradient(
                from 0deg,
                transparent 0deg,
                transparent 295deg,
                ${accent}00 308deg,
                ${accent}cc 338deg,
                ${accent}ff 352deg,
                #fff 358deg,
                transparent 360deg
              )`,
            }}
          />
        </div>

        {/* Inner Card */}
        <div
          className="relative z-10 h-full overflow-hidden bg-[#0a0a0a]"
          style={{
            clipPath: innerCutPath(cut, 1.5),
          }}
        >
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
    <span className="flex items-center justify-center size-7 text-cyan-500">
      {icon}
    </span>
  )}
              <h3 className="text-xl font-semibold text-white">
                {title}
              </h3>
              </div>

              <p className="text-sm leading-7 text-white/50">
                {description}
              </p>
            </div>

            <button
              className="mt-auto flex items-center justify-center gap-2 border px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
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
              onClick={() => router.push(href || "/") }
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */

export default function SoftwareShowcase() {
  const router = useRouter();
  return (
    <div id="products" className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}
      {/* <div className="absolute inset-0 z-0">
        <Antigravity
          count={620}
          magnetRadius={12}
          ringRadius={4}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={0.75}
          lerpSpeed={0.08}
          color="#00ced4"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={16}
      />
      </div> */}
      
    {/* <OurServicesWithWires/> */}

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-20">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-400/60">
            Software Suite
          </p>

          <h2 className="text-3xl sm:text-5xl font-semibold text-cyan-400 tracking-tight"
            style={{ fontFamily: "'Syne','DM Sans',sans-serif" }}>
            Our Products
          </h2>

          <p className="mt-4 text-sm text-white/40">
            Powerful software solutions for every business
          </p>
        </div>

        {/* Grid */}
        <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4 mb-5">
          

          <CutoutCard
            label="Project Management Software"
            title="CyberProjects"
            description="Payroll, attendance, leave and employee management platform."
            tag="v2.4"
            accent="#0f766e"
              icon={<SquareKanban className="size-3" />}
              href="/products/cyberprojects-project-management-software"
          />

          <CutoutCard
            label="GST and Billing Software"
            title="CyberInvoice"
            description="Barcode billing, GST invoicing and inventory management."
            tag="v4.0"
            accent="#0e7490"
              icon={<ReceiptIndianRupee className="size-3" />}
              href="/products/cyberinvoice-gst-billing-software"
          />

          <CutoutCard
            label="Tally Software"
            title="CyberLedger"
            description="Hospital ERP with billing, EMR and pharmacy integration."
            tag="v2.0"
            accent="#0369a1"
              icon={<NotebookTabs className="size-3" />}
              href="/products/cyberledger-accounting-software"
          />
          <CutoutCard
            label="HR Management Software"
            title="CyberPayroll"
            description="Hospital ERP with billing, EMR and pharmacy integration."
            tag="v2.0"
            accent="#1d4ed8"
              icon={<IdCardLanyard className="size-3" />}
              href="/products/cyberpayroll-hr-management-software"
          />
        </div>
         <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4 mb-5">
         

          <CutoutCard
            label="Store Management System"
            title="CyberRetail"
            description="Payroll, attendance, leave and employee management platform."
            tag="v2.4"
            accent="#4338ca"
              icon={<ShoppingBag className="size-3" />}
              href="/products/cyberretail-store-management-system"
          />

          <CutoutCard
            label="Clinic Management System"
            title="CyberClinic"
            description="Barcode billing, GST invoicing and inventory management."
            tag="v4.0"
            accent="#6d28d9"
              icon={<Stethoscope className="size-3" />}
              href="/products/cyberclinic-clinic-management-system"
          />

          <CutoutCard
            label="Pharmacy Management System"
            title="CyberPharma"
            description="Hospital ERP with billing, EMR and pharmacy integration."
            tag="v2.0"
            accent="#7e22ce"
              icon={<Pill className="size-3" />}
              href="/products/cyberpharma-pharmacy-management-system"
          />
          <CutoutCard
            label="Resturant Management System"
            title="CyberDine"
            description="Hospital ERP with billing, EMR and pharmacy integration."
            tag="v2.0"
            accent="#38bdf8"
              icon={<ChefHat className="size-3" />}
              href="/products/cyberdine-restaurant-management-system"
          />
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