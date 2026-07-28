// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       alert("Signup successful!");

//       router.push("/login");
//     } catch (error) {
//       console.error(error);
//       alert("Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-black p-6 rounded-xl shadow">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Create Account
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//             required
//           />

//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-black text-white p-3 rounded-lg"
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message); return; }
      alert("Signup successful!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes iconPop {
          0%   { transform: scale(0.6); opacity: 0; }
          70%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .card-enter {
          animation: fadeSlideUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .icon-enter {
          animation: iconPop 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }
        .field-row { animation: fadeSlideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .field-row:nth-child(1) { animation-delay: 0.18s; }
        .field-row:nth-child(2) { animation-delay: 0.24s; }
        .field-row:nth-child(3) { animation-delay: 0.30s; }
        .field-row:nth-child(4) { animation-delay: 0.36s; }
        .btn-row { animation: fadeSlideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.42s both; }
        .links-row { animation: fadeSlideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.48s both; }

        input:focus {
          outline: none;
          border-color: #111 !important;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.08);
        }
        .sign-btn:hover { background: #333; }
        .sign-btn:active { transform: scale(0.98); }
        .sign-btn { transition: background 0.18s, transform 0.12s; }
      `}</style>

      {/* Page background — white, subtle grid */}
      <div
        className="min-h-screen flex items-center justify-center bg-white px-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {/* Card */}
        <div
          className="card-enter w-full max-w-md bg-white rounded-2xl px-10 py-10"
          style={{
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
          }}
        >
          {/* Icon */}
          <div className="flex flex-col items-center mb-7">
            <div
              className="icon-enter flex items-center justify-center rounded-2xl mb-5"
              style={{
                width: 56,
                height: 56,
                background: "#111",
              }}
            >
              {/* Person/user icon */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="3.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4.5 20c0-4.142 3.358-7 7.5-7s7.5 2.858 7.5 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-black tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              Create account
            </h1>
            <p className="text-sm mt-1" style={{ color: "#888" }}>
              Sign up to get started today!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="field-row">
              <label className="block text-xs font-semibold tracking-widest mb-1.5" style={{ color: "#555", letterSpacing: "0.08em" }}>
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg px-4 py-3 text-sm text-black bg-white"
                style={{ border: "1.5px solid #e0e0e0", transition: "border-color 0.15s, box-shadow 0.15s" }}
              />
            </div>

            {/* Email */}
            <div className="field-row">
              <label className="block text-xs font-semibold tracking-widest mb-1.5" style={{ color: "#555", letterSpacing: "0.08em" }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg px-4 py-3 text-sm text-black bg-white"
                style={{ border: "1.5px solid #e0e0e0", transition: "border-color 0.15s, box-shadow 0.15s" }}
              />
            </div>

            {/* Phone */}
            <div className="field-row">
              <label className="block text-xs font-semibold tracking-widest mb-1.5" style={{ color: "#555", letterSpacing: "0.08em" }}>
                PHONE NUMBER
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg px-4 py-3 text-sm text-black bg-white"
                style={{ border: "1.5px solid #e0e0e0", transition: "border-color 0.15s, box-shadow 0.15s" }}
              />
            </div>

            {/* Password */}
            <div className="field-row">
              <label className="block text-xs font-semibold tracking-widest mb-1.5" style={{ color: "#555", letterSpacing: "0.08em" }}>
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg px-4 py-3 pr-11 text-sm text-black bg-white"
                  style={{ border: "1.5px solid #e0e0e0", transition: "border-color 0.15s, box-shadow 0.15s" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#aaa", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" strokeLinecap="round"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" strokeLinecap="round"/>
                      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="btn-row pt-1">
              <button
                type="submit"
                disabled={loading}
                className="sign-btn w-full rounded-lg py-3 text-sm font-semibold text-white"
                style={{ background: "#111", letterSpacing: "0.02em" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                    </svg>
                    Creating Account…
                  </span>
                ) : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Footer links */}
          <div className="links-row mt-5 flex flex-col items-center gap-1.5">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-sm"
              style={{ color: "#888", background: "none", border: "none", cursor: "pointer" }}
            >
              Already have an account?{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>Sign in</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex items-center gap-1 text-sm"
              style={{ color: "#aaa", background: "none", border: "none", cursor: "pointer" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Return to homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
}