import { Boxes, Code2, Handshake, Palette, Rocket } from "lucide-react";

const cards = [
  {
    top: 50,
    width: "calc(100% - 142px)",
    icon: Rocket,
    label: "WHO WE ARE",
    title: "Engineering digital solutions that drive real business growth.",
    description:
      "At Cyberspace Works, we combine technical excellence with intentional design. We specialize in building web applications, mobile apps, and custom software tailored to transform complex workflows into polished, seamless, and deeply intuitive user experiences.",
  },
  {
    top: 80,
    width: "calc(100% - 112px)",
    icon: Code2,
    label: "WHAT WE BUILD",
    title: "High-performance systems engineered with modern frameworks.",
    description:
      "We don't believe in generic templates or bloated code. Our development team builds secure, high-velocity applications using advanced engineering frameworks like the MERN stack, Next.js, and robust relational databases—ensuring your software scales flawlessly as your traffic grows.",
  },
  {
    top: 110,
    width: "calc(100% - 82px)",
    icon: Boxes,
    label: "OUR PRODUCTS",
    title:
      "Ready-to-deploy software built for industries that power the economy.",
    description:
      "Beyond custom development, we engineer a proprietary suite of software products designed to run modern businesses. From automated inventory tracking and compliant invoicing platforms to comprehensive medical clinic ecosystems, our products are built to maximize everyday operational efficiency.",
  },
  {
    top: 140,
    width: "calc(100% - 52px)",
    icon: Palette,
    label: "HOW WE DESIGN",
    title:
      "Immersive user interfaces meeting bulletproof reliability.",
    description:
      "A powerful backend deserves a world-class frontend. We focus heavily on creating clean typography, responsive mobile grids, and sleek, futuristic visual aesthetics. By bridging intentional design with speed, we ensure your software is as beautiful to look at as it is effortless to use.",
  },
  {
    top: 170,
    width: "calc(100% - 22px)",
    icon: Handshake,
    label: "OUR PROMISE",
    title:
      "A dedicated technology partner from blueprint to deployment.",
    description:
      "We don’t just ship code and disappear. Our structured four-step delivery lifecycle ensures your software undergoes rigorous testing, seamless deployment, and continuous performance monitoring under a reliable, transparent ecosystem. Let’s build something incredible together.",
  },
];

export default function AboutPage() {
  // const cards = [
  //   { top: 50,  width: 'calc(100% - 142px)' },
  //   { top: 80,  width: 'calc(100% - 112px)' },
  //   { top: 110,  width: 'calc(100% - 82px)'  },
  //   { top: 140, width: 'calc(100% - 52px)'  },
  //   { top: 170, width: 'calc(100% - 22px)'  },
  // ]

  return (
    <div className="bg-black text-white">
      <div className="h-[14vh]" />

      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'sticky',
            top: `${c.top}px`,       // ← each card 30px below previous
            width: c.width,
            zIndex: i + 1,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '50px',   // ← scroll distance before next card starts
          }}
          className="h-130 rounded-[2rem] border border-cyan-400 bg-cyan-500 p-8 md:p-12 shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-md"
        >
         <div className="flex h-full flex-col justify-center">
  <div className="flex items-center gap-3">
    <c.icon className="h-5 w-5 text-black" />

    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black">
      {c.label}
    </p>
  </div>

  <h2 className="mt-6 max-w-4xl text-3xl font-bold md:text-5xl leading-tight">
    {c.title}
  </h2>

  <p className="mt-6 max-w-3xl text-base text-white/80 md:text-lg leading-relaxed">
    {c.description}
  </p>
</div>
        </div>
      ))}

      <div className="h-[60vh]" />
    </div>
  )
}