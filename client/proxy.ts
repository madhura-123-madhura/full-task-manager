import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

const proxy = (req: NextRequest) => {
    const token = req.cookies.get("TOKEN")?.value
    if (!token) {
        return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/employee/:path*"]
}

export default proxy