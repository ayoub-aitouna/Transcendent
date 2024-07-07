import { Friend, user } from '@/type/auth/user';
import React, { useEffect, useState } from 'react'
import AddGroupMembers from '../dashboard/messenger/add-group-members';
import apiMock from '@/lib/axios-mock';
import { roomItem } from '@/api/chat';
import { Item } from 'react-bootstrap/lib/Breadcrumb';

const GroupMembers = ({
	onCancel,
	friends,
	selectedChat,
}: {
	onCancel: () => void;
	friends: Friend[];
	selectedChat: roomItem | null;

}) => {
	const [Members, setMembers] = useState<Number[]>([]);
	const [ClickAdd, setClickAdd] = useState<boolean>(false);
	useEffect(() => {
		const AddMemberFromGroup = async () => {
			if (Members && ClickAdd) {
				try {
					const formData = new FormData();
					Members.forEach((user: { toString: () => string | Blob; }) => {
						formData.append("input_members", user.toString());
					})
					await apiMock.post(`/chat/Add-members/${selectedChat?.id}/`, formData);
				} catch (error) {
					console.error("Error fetching friends:", error);
				}
			}
		};
		AddMemberFromGroup();
	}, [ClickAdd])
	const handleClickAdd = (id: number) => {
		if (id) {
			if (Members.includes(id)) {
				setMembers(Members.filter((member) => member !== id));
			} else {
				setMembers([...Members, id]);
			}
		}
	}
	const handleAdd = () => {
		setClickAdd(true);
		console.log("Members in confirm", Members);
		onCancel();

	}
	return (
		<div
			className='inline-block transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'
			role='dialog'
			aria-modal='true'
			aria-labelledby='modal-headline'>
			<div className='flex flex-col'>
				{friends && friends.map((friend, index) => (
					<div key={index}>
						<AddGroupMembers
							id={friend.id} username={friend.username} image_url={friend.image_url} level={friend.level} handleOnClick={handleClickAdd} />
					</div>
				))}
			</div>
			<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
				<button
					type='button'
					onClick={handleAdd}
					data-behavior='commit'
					className='inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primbg-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'>
					Add
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

export default GroupMembers
