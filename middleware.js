import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const rolePathMap = {
  admin: "/dashboard/admin",
  client: "/dashboard/client",
  employee: "/dashboard/employee",
  vendor: "/dashboard/vendor",
};

const authRoutes = new Set(["/login", "/forgot-password", "/reset-password", "/schedule"]);

function isProjectRoute(pathname) {
  return pathname.startsWith("/dashboard");
}

function isPublicShopRoute(pathname) {
  return pathname === "/shop" || pathname.startsWith("/shop/");
}
// Blog pages should be accessible without authentication.
function isPublicBlogRoute(pathname) {
  // Match the base /blog route as well as any nested blog routes like /blog/slug
  return pathname === "/blog" || pathname.startsWith("/blog/");
}
function isPublicServiceRoute(pathname) {
  return pathname === "/services" || pathname.startsWith("/services/");
}

function isPubliccontactRoute(pathname) {
  return pathname === "/contact-us" || pathname.startsWith("/contact-us/");
}
function isPublicproductRoute(pathname) {
  return pathname === "/product" || pathname.startsWith("/product/");
}
function isPublicaboutRoute(pathname) {
  return pathname === "/about-us" || pathname.startsWith("/about-us/");
}
export async function middleware(request) {
  // Normalize pathname to avoid trailing-slash mismatches ("/login/" vs "/login")
  let pathname = request.nextUrl.pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL(rolePathMap[token.role] || "/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isPublicShareRoute = pathname.startsWith("/share/");
  function isPublicProductsRoute(pathname) {
  return pathname === "/products" || pathname.startsWith("/products/");
}
  // const isPublicRoute = isPublicShareRoute || isPublicShopRoute(pathname);
  const isPublicRoute =
  isPublicShareRoute ||
  isPublicShopRoute(pathname) ||
  isPublicProductsRoute(pathname) ||
  isPublicServiceRoute(pathname) ||
  isPubliccontactRoute(pathname)||
  isPublicaboutRoute(pathname) ||
  isPublicBlogRoute(pathname)||
  isPublicproductRoute(pathname);

  if (!pathname.startsWith("/api") && !authRoutes.has(pathname) && !isPublicRoute && !isProjectRoute(pathname) && pathname !== "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.redirect(new URL(rolePathMap[token.role] || "/dashboard", request.url));
  }

  const isUsersApi = pathname.startsWith("/api/users");
  const isUsersListApi = pathname === "/api/users/list";
  const isUsersPatch = isUsersApi && request.method === "PATCH";

  if (isUsersApi && !token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isUsersApi && !isUsersListApi && !isUsersPatch && token?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (pathname.startsWith("/dashboard/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard/client") && token?.role !== "client") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard/employee") && token?.role !== "employee") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard/vendor") && token?.role !== "vendor") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/dashboard" && token?.role && rolePathMap[token.role]) {
    return NextResponse.redirect(new URL(rolePathMap[token.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
