'use client'
import React from 'react'
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const AuthLinks = [
	{ name: "Sing up", href: "/auth/register" },
	{ name: "Sing in", href: "/auth" },
];
const AuthNav = () => {
    const pathname = usePathname()

    return (
        <div className='h-[30px] w-full flex flex-row items-center justify-between'>
            <Link href={'/Auth'} className="hidden lg:flex flex-row justify-center items-center gap-[10px]">
                <div className="h-[40px] aspect-square bg-black rounded-full grid place-content-center">
                    <Image src='/assets/42_logo.svg' width={30} height={30} alt='' />
                </div>
                <h1 className='font-bold text-[20px] tracking-[4%]'>Transcendent</h1>
            </Link>
            <div className="flex flex-row justify-center items-center gap-[8px] w-full lg:w-auto ">
                {
                    AuthLinks.map((link, index) => (
                        <NavButton key={index} value={link.name} href={link.href} Selected={pathname === link.href} />
                    ))
                }
            </div>
        </div>
    )
}

const NavButton = ({ Selected, value, href }: { Selected?: boolean, value: string, href: string }) => {
    return <Link href={href} className={clsx('rounded-[2px] font-semibold text-[18px] tracking-[4%]  px-[26px] py-[5px]', {
        'bg-white text-black': Selected,
        'text-white hover:bg-[#e2e2e2] hover:text-black': !Selected
    })}>{value}</Link >

}
export default AuthNav