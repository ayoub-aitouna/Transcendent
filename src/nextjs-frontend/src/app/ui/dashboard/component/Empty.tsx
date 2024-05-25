import Image from "next/image";

export default function Empty({ text }: { text: string }) {
	return (
		<div className='w-full flex-1 flex flex-col justify-center items-center gap-5'>
			<Image src='/assets/icons/empty.svg' alt='empty' width={50} height={50} />
			<p className='capitalize text-xs font-bold tracking-widest text-[#a2a2a2]'>
				{text}
			</p>
		</div>
	);
}
