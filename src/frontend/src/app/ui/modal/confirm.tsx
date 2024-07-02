const Confirm = ({
	onConfirm,
	onCancel,
	title,
	body,
}: {
	onConfirm: () => void;
	onCancel: () => void;
	title: string;
	body: string;
}) => {
	return (
		<div
			className='inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'
			role='dialog'
			aria-modal='true'
			aria-labelledby='modal-headline'>
			<div className='absolute right-0 top-0 hidden pr-4 pt-4 sm:block'>
				<button
					type='button'
					onClick={onCancel}
					data-behavior='cancel'
					className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primbg-primary focus:ring-offset-2'>
					<span className='sr-only'>Close</span>
					<svg
						className='h-6 w-6'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						aria-hidden='true'>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>
			</div>
			<div className='sm:flex sm:items-start'>
				<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary sm:mx-0 sm:h-10 sm:w-10'>
					<svg
						className='h-6 w-6 text-white'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						aria-hidden='true'>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
						/>
					</svg>
				</div>
				<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
					<h3
						className='text-lg font-medium leading-6 text-gray-900'
						id='modal-headline'>
						{title}
					</h3>
					<div className='mt-2'>
						<p className='text-sm text-gray-500'>{body}</p>
					</div>
				</div>
			</div>
			<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
				<button
					type='button'
					onClick={onConfirm}
					data-behavior='commit'
					className='inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primbg-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'>
					Commit
				</button>
				<button
					onClick={onCancel}
					type='button'
					data-behavior='cancel'
					className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primbg-primary focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default Confirm;
