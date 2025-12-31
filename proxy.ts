import { NextRequest } from "next/server";

export default function proxy(req:NextRequest){
    if(req.nextUrl.pathname==='/')
        return Response.redirect(new URL('/admin',req.url));
    if(req.nextUrl.pathname === '/content')
        return Response.redirect(new URL('/content/meditations',req.url));
}