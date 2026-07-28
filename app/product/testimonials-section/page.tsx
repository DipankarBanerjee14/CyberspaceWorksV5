// "use client"

// import { Marquee } from "@/components/ui/marquee"
// import { TestimonialCard } from "./testimonial-card"

// const testimonials = [
//   {
//     name: "John Doe",
//     role: "Startup Founder",
//     review:
//       "Amazing experience working with this team. The UI quality and performance are outstanding.",
//   },
//   {
//     name: "Sarah Khan",
//     role: "Business Owner",
//     review:
//       "Professional design and smooth animations. Highly recommended for modern SaaS projects.",
//   },
//   {
//     name: "Alex Smith",
//     role: "Developer",
//     review:
//       "One of the best development experiences I've had. Everything feels premium.",
//   },
//   {
//     name: "Michael Lee",
//     role: "Agency Owner",
//     review:
//       "Excellent attention to detail and incredible visual quality.",
//   },
// ]

// function TestimonialsSection() {
//   return (
//     <section className="py-24 overflow-hidden bg-black">
//       <div className="container mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold mb-4">
//             What Clients Say
//           </h2>

//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Trusted by startups, agencies, and businesses worldwide.
//           </p>
//         </div>

//         {/* First Row */}
//         <Marquee
       
//           pauseOnHover
          
//           className="[--duration:30s]"
//         >
//           {testimonials.map((item, index) => (
//             <TestimonialCard
//               key={index}
//               {...item}
//             />
//           ))}
//         </Marquee>

//         {/* Second Row */}
//         <Marquee
//           reverse={true}
//           pauseOnHover
//           className="[--duration:35s] mt-6"
//         >
//           {testimonials.map((item, index) => (
//             <TestimonialCard
//               key={index}
//               {...item}
//             />
//           ))}
//         </Marquee>
//       </div>
//     </section>
//   )
// }

// export default TestimonialsSection
"use client"

import { Marquee } from "@/components/ui/marquee"
import { TestimonialCard } from "./testimonial-card"
import { useEffect, useState } from "react"

const testimonials = [
  {
    name: "John Doe",
    role: "Startup Founder",
    review:
      "Amazing experience working with this team. The UI quality and performance are outstanding.",
  },
  {
    name: "Sarah Khan",
    role: "Business Owner",
    review:
      "Professional design and smooth animations. Highly recommended for modern SaaS projects.",
  },
  {
    name: "Alex Smith",
    role: "Developer",
    review:
      "One of the best development experiences I've had. Everything feels premium.",
  },
  {
    name: "Michael Lee",
    role: "Agency Owner",
    review:
      "Excellent attention to detail and incredible visual quality.",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    review:
      "Seamless delivery and top-notch communication throughout the project.",
  },
]

function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false)

useEffect(() => {
  console.log("Marquee hover:", isHovered)
}, [isHovered])
  return (
    <section className="py-24 overflow-hidden bg-black">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Clients Say
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Trusted by startups, agencies, and businesses worldwide.
          </p>
        </div>

        {/* Row 1 — Left to Right */}
        {/* Row 1 */}
{/* Row 1 — reverse (right direction) */}
<Marquee reverse={true} pauseOnHover onHoverChange={setIsHovered} className="[--duration:30s]">
  {testimonials.map((item, index) => (
    <TestimonialCard key={index} {...item} />
  ))}
</Marquee>

{/* Row 2 — normal (left direction) */}
<Marquee pauseOnHover className="[--duration:35s] mt-6">
  {testimonials.map((item, index) => (
    <TestimonialCard key={index} {...item} />
  ))}
</Marquee>
      </div>
    </section>
  )
}

export default TestimonialsSection