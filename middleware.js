import axios from "axios";
import { NextResponse } from "next/server"

export const middleware = async (req) => {

    // if (req.nextUrl.pathname.startsWith('/')) {
    //     const token = req.cookies.get('csrftoken')?.value
    //     console.log(token)

    //     if (token) {

    //         return NextResponse.next();

    //     }
    //     const loginUrl = new URL("/", req.nextUrl)
    //     return NextResponse.redirect(loginUrl)
    // }
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/signup") {
        // const token = req.cookies.get('csrftoken')?.value
        // console.log(token)
        return NextResponse.next();
    }
}

