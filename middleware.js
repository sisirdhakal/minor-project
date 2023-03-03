import { NextResponse } from "next/server"

export const middleware = async (req) => {
    const role = req.cookies.get("role")?.value?.toLowerCase()
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/signup") {
        return NextResponse.next();
    }
    // if (!req.url.startsWith(`/${role}`)) {
    //     const userDashboard = new URL(`/${role}`, req.nextUrl)
    //     return NextResponse.redirect(userDashboard)
    // }
    // if (req.nextUrl.pathname.startsWith(`/${role}`)) {
    //     return NextResponse.next();
    //     // const token = req.cookies.get('csrftoken')?.value
    //     // console.log(token)

    //     // if (token) {

    //     //     return NextResponse.next();

    //     // }
    //     // const loginUrl = new URL("/", req.nextUrl)
    //     // return NextResponse.redirect(loginUrl)
    // }

}

