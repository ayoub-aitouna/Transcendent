import Link from 'next/link';
import * as React from "react";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

function NavBtnR({href, Icon}: {
    href: string;
    Icon: any;
}) {
    return (
        <Link href={href} passHref className='h-full w-full  grid place-content-center'>
            <div className={`underline-none flex flex-row items-center space-x-1 cursor-pointer  relative`}>
                <Icon />
            </div>
        </Link>
    );
}

export default NavBtnR;


  
