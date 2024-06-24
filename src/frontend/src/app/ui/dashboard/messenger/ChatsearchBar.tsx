'use client'

import React from 'react'
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from '@/app/ui/dashboard/icons/messenger/search';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Filter from '../icons/content_area/filters';

export const ChatSearchBar = ({onFilterClick, filter}:{
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
		<div className=''>
			<div className="flex flex-row items-center justify-between relative">
				<textarea
					className="flex-row items-center justify-between rounded-lg overflow-hidden bg-[#363636] pl-[60px] p-2 h-[40px] w-[336px] resize-none outline-none"
					placeholder="Search..."
					defaultValue={searchParams.get('q')?.toString()}
					onChange={(e) => handleChange(e.target.value)}
				></textarea>
					<div className="absolute pl-3 top-1/2 transform -translate-y-1/2">
						<SearchIcon />
					</div>
					<div className={`pl-3 items-end justify-end `} onClick={onFilterClick}>
						<button className={`${filter? "bg-[#878787] rounded-md" : ""}`}>
							<Filter />
						</button>
					</div>
			</div>
		</div>
	)
}