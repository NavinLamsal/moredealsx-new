import { setCookie } from "cookies-next/client";


export function setTokenCookie(name:string, token: string , age: number = 60 * 60 * 24) {
    return setCookie(name, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: age,
  })
}