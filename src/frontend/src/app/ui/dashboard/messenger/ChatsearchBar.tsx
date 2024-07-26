'use client'

import React from 'react'
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from '@/app/ui/dashboard/icons/messenger/search';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Filter from '../icons/content_area/filters';
import Link from 'next/link';

export const ChatSearchBar = ({ onFilterClick, filter }: {
	onFilterClick: () => void;
	filter: boolean;
}) => {

	const searchParams = useSearchParams()
	const { replace } = useRouter();
	const pathname = usePathname();

	const handleChange = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('q', term);
		} else {
			params.delete('q');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className='w-full lg:max-w-[400px]'>
			<div className="flex flex-row items-center justify-between relative w-full lg:max-w-[400px]">
				<textarea
					className="flex-row items-center justify-between rounded-lg overflow-hidden bg-[#363636] pl-[60px] p-2 h-[40px] w-full resize-none outline-none"
					placeholder="Search..."
					defaultValue={searchParams.get('q')?.toString()}
					onChange={(e) => handleChange(e.target.value)}
				></textarea>
				<div className="absolute pl-3 top-1/2 transform -translate-y-1/2">
					<SearchIcon />
				</div>
				<div className={`pl-3 flex flex-row items-end justify-end gap-2`} >
					<Link href="/messenger/group">
						<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
						</svg>
					</Link>

					<button className={`${filter ? "bg-[#878787] rounded-md" : ""}`} onClick={onFilterClick}>
						<Filter />
					</button>
				</div>
			</div>
		</div>
	)
}