// "use client";
// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   MotionValue,
//   useMotionValueEvent,
// } from "motion/react";

// // ─── HeroParallax ─────────────────────────────────────────────────────────────
// export const HeroParallax = ({
//   products,
// }: {
//   products: {
//     title: string;
//     link: string;
//     thumbnail: string;
//   }[];
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const firstRow = products.slice(0, 5);
//   const secondRow = products.slice(5, 10);
//   const thirdRow = products.slice(10, 15);
//   const allProducts = [...firstRow, ...secondRow, ...thirdRow];

//   const { scrollYProgress, scrollY } = useScroll({ container: containerRef });
//   const [debugScrollProgress, setDebugScrollProgress] = useState(0);

//   const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

//   // ── Row sliding (classic parallax) ──
//   const translateX = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, 1000]),
//     springConfig
//   );
//   const translateXReverse = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, -1000]),
//     springConfig
//   );

//   // ── Phase 1 (0–0.2): 3D tilt settles flat ──
//   const rotateX = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [15, 0]),
//     springConfig
//   );
//   const rotateZ = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [20, 0]),
//     springConfig
//   );
//   const translateY = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
//     springConfig
//   );
//   const opacity3D = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
//     springConfig
//   );

//   // ── Phase 2 (0.35–0.55): 3D section exits upward & fades out ──
//   const exitY = useSpring(
//     useTransform(scrollYProgress, [0.35, 0.55], [0, -300]),
//     { stiffness: 150, damping: 35 }
//   );
//   const exitOpacity = useSpring(
//     useTransform(scrollYProgress, [0.35, 0.52], [1, 0]),
//     { stiffness: 150, damping: 35 }
//   );
//   const exitScale = useSpring(
//     useTransform(scrollYProgress, [0.35, 0.55], [1, 0.88]),
//     { stiffness: 150, damping: 35 }
//   );

//   useMotionValueEvent(scrollY, "change", (latest) => {
//     console.log("scrollY:", latest);
//   });

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     setDebugScrollProgress(latest); // ✅ store the actual value
//     console.log("scrollYProgress:", latest);
//   });

//   // ── Phase 3 (0.52–0.72): All Images section enters from below ──
// const gridOpacity = useSpring(
//   useTransform(scrollYProgress, [0.45, 0.55], [0, 1]),
//   { stiffness: 140, damping: 30 }
// );

// const gridEnterY = useSpring(
//   useTransform(scrollYProgress, [0.45, 0.55], [150, 0]),
//   { stiffness: 140, damping: 30 }
// );
//   return (
//     // ✅ h-screen so viewport is fixed height, overflow-y-scroll makes inner 600vh scrollable
//     <div
//       ref={containerRef}
//       className="h-[800px] overflow-y-scroll antialiased relative flex flex-col self-auto bg-black no-scrollbar"
//       style={{ perspective: "1000px" }}
//     >
//       {/* ✅ Inner content wrapper is 600vh — this is what creates the scroll length */}
//       <div className="h-[200vh] relative">
//         <Header />

//         {/* Debug badge */}
//         <div className="fixed right-4 top-12 z-50 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-medium tracking-wide text-white/80 backdrop-blur-md">
//           scrollYProgress: {debugScrollProgress.toFixed(3)}
//         </div>

//         {/* ── 3D Card Grid — exits on scroll ── */}
//         {/* <motion.div
//           style={{
//             y: exitY,
//             opacity: exitOpacity,
//             scale: exitScale,
//           }}
//           className="relative h-10"
//         >
//           <motion.div
//             style={{
//               rotateX,
//               rotateZ,
//               translateY,
//               opacity: opacity3D,
//             }}
//           >
           
//             <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
//               {firstRow.map((product) => (
//                 <ProductCard
//                   key={product.title + "-r1"}
//                   product={product}
//                   translate={translateX}
//                 />
//               ))}
//             </motion.div>

           
//             <motion.div className="flex flex-row mb-20 space-x-20">
//               {secondRow.map((product) => (
//                 <ProductCard
//                   key={product.title + "-r2"}
//                   product={product}
//                   translate={translateXReverse}
//                 />
//               ))}
//             </motion.div>

            
//             <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
//               {thirdRow.map((product) => (
//                 <ProductCard
//                   key={product.title + "-r3"}
//                   product={product}
//                   translate={translateX}
//                 />
//               ))}
//             </motion.div>
//           </motion.div>
//         </motion.div> */}


//         {/* ── 3D Card Grid — exits on scroll ── */}
// {debugScrollProgress < 0.55 && (
//   <motion.div
//     style={{
//       y: exitY,
//       opacity: exitOpacity,
//       scale: exitScale,
//     }}
//     className="relative h-10"
//   >
//     <motion.div
//       style={{
//         rotateX,
//         rotateZ,
//         translateY,
//         opacity: opacity3D,
//       }}
//     >
//       {/* Row 1 */}
//       <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
//         {firstRow.map((product) => (
//           <ProductCard
//             key={product.title + "-r1"}
//             product={product}
//             translate={translateX}
//           />
//         ))}
//       </motion.div>

//       {/* Row 2 */}
//       <motion.div className="flex flex-row mb-20 space-x-20">
//         {secondRow.map((product) => (
//           <ProductCard
//             key={product.title + "-r2"}
//             product={product}
//             translate={translateXReverse}
//           />
//         ))}
//       </motion.div>

//       {/* Row 3 */}
//       <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
//         {thirdRow.map((product) => (
//           <ProductCard
//             key={product.title + "-r3"}
//             product={product}
//             translate={translateX}
//           />
//         ))}
//       </motion.div>
//     </motion.div>
//   </motion.div>
// )}

//         {/* ── All Images Grid — enters from below ── */}
//         <motion.div
//           style={{
//             y: gridEnterY,
//             opacity: gridOpacity,
//           }}
//           className="absolute inset-x-0 top-[52vh] px-6 z-20"
//         >
//           <div className="mx-auto max-w-7xl">
            
//             <motion.div
//               style={{ opacity: gridOpacity }}
//               className="mb-8 flex items-center gap-3"
//             >
//               <div className="h-px flex-1 bg-white/10" />
//               <h3 className="text-sm font-semibold tracking-widest text-white/40 uppercase">
//                 All Products
//               </h3>
//               <div className="h-px flex-1 bg-white/10" />
//             </motion.div>

            
//              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//               {allProducts.map((product, index) => (
//                 <AllImageCard
//                   key={`${product.title}-grid-${index}`}
//                   product={product}
//                   index={index}
//                   gridOpacity={gridOpacity}
//                 />
//               ))}
//             </div> 
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// // ─── All Image Card ────────────────────────────────────────────────────────────
// const AllImageCard = ({
//   product,
//   index,
//   gridOpacity,
// }: {
//   product: { title: string; link: string; thumbnail: string };
//   index: number;
//   gridOpacity: MotionValue<number>;
// }) => {
//   const cardDelay = index * 0.04;

//   return (
//     <motion.a
//       href={product.link}
//       initial={{ opacity: 0, y: 40, scale: 0.92 }}
//       whileInView={{ opacity: 1, y: 0, scale: 1 }}
//       viewport={{ once: true, amount: 0.1, root: undefined }}
//       transition={{
//         duration: 0.55,
//         delay: cardDelay,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       whileHover={{
//         y: -6,
//         scale: 1.03,
//         transition: { type: "spring", stiffness: 400, damping: 20 },
//       }}
//       className="group relative h-44 overflow-hidden rounded-2xl border border-white/8 bg-neutral-900 block"
//     >
//       <Image
//         src={product.thumbnail}
//         alt={product.title}
//         fill
//         sizes="(max-width: 768px) 50vw, 20vw"
//         className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
//       <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
//       <div className="absolute bottom-0 left-0 right-0 p-3">
//         <p className="text-xs font-semibold text-white/80 truncate leading-tight">
//           {product.title}
//         </p>
//       </div>
//       {/* <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-white/15 transition-all duration-300" /> */}
//     </motion.a>
//   );
// };

// // ─── Header ───────────────────────────────────────────────────────────────────
// export const Header = () => {
//   return (
//     <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 z-10 no-scrollbar">
//       <motion.h1
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         className="text-2xl md:text-7xl font-bold text-white tracking-tight no-scrollbar"
//       >
//         The Ultimate <br /> development studio
//       </motion.h1>
//       <motion.p
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
//         className="max-w-2xl text-base md:text-xl mt-8 text-neutral-400"
//       >
//         We build beautiful products with the latest technologies and frameworks.
//         We are a team of passionate developers and designers that love to build
//         amazing products.
//       </motion.p>
//     </div>
//   );
// };

// // ─── ProductCard ──────────────────────────────────────────────────────────────
// export const ProductCard = ({
//   product,
//   translate,
// }: {
//   product: {
//     title: string;
//     link: string;
//     thumbnail: string;
//   };
//   translate: MotionValue<number>;
// }) => {
//   return (
//     <motion.div
//       style={{ x: translate }}
//       whileHover={{ y: -20 }}
//       key={product.title}
//       className="group/product h-96 w-[30rem] relative shrink-0 no-scrollbar"
//     >
//       <a
//         href={product.link}
//         aria-label={product.title}
//         className="block group-hover/product:shadow-2xl"
//       >
//         <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
//           <Image
//             src={product.thumbnail}
//             fill
//             sizes="30rem"
//             className="object-cover object-top absolute h-full w-full inset-0"
//             alt={product.title}
//           />
//         </div>
//       </a>
//       <div className="absolute inset-0 h-full w-full rounded-2xl opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300" />
//       <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold text-sm transition-opacity duration-300 z-10">
//         {product.title}
//       </h2>
//     </motion.div>
//   );
// };





"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useMotionValueEvent,
} from "motion/react";

// ─── HeroParallax ─────────────────────────────────────────────────────────────
export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const allProducts = [...firstRow, ...secondRow, ...thirdRow];

  const { scrollYProgress, scrollY } = useScroll({ container: containerRef });
  const [debugScrollProgress, setDebugScrollProgress] = useState(0);

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // ── Row sliding (classic parallax) ──
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );

  // ── Phase 1 (0–0.2): 3D tilt settles flat ──
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
  useTransform(scrollYProgress, [0, 0.2, 1], [-700, 0, 0]),
  springConfig
);
  const opacity3D = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );

  // ── Phase 2 (0.35–0.55): 3D section exits upward & fades out ──
  const exitY = useSpring(
    useTransform(scrollYProgress, [0.35, 0.55], [0, -300]),
    { stiffness: 150, damping: 35 }
  );
  const exitOpacity = useSpring(
    useTransform(scrollYProgress, [0.35, 0.52], [1, 0]),
    { stiffness: 150, damping: 35 }
  );
  const exitScale = useSpring(
    useTransform(scrollYProgress, [0.35, 0.55], [1, 0.88]),
    { stiffness: 150, damping: 35 }
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("scrollY:", latest);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setDebugScrollProgress(latest); // ✅ store the actual value
    console.log("scrollYProgress:", latest);
  });

  // ── Phase 3 (0.52–0.72): All Images section enters from below ──
  const gridEnterY = useSpring(
    useTransform(scrollYProgress, [0.52, 0.72], [120, 0]),
    { stiffness: 140, damping: 30 }
  );
  const gridOpacity = useSpring(
    useTransform(scrollYProgress, [0.52, 0.72], [0, 1]),
    { stiffness: 140, damping: 30 }
  );

  
  return (
    // ✅ h-screen so viewport is fixed height, overflow-y-scroll makes inner 600vh scrollable
    <div
      ref={containerRef}
      className="h-[1000px] overflow-y-scroll antialiased relative flex flex-col self-auto bg-black no-scrollbar"
      style={{ perspective: "1000px" }}
    >
      {/* ✅ Inner content wrapper is 600vh — this is what creates the scroll length */}
      <div className="h-[300vh] relative">
        <Header />

        {/* Debug badge */}
        {/* <div className="fixed right-4 top-200 z-50 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-medium tracking-wide text-white/80 backdrop-blur-md">
          scrollYProgress: {debugScrollProgress.toFixed(3)}
        </div> */}

        {/* ── 3D Card Grid — exits on scroll ── */}
       {/* ── 3D Card Grid — exits on scroll ── */}

  <motion.div
    style={{
      y: exitY,
      // opacity: exitOpacity,
      scale: exitScale,
    }}
    className="relative h-10"
  >
    <motion.div
      style={{
        rotateX,
        rotateZ,
        translateY,
        opacity: opacity3D,
      }}
    >
      {/* Row 1 */}
      <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
        {firstRow.map((product) => (
          <ProductCard
            key={product.title + "-r1"}
            product={product}
            translate={translateX}
          />
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div className="flex flex-row mb-20 space-x-20">
        {secondRow.map((product) => (
          <ProductCard
            key={product.title + "-r2"}
            product={product}
            translate={translateXReverse}
          />
        ))}
      </motion.div>

      {/* Row 3 */}
      <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
        {thirdRow.map((product) => (
          <ProductCard
            key={product.title + "-r3"}
            product={product}
            translate={translateX}
          />
        ))}
      </motion.div>
    </motion.div>
  </motion.div>

        {/* ── All Images Grid — enters from below ── */}
        {/* <motion.div
          style={{
            y: gridEnterY,
            opacity: gridOpacity,
          }}
          className="absolute inset-x-0 top-[52vh] px-6 z-20"
        >
          <div className="mx-auto max-w-7xl">
            
            <motion.div
              style={{ opacity: gridOpacity }}
              className="mb-8 flex items-center gap-3"
            >
              <div className="h-px flex-1 bg-white/10" />
              <h3 className="text-sm font-semibold tracking-widest text-white/40 uppercase">
                All Products
              </h3>
              <div className="h-px flex-1 bg-white/10" />
            </motion.div>

            
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allProducts.map((product, index) => (
                <AllImageCard
                  key={`${product.title}-grid-${index}`}
                  product={product}
                  index={index}
                  gridOpacity={gridOpacity}
                />
              ))}
            </div> 
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

// ─── All Image Card ────────────────────────────────────────────────────────────
const AllImageCard = ({
  product,
  index,
  gridOpacity,
}: {
  product: { title: string; link: string; thumbnail: string };
  index: number;
  gridOpacity: MotionValue<number>;
}) => {
  const cardDelay = index * 0.04;

  return (
    <motion.a
      href={product.link}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1, root: undefined }}
      transition={{
        duration: 0.55,
        delay: cardDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.03,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      className="group relative h-44 overflow-hidden rounded-2xl border border-white/8 bg-neutral-900 block"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        fill
        sizes="(max-width: 768px) 50vw, 20vw"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-xs font-semibold text-white/80 truncate leading-tight">
          {product.title}
        </p>
      </div>
      {/* <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-white/15 transition-all duration-300" /> */}
    </motion.a>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────
export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 z-10 no-scrollbar">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-2xl md:text-7xl font-medium text-white tracking-tight no-scrollbar "
      >
        The Ultimate <br /> <span className="text-cyan-400">Software Solutions</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="max-w-2xl text-base md:text-xl mt-8 text-neutral-400"
      >
       We build robust softwares with the latest technologies and frameworks to boost your business needs and elevate your finances to the top.
      </motion.p>
    </div>
  );
};

// ─── ProductCard ──────────────────────────────────────────────────────────────
export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-86 w-[40rem] relative shrink-0 no-scrollbar"
    >
      <a
        href={product.link}
        aria-label={product.title}
        className="block group-hover/product:shadow-2xl"
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
          <Image
  src={product.thumbnail}
  fill
  alt={product.title}
  className=""
/>
        </div>
      </a>
      <div className="absolute inset-0 h-full w-full rounded-2xl opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold text-sm transition-opacity duration-300 z-10">
        {product.title}
      </h2>
    </motion.div>
  );
};