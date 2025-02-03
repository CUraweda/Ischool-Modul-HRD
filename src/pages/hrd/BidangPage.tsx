import { useState, useEffect } from 'react';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import Swal from 'sweetalert2';
import { Bidang } from '@/middlewares/api';

const BidangPage = () => {
	const [dataBidang, setDataBidang] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [itemsPerPage] = useState(20);
	const [bidangName, setBidangName] = useState('');
	const [editId, setEditId] = useState<number | null>(null);

	let access_token = sessionStorage.getItem('access_token');
	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await Bidang.GetTableDataBidang(access_token, currentPage, itemsPerPage);
			setDataBidang(response.data.data.result);
			setTotalPages(response.data.data.totalPage);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async () => {
		try {
			if (editId) {
				await Bidang.TableUpdateBidang(access_token, { name: bidangName }, editId);
				Swal.fire({
					icon: 'success',
					title: 'Sukses',
					text: 'Bidang berhasil diperbarui',
				});
			} else {
				await Bidang.CreateBidang(access_token, { name: bidangName });
				Swal.fire({
					icon: 'success',
					title: 'Sukses',
					text: 'Bidang berhasil ditambahkan',
				});
			}
			setBidangName('');
			setEditId(null);
			closeModal('Bidang');
			fetchData();
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const handleEdit = (id: number, name: string) => {
		setEditId(id);
		setBidangName(name);
		openModal('Bidang');
	};

	useEffect(() => {
		fetchData();
	}, [currentPage]);

	const handlePageChange = (pageNumber: number) => {
		if (pageNumber >= 0 && pageNumber < totalPages) {
			setCurrentPage(pageNumber);
		}
	};

	const trigerDelete = (id: number) => {
		Swal.fire({
			title: 'Apakah kamu yakin?',
			text: 'kamu tidak dapat mengembalikan data ini!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, tutup!',
		}).then((result) => {
			if (result.isConfirmed) {
				DeleteBidang(id);
			}
		});
	};

	const DeleteBidang = async (id: any) => {
		try {
			await Bidang.TableDeleteBidang(access_token, id);
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Karyawan berhasil dihapus',
			});
			fetchData();
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">Data Bidang</h3>
				<button
					className="btn btn-primary"
					onClick={() => {
						setEditId(null);
						setBidangName('');
						openModal('Bidang');
					}}
				>
					Tambah Bidang
				</button>
			</div>
			<div className="h-[1px] w-full bg-gray-300"></div>
			<div className="q-mt card mt-5 w-full bg-base-100 shadow-xl">
				<div className="card-body overflow-auto">
					<table className="table table-zebra mb-14 h-full">
						<thead>
							<tr>
								<th className="text-xs">No</th>
								<th className="text-xs">Nama</th>
								<th className="text-xs">Action</th>
							</tr>
						</thead>
						<tbody>
							{dataBidang.map((item, index) => (
								<tr key={index}>
									<td className="px-4 py-2">{currentPage * itemsPerPage + index + 1}</td>
									<td className="px-4 py-2">{item.name}</td>
									<td className="flex gap-4 px-4 py-2">
										<button onClick={() => handleEdit(item.id, item.name)} className="btn btn-warning btn-sm">
											Edit
										</button>
										<button onClick={() => trigerDelete(item.id)} className="btn btn-error btn-sm">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Pagination */}
			<div className="mt-5 flex items-center justify-center">
				<div className="join">
					<button
						className="btn join-item btn-sm"
						disabled={currentPage === 0}
						onClick={() => handlePageChange(currentPage - 1)}
					>
						«
					</button>
					<button className="btn join-item btn-sm">Page {currentPage + 1}</button>
					<button
						className="btn join-item btn-sm"
						disabled={currentPage >= totalPages - 1}
						onClick={() => handlePageChange(currentPage + 1)}
					>
						»
					</button>
				</div>
			</div>
			<Modal id="Bidang">
				<div className="p-4">
					<h2 className="mb-4 text-lg font-bold">{editId ? 'Edit Bidang' : 'Tambah Bidang'}</h2>
					<input
						type="text"
						value={bidangName}
						onChange={(e) => setBidangName(e.target.value)}
						className="input input-bordered mb-4 w-full"
						placeholder="Nama Bidang"
					/>
					<button onClick={handleSubmit} className="btn btn-success w-full">
						{editId ? 'Perbarui' : 'Simpan'}
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default BidangPage;
