import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import { CustomerCare } from '@/middlewares/api/hrd';
import { getSessionStorageItem } from '@/utils/storageUtils';
import { IoSend } from 'react-icons/io5';
import socketService from '@/utils/socket';
import Swal from 'sweetalert2';
interface Role {
	id: number;
	name: string;
}
interface User {
	id: number;
	uuid: string;
	role_id: number;
	full_name: string;
	email: string;
	role: Role;
}

interface Chat {
	id: number;
	user_id: number;
	with_id: number;
	unique_id: string;
	idUser: UserSummary;
	withUser: UserSummary;
}
interface UserSummary {
	id: number;
	full_name: string;
}

const CustomerCarePage = () => {
	const token = getSessionStorageItem('access_token');
	// const role = getSessionStorageItem('role_id');
	const id = getSessionStorageItem('id');
	const [drawerOpen, setDrawerOpen] = useState(true);
	const [users, setUsers] = useState<Chat[]>([]);
	const [messages, setMessages] = useState<any[]>([]);
	const [inputMessage, setInputMessage] = useState('');
	const [currentReceiverId, setCurrentReceiverId] = useState<number | null>(null);
	const [currentReceiverName, setCurrentReceiverName] = useState('');
	const [mediumDialogOpen, setMediumDialogOpen] = useState(false);
	const [dataUser, setDataUser] = useState<User[]>([]);
	// const [typing, setTyping] = useState(false);

	useEffect(() => {
		getUserChatsdata();
		getDataChatAll();
		getMessages;
		socketConnect;
	}, []);

	useEffect(() => {
		if (currentReceiverId !== null) {
			getMessages();
		}
	}, [currentReceiverId]);

	const socketConnect = async () => {
		await socketService.connect();
		socketService.on('cc_refresh', () => {
			getUserChatsdata();
			getDataChatAll();
			getMessages();
		});
	};

	const getUserChatsdata = async () => {
		try {
			const response = await CustomerCare.getUserChats(token, id);
			setUsers(response.data.data);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Gagal Mengambil data Guru & Karyawan, silakan refresh halaman!',
			});
		}
	};
	const getDataChatAll = async () => {
		try {
			const response = await CustomerCare.getDataChat(token, 10000);
			const { result } = response.data.data;
			console.log(response.data.data);
			setDataUser(result);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Gagal Mengambil data Guru & Karyawan, silakan refresh halaman!',
			});
		}
	};

	const setUpMessage = (userChat: any) => {
		setCurrentReceiverId(userChat.with_id);
		setCurrentReceiverName(userChat.withUser.full_name);
	};

	const newMessage = (user: any) => {
		setCurrentReceiverId(user.id);
		setCurrentReceiverName(user.full_name);
		setMessages([]);
		setMediumDialogOpen(false);
	};

	const getMessages = async () => {
		try {
			const response = await CustomerCare.getMessages(token, id, currentReceiverId || 1);
			const data = response.data.data[0]?.messages || [];
			setMessages(
				data.map((message: any) => ({
					text: message.message,
					sender: message.sender_id !== Number(id) ? currentReceiverName : 'Me', // Example userId 1
					color: message.sender_id !== Number(id) ? 'primary' : 'amber',
					textColor: message.sender_id !== Number(id) ? 'white' : 'black',
					isSender: message.sender_id === Number(id), // Example userId 1
					stamp: new Date(message.createdAt).toLocaleString(),
				}))
			);
			getUserChatsdata();
		} catch (err) {
			console.error(err);
		}
	};

	const sendMessage = async () => {
		if (!inputMessage || currentReceiverId === null) return;

		try {
			await CustomerCare.sendMessage(token, currentReceiverId, inputMessage, id);
			getMessages();
			setInputMessage('');
			socketService.emit('cc', {});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<div className="m-auto my-10 flex h-[84vh] w-[90%]">
				<div
					className={`overflow-y-auto transition-transform ${
						drawerOpen ? 'w-64' : 'w-0'
					} flex-none bg-gray-800 text-white`}
				>
					<div className="flex items-center justify-between p-4">
						<h2 className="text-2xl font-bold">Chats</h2>
						<button onClick={() => setDrawerOpen(!drawerOpen)} className="text-xl text-white">
							<FaAngleLeft />
						</button>
					</div>

					<div className="overflow-y-auto px-4">
						{users?.map((userChat: Chat) => (
							<div
								key={userChat.with_id}
								className="flex cursor-pointer items-center p-2 hover:bg-gray-700"
								onClick={() => setUpMessage(userChat)}
							>
								<img
									src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
									alt="Avatar"
									className="h-10 w-10 rounded-full"
								/>
								<span className="ml-2">{userChat.withUser.full_name}</span>
							</div>
						))}
					</div>
					<div className="p-4">
						<button
							onClick={() => setMediumDialogOpen(true)}
							className="btn btn-success flex w-full items-center justify-center text-white"
						>
							<FaPlus /> Add Chat
						</button>
					</div>
				</div>

				<div className="flex flex-grow flex-col">
					<div className="flex min-h-16 gap-5 bg-white p-4 shadow">
						{!drawerOpen ? (
							<button
								onClick={() => setDrawerOpen(!drawerOpen)}
								className="text-center align-middle text-2xl text-black"
							>
								<FaAngleRight />
							</button>
						) : null}
						{currentReceiverName ? (
							<div className="flex h-full items-center gap-2 text-center">
								<img
									src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
									alt="Avatar"
									className="h-9 w-9 rounded-full"
								/>
								<h2 className="text-xl">{currentReceiverName}</h2>
							</div>
						) : null}
					</div>

					<div className="flex-grow overflow-y-auto bg-gray-100 p-4">
						{messages.map((message, index) => (
							<div key={index} className={`flex ${message.isSender ? 'justify-end' : 'justify-start'} mb-4`}>
								<div
									className={`rounded-lg p-2 ${
										message.isSender ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
									}`}
								>
									<div>{message.text}</div>
									<div className="text-xs">{message.stamp}</div>
								</div>
							</div>
						))}
						{/* {typing && <div className="text-gray-500">Typing...</div>} */}
					</div>

					<div className="flex items-center bg-white p-4">
						<input
							type="text"
							value={inputMessage}
							className="input input-bordered flex-grow rounded-full"
							onChange={(e) => setInputMessage(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === 'Enter') sendMessage();
							}}
							placeholder="Type here"
						/>
						<button onClick={sendMessage} className="btn btn-circle btn-success ml-4 text-white">
							<IoSend />
						</button>
					</div>
				</div>

				{mediumDialogOpen && (
					<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
						<div className="w-1/2 rounded-lg bg-white p-6">
							<h2 className="mb-4 text-xl">Kirim Pesan</h2>
							<div className="max-h-80 overflow-y-auto">
								{dataUser?.map((user: User, index: number) => (
									<div
										key={index}
										className="flex cursor-pointer items-center p-2 hover:bg-gray-200"
										onClick={() => newMessage(user)}
									>
										<img
											src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
											alt="Avatar"
											className="h-10 w-10 rounded-full"
										/>
										<span className="ml-2">{user.full_name}</span>
									</div>
								))}
							</div>
							<div className="mt-4 flex justify-end">
								<button onClick={() => setMediumDialogOpen(false)} className="btn btn-warning">
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CustomerCarePage;
