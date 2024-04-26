import Link from 'next/link';
import * as React from "react";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

function NavBtnR({href, Icon}: {
    href: string;
    Icon: any;
}) {
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const selected = pathname === href;

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <Link href={href} passHref className='h-full w-full  grid place-content-center'>
            <div className={`underline-none flex flex-row items-center space-x-1 cursor-pointer ${selected ? "text-[#070707]" : "text-[#A2A2A2]"}  relative`}
			>
                <Icon color={selected ? '#FF3D00' : '#A2A2A2'} />
            </div>
        </Link>
    );
}

export default NavBtnR;


  
