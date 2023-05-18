import { NextResponse } from "next/server"

export const middleware = async (req) => {
    const sessionid = req.cookies.get('sessionid')?.value
    if (!sessionid) {
        if (req.nextUrl.pathname.startsWith('/parent') || req.nextUrl.pathname.startsWith('/student') || req.nextUrl.pathname.startsWith('/teacher') || req.nextUrl.pathname.startsWith('/collegeadmin')) {
            const loginUrl = new URL("/", req.nextUrl)
            return NextResponse.redirect(loginUrl)
        }
    }
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/signup") {
        // const token = req.cookies.get('sessionid')?.value
        // const role = req.cookies.get('role')?.value
        // if (token) {
        //     const dashboard = new URL(`/${role}`, req.nextUrl)
        //     return NextResponse.redirect(dashboard)
        // }
        return NextResponse.next();
    }

}

export const config = {
    matcher: ['/teacher/:path*', '/student/:path*', '/parent/:path*', '/collegeadmin/:path*'],
}
