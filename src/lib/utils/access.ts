import { setCookie } from "cookies-next/client";


export function setTokenCookie(name:string, token: string , age: number = 60 * 60) {
    console.log(`Setting cookie: ${name} with token: ${token}`, process.env.NODE_ENV);
    return setCookie(name, token, {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: age,
  })
}