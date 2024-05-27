'use client'

import React from 'react'
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from '@/app/ui/dashboard/icons/messenger/search';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const SearchBar = () => {

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
		<div className='pb-6'>
			<div className="flex flex-row items-center justify-between relative">
				<textarea
					className="flex-row items-center justify-between rounded-lg overflow-hidden p-3 bg-[#474747] pl-10 h-[50px] w-full resize-none outline-none"
					placeholder="Type Name of User"
					defaultValue={searchParams.get('q')?.toString()}
					onChange={(e) => handleChange(e.target.value)}
				></textarea>
				<div className="absolute pl-3 top-1/2 transform -translate-y-1/2">
					<SearchIcon />
				</div>
			</div>
		</div>
	)
}

export default SearchBar
